// src/pages/ForgotPasswordPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // Step 1 = enter email, Step 2 = reset password
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleCheckEmail = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("❌ No account found with this email!");
      return;
    }

    // ✅ Email matched → go to next step
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      alert("❌ User data lost, please try again");
      setStep(1);
      return;
    }

    // ✅ Update password
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Password reset successful! Now login with your new password.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-bg px-4">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 w-full max-w-md border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold gold-text text-center mb-6">
          Forgot Password
        </h2>

        {/* Step 1: Check Email */}
        {step === 1 && (
          <form onSubmit={handleCheckEmail} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Verify Email
            </button>
          </form>
        )}

        {/* Step 2: Reset Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-center text-sm text-[var(--secondary)] mb-2">
              ✅ Email verified: <span className="font-medium">{email}</span>
            </p>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* Back to Login Link */}
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