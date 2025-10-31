// // src/pages/Register.jsx
// import React, { useState } from "react";
// import { useAuth } from "../pages/context/AuthContext";
// import AuthFormWrapper from "../components/AuthFormWrapper";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await register(form.name, form.email, form.password);
//     if (success) {
//       navigate("/login"); // Redirect to login after successful registration
//     } else {
//       setError("This email is already registered. Please login instead.");
//     }
//   };

//   return (
//     <AuthFormWrapper  className=" font-poppins">
//       {error && <div className="text-red-600 text-center mb-4">{error}</div>}
//       <form onSubmit={handleSubmit} className="space-y-3   font-poppins">
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full border border-gray-300 rounded-md px-4 py-2"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border border-gray-300 rounded-md px-4 py-2"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border border-gray-300 rounded-md px-4 py-2"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//         >
//           Register
//         </button>
//       </form>
//       <p className="text-sm text-center mt-4">
//         Already have an account?{" "}
//         <a href="/login" className="text-indigo-600 hover:underline">Login</a>
//       </p>
//     </AuthFormWrapper>
//   );
// };

// export default Register;


// src/pages/Register.jsx
import React, { useState } from "react";
import AuthFormWrapper from "../components/AuthFormWrapper";
import { useNavigate } from "react-router-dom";

const API_REGISTER = "https://mstech-hive-ecom.onrender.com/api/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      // try to read JSON response (some servers include helpful messages)
      let data = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        // ignore JSON parse errors
      }

      if (res.ok) {
        // registration successful
        // if server returned a message, you could show a toast here
        // navigate to login
        navigate("/login");
      } else {
        // handle known cases (e.g., 409 conflict) or show message from server
        if (res.status === 409) {
          setError(data?.message || "This email is already registered. Please login instead.");
        } else if (res.status === 400) {
          setError(data?.message || "Invalid input. Please check your details.");
        } else {
          setError(data?.message || `Registration failed (status ${res.status}). Try again.`);
        }
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormWrapper className="font-poppins">
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3 font-poppins">
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          disabled={loading}
        />
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
          className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-2 rounded-md transition`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-indigo-600 hover:underline"
          type="button"
        >
          Login
        </button>
      </p>
    </AuthFormWrapper>
  );
};

export default Register;
