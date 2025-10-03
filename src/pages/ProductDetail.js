import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import Navigation from "../components/Navigation";
import ProductImageGallery from "../components/ProductImageGallery";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        if (res.data) {
          setProduct(res.data);
          // Default size
          if (res.data.sizes?.length > 0) {
            setSelectedSize(res.data.sizes[0]);
          }
        }
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <p className="text-lg gold-text animate-pop">⚠️ Product not found...</p>
      </div>
    );
  }

  // calculate discounted final price
  const finalPrice = product.offer
    ? Math.round(product.price - (product.price * parseFloat(product.offer)) / 100)
    : Number(product.price).toFixed(2);

  const handleBuyNow = () => {
    addToCart({ ...product, size: selectedSize });
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
    toast.success(`✅ Added to cart (Size: ${selectedSize})`);
  };

  const handleWishlist = () => {
    addToWishlist(product);
    toast.success("❤️ Added to wishlist!");
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative card p-4 rounded animate-pop"
        >
          <ProductImageGallery
            images={product.images || []}
            productName={product.name}
          />
        </motion.div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 animate-pop"
        >
          <h1 className="text-3xl md:text-4xl font-bold gold-text">
            {product.name}
          </h1>

          {/* ✅ Price Section with discount */}
          <div className="mb-4">
            <p className="text-3xl font-bold text-[var(--primary)]">
              ₹{finalPrice}
            </p>

            {product.offer && (
              <div className="flex items-center space-x-3 mt-1">
                <span className="line-through text-gray-400 text-lg">
                  ₹{Number(product.price).toFixed(2)}
                </span>
                <span className="text-red-600 font-semibold">
                  🔥 {product.offer}% OFF
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm">
            SKU: {product.sku || "N/A"} &nbsp; | &nbsp; Brand:{" "}
            {product.brand || "N/A"}
          </p>

          {/* ✅ Dynamic Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border p-2 rounded w-full max-w-xs"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Selected size: <strong>{selectedSize}</strong>
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[var(--primary)] text-white py-3 rounded shadow hover:brightness-110 transition"
            >
              🛒 Order Now
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
              ❤️ Add to Wishlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}