import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Please enter your email address");
        return;
      }
      
      const baseUrl = process.env.REACT_APP_API_URL || "https://ashrafigraphic.com";
      await axios.post(`${baseUrl}/api/otp/send-otp`, { email });
      
      toast.success("OTP has been sent to your email 📩");
      toast.custom((t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>Please check your inbox and spam folder</p>
        </div>
      ), { duration: 5000 });
      
      setCooldown(30); // 30s cooldown
      setStep(2);
    } catch (err) {
      console.error("Send OTP error:", err);
      const errorMessage = err.response?.data?.error || "Failed to send OTP. Please try again.";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ashrafigraphic.com/api/otp/verify-otp", { email, otp });
      toast.success("OTP verified ✅");
      setResetToken(res.data.resetToken);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("https://ashrafigraphic.com/api/otp/send-otp", { email });
      toast.success("New OTP sent 🔄");
      setCooldown(30);
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Failed to resend OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ashrafigraphic.com/api/auth/reset-password", {
        email,
        newPassword,
        resetToken,
      });
      toast.success("Password reset successful 🎉 Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-bg px-4">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold gold-text text-center mb-6">Forgot Password</h2>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button type="submit" className="w-full bg-[var(--primary)] text-white py-2 rounded-lg">
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
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

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button type="submit" className="w-full bg-[var(--primary)] text-white py-2 rounded-lg">
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center text-sm text-[var(--secondary)] mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-[var(--primary)] hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
