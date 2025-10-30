import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Helper to calculate discounted price
  const calculateFinalPrice = (product) => {
    return product.offer
      ? Math.round(product.price - (product.price * parseFloat(product.offer)) / 100)
      : product.price;
  };

  // ➕ Add an item (or bump quantity if already in cart with same size)
  const addToCart = (product) => {
    const finalPrice = calculateFinalPrice(product);

    setCart((prev) => {
      const idx = prev.findIndex(
        (it) =>
          (it._id || it.id) === (product._id || product.id) &&
          it.selectedSize === product.selectedSize
      );

      if (idx > -1) {
        // already in cart → increase quantity
        const updated = [...prev];
        updated[idx].quantity += product.quantity ?? 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            finalPrice, // ✅ Store discounted price at the time of adding
            quantity: product.quantity ?? 1,
          },
        ];
      }
    });
  };

  // ❌ Remove ↓ – reduce quantity by 1 or remove item completely
  const removeFromCart = (id, selectedSize) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if ((item._id || item.id) === id && item.selectedSize === selectedSize) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // if quantity = 1 → don't push (remove it)
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  // ✏️ Update a product's quantity directly
  const updateQuantity = (id, selectedSize, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          (item._id || item.id) === id && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 💰 Calculate total price (always use finalPrice)
  const getCartTotal = () =>
    cart.reduce(
      (sum, item) => sum + ((item.finalPrice ?? item.price) * item.quantity),
      0
    );

  // 🧹 Empty entire cart
  const clearCart = () => setCart([]);

  // 🛒 Show total items count
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