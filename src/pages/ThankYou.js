// src/pages/ThankYou.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Confetti from "react-confetti";
import OrderTimeline from "../components/OrderTimeline";

const ThankYou = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [lastOrder, setLastOrder] = useState(null);

  // Confetti resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🧾 Get last order from localStorage
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length > 0) {
      setLastOrder(orders[orders.length - 1]);
    }
  }, []);

  // Auto redirect to Product List after 6s
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/productlist");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6 relative">
      {/* 🎉 Confetti Celebration */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.3}
      />

      {/* ✅ Order Placed */}
      <FaCheckCircle className="text-green-500 text-7xl mb-4 animate-bounce" />
      <h1 className="text-3xl font-extrabold gold-text mb-2">
        Thank You for Your Order! 🎊
      </h1>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto">
        Your order has been placed successfully.
      </p>

      {/* 🧾 Order Summary with Delivery Date */}
      {lastOrder && (
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md text-left p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 border-b pb-2">
            Order Confirmation
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Order ID:</strong> #{lastOrder.id}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Date:</strong> {lastOrder.date}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Total:</strong> ₹{lastOrder.total}
          </p>

          {/* ✅ NEW Delivery Date Info */}
          {lastOrder.expectedDelivery && (
            <p className="text-green-600 font-semibold mt-2">
              🚚 Delivery By: {lastOrder.expectedDelivery}
            </p>
          )}
          {/* ✅ Timeline here */}
    <OrderTimeline status={lastOrder.status} />
        </div>
      )}

      {/* Buttons */}
      <button
        onClick={() => navigate("/productlist")}
        className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg hover:brightness-110 shadow-lg transition"
      >
        Continue Shopping →
      </button>

      <p className="text-xs text-gray-400 mt-4">
        (Auto-redirecting in 6 seconds…)
      </p>
    </div>
  );
};

export default ThankYou;