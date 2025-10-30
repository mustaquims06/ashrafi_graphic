// src/components/ProductImageGallery.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/index.css";

const ProductImageGallery = ({ images = [], productName, image, video }) => {
  // Normalize gallery images
  let galleryImages = [];

  if (Array.isArray(images) && images.length > 0) {
    galleryImages = images.map((img, idx) => ({
      id: img.id || idx,
      url: img.url || img,
      alt: img.alt || productName,
    }));
  } else if (image) {
    galleryImages = [{ id: 1, url: image, alt: productName }];
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((i) => (i + 1) % galleryImages.length);
  const prevImage = () => setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const goToIndex = (idx) => setCurrentIndex(idx);

  if (video) {
    return (
      <video
        src={video}
        controls
        className="w-full h-auto rounded-lg shadow-md"
      />
    );
  }

  return (
    <div className="space-y-4 product-gallery">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--card-bg)] group">
        <motion.img
          key={currentIndex}
          src={galleryImages[currentIndex]?.url || "/placeholder.png"}
          alt={galleryImages[currentIndex]?.alt || productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {galleryImages.length > 1 && (
          <>
            <button onClick={prevImage} className="arrow-btn left-3">
              <ChevronLeft className="h-5 w-5 text-[var(--text-color)]" />
            </button>
            <button onClick={nextImage} className="arrow-btn right-3">
              <ChevronRight className="h-5 w-5 text-[var(--text-color)]" />
            </button>
          </>
        )}

        {galleryImages.length > 1 && (
          <div className="counter-badge">{currentIndex + 1} / {galleryImages.length}</div>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {galleryImages.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={img.id}
                onClick={() => goToIndex(idx)}
                className={`thumb-btn ${isActive ? "thumb-active" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
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