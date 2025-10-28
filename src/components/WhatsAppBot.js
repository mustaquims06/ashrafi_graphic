// src/components/WhatsAppBot.js
import React, { useState } from "react";

const WhatsAppBot = () => {
  const [open, setOpen] = useState(false);

  //const phoneNumber = "918007869205"; // Replace with your WhatsApp number

  // Function to open WhatsApp with a predefined message

  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${918007869205}?text=${encodeURIComponent("Hi, I Visited Your Website")}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        {open ? (
          "✖"
        ) : (
          // ✅ Full WhatsApp Logo SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.52 3.48A11.913 11.913 0 0012 0C5.372 0 0 5.373 0 12c0 2.113.548 4.174 1.584 
              6L0 24l6.212-1.584A11.917 11.917 0 0012 24c6.627 0 12-5.373 
              12-12 0-3.19-1.243-6.188-3.48-8.52zM12 22a9.917 9.917 0 
              01-5.088-1.381l-.364-.218-3.682.938.983-3.593-.237-.383A9.94 
              9.94 0 012 12 10 10 0 1112 22zm5.005-7.584c-.287-.144-1.697-.84-1.96-.935-.263-.096-.455-.144-.646.144-.192.287-.74.935-.907 
              1.127-.167.192-.335.216-.622.072-.287-.144-1.213-.446-2.31-1.42-.854-.76-1.43-1.698-1.597-1.985-.167-.287-.018-.443.126-.587.13-.13.287-.335.43-.503.144-.167.192-.287.287-.478.095-.192.048-.36-.024-.503-.072-.144-.646-1.558-.885-2.137-.232-.557-.467-.48-.646-.49-.167-.008-.36-.01-.552-.01s-.503.072-.765.36c-.263.287-1.004.98-1.004 2.392s1.028 2.777 1.172 
              2.965c.144.192 2.026 3.086 4.91 4.324.686.296 1.22.474 1.637.606.687.219 1.31.188 1.805.114.55-.081 
              1.697-.691 1.938-1.359.239-.668.239-1.238.167-1.359-.071-.12-.263-.191-.55-.335z" />
          </svg>
        )}
      </button>

      {/* Bot Popup */}
      {open && (
        <div className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-64 animate-pop">
          <p className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
            👋 Hi, how can we help you?
          </p>
          <div className="space-y-2">
            <button
              onClick={() =>
                openWhatsApp("Hi! I'm interested in Graphic Design 🎨")
              }
              className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              🎨 Graphic Design
            </button>
            <button
              onClick={() =>
                openWhatsApp("Hi! I'm interested in Video Editing 🎬")
              }
              className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              🎬 Video Editing
            </button>
            <button
              onClick={() =>
                openWhatsApp("Hi! I'm interested in Music Distribution 🎵")
              }
              className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              🎵 Music Distribution
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppBot;