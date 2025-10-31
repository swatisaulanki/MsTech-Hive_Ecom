import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Sample product data
const productData = {
  electronics: [
    { id: 1, name: "Smartphone", price: "$799", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Laptop", price: "$999", image: "https://via.placeholder.com/300" },
  ],
  clothing: [
    { id: 1, name: "T-shirt", price: "$25", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Jeans", price: "$45", image: "https://via.placeholder.com/300" },
  ],
  books: [
    { id: 1, name: "React for Beginners", price: "$30", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Advanced JavaScript", price: "$40", image: "https://via.placeholder.com/300" },
  ],
  beauty: [
    { id: 1, name: "Lipstick", price: "$10", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Perfume", price: "$50", image: "https://via.placeholder.com/300" },
  ],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products based on category
    const categoryProducts = productData[categoryName.toLowerCase()] || [];
    setProducts(categoryProducts);
  }, [categoryName]);

  return (
    <div className="container font-poppins bg-custom-color2 mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-center  text-white mb-8">{categoryName} Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
