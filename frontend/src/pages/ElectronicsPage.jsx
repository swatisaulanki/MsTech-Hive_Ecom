import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ElectronicsPage = () => {
  const navigate = useNavigate();
  const category = "electronics";

  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    if (!stored) return [];
    const allItems = JSON.parse(stored);
    return allItems.filter((item) => item.category === category);
  });

  const electronicsProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S22 Ultra",
      image: "https://images.samsung.com/in/smartphones/galaxy-s22-ultra/images/galaxy-s22-ultra-highlights.jpg",
      price: 89999,
      brand: "Samsung",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      image: "https://m.media-amazon.com/images/I/61b7GxkE5GL._SX679_.jpg",
      price: 29999,
      brand: "Sony",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Apple MacBook Air M2",
      image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-gallery1-20220606",
      price: 114999,
      brand: "Apple",
      rating: 4.9,
    },
    {
      id: 4,
      name: "OnePlus Smart TV 43Y1",
      image: "https://image01.oneplus.net/ebp/202101/06/1-m00-1c-b1-rb8bwl-fsvcakipaaud4olyaavvjvnaaae360.jpg",
      price: 24999,
      brand: "OnePlus",
      rating: 4.3,
    },
  ];

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = electronicsProducts.find((p) => p.id === id);
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
      updatedAllWishlist = [
        ...existingWishlist,
        { id, category }
      ];
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
      <h1 className="text-3xl font-bold text-center text-white mb-8">Electronics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {electronicsProducts.map((product) => {
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
                <h2 className="text-lg  text-white font-bold">{product.name}</h2>
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

export default ElectronicsPage;
