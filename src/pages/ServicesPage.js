// src/pages/ServicesPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
// import music from "../assets/music companys.jpg";

// import logos at the top
import vevoLogo from "../assets/logos/vevo.png";
import amazonLogo from "../assets/logos/amazon-music.png";
import tiktokLogo from "../assets/logos/tiktok.png";
import deezerLogo from "../assets/logos/deezer.png";
import appleLogo from "../assets/logos/apple-music.png";
import spotifyLogo from "../assets/logos/spotify.png";
import youtubeLogo from "../assets/logos/youtube.png"
import tidalLogo from "../assets/logos/tidal.png"

// Import service images
import posterImage from "../assets/discover/poster1.jpg";
import thumbnailImage from "../assets/discover/thumbnail1.jpg";
import logoImage from "../assets/discover/logo1.jpg";
import aiEditingImage from "../assets/discover/poster2.png";
import shortVideoImage from "../assets/discover/thumbnail2.jpg";
import marketingVideoImage from "../assets/discover/poster3.jpg";
import musicPromoImage from "../assets/discover/poster4.png";
import musicDistributionImage from "../assets/discover/thumbnail3.png";
import musicPlatformImage from "../assets/discover/thumbnail4.jpg";


/* --- Service Popup Modal --- */
function ServicePopup({ service, onClose }) {
  const navigate = useNavigate();
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
          className="relative p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden bg-[var(--bg-color)] rounded-2xl shadow-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Scrollable Sub-services */}
          <div className="overflow-y-auto max-h-[50vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {service.subServices.map((sub, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-md flex flex-col cursor-pointer transition-transform duration-300 scale-95 hover:scale-100 max-w-[250px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="h-32 w-full object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-3 flex flex-col items-center text-center">
                    <h4 className="font-semibold text-base mb-1 text-[var(--text-color)]">
                      {sub.title}
                    </h4>
                    <p className="text-xs text-[var(--text-color)]">{sub.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-4 flex justify-end">
            <button
              className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors duration-300"
              onClick={() => {
                toast.success(`Redirecting to apply for ${service.title}...`);
                // Add a short delay to allow the user to see the toast
                setTimeout(() => {
                    navigate("/contact");
                }, 1500);
              }}
            >
              <p className="text-sm text-[var(--text-color)] flex-1">Apply</p>
            </button>
          </div>

          {/* Music Distribution Extra Image + Platforms */}
          {service.title === "Music Distribution" && (
            <>
              

              {/* Available Stores & Many More */}
              <div className="mt-4 w-full">
                <h4 className="text-lg font-semibold text-[var(--text-color)] mb-3 text-center">
                  Available Stores & Many More
                </h4>

                <div className="flex flex-wrap sm:flex-nowrap gap-6 overflow-x-auto py-2 px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {[
                    { name: "Vevo", logo: vevoLogo },
                    { name: "Amazon Music", logo: amazonLogo },
                    { name: "TikTok", logo: tiktokLogo },
                    { name: "Deezer", logo: deezerLogo },
                    { name: "Apple Music", logo: appleLogo },
                    { name: "Spotify", logo: spotifyLogo },
                    { name: "YouTube", logo: youtubeLogo },
                    { name: "Tidal", logo: tidalLogo },
                  ].map((platform, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center flex-shrink-0 min-w-[60px] sm:min-w-[80px]"
                    >
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="h-10 w-auto object-contain mb-1 sm:h-12"
                      />
                      <p className="text-xs text-[var(--text-color)] text-center">{platform.name}</p>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}
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
      className={`bg-[var(--card-bg)] rounded-2xl shadow-lg flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } cursor-pointer overflow-hidden transition-colors duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(service)}
    >
      <img
        src={subServices[0].image}
        alt={title}
        className="w-full md:w-1/2 h-64 object-cover"
      />
      <div className="p-6 flex flex-col flex-1 justify-center bg-[var(--card-bg)] transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[var(--card-bg)]/60 shadow-sm transition-colors duration-300">
            <div className="text-2xl">{icon}</div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-color)]">{title}</h3>
        </div>
        <p className="mt-4 text-[var(--text-color)] text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

/* --- Services Data --- */
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
        image: posterImage,
      },
      {
        title: "Thumbnail Design",
        description: "Clickable thumbnails that grab instant attention.",
        image: thumbnailImage,
      },
      {
        title: "Logo Design",
        description: "Professional and modern logo concepts.",
        image: logoImage,
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
        image: aiEditingImage,
      },
      {
        title: "Short Editing",
        description: "Quick edits for Reels, Shorts, and TikToks.",
        image: shortVideoImage,
      },
      {
        title: "Marketing Video",
        description: "High-conversion promo and ad videos.",
        image: marketingVideoImage,
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
        title: "Music Promotion",
        description: "Work with our team to promote your releases and reach new fans.",
        image: musicPromoImage,
      },
      {
        title: "Pre-Save-Links",
        description: "Promote your music with Pre-Save SmartLinks one place for all your important links.",
        image: musicDistributionImage,
      },
      {
        title: "Top Tracks & Artists",
        description: "Upload your music for a chance to be featured to thousands of followers worldwide.",
        image: musicPlatformImage,
      },
      {
        title: "YouTube Content ID",
        description: "Content ID is YouTube's digital fingerprint system that identifies and tracks uploaded content.",
        image: musicPromoImage,
      },
      {
        title: "Rights Manager",
        description: "Protects, monetizes, and controls your content by managing claims, takedowns, and monetization.",
        image: musicDistributionImage,
      },
    ],
  },
];

/* --- Main Page --- */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-16 relative bg-[var(--bg-color)] transition-colors duration-500">
      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      
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
          <p className="mt-3 max-w-2xl mx-auto text-[var(--text-color)]">
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