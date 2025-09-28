// src/pages/SignupPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Duplicate email check
    if (users.some((u) => u.email === email)) {
      alert("⚠️ Email already exists! Try logging in instead.");
      return;
    }

    // ✅ Basic phone number check (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    // Save new user
    users.push({ username, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Signup successful! Please login with your credentials.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-bg px-4">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold gold-text text-center mb-6 graphic-font">
          Signup
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Email"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Phone Number"
            required
          />

          {/* Password with show/hide button */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--secondary)] hover:text-[var(--primary)]"
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>

          {/* Signup Btn */}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Signup
          </button>
        </form>

        {/* Already registered? */}
        <p className="text-center text-sm text-[var(--secondary)] mt-4">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-[var(--primary)] ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}