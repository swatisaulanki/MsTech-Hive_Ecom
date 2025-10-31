
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext"
import AuthFormWrapper from "../components/AuthFormWrapper";

const API_LOGIN = "https://mstech-hive-ecom.onrender.com/api/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth(); 
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email.trim() || !form.password) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.warn("Failed to parse response JSON:", err);
      }

      if (res.ok) {
        //  Canonical email and user object
        const userEmail =
          (data && (data.user?.email || data.email)) ||
          form.email.trim().toLowerCase();

        const userToStore = data?.user || { email: userEmail };
        const token = data?.token || null;

        //  Save to AuthContext (keeps Navbar in sync)
        setUser(userToStore);
        setToken(token);

        // Also persist (AuthContext already syncs this, but safe)
        localStorage.setItem("user", JSON.stringify(userToStore));
        if (token) localStorage.setItem("token", token);

        //  Determine if user is admin
        const serverIsAdmin =
          Boolean(data?.user?.isAdmin) ||
          String(data?.user?.role || "").toLowerCase() === "admin" ||
          String(data?.role || "").toLowerCase() === "admin";

        const adminEmailEnv = process.env.REACT_APP_ADMIN_EMAIL?.toLowerCase();
        const emailMatchesEnv = adminEmailEnv && userEmail.toLowerCase() === adminEmailEnv;

        if (serverIsAdmin || emailMatchesEnv) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        const msg =
          data?.message || data?.error || `Login failed (status ${res.status})`;
        setError(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormWrapper className="font-poppins">
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
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white py-2 rounded-md transition`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-indigo-600 hover:underline"
          type="button"
        >
          Register
        </button>
      </p>
    </AuthFormWrapper>
  );
};

export default Login;
