// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import '../styles/index.css';   // <-- Ensure your CSS is loaded

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  return (
    <div className="p-6 min-h-screen gradient-bg">
      <Navigation />

      <h2 className="text-3xl font-bold gold-text mb-6 animate-pop">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-secondary">Your cart is empty.</p>
      ) : (
        <>
          {/* staggered fade-in list */}
          <ul className="space-y-4 animate-fade-in-stagger">
            {cart.map((item, idx) => (
              <li
                key={`${item.id}-${item.selectedSize}`}
                className="card p-4 rounded-lg flex items-center justify-between border-secondary border-opacity-20
                           shadow-md animate-pop"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-secondary">
                    Size: {item.selectedSize}
                  </p>
                  <p className="text-sm text-secondary">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    className="px-2 py-1 border rounded text-secondary hover:bg-secondary hover:text-bg-color transition"
                  >
                    –
                  </button>

                  <span className="w-6 text-center">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                    className="px-2 py-1 border rounded text-secondary hover:bg-secondary hover:text-bg-color transition"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.selectedSize)
                    }
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-2xl font-bold gold-text animate-pop">
              Total: ₹{getCartTotal()}
            </p>
            <button
              onClick={clearCart}
              className="mt-4 sm:mt-0 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition animate-pop"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}