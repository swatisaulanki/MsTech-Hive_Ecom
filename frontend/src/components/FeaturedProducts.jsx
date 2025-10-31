// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
// import { toast } from "react-toastify"; // Add toast for notifications

// export default function FeaturedProducts() {
//   const [products, setProducts] = useState([]);
//   const [addedItems, setAddedItems] = useState([]);
//   const [wishlist, setWishlist] = useState(() => {
//     const storedWishlist = localStorage.getItem("wishlist");
//     return storedWishlist ? JSON.parse(storedWishlist) : [];
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch("https://mstech-hive-ecom.onrender.com/api/products");
//         const data = await res.json();
//         const featured = data.products.map((item) => ({
//           id: item.id,
//           title: item.title,
//           category: item.category,
//           description: item.description,
//           price: item.price,
//           image: item.thumbnail,
//         }));
//         setProducts(featured);
//       } catch (err) {
//         console.error("Error fetching featured products:", err);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   const handleAddToCart = (id) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     const product = products.find((p) => p.id === id);
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existing = cart.find((item) => item.id === id);
//     if (existing) {
//       cart = cart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     setAddedItems((prev) => [...prev, id]);

//     setTimeout(() => {
//       setAddedItems((prev) => prev.filter((itemId) => itemId !== id));
//     }, 2000);
//   };

//   const handleBuyNow = (id) => {
//     handleAddToCart(id);
//     navigate("/cart");
//   };

//   const toggleWishlist = (id) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     let updatedWishlist;
//     if (wishlist.includes(id)) {
//       updatedWishlist = wishlist.filter((itemId) => itemId !== id);
//       toast.info("Removed from wishlist"); // Toast when removed
//     } else {
//       updatedWishlist = [...wishlist, id];
//       toast.success("Added to wishlist"); // Toast when added
//     }

//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   return (
//     <section className="py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-900  bg-slate-400 font-poppins text-white">
//       <h2 className="text-2xl md:text-4xl font-bold text-center mb-14 tracking-wide">
//         Featured Products
//       </h2>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Custom arrows */}
//         <div className="swiper-button-prev-custom absolute left-[-20px] sm:left-[-30px] top-1/2 z-10 transform -translate-y-1/2 text-purple-300 hover:text-white text-2xl sm:text-3xl cursor-pointer">
//           <FaChevronLeft />
//         </div>
//         <div className="swiper-button-next-custom absolute right-[-20px] sm:right-[-30px] top-1/2 z-10 transform -translate-y-1/2 text-purple-300 hover:text-white text-2xl sm:text-3xl cursor-pointer">
//           <FaChevronRight />
//         </div>

//         {/* Hide Swiper pagination dots */}
//         <style>
//           {`
//             .swiper-pagination {
//               display: none !important;
//             }
//           `}
//         </style>

//         <Swiper
//           modules={[Navigation]}
//           navigation={{
//             nextEl: ".swiper-button-next-custom",
//             prevEl: ".swiper-button-prev-custom",
//           }}
//           spaceBetween={20}
//           slidesPerView={1}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {products.map((product) => {
//             const isAdded = addedItems.includes(product.id);
//             const isWishlisted = wishlist.includes(product.id);

//             return (
//               <SwiperSlide key={product.id}>
//                 <div className="   bg-slate-700 backdrop-blur-md rounded-xl shadow-lg p-5 h-full flex flex-col justify-between border border-white/10 hover:shadow-purple-600/30 transition duration-300 group">
//                   <div className="relative">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-full h-48 sm:h-52 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <span className="absolute top-2 right-2 bg-purple-800 text-xs text-white px-3 py-1 rounded-full font-semibold uppercase tracking-wide shadow-md">
//                       {product.category}
//                     </span>

//                     {/* Wishlist Icon (left side) */}
//                     <button
//                       onClick={() => toggleWishlist(product.id)}
//                       className="absolute top-2 left-2 text-xl z-10"
//                     >
//                       {isWishlisted ? (
//                         <FaHeart className="text-red-500 transition duration-300" />
//                       ) : (
//                         <FaRegHeart className="text-gray-400 hover:text-red-500 transition duration-300" />
//                       )}
//                     </button>
//                   </div>

//                   <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">
//                     {product.title}
//                   </h3>
//                   <p className="text-sm text-gray-300 mt-1 mb-2 line-clamp-2">
//                     {product.description}
//                   </p>
//                   <p className="font-bold text-purple-400 text-base sm:text-lg mb-3">
//                     ₹{product.price}
//                   </p>

//                   {/* Buttons */}
//                   <div className="flex flex-col sm:flex-row gap-3 mt-auto">
//                     {/* Add to Cart */}
//                     <button
//                       onClick={() => handleAddToCart(product.id)}
//                       disabled={isAdded}
//                       className={`flex-1 py-2 px-4 rounded-lg font-semibold shadow-md tracking-wide transition-all
//                         ${isAdded
//                           ? "bg-green-500 text-white animate-pulse cursor-not-allowed"
//                           : "bg-gradient-to-r from-purple-700 to-purple-600 text-white hover:from-purple-800 hover:to-purple-700 hover:shadow-lg"
//                         }`}
//                     >
//                       {isAdded ? "✔ Added" : "Add to Cart"}
//                     </button>

//                     {/* Buy Now */}
//                     <button
//                       onClick={() => handleBuyNow(product.id)}
//                       className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
//                     >
//                       Buy Now
//                     </button>
//                   </div>

//                   {/* View Details */}
//                   <button
//                     onClick={() => navigate(`/product/${product.id}`)}
//                     className="mt-3 w-full py-2 px-4 rounded-lg bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white transition font-semibold"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>

//       <div className="mt-14 text-center">
//         <button
//           className="bg-purple-700 hover:bg-purple-600 text-white py-3 px-8 font-bold text-lg rounded-lg shadow-md hover:shadow-lg transition duration-300"
//           onClick={() => navigate("/shop")}
//         >
//           Explore All Products →
//         </button>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("https://mstech-hive-ecom.onrender.com/api/products");
        const data = await res.json();
        console.log("Products API response:", data); // <-- inspect API shape here

        // Robust mapping: support _id / id and various image fields
        const featured = (data.products || data || []).map((item) => ({
          id: item._id || item.id || item.productId, // try multiple id fields
          title: item.title || item.name || "Untitled",
          category: item.category || item.categories || "General",
          description: item.description || item.shortDescription || "",
          price: item.price || item.cost || 0,
          // try thumbnail, image, first image in images array, or fallback placeholder
          image:
            item.thumbnail ||
            item.image ||
            (Array.isArray(item.images) && item.images.length ? item.images[0] : null) ||
            "https://via.placeholder.com/400x300?text=No+Image",
        }));

        setProducts(featured);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchFeaturedProducts();
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
    handleAddToCart(id);
    navigate("/cart");
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

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-900  bg-slate-400 font-poppins text-white">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-14 tracking-wide">
        Featured Products
      </h2>

      <div className="relative max-w-7xl mx-auto">
        <div className="swiper-button-prev-custom absolute left-[-20px] sm:left-[-30px] top-1/2 z-10 transform -translate-y-1/2 text-purple-300 hover:text-white text-2xl sm:text-3xl cursor-pointer">
          <FaChevronLeft />
        </div>
        <div className="swiper-button-next-custom absolute right-[-20px] sm:right-[-30px] top-1/2 z-10 transform -translate-y-1/2 text-purple-300 hover:text-white text-2xl sm:text-3xl cursor-pointer">
          <FaChevronRight />
        </div>

        <style>
          {`
            .swiper-pagination {
              display: none !important;
            }
          `}
        </style>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => {
            const isAdded = addedItems.includes(product.id);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <SwiperSlide key={product.id || Math.random()}>
                <div className="bg-slate-700 backdrop-blur-md rounded-xl shadow-lg p-5 h-full flex flex-col justify-between border border-white/10 hover:shadow-purple-600/30 transition duration-300 group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                      className="w-full h-48 sm:h-52 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-purple-800 text-xs text-white px-3 py-1 rounded-full font-semibold uppercase tracking-wide shadow-md">
                      {product.category}
                    </span>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 left-2 text-xl z-10"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-500 transition duration-300" />
                      ) : (
                        <FaRegHeart className="text-gray-400 hover:text-red-500 transition duration-300" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="font-bold text-purple-400 text-base sm:text-lg mb-3">
                    ₹{product.price}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button
                      onClick={() => handleAddToCart(product.id)}
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
                      onClick={() => handleBuyNow(product.id)}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
                    >
                      Buy Now
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="mt-3 w-full py-2 px-4 rounded-lg bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white transition font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="mt-14 text-center">
        <button
          className="bg-purple-700 hover:bg-purple-600 text-white py-3 px-8 font-bold text-lg rounded-lg shadow-md hover:shadow-lg transition duration-300"
          onClick={() => navigate("/shop")}
        >
          Explore All Products →
        </button>
      </div>
    </section>
  );
}
