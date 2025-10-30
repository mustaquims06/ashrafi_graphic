// src/context/ProductContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
const WishlistContext = createContext();

export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const isInCart = (id) => cart.some((item) => item.id === id);
  const getCartItemsCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToWishlist = (product) => setWishlist((prev) => [...prev, product]);
  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, isInCart, getCartItemsCount }}>
      <WishlistContext.Provider
        value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
      >
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};
