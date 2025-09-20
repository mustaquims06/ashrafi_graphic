// src/pages/ServicesPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* --- Service Popup Modal --- */
function ServicePopup({ service, onClose }) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl w-full"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {service.subServices.map((sub, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <img
                src={sub.image}
                alt={sub.title}
                className="h-40 w-full object-cover transform transition-transform duration-500 hover:scale-110"
              />
              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-semibold text-lg mb-2 text-[var(--text-color)] dark:text-white">
                  {sub.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                  {sub.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* --- Service Card --- */
function ServiceCard({ service, onClick, reverse }) {
  const { icon, title, description, subServices } = service;
  return (
    <motion.div
      className={`bg-white dark:bg-neutral-900 rounded-2xl shadow-lg flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } cursor-pointer overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(service)}
    >
      {/* Image */}
      <img
        src={subServices[0].image}
        alt={title}
        className="w-full md:w-1/2 h-64 object-cover"
      />
      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-center">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/60 dark:bg-black/30 shadow-sm">
            <div className="text-2xl">{icon}</div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-color)] dark:text-white">
            {title}
          </h3>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* --- Sample Data --- */
const services = [
  {
    id: 1,
    icon: "🎨",
    title: "Graphic Design",
    description: "Poster Design, Thumbnails, Logos, and more.",
    subServices: [
      {
        title: "Poster Design",
        description: "Eye-catching posters tailored to your theme.",
        image:
          "https://img.freepik.com/free-vector/hand-drawn-graphic-designer-poster_23-2150428116.jpg?semt=ais_incoming&w=740&q=80",
      },
      {
        title: "Thumbnail Design",
        description: "Clickable thumbnails that grab instant attention.",
        image:
          "https://img.freepik.com/premium-psd/we-provide-graphic-design-services-youtube-thumbnail-design_113934-87.jpg",
      },
      {
        title: "Logo Design",
        description: "Professional and modern logo concepts.",
        image:
          "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=600",
      },
    ],
  },
  {
    id: 2,
    icon: "🎬",
    title: "Video Editing",
    description: "AI-powered editing, short edits, marketing videos.",
    subServices: [
      {
        title: "AI Editing",
        description: "Smart automated edits with precision.",
        image:
          "https://static-cse.canva.com/blob/2155379/feature_tools-feature_ai-photo-editing_how-to.jpg",
      },
      {
        title: "Short Editing",
        description: "Quick edits for Reels, Shorts, and TikToks.",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600",
      },
      {
        title: "Marketing Video",
        description: "High-conversion promo and ad videos.",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
      },
    ],
  },
  {
    id: 3,
    icon: "🎵",
    title: "Music Distribution",
    description: "Distribute your music to all major platforms.",
    subServices: [
      {
        title: "Prime Digital Arena",
        description: "Get your music on Spotify, Apple Music & more.",
        image:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
      },
      {
        title: "Artist Branding",
        description: "Build your unique artist identity and reach.",
        image:
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
      },
      {
        title: "Promotion",
        description: "Targeted campaigns to grow your audience.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600",
      },
    ],
  },
];

/* --- Main Page --- */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-16 relative">
      {/* Background Waves */}
      <div className="hero-waves pointer-events-none">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text">
            Our Services
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Creative, high-impact design and digital services — tailored to your
            brand and goals.
          </p>
        </motion.header>

        {/* Services Grid with Zigzag */}
        <section className="flex flex-col gap-10">
          {services.map((s, idx) => (
            <ServiceCard
              key={s.id}
              service={s}
              onClick={setActiveService}
              reverse={idx % 2 === 1}
            />
          ))}
        </section>
      </div>

      {/* Popup */}
      <ServicePopup
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </div>
  );
}
