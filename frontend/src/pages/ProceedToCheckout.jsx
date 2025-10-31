import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProceedToCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const totalPrice = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    const isEmptyField = Object.values(address).some((val) => val.trim() === "");
    if (isEmptyField) {
      alert("Please fill all fields.");
      return;
    }

    localStorage.setItem("shippingAddress", JSON.stringify(address));
    navigate("/payment"); // Redirect to payment page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-poppins">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Address Form */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
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
                className="p-3 border border-gray-300 rounded-md w-full"
              />
            ))}
          </div>
          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-3">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-bold">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-green-600">
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
