// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import "../styles/index.css";

const ProductList = () => {
  const { products: baseProducts, loading } = useProducts();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // ✅ Merge default products + admin uploaded products from localStorage
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setAllProducts([...(baseProducts || []), ...stored]);
  }, [baseProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold gold-text mb-6">Our Products</h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {allProducts.map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductList;