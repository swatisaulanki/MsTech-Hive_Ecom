import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "https://mstech-hive-ecom.onrender.com";
const PLACEHOLDER = "https://via.placeholder.com/600x400?text=No+Image";

const normalizeItems = (rawArray) => {
  if (!Array.isArray(rawArray)) return [];
  return rawArray.map((item) => {
    const id = item._id || item.id || item.productId || null;

    let img =
      item.thumbnail ||
      item.image ||
      (Array.isArray(item.images) && item.images.length ? item.images[0] : null) ||
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
      price: item.price ?? item.cost ?? 0,
      image: img,
      rawItem: item,
    };
  });
};

const tryExtractArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.products)) return data.products;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

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
    const fetchJson = async (url, opts = {}) => {
      try {
        const res = await fetch(url, opts);
        const text = await res.text();
        try {
          return { ok: res.ok, status: res.status, json: JSON.parse(text) };
        } catch (parseErr) {
          console.warn("Non-JSON response from", url, text);
          return { ok: res.ok, status: res.status, json: null };
        }
      } catch (err) {
        console.error("Fetch error for", url, err);
        return { ok: false, status: 0, json: null };
      }
    };

    const fetchResults = async () => {
      setLoading(true);
      setResults([]);
      try {
        const searchTerm = (query || "").trim();
        console.log("Search term:", searchTerm);
        if (!searchTerm) {
          setResults([]);
          setLoading(false);
          return;
        }

        // 1) Try search endpoint with q=
        const urlQ = `${API_BASE}/api/products/search?q=${encodeURIComponent(searchTerm)}`;
        const r1 = await fetchJson(urlQ);
        console.log("Attempt 1 (q=) status:", r1.status, "body:", r1.json);
        let raw = tryExtractArray(r1.json);

        // 2) If empty, try search endpoint with query=
        if (!raw.length) {
          const urlQuery = `${API_BASE}/api/products/search?query=${encodeURIComponent(searchTerm)}`;
          const r2 = await fetchJson(urlQuery);
          console.log("Attempt 2 (query=) status:", r2.status, "body:", r2.json);
          raw = tryExtractArray(r2.json);
        }

        // 3) If still empty, fallback to fetching all products and filter client-side
        if (!raw.length) {
          const urlAll = `${API_BASE}/api/products`;
          const r3 = await fetchJson(urlAll);
          console.log("Attempt 3 (all products) status:", r3.status, "body (truncated):", Array.isArray(r3.json) ? `array(${r3.json.length})` : r3.json && r3.json.products ? `products(${r3.json.products.length})` : r3.json);
          const allRaw = tryExtractArray(r3.json);
          // filter locally by title/category containing the search term
          const filtered = (allRaw || []).filter((item) => {
            const title = (item.title || item.name || "").toString().toLowerCase();
            const category = (item.category || "").toString().toLowerCase();
            return title.includes(searchTerm.toLowerCase()) || category.includes(searchTerm.toLowerCase());
          });
          raw = filtered;
          console.log("Fallback client-side filtered length:", raw.length);
        }

        const formatted = normalizeItems(raw);
        setResults(formatted);
        console.log("Final mapped results length:", formatted.length);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, navigate]);

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const product = results.find((p) => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === id);
    if (exists) {
      cart = cart.map((item) => (item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item));
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
    if (!product) return;
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
                key={product.id || product.title}
                className="bg-richblack-800 rounded-2xl shadow-md hover:shadow-xl transition p-4 relative group"
              >
                <button onClick={() => toggleWishlist(product.id)} className="absolute top-2 right-2 text-xl z-10">
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />
                  )}
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER;
                  }}
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
                      isAdded ? "bg-green-500 text-white animate-pulse" : "bg-purple-800 text-white hover:bg-purple-600"
                    }`}
                  >
                    {isAdded ? "✔ Added" : "Add to Cart"}
                  </button>

                  <button onClick={() => handleBuyNow(product.id)} className="w-full py-2 text-sm rounded-md font-semibold bg-green-600 text-white hover:bg-green-500">
                    Buy Now
                  </button>

                  <button onClick={() => handleView(product.id)} className="w-full py-2 text-sm rounded-md font-semibold bg-indigo-600 text-white hover:bg-indigo-500">
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
