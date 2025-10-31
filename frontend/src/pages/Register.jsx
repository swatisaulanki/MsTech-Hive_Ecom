// src/pages/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../pages/context/AuthContext";
import AuthFormWrapper from "../components/AuthFormWrapper";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(form.name, form.email, form.password);
    if (success) {
      navigate("/login"); // Redirect to login after successful registration
    } else {
      setError("This email is already registered. Please login instead.");
    }
  };

  return (
    <AuthFormWrapper  className=" font-poppins">
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3   font-poppins">
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600 hover:underline">Login</a>
      </p>
    </AuthFormWrapper>
  );
};

export default Register;
