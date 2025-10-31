import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [total, setTotal] = useState(0);
  const [message, setMessage]=useState("")
  const navigate = useNavigate();

  // Fetch cart items and total price
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handlePayment = () => {
    if (!paymentMethod) {
      setMessage("Please select a payment method.");
      return;
    }

    // After payment, proceed to the success page
    setMessage("Payment Successful!");
    localStorage.removeItem("cart");
    localStorage.removeItem("shippingAddress");
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-poppins">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
         {/* success message */}
        {message && (
          <p className="text-green-600 mt-4 text-center font-medium animate-pulse">
            {message}
          </p>
        )}
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        {/* Payment Methods */}
        <div className="space-y-4">
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit Card
          </label>

          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            PayPal
          </label>

          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            UPI
          </label>
        </div>

        {/* Total Price */}
        <div className="mt-6 flex justify-between">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-semibold text-green-600">
            ₹{total.toLocaleString()}
          </span>
        </div>

        {/* Payment Confirmation */}
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
