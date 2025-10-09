// src/pages/LoginPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        tokenId: credentialResponse.credential
      });

      const currentUser = res.data;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      login(currentUser);
      toast.success("Login successful with Google ✨");
      navigate(currentUser.isAdmin ? "/admin-dashboard" : from, { replace: true });
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed. Please try again.");
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/productlist";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Call backend login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Backend returns a user object with JWT + isAdmin
      const currentUser = res.data;

      // ✅ Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // ✅ Update global auth context
      login(currentUser);
// 🎉 Success notification
      toast.success("Login successful ✨");

      // ✅ Redirect to admin dashboard if admin, otherwise redirect to previous location
      navigate(currentUser.isAdmin ? "/admin-dashboard" : from, {
        replace: true,
      });
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      // ❌ Error notification
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-bg px-4">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold text-center gold-text mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
          />

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

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[var(--card-bg)] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error('Google login failed');
                }}
                useOneTap
                theme="outline"
                size="large"
                width="100%"
                text="signin_with"
                shape="rectangular"
              />
            </GoogleOAuthProvider>
          </div>
        </div>

        <p className="text-center text-sm mt-3">
          <Link to="/forgot-password" className="text-[var(--primary)] hover:underline">
            Forgot Password?
          </Link>
        </p>

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
