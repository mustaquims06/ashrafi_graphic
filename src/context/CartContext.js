// src/context/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ Add item OR merge into existing if same id + size
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (it) => it.id === product.id && it.selectedSize === product.selectedSize
      );

      if (idx > -1) {
        // 🔥 product already exists → merge quantity
        const updated = [...prev];
        updated[idx].quantity += product.quantity ?? 1;
        return updated;
      } else {
        // 🆕 new product
        return [...prev, { ...product, quantity: product.quantity ?? 1 }];
      }
    });
  };

  // ❌ Remove 1 quantity, or drop entirely if 1 left
  const removeFromCart = (id, selectedSize) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id && item.selectedSize === selectedSize) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 }); // decrease qty
          }
        } else {
          acc.push(item); // untouched items
        }
        return acc;
      }, [])
    );
  };

  // ✏️ Update quantity from input box
  const updateQuantity = (id, selectedSize, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.max(1, quantity) } // stop zero/negative
            : item
        )
        .filter((item) => item.quantity > 0) // cleanup zero qty
    );
  };

  // 💰 Total price
  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🧹 Empty cart
  const clearCart = () => setCart([]);

  // 🔢 Total items count (useful for nav badge)
  const getCartItemsCount = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);