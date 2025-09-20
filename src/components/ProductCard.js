// src/components/ProductCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getPrimaryImage } from '../data/mockData';
import '../styles/index.css'; // ensure your custom CSS vars are loaded

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleOrderNow = (e) => {
    e.preventDefault(); e.stopPropagation();
    addToCart({ ...product, selectedSize: product.defaultSize });
    navigate('/cart');
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); e.stopPropagation();
    addToCart({ ...product, selectedSize: product.defaultSize });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault(); e.stopPropagation();
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  const imgUrl = getPrimaryImage(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-[var(--card-bg)]
                 border border-[var(--primary)] border-opacity-20
                 rounded-xl shadow-md overflow-hidden
                 hover:shadow-lg transition-all duration-300 relative"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity
                      duration-300 pointer-events-none z-10" />

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden relative">
          <motion.img
            src={imgUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />

          {/* Wishlist toggle */}
          <motion.button
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm z-20 transition-all duration-300
                        ${isInWishlist(product.id)
                          ? 'bg-red-600 text-white shadow-lg'
                          : 'bg-[var(--bg-color)] text-[var(--secondary)] hover:text-red-600 hover:bg-[var(--card-bg)] shadow-md'}`}
          >
            <Heart className="h-4 w-4" />
          </motion.button>

          {/* Quick View badge */}
          <div className="absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold
                          bg-[var(--primary)] text-[var(--bg-color)]
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Quick View
          </div>

          {/* Stock badge */}
          <div className="absolute bottom-4 left-4 px-2 py-1 rounded-full text-xs font-medium
                          bg-green-500 text-white">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>

        <div className="p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2
                         line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-[var(--secondary)] mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="flex items-center mb-4">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-[var(--secondary)]">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          <div className="mt-auto space-y-4">
            <div className="text-2xl font-bold text-[var(--text-color)]">
              {product.currencySymbol}{product.price.toFixed(2)}
            </div>

            <div className="flex space-x-2">
              <motion.button
                onClick={handleOrderNow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[var(--primary)] text-[var(--bg-color)]
                           px-3 py-2.5 rounded-lg text-sm font-medium
                           hover:opacity-90 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Order Now</span>
              </motion.button>
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                  quantityInCart > 0
                    ? 'bg-green-100 border border-green-300 text-green-700'
                    : 'border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-[var(--bg-color)]'
                }`}
              >
                {quantityInCart > 0 ? (
                  <span className="flex items-center space-x-1">
                    <span>{quantityInCart}</span>
                    <span className="text-xs">in cart</span>
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;