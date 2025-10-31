import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // removes item if quantity is 0
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-6 bg-custom-color2 font-poppins">
      <h2 className="text-3xl font-bold text-white mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-400 rounded-lg p-4 shadow flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-purple-900 font-poppins font-bold">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => decreaseQty(item.id)}
                  disabled={item.quantity <= 1} // Disable if quantity is 1
                  className="px-3 py-1 bg-purple-900 text-white rounded hover:bg-purple-600 disabled:opacity-50"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-purple-900 text-white rounded hover:bg-purple-600"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gray-400 rounded-lg p-4 shadow text-right mt-6">
            <h3 className="text-xl font-poppins font-bold">
              Total: ₹{totalPrice.toLocaleString()}
            </h3>
            <Link to="/proceed">
            <button className="mt-3 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>

           
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
