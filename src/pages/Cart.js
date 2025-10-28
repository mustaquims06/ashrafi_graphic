import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Minus, Plus, Trash2 } from "lucide-react"; // icons

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error("⚠️ Please login first");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  // calculate grand total
  const total = cart.reduce(
    (sum, item) =>
      sum +
      ((item.finalPrice ??
        (item.offer
          ? Math.round(item.price - (item.price * parseFloat(item.offer)) / 100)
          : item.price)) *
        item.quantity),
    0
  );

  return (
    <div className="min-h-screen gradient-bg py-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full bg-white/80 dark:bg-[var(--card-bg)] backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-[var(--secondary)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold gold-text drop-shadow">🛒 Your Cart</h2>
          {cart.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                toast.success("🧹 Cart cleared!");
              }}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <Trash2 size={16}/> Clear
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty. 🛍</p>
        ) : (
          <>
            {/* Items */}
            <ul className="divide-y">
              {cart.map((item, idx) => {
                const finalPrice =
                  item.finalPrice ??
                  (item.offer
                    ? Math.round(item.price - (item.price * parseFloat(item.offer)) / 100)
                    : item.price);

                return (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-5 gap-4"
                  >
                    {/* Info */}
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600">
                        ₹{finalPrice} × {item.quantity} ={" "}
                        <span className="font-extrabold gold-text">
                          ₹{finalPrice * item.quantity}
                        </span>
                      </p>
                      {item.offer && (
                        <p className="text-xs text-red-500">
                          <span className="line-through">₹{item.price}</span> {item.offer}% OFF
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          removeFromCart(item._id || item.id, item.selectedSize)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      >
                        <Minus size={16}/>
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item._id || item.id,
                            item.selectedSize,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-14 text-center border rounded-lg p-1"
                      />

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id || item.id,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                      >
                        <Plus size={16}/>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Total & Checkout */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 bg-[var(--secondary)]/20 dark:bg-[var(--secondary)]/50 p-5 rounded-xl shadow-inner">
              <p className="text-2xl font-extrabold gold-text">
                Total: ₹{total.toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-4 sm:mt-0 bg-[var(--primary)] hover:brightness-110 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md transition"
              >
                Checkout →
              </button>
            </div>
          </>
        )}

        {/* Continue Shopping */}
        <div className="mt-6 text-center">
          <Link
            to="/productlist"
            className="text-[var(--primary)] hover:underline font-semibold"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;