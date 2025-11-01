
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Safe localStorage parse helper
  const safeParse = (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("Failed to parse localStorage key", key, e);
      return null;
    }
  };

  // Initialize state from localStorage (token + user)
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUserState] = useState(() => safeParse("user") || null);

  // Optional: simulated users list for local register/login (dev only)
  const [users, setUsers] = useState(() => safeParse("users") || []);

  // Wrap setUser to keep localStorage in sync
  const setUser = useCallback((newUser) => {
    try {
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }
    } catch (e) {
      console.warn("Error saving user to localStorage", e);
    }
    setUserState(newUser);
  }, []);

  // Wrap setToken to keep localStorage in sync
  const updateToken = useCallback((newToken) => {
    try {
      if (newToken) localStorage.setItem("token", newToken);
      else localStorage.removeItem("token");
    } catch (e) {
      console.warn("Error saving token to localStorage", e);
    }
    setToken(newToken);
  }, []);

  // Keep state in sync if another tab updates localStorage
  useEffect(() => {
    const handleStorage = (e) => {
      if (!e.key) {
        // e.key === null when clear() is called
        setUserState(safeParse("user"));
        setToken(localStorage.getItem("token") || null);
        return;
      }
      if (e.key === "user") {
        setUserState(e.newValue ? JSON.parse(e.newValue) : null);
      }
      if (e.key === "token") {
        setToken(e.newValue || null);
      }
      if (e.key === "users") {
        setUsers(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // check if email exists in simulated users list
  const checkIfEmailExists = (email) => {
    return users.some((u) => String(u.email).toLowerCase() === String(email).toLowerCase());
  };

  // register (simulated local registration)
  const register = (name, email, password) => {
    if (checkIfEmailExists(email)) return false;
    const newUser = { id: Date.now().toString(), name, email, password };
    const updated = [...users, newUser];
    setUsers(updated);
    try {
      localStorage.setItem("users", JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed saving users to localStorage", e);
    }
    // set as current user
    setUser(newUser);
    // no token in this dev flow
    updateToken(null);
    return true;
  };

  //  login (simulated local login)
  const login = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    setUser(found);
    updateToken(null); // no token in local simulation
    return true;
  };

  // Logout: clear token + user and navigate to login
  const logout = () => {
    updateToken(null);
    setUser(null);
    navigate("/login");
  };

  // Optionally, add method to update parts of user (e.g., avatar update)
  const updateUser = (patch) => {
    const newUser = { ...(user || {}), ...patch };
    setUser(newUser);
  };

  // Expose auth value
  const value = {
    user,
    setUser,     // call this after successful server login to update context immediately
    updateUser,
    token,
    setToken: updateToken,
    login,       // dev helper (you can remove in production)
    register,    // dev helper (you can remove in production)
    logout,
    checkIfEmailExists,
    users,       // list of local users (dev)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
