import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const GroceryPage = () => {
  const navigate = useNavigate();
  const category = "grocery";

  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    if (!stored) return [];
    const allItems = JSON.parse(stored);
    return allItems.filter((item) => item.category === category);
  });

  const groceryProducts = [
    {
      id: 201,
      name: "Basmati Rice - 5kg",
      image: "https://m.media-amazon.com/images/I/51tKyaRLQ8L._SX679_.jpg",
      price: 499,
      brand: "India Gate",
      rating: 4.6,
    },
    {
      id: 202,
      name: "Fortune Sunflower Oil - 1L",
      image: "https://m.media-amazon.com/images/I/71G9x8yp2FL._SY879_.jpg",
      price: 150,
      brand: "Fortune",
      rating: 4.4,
    },
    {
      id: 203,
      name: "Aashirvaad Atta - 10kg",
      image: "https://m.media-amazon.com/images/I/81h5NEkkW9L._SX679_.jpg",
      price: 449,
      brand: "Aashirvaad",
      rating: 4.5,
    },
    {
      id: 204,
      name: "Tata Salt - 1kg",
      image: "https://m.media-amazon.com/images/I/51Mr0oFd5rL._SX679_.jpg",
      price: 25,
      brand: "Tata",
      rating: 4.7,
    },
    {
      id: 205,
      name: "Amul Butter - 500g",
      image: "https://m.media-amazon.com/images/I/61cA9Hj8t+L._SX679_.jpg",
      price: 275,
      brand: "Amul",
      rating: 4.6,
    },
    {
      id: 206,
      name: "Red Label Tea - 1kg",
      image: "https://m.media-amazon.com/images/I/7107K8J0dTL._SX679_.jpg",
      price: 450,
      brand: "Red Label",
      rating: 4.5,
    },
    {
      id: 207,
      name: "Maggi Noodles - 12 Pack",
      image: "https://m.media-amazon.com/images/I/61grg8WYh8L._SX679_.jpg",
      price: 150,
      brand: "Maggi",
      rating: 4.4,
    },
    {
      id: 208,
      name: "Moong Dal - 1kg",
      image: "https://m.media-amazon.com/images/I/61f3+d5AbvL._SX679_.jpg",
      price: 130,
      brand: "Tata Sampann",
      rating: 4.6,
    },
    {
      id: 209,
      name: "Tropicana Orange Juice - 1L",
      image: "https://m.media-amazon.com/images/I/61lEJbGAtmL._SX679_.jpg",
      price: 120,
      brand: "Tropicana",
      rating: 4.3,
    },
    {
      id: 210,
      name: "Kissan Mixed Fruit Jam - 500g",
      image: "https://m.media-amazon.com/images/I/61uD-oc5DqL._SX679_.jpg",
      price: 160,
      brand: "Kissan",
      rating: 4.5,
    },
  ];

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = groceryProducts.find((p) => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === id);
    if (existing) {
      cart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedItems((prev) => [...prev, id]);

    setTimeout(() => {
      setAddedItems((prev) => prev.filter((itemId) => itemId !== id));
    }, 2000);
  };

  const handleBuyNow = (id) => {
    handleAddToCart(id);
    navigate("/cart");
  };

  const toggleWishlist = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const isInWishlist = wishlist.find((item) => item.id === id);
    let updatedAllWishlist;

    if (isInWishlist) {
      updatedAllWishlist = existingWishlist.filter(
        (item) => !(item.id === id && item.category === category)
      );
      toast.info("Removed from wishlist");
    } else {
      updatedAllWishlist = [...existingWishlist, { id, category }];
      toast.success("Added to wishlist");
    }

    const updatedCurrentWishlist = updatedAllWishlist.filter(
      (item) => item.category === category
    );

    setWishlist(updatedCurrentWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedAllWishlist));
  };

  return (
    <div className="min-h-screen  bg-white font-poppins p-6">
      <h1 className="text-3xl font-bold text-black text-center mb-8">Grocery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groceryProducts.map((product) => {
          const isAdded = addedItems.includes(product.id);
          const isWishlisted = wishlist.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative  bg-richblack-900 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-2 left-2 text-xl z-10"
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-500" />
                )}
              </button>

              <div className="p-4">
                <h2 className="text-lg text-white font-bold">{product.name}</h2>
                <p className="text-white text-sm">{product.brand}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-semibold text-green-600">
                    ₹{product.price}
                  </span>
                  <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm">
                    {product.rating}★
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    disabled={isAdded}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold shadow-md tracking-wide transition-all
                      ${isAdded
                        ? "bg-green-500 text-white animate-pulse cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-700 to-purple-600 text-white hover:from-purple-800 hover:to-purple-700 hover:shadow-lg"
                      }`}
                  >
                    {isAdded ? "✔ Added" : "Add to Cart"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(product.id);
                    }}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroceryPage;
