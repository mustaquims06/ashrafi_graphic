// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../styles/index.css";

const ProductList = () => {
  const { products: baseProducts } = useProducts();
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setAllProducts([...(baseProducts || []), ...stored]);
  }, [baseProducts]);

  // ✅ Inline Product Card
  const ProductCard = ({ product }) => {
    const originalPrice = Number(product.originalPrice || product.price || 0);
    const salePrice = Number(product.salePrice || product.price || 0);
    const discount =
      originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : 0;

    const handleAddToCart = (e) => {
      e.preventDefault(); // prevent Link navigation on AddToCart button click
      addToCart({
        id: product.id,
        name: product.name,
        originalPrice,
        salePrice,
        price: salePrice,
        images: product.images,
      });
    };

    return (
      <div className="card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0].url || product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="mt-2">
            {originalPrice > salePrice && (
              <span className="line-through text-gray-400 mr-2">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-green-600 font-bold">
              ₹{salePrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="ml-2 text-red-500 text-sm">
                ({discount}% OFF)
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-[var(--primary)] text-white py-2 px-4 rounded hover:brightness-110 transition"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    );
  };

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
              {/* ✅ Wrap Card in Link */}
              <Link to={`/product/${p.id}`}>
                <ProductCard product={p} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductList;