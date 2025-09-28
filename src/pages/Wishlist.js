// src/pages/Wishlist.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPrimaryImage } from '../data/mockData';
import '../styles/index.css'; // ensure your CSS vars & tailwind are loaded

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const p = { ...product, selectedSize: product.defaultSize };
    addToCart(p);
    alert(`Added "${p.name}" to cart (size ${p.selectedSize})!`);
  };

  const handleMoveToCart = (product) => {
    const p = { ...product, selectedSize: product.defaultSize };
    addToCart(p);
    removeFromWishlist(product.id);
  };

  // Empty state
  if (!wishlist.length) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />

        <div className="max-w-3xl mx-auto py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="mx-auto mb-6 text-[var(--secondary)]" size={80} />
            <h2 className="text-3xl font-bold gold-text mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-[var(--secondary)] mb-6">
              Save your favorite products here!
            </p>
            <Link
              to="/ProductList"
              className="inline-flex items-center bg-[var(--primary)] text-[var(--bg-color)]
                         px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Populated state
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold gold-text mb-4 sm:mb-0">
            My Wishlist
          </h1>
          <div className="space-x-4">
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 font-medium transition"
            >
              Clear Wishlist
            </button>
            <Link
              to="/"
              className="inline-flex items-center text-[var(--secondary)] hover:text-[var(--text-color)] transition"
            >
              <ArrowLeft className="mr-1" size={18} />
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        {/* Grid of cards with stagger */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              className="card bg-[var(--card-bg)] border border-[var(--primary)] border-opacity-20
                         rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link to={`/product/${product.id}`} className="block">
                {/* Image + remove btn */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={getPrimaryImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full
                               hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[var(--secondary)] mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <span className="text-2xl font-bold text-[var(--text-color)]">
                      {product.currencySymbol}
                      {product.price.toFixed(2)}
                    </span>

                    {/* Buttons */}
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleMoveToCart(product);
                        }}
                        className="w-full flex items-center justify-center space-x-2
                                   bg-[var(--primary)] text-[var(--bg-color)] px-4 py-2 rounded-lg
                                   hover:opacity-90 transition"
                      >
                        <ShoppingCart size={16} />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="w-full border border-[var(--primary)] text-[var(--primary)]
                                   px-4 py-2 rounded-lg hover:bg-[var(--primary)] hover:text-[var(--bg-color)]
                                   transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}