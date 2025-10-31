import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();
        const formatted = data.products.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price,
          image: item.thumbnail,
        }));
        setResults(formatted);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = results.find((p) => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === id);
    if (exists) {
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
    const product = results.find((p) => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleWishlist = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((itemId) => itemId !== id);
      toast.info("Removed from wishlist");
    } else {
      updated = [...wishlist, id];
      toast.success("Added to wishlist");
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-richblack-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Search Results for "<span className="text-yellow-400">{query}</span>"
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => {
            const isAdded = addedItems.includes(product.id);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-richblack-800 rounded-2xl shadow-md hover:shadow-xl transition p-4 relative group"
              >
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 text-xl z-10"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />
                  )}
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-3 group-hover:scale-105 transition"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm capitalize text-gray-400">{product.category}</p>
                <p className="text-yellow-400 font-bold text-lg">₹{product.price}</p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={isAdded}
                    className={`w-full py-2 text-sm rounded-md font-semibold transition ${
                      isAdded
                        ? "bg-green-500 text-white animate-pulse"
                        : "bg-purple-800 text-white hover:bg-purple-600"
                    }`}
                  >
                    {isAdded ? "✔ Added" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleBuyNow(product.id)}
                    className="w-full py-2 text-sm rounded-md font-semibold bg-green-600 text-white hover:bg-green-500"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => handleView(product.id)}
                    className="w-full py-2 text-sm rounded-md font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
};

export default SearchResults;
