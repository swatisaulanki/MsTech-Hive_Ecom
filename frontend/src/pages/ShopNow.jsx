import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "https://mstech-hive-ecom.onrender.com";
const PLACEHOLDER = "https://via.placeholder.com/600x400?text=No+Image";

const ShopNow = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        console.log("Products API response:", data);

        const raw = Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : [];

        const formatted = raw.map((item) => {
          const id = item._id || item.id || item.productId || null;

          let img =
            item.thumbnail ||
            item.image ||
            (Array.isArray(item.images) && item.images.length && item.images[0]) ||
            (item.media && item.media[0] && item.media[0].url) ||
            null;

          if (img && typeof img === "string" && (img.startsWith("/") || img.startsWith("uploads"))) {
            if (!img.startsWith("/")) img = "/" + img;
            img = API_BASE + img;
          }

          if (!img) img = PLACEHOLDER;

          return {
            id,
            title: item.title || item.name || "Untitled",
            category: item.category || item.categories || "General",
            price: Number(item.price ?? item.cost ?? 0),
            image: img,
            rawItem: item,
          };
        });

        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // derive unique categories from loaded products
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => (p.category || "General").toString()));
    return ["All", ...Array.from(set)];
  }, [products]);

  // cart / wishlist handlers
  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = products.find((p) => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      cart = cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
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
    if (!product) return;
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

  // apply filters
  let displayed = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" ? true : String(p.category).toLowerCase() === String(selectedCategory).toLowerCase();
    const matchesMin = minPrice !== "" ? p.price >= Number(minPrice) : true;
    const matchesMax = maxPrice !== "" ? p.price <= Number(maxPrice) : true;
    return matchesCategory && matchesMin && matchesMax;
  });

  // apply sorting (non-mutating)
  if (sortOrder === "lowToHigh") displayed = [...displayed].sort((a, b) => a.price - b.price);
  else if (sortOrder === "highToLow") displayed = [...displayed].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen font-poppins bg-custom-color2 px-4 sm:px-8 py-8">
      <section className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Shop the Latest Trends
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">Use filters below to refine results.</p>
      </section>

           {/* Filters + Sorting */}
      <div className="max-w-7xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="text-sm text-gray-300 block mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <div className="w-full md:w-auto">
            <label className="text-sm text-gray-300 block mb-1">Sort</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white"
              aria-label="Sort products"
            >
              <option value="default">Default</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center text-gray-500 py-20 text-xl">Loading products...</div>
        ) : displayed.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">No products match the filters.</div>
        ) : (
          displayed.map((product, idx) => {
            const isAdded = addedItems.includes(product.id);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id || `${product.title}-${idx}`}
                className="bg-richblack-900 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col relative group"
              >
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 text-xl z-10"
                  aria-label="toggle wishlist"
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
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER;
                  }}
                  className="rounded-t-2xl w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                    <p className="text-sm text-white">{product.category}</p>
                    <p className="text-sm text-white font-bold">₹{product.price}</p>
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
          })
        )}
      </div>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
};

export default ShopNow;
