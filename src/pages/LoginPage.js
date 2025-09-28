// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Redirect back after login success
  const from = location.state?.from?.pathname || "/productlist";

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Admin Login
    if (email === "admin@example.com" && password === "admin123") {
      const adminData = {
        username: "Admin",
        email,
        isAdmin: true,
      };
      login(adminData);
      navigate("/admin-dashboard", { replace: true });
      return;
    }

    // ✅ Normal User Login (localStorage users)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      login({ ...foundUser, isAdmin: false });
      navigate(from, { replace: true });
    } else {
      alert("❌ Invalid credentials! \n(Tip: Admin = admin@example.com / admin123)");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-bg px-4">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold text-center gold-text mb-6">Login</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
          />

          {/* Password with Show/Hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--secondary)] hover:text-[var(--primary)]"
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center text-sm mt-3">
          <Link
            to="/forgot-password"
            className="text-[var(--primary)] hover:underline"
          >
            Forgot Password?
          </Link>
        </p>

        {/* Signup */}
        <p className="text-center text-sm text-[var(--secondary)] mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[var(--primary)] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}