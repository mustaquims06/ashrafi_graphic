import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([
    // e.g. { id, name, price, quantity, selectedSize }
  ]);

  // Add an item (or bump quantity if exists)
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (it) =>
          it.id === product.id && it.selectedSize === product.selectedSize
      );
      if (idx > -1) {
        // already in cart → update quantity
        const updated = [...prev];
        updated[idx].quantity += product.quantity ?? 1;
        return updated;
      } else {
        return [...prev, { ...product, quantity: product.quantity ?? 1 }];
      }
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (id, selectedSize, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => setCart([]);

  // ← New helper for nav badge
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