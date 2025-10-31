import React, { useState } from "react";
import { useAuth } from "../pages/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthFormWrapper from "../components/AuthFormWrapper";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // New state for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email exists in localStorage (or your database)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // If no user exists, show an error message to register first
    if (!storedUser) {
      setError("You are not registered. Please register first.");
      return;
    }

    // If the user exists, proceed with login
    if (storedUser.email === form.email && storedUser.password === form.password) {
      const success = await login(form.email, form.password);
      if (success) navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <AuthFormWrapper className="font-poppins">
      {/* Display error message if any */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5 font-poppins">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <a href="/register" className="text-indigo-600 hover:underline">Register</a>
      </p>
    </AuthFormWrapper>
  );
};

export default Login;
