// src/pages/ProductList.jsx
import React from "react";
import { useProducts } from "../hooks/useProducts.js";
import ProductCard from "../components/ProductCard.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import Navigation from "../components/Navigation.js";
import { motion } from "framer-motion";
import "../styles/index.css";   // <-- ensure your CSS vars & tailwind utilities are loaded

const ProductList = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navbar */}
      <Navigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gold-text mb-2">
            Our Collection
          </h1>
          <p className="text-[var(--secondary)]">
            Discover our carefully curated collection of premium Islamic caps.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="card bg-[var(--card-bg)] border border-[var(--primary)] border-opacity-20
                         rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:  { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductList;