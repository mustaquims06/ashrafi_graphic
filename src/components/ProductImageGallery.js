import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/index.css';   // ensure your CSS vars & custom rules are loaded

const ProductImageGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % images.length);
  const previousImage = () =>
    setCurrentImageIndex(
      (i) => (i - 1 + images.length) % images.length
    );
  const goToImage = (idx) => setCurrentImageIndex(idx);

  return (
    <div className="space-y-4 product-gallery">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--card-bg)] group">
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]?.url}
          alt={images[currentImageIndex]?.alt || productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="arrow-btn left-3"
            >
              <ChevronLeft className="h-5 w-5 text-[var(--text-color)]" />
            </button>
            <button
              onClick={nextImage}
              className="arrow-btn right-3"
            >
              <ChevronRight className="h-5 w-5 text-[var(--text-color)]" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="counter-badge">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => {
            const isActive = idx === currentImageIndex;
            return (
              <motion.button
                key={img.id}
                onClick={() => goToImage(idx)}
                className={`thumb-btn ${
                  isActive ? 'thumb-active' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={img.url}
                  alt={img.alt || `${productName} - View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;