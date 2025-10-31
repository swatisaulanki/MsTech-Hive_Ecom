// src/pages/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const updateCart = (finalQuantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = finalQuantity;
    } else {
      cart.push({ ...product, quantity: finalQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    updateCart(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    updateCart(quantity);
    navigate("/cart");
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  if (!product)
    return (
      <div className="text-white text-center mt-10 font-semibold text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-custom-color2 flex justify-center items-center"> 
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-black py-16 px-4 text-white font-poppins">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-md rounded-xl shadow-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {product.title}
            </h2>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              {product.description}
            </p>
            <p className="text-purple-400 font-bold text-xl sm:text-2xl mb-6">
              ₹{product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-white">Quantity:</span>
              <button
                onClick={() => handleQuantityChange("dec")}
                className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-600"
              >
                -
              </button>
              <span className="text-white font-bold text-lg">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("inc")}
                className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-600"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full sm:w-auto px-6 py-2 font-semibold rounded-lg shadow-md transition-all
                ${
                  added
                    ? "bg-green-500 text-white animate-pulse cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-600 text-white"
                }`}
              >
                {added ? "✔ Added to Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
