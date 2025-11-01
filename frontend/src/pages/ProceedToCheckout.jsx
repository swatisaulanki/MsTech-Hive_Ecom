
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProceedToCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const navigate = useNavigate();

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) ||
      JSON.parse(localStorage.getItem("cartItems")) ||
      [];

    setCartItems(storedCart);

    const totalPrice = storedCart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
      0
    );
    setTotal(totalPrice);
  }, []);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  //  Place order handler
  const handlePlaceOrder = async () => {
    const isEmptyField = Object.values(address).some(
      (val) => val.trim() === ""
    );
    if (isEmptyField) {
      setMessage("Please fill all fields before placing order.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first to place an order.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id || item.id,
          title: item.title || item.name,
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
          image: item.image,
        })),
        shippingAddress: address,
        totalPrice: Number(total),
      };

      const response = await fetch(
        "https://mstech-hive-ecom.onrender.com/api/orders/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(" Order placed successfully!");

        // Save total to use on Payment page
        localStorage.setItem("lastOrderTotal", total);

        // Clear cart after saving total
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems");

        setCartItems([]);
        setTimeout(() => navigate("/payment"), 1500);
      } else {
        setMessage(data.message || "❌ Failed to place order.");
      }
    } catch (error) {
      console.error("Order error:", error);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-poppins">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/*Shipping Address Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          {message && (
            <p className="text-center mb-4 font-medium text-green-600 animate-pulse">
              {message}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name" },
              { label: "Phone", name: "phone" },
              { label: "Street", name: "street" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Pincode", name: "pincode" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.label}
                value={address[field.name]}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        {/* Cart Summary Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title || item.name || "Untitled Product"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">
                    ₹{(Number(item.price) * Number(item.quantity)).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6 border-t pt-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-green-700">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProceedToCheckout;


