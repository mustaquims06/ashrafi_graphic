// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Navigation from "../components/Navigation";
import ProductImageGallery from "../components/ProductImageGallery";
import SizeSelector from "../components/SizeSelector";
import ProductCard from "../components/ProductCard";

import {
  useProduct,
  useReviews,
  useUserPurchases,
} from "../hooks/useProducts";
import "../styles/index.css";  // ensure your theme CSS is loaded

export default function ProductDetail() {
  const { id } = useParams();
  const { product } = useProduct(id);
  const { reviews } = useReviews(id);
  const { purchases } = useUserPurchases(1, id);

  const [selectedSize, setSelectedSize] = useState(
    product?.defaultSize || null
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <p className="text-[var(--secondary)]">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <Navigation />

      {/* Product Detail */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold gold-text">
            {product.name}
          </h1>
          <p className="text-[var(--secondary)]">
            {product.description}
          </p>

          <div className="text-3xl font-bold gold-text">
            {product.currencySymbol}
            {product.price.toFixed(2)}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 font-bold">★</span>
            <span className="text-[var(--secondary)]">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[var(--primary)] text-[var(--bg-color)]
                         px-4 py-3 rounded-lg font-medium transition"
            >
              Order Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 border border-[var(--primary)] text-[var(--primary)]
                         px-4 py-3 rounded-lg font-medium hover:bg-[var(--primary)]
                         hover:text-[var(--bg-color)] transition"
            >
              Add to Cart
            </motion.button>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold gold-text mb-4">
                Reviews
              </h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="card p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-[var(--text-color)]">
                        {r.user}
                      </span>
                      <span className="text-yellow-400">
                        ★ {r.rating}
                      </span>
                    </div>
                    <p className="text-[var(--secondary)]">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Purchase Info */}
          {purchases.length > 0 && (
            <div className="mt-6 text-green-600 font-medium">
              You purchased this item{" "}
              {purchases.reduce((sum, p) => sum + p.quantity, 0)} times
            </div>
          )}
        </motion.div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold gold-text mb-4">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Using same card + pop-in animation */}
          {Array(3)
            .fill(product)
            .map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="card border-[var(--primary)] border-opacity-20 shadow-md rounded-lg overflow-hidden"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}