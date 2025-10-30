// src/pages/SignupPage.js
import axios from "axios";
import api from "../api/client";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function SignupPage() {
  const [step, setStep] = useState(1); // 1=signup form, 2=otp verify
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const navigate = useNavigate();
  const { login } = useAuth();

  // countdown for resend button
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Step 1: Request Signup (send OTP)
  const handleSignupRequest = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      toast.error("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      await api.post("/api/auth/signup-request", {
          username,
          email,
          phone,
          password,
          address,
        });

      toast.success("✅ OTP sent to your email. Please verify.");
      setCooldown(30); // 30s cooldown
      setStep(2);
    } catch (err) {
      console.error("Signup request error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "❌ Failed to send OTP.");
    }
  };

  // Step 2: Verify OTP and complete signup
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/signup-verify", { email, otp });

      const currentUser = res.data.user;

      // Save user in localStorage + AuthContext
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      login(currentUser);

      toast.success("🎉 Signup successful! You are now logged in.");
      navigate(currentUser.isAdmin ? "/admin-dashboard" : "/productlist", { replace: true });
    } catch (err) {
      console.error("OTP verify error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "❌ OTP verification failed.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      await api.post("/api/auth/signup-request", {
  username,
  email,
  phone,
  password,
  address,
});
      toast.success("📩 New OTP sent to your email!");
      setCooldown(30);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to resend OTP.");
    }
  };

  // Google Signup Handler
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const baseUrl = process.env.REACT_APP_API_URL || "https://ashrafigraphic.com";
      const res = await api.post("/api/auth/google", {
  tokenId: credentialResponse.credential
});

      const currentUser = res.data;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      login(currentUser);
      toast.success("Signup successful with Google ✨");
      navigate(currentUser.isAdmin ? "/admin-dashboard" : "/productlist", { replace: true });
    } catch (err) {
      console.error("Google signup error:", err);
      toast.error("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-bg px-4">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold gold-text text-center mb-6 graphic-font">
          Signup
        </h2>

        {/* Step 1: Signup Form */}
        {step === 1 && (
          <>
            <form onSubmit={handleSignupRequest} className="space-y-4">
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
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Address"
              />

              {/* Password */}
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

              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
              >
                Signup
              </button>

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
                  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || "1020607943747-kk8cmar0umbb22gu302vc1rmb60gh0a5.apps.googleusercontent.com"}>
                    <GoogleLogin
                      onSuccess={handleGoogleSignup}
                      onError={(error) => {
                        console.error("Google signup error:", error);
                        toast.error('Google signup failed. Please try again.');
                      }}
                      useOneTap
                      theme="outline"
                      size="large"
                      width="100%"
                      text="signup_with"
                      shape="rectangular"
                    />
                  </GoogleOAuthProvider>
                </div>
              </div>
            </form>
            </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Enter OTP"
              required
            />
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-[var(--primary)] text-white py-2 px-4 rounded-lg hover:opacity-90"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={cooldown > 0}
                className={`py-2 px-4 rounded-lg transition ${
                  cooldown > 0
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gray-500 hover:opacity-90 text-white"
                }`}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        )}

        {/* Already registered? */}
        <p className="text-center text-sm text-[var(--secondary)] mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-[var(--primary)] ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );

}