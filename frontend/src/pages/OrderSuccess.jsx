import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const OrderSuccess = () => {
  useEffect(() => {
    //  Play confetti animation once the page loads
    const confettiTimer = setTimeout(() => {
      //stops after a few seconds
    }, 5000);
    
    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <div className="min-h-screen bg-green-100 py-10 px-4 font-poppins relative">
      {/* Animation */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        {/* Title with animation */}
        <motion.h2
          className="text-2xl font-bold mb-4 text-green-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Order Placed Successfully! 🎉
        </motion.h2>

        {/* Congratulations message */}
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Congratulations! Your order is on its way. Thank you for your purchase.
        </motion.p>

        {/* Redirect to shop button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/" className="text-blue-600 underline font-semibold hover:text-blue-800">
            Go back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
