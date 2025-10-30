// src/context/WishlistContext.js
import React, { createContext, useContext, useState } from "react";

// Context create
const WishlistContext = createContext();

// ✅ Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Add to Wishlist
  const addToWishlist = (product) => {
    // agar pehle se nahi hai tabhi add karo
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  // Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Check if product is in wishlist
  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // ✅ return all functions + list
  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom Hook
export const useWishlist = () => useContext(WishlistContext);