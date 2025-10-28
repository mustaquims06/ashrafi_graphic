import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import "../styles/index.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleOrderNow = (e) => {
    e.preventDefault(); // prevent card link trigger
    addToCart({ ...product, selectedSize: product.defaultSize });
    navigate("/cart");
  };

  const imgUrl = product.images?.[0]?.url || product.image || "/placeholder.png";

  // ✅ Calculate discounted price if offer exists
  const finalPrice = product.offer
    ? Math.round(product.price - (product.price * parseFloat(product.offer)) / 100)
    : Number(product.price).toFixed(2);

  return (
    <motion.div
      className="h-full flex flex-col bg-[var(--card-bg)] border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
      whileHover={{ y: -4 }}
    >
      <Link to={`/product/${product._id || product.id}`} className="flex flex-col h-full group">
        {/* Image */}
        <div className="aspect-square overflow-hidden relative">
          <motion.img
            src={imgUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

          <div className="mt-auto">
            {/* ✅ Price Section */}
            <div className="mt-2">
              <p className="text-2xl font-bold text-[var(--primary)]">₹{finalPrice}</p>
              
              {product.offer && (
                <div className="flex items-center space-x-2">
                  <span className="line-through text-gray-500 text-sm">
                    ₹{Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-red-500 font-bold">
                    🔥 {product.offer}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleOrderNow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 w-full bg-[var(--primary)] text-white py-2 rounded flex items-center justify-center"
            >
              <ShoppingCart className="inline h-4 w-4 mr-1" /> Order Now
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;