import React from "react";
import { Link } from "react-router-dom";
import mstech from "../assets/mstech-icon.png";

const AuthFormWrapper = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-gradient-to-r from-richblack-900 to-gray-900 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={mstech} alt="logo" className="h-16 md:h-32  md:w-44 " />
          <h2 className="text-2xl font-bold text-richblack-900 mt-2">{title}</h2>
        </div>
        {children}
        <p className="mt-4 text-center text-sm text-gray-600">
          Back to <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
