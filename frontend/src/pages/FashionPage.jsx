import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FashionPage = () => {
  const navigate = useNavigate();
  const category = "fashion";

  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    if (!stored) return [];
    const allItems = JSON.parse(stored);
    return allItems.filter((item) => item.category === category);
  });

  const fashionProducts = [
    {
      id: 101,
      name: "Men's Casual Shirt",
      image: "https://images.unsplash.com/photo-1600185366004-c9c1e6600f4d",
      price: 1499,
      brand: "H&M",
      rating: 4.2,
    },
    {
      id: 102,
      name: "Women's Denim Jacket",
      image: "https://images.unsplash.com/photo-1602810316683-55b66c08ba16",
      price: 2499,
      brand: "Zara",
      rating: 4.5,
    },
    {
      id: 103,
      name: "Men's Sneakers",
      image: "https://images.unsplash.com/photo-1618354691230-0cfa5eb1c1f3",
      price: 3499,
      brand: "Nike",
      rating: 4.7,
    },
    {
      id: 104,
      name: "Women's Maxi Dress",
      image: "https://images.unsplash.com/photo-1520975913608-5cc1f1983c40",
      price: 2999,
      brand: "Forever 21",
      rating: 4.4,
    },
    {
      id: 105,
      name: "Men's Trousers",
      image: "https://images.unsplash.com/photo-1589387021700-6f28f444b3a4",
      price: 1999,
      brand: "Levi's",
      rating: 4.3,
    },
    {
      id: 106,
      name: "Women's Handbag",
      image: "https://images.unsplash.com/photo-1589987601982-4bdb868ed5e9",
      price: 2199,
      brand: "Michael Kors",
      rating: 4.6,
    },
    {
      id: 107,
      name: "Men's Hoodie",
      image: "https://images.unsplash.com/photo-1624378441542-8b234e91d7f1",
      price: 1799,
      brand: "Adidas",
      rating: 4.1,
    },
    {
      id: 108,
      name: "Women's Sunglasses",
      image: "https://images.unsplash.com/photo-1600803907611-9c43fb29577e",
      price: 1599,
      brand: "Ray-Ban",
      rating: 4.5,
    },
    {
      id: 109,
      name: "Men's Watch",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
      price: 4999,
      brand: "Fossil",
      rating: 4.7,
    },
    {
      id: 110,
      name: "Women's Heels",
      image: "https://images.unsplash.com/photo-1588691841761-05d2c5b3e2a1",
      price: 2599,
      brand: "Catwalk",
      rating: 4.3,
    },
  ];

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = fashionProducts.find((p) => p.id === id);
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
    <div className="min-h-screen  bg-custom-color2 font-poppins p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Fashion</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fashionProducts.map((product) => {
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
                  <FaHeart className="text-red-500 transition duration-300" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-500 transition duration-300" />
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

export default FashionPage;