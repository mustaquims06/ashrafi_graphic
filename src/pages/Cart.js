// src/pages/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Handle checkout
  const handleCheckout = () => {
    if (!currentUser) {
      alert("⚠️ Please login first");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-10 px-4">
      <div className="max-w-5xl mx-auto card rounded-lg shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold gold-text">🛒 Your Cart</h2>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              🗑 Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="divide-y">
              {cart.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4"
                >
                  {/* Left - Product Info */}
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      ₹{item.price} × {item.quantity} ={" "}
                      <span className="font-bold gold-text">
                        ₹{item.price * item.quantity}
                      </span>
                    </p>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-400">
                        Size: {item.selectedSize}
                      </p>
                    )}
                  </div>

                  {/* Right - Quantity Controls */}
                  <div className="flex items-center gap-2">
                    {/* ➖ Button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      ➖
                    </button>

                    {/* Input Box */}
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 text-center border rounded p-1"
                    />

                    {/* ➕ Button */}
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      ➕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total & Checkout */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-gray-50 dark:bg-[var(--secondary)] p-4 rounded shadow">
              <p className="text-xl font-bold gold-text">
                Total: ₹{getCartTotal().toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-3 sm:mt-0 bg-[var(--primary)] hover:brightness-110 text-white font-semibold px-6 py-2 rounded transition"
              >
                Checkout →
              </button>
            </div>
          </>
        )}

        {/* Continue shopping */}
        <div className="mt-6 text-center">
          <Link
            to="/productlist"
            className="text-[var(--primary)] hover:underline font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;