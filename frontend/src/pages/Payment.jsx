

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = storedCart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
      0
    );

    //  Fallback if cart was cleared
    if (totalPrice === 0) {
      totalPrice = Number(localStorage.getItem("lastOrderTotal")) || 0;
    }

    setTotal(totalPrice);
  }, []);

  const handlePayment = () => {
    if (!paymentMethod) {
      setMessage("Please select a payment method.");
      return;
    }

    setMessage("Payment Successful!");
    localStorage.removeItem("lastOrderTotal");
    localStorage.removeItem("shippingAddress");

    setTimeout(() => navigate("/order"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-poppins">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {message && (
          <p className="text-green-600 mt-4 text-center font-medium animate-pulse">
            {message}
          </p>
        )}
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        <div className="space-y-4">
          {["Credit Card", "PayPal", "UPI"].map((method) => (
            <label key={method} className="block">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              {method}
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-semibold text-green-600">
            ₹{total.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;

