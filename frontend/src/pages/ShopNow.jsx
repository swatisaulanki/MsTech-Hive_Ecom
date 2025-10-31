import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopNow = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        const formatted = data.products.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price,
          image: item.thumbnail,
        }));
        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = products.find((p) => p.id === id);
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
    const product = products.find((p) => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleWishlist = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    let updatedWishlist;
    if (wishlist.includes(id)) {
      updatedWishlist = wishlist.filter((itemId) => itemId !== id);
      toast.info("Removed from wishlist");
    } else {
      updatedWishlist = [...wishlist, id];
      toast.success("Added to wishlist");
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Filtering and Sorting logic
  let filtered =
    categoryFilter === "All"
      ? products
      : products.filter((p) => p.category === categoryFilter);
  if (sortOrder === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
  else if (sortOrder === "highToLow")
    filtered.sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const displayedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen font-poppins bg-custom-color2 px-4 sm:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Shop the Latest Trends
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Curated just for you — explore fashion, gadgets & more.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1  bg-richblack-900 border text-white border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold  text-white mb-4">Categories</h2>
          <div className="space-y-2 mb-4 text-white">
            {[
              "All",
              "smartphones",
              "laptops",
              "fragrances",
              "skincare",
              "groceries",
              "home-decoration",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  setCurrentPage(1);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                  categoryFilter === cat
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-indigo-900  text-white"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-white mb-2">Sort by Price</h2>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 rounded-lg  bg-slate-800"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </aside>

        {/* Products */}
        <section className="md:col-span-3">
          {loading ? (
            <div className="text-center text-gray-500 py-20 text-xl">
              Loading products...
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-20 text-xl">
              No products found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => {
                  const isAdded = addedItems.includes(product.id);
                  const isWishlisted = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className=" bg-richblack-900 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col relative group"
                    >
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 text-xl z-10"
                      >
                        {isWishlisted ? (
                          <FaHeart className="text-red-500 transition duration-300" />
                        ) : (
                          <FaRegHeart className="text-gray-400 hover:text-red-500 transition duration-300" />
                        )}
                      </button>

                      <img
                        src={product.image}
                        alt={product.title}
                        className="rounded-t-2xl w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold  text-white">
                            {product.title}
                          </h3>
                          
                          <p className="text-sm text-white capitalize">
                            {product.category}
                          </p>
                          <p className="text-sm text-white capitalize">
                            {product.price}
                          </p>

                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={isAdded}
                            className={`w-full py-2 text-sm rounded-md font-semibold transition duration-300 ${
                              isAdded
                                ? "bg-green-500 text-white animate-pulse cursor-not-allowed"
                                : "bg-purple-900 text-white hover:bg-purple-700"
                            }`}
                          >
                            {isAdded ? "✔ Added" : "Add to Cart"}
                          </button>

                          <button
                            onClick={() => handleBuyNow(product.id)}
                            className="w-full py-2 text-sm rounded-md font-semibold bg-green-600 text-white hover:bg-green-500 transition duration-300"
                          >
                            Buy Now
                          </button>

                          <button
                            onClick={() => handleViewProduct(product.id)}
                            className="w-full py-2 text-sm rounded-md font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition duration-300"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md border text-sm sm:text-base ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
};

export default ShopNow;
