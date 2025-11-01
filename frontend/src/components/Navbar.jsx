
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { BsSearch, BsCart } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import mstech from "../assets/mstech-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const dropdownRef = useRef(null);

  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Update cart count
useEffect(() => {
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    setCartCount(totalCount);
  };

  // Run on mount
  updateCartCount();

  updateCartCount();

  window.addEventListener("storage", updateCartCount);

  const interval = setInterval(updateCartCount, 1000);

  // Cleanup
  return () => {
    window.removeEventListener("storage", updateCartCount);
    clearInterval(interval);
  };
}, [location.pathname]);



  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/categories", label: "Categories" },
    { path: "/offers", label: "Offers" },
    { path: "/blog", label: "Blog" },
    { path: "/orders", label: "Orders" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const handleProfileUpdate = () => {
    setShowDropdown(false);
    navigate("/profileupdate");
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-100 text-white px-6 md:px-10 py-6 shadow-md w-full h-[12vh] flex justify-between relative z-50 font-poppins">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={mstech} alt="mstech" className="h-48 md:h-48 object-contain" />
        </Link>

        {/* Search bar - Desktop */}
        <div className="hidden md:block flex-1 mx-6">
          <div className="relative max-w-lg w-full mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 pl-12 rounded-md text-black focus:outline-none"
            />
            <BsSearch
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-lg font-poppins">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-yellow-100 transition duration-200 ${
                isActive(link.path) ? "text-yellow-100 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* User dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="hover:text-yellow-100 transition duration-200 text-blue-300 bg-white rounded-md px-4 py-2"
              >
                Hi, {user.name || user.username || "User"}  <FontAwesomeIcon icon={faChevronDown} />

              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200">
                  <button
                    onClick={handleProfileUpdate}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Update
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hover:text-yellow-100 transition duration-200 text-blue-300 bg-white rounded-md px-4 py-2"
            >
              Login / Register
            </button>
          )}

          <Link to="/cart" className="hover:text-yellow-100 text-lg relative">
            <BsCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger - Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-[12vh] left-0 w-full bg-richblack-900 px-6 py-6 flex flex-col gap-4 text-sm z-50 shadow-md rounded-b-2xl transition-all duration-300">
          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 pl-10 rounded-full text-black focus:outline-none"
            />
            <BsSearch
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block hover:text-yellow-400 ${
                isActive(link.path) ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Profile Section */}
          {user ? (
            <>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleProfileUpdate();
                }}
                className="hover:text-yellow-400 text-left"
              >
                Profile Update
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="hover:text-yellow-400 text-left"
            >
              Login / Register
            </button>
          )}

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-400 text-lg flex items-center relative"
          >
            <div className="relative">
              <BsCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-5 bg-red-500 text-white text-[10px] px-2 rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
