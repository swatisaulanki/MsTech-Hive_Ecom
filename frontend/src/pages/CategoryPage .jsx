import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const productData = {
  electronics: [
    { id: 1, name: "Smartphone", price: "$799", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Laptop", price: "$999", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80" },
  ],
  clothing: [
    { id: 1, name: "T-shirt", price: "$25", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Jeans", price: "$45", image: "https://images.unsplash.com/photo-1533077165203-83ad7d1da16d?auto=format&fit=crop&w=500&q=80" },
  ],
  books: [
    { id: 1, name: "React for Beginners", price: "$30", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Advanced JavaScript", price: "$40", image: "https://images.unsplash.com/photo-1581092334497-83a7b1a0b8b7?auto=format&fit=crop&w=500&q=80" },
  ],
  beauty: [
    { id: 1, name: "Lipstick", price: "$10", image: "https://images.unsplash.com/photo-1589987607627-8e7c2821e142?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Perfume", price: "$50", image: "https://images.unsplash.com/photo-1600180758890-6d9b71a7d9b6?auto=format&fit=crop&w=500&q=80" },
  ],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categoryProducts = productData[categoryName.toLowerCase()] || [];
    setProducts(categoryProducts);
  }, [categoryName]);

  return (
    <div className="relative font-poppins bg-gradient-to-br from-[#0f051d] via-[#1a0b2e] to-[#0a0613] min-h-screen py-24 px-6 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.15),transparent_60%)]"></div>

      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 drop-shadow-[0_0_25px_rgba(236,72,153,0.5)] mb-16"
      >
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-all duration-700 group"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-90 transition-all duration-500"></div>

              {/* Info Section */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white/10 backdrop-blur-lg rounded-xl py-5 px-4 text-center border border-white/20 group-hover:bg-white/20 transition-all duration-500">
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-pink-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-lg text-gray-200 group-hover:text-yellow-200 transition-colors duration-300">
                  {product.price}
                </p>
              </div>

              {/* Hover Glow Border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-pink-500/50 rounded-3xl transition-all duration-700"></div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-300 text-lg col-span-full">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
