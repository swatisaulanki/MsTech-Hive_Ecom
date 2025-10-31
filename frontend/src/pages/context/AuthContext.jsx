// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Holds current user data
  const [users, setUsers] = useState([]);  // Simulate a list of registered users (this can be replaced with real database interaction)
  const navigate = useNavigate();

  // Check if user is logged in when the app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // Simulate fetching existing users (this would come from your backend in a real app)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Function to check if an email already exists
  const checkIfEmailExists = (email) => {
    // Check if the email exists in the users array
    return users.some((user) => user.email === email);
  };

  // Login function
  const login = (email, password) => {
    // Find the user by email
    const foundUser = users.find((user) => user.email === email);
    
    // If the user exists and password matches
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    } else {
      return false; // Invalid email or password
    }
  };

  // Register function
  const register = (name, email, password) => {
    if (checkIfEmailExists(email)) {
      return false; // Email already exists, return false
    }

    // This would be where you handle registration logic with your backend
    const newUser = { name, email, password };  // Save the password as well for login validation
    setUsers([...users, newUser]);  // Update users list
    localStorage.setItem("users", JSON.stringify([...users, newUser]));  // Save users in localStorage
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, checkIfEmailExists }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in any component
export const useAuth = () => {
  return useContext(AuthContext);
};
