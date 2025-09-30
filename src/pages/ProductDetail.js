// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navigation from "../components/Navigation";
import ProductImageGallery from "../components/ProductImageGallery";
import SizeSelector from "../components/SizeSelector";

import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/index.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const { products: baseProducts } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const combined = [...(baseProducts || []), ...stored];
    const found = combined.find((p) => String(p.id) === String(id));
    setProduct(found || null);
    if (found?.defaultSize) setSelectedSize(found.defaultSize);
  }, [id, baseProducts]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <p className="text-lg gold-text animate-pop">⚠️ Product not found...</p>
      </div>
    );
  }

  const isLoggedIn = () => localStorage.getItem("currentUser") !== null;

  const handleBuyNow = () => {
    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    addToCart({ ...product, size: selectedSize || "Default" });
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    addToCart({ ...product, size: selectedSize || "Default" });
    alert("✅ Added to cart!");
  };

  const handleWishlist = () => {
    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    addToWishlist(product);
    alert("❤️ Added to wishlist!");
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left - Image Gallery with Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative card p-4 rounded animate-pop"
        >
          {/* ✅ Badge */}
          {(product.offer || product.bestseller) && (
            <div className="absolute top-3 left-3 bg-[var(--primary)] text-white px-3 py-1 rounded-full shadow animate-pop text-sm font-bold tracking-wide">
              {product.offer ? `🔥 ${product.offer}` : "⭐ Bestseller"}
            </div>
          )}
          <ProductImageGallery
            images={product.images || []}
            productName={product.name}
            image={product.image}
            video={product.video}
          />
        </motion.div>

        {/* Right - Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 animate-pop"
        >
          <h1 className="text-4xl font-bold gold-text">{product.name}</h1>
          
          {product.description && (
            <p className="text-base text-[var(--text-color)]">{product.description}</p>
          )}
          
          <p className="text-3xl font-bold gold-text">₹{Number(product.price).toFixed(2)}</p>
          
          {product.sizes && product.sizes.length > 0 && (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[var(--primary)] text-white py-3 rounded shadow hover:brightness-110 transition"
            >
              🛒 Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-[var(--primary)] text-[var(--primary)] py-3 rounded hover:bg-[var(--primary)] hover:text-white transition"
            >
              ➕ Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded hover:bg-pink-500 hover:text-white transition"
            >
              ❤️ Wishlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}