import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ✅ Update cart in localStorage
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Increase quantity
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  // ✅ Decrease quantity
  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  // ✅ Remove item
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // ✅ Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ Checkout Handler (calls /api/orders/add)
  const handleCheckout = async () => {
    const token = localStorage.getItem("token"); // user token

    if (!token) {
      setMessage("⚠️ Please login first to proceed.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("🛒 Your cart is empty!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://mstech-hive-ecom.onrender.com/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          totalAmount: totalPrice,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
        window.dispatchEvent(new Event("storage"));
        navigate("/proceed");
      } else {
        setMessage(data.message || "❌ Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setMessage("🚨 Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-700 text-white font-poppins">
      <h2 className="text-4xl font-bold mb-8 text-center">🛍️ Your Shopping Cart</h2>

      {message && (
        <div className="text-center mb-4 text-yellow-300 font-semibold animate-pulse">
          {message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-300">
          <p>Your cart is empty.</p>
          <Link
            to="/shop"
            className="inline-block mt-4 px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between hover:shadow-purple-900 transition"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-purple-400 font-medium">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => decreaseQty(item.id)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 disabled:opacity-40"
                >
                  -
                </button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-800"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 px-3 py-1 bg-red-600 rounded hover:bg-red-800"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gray-800 rounded-xl p-5 shadow-lg mt-6 text-right">
            <h3 className="text-2xl font-bold mb-3">
              Total:{" "}
              <span className="text-green-400">
                ₹{totalPrice.toLocaleString()}
              </span>
            </h3>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-800"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
