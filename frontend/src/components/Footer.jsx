import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import mstech from "../assets/mstech-icon.png";

const Footer = () => {
  return (
    <footer className=" font-poppins  bg-custom-color3 text-white px-4 sm:px-10 md:px-20 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-richblack-600 pb-10">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-2 md:h-10 h-10">
            <img
              src={mstech}
              alt="mstech"
              className="h-44 md:h-40 sm:h-28  object-contain"
            />
          </div>
          <p className="text-md text-richblack-200 leading-6 py-2">
            Your one-stop shop for all things awesome. We bring you the best products at the best prices.
          </p>
          <div className="flex mt-4 gap-4 text-lg">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-md text-richblack-200">
            <li><Link to="/shop" className="hover:text-yellow-400">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-yellow-400">Categories</Link></li>
            <li><Link to="/offers" className="hover:text-yellow-400">Offers</Link></li>
            <li><Link to="/cart" className="hover:text-yellow-400">Cart</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-md text-richblack-200">
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-400">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
            <li><Link to="/account" className="hover:text-yellow-400">My Account</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-md text-richblack-200">
            <li><Link to="/faqpage" className="hover:text-yellow-400">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-yellow-400">Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 text-center text-md sm:text-sm text-richblack-300">
        &copy; {new Date().getFullYear()} MsTechHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
