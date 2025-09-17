// src/pages/ServicesPage.js
import React, { useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const ServicesPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleService = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const services = [
    {
      title: "Graphic Design",
      summary:
        "Creative visuals that bring your brand identity to life with design mastery.",
      description:
        "We specialise in posters, thumbnails, and logo design that align with your brand messaging and aesthetics.",
      icon: "🎨",
      subServices: [
        {
          name: "Poster Design",
          desc: "Eye-catching posters tailored for events and campaigns.",
          icon: "🖼️",
        },
        {
          name: "Thumbnail Design",
          desc: "Professional thumbnails that boost online engagement.",
          icon: "📸",
        },
        {
          name: "Logo Design",
          desc: "Memorable logos that define your brand personality.",
          icon: "⚜️",
        },
      ],
    },
    {
      title: "Video Editing",
      summary:
        "Transform your raw footage into compelling videos that keep audiences engaged.",
      description:
        "From AI fast edits to high-quality marketing videos, we ensure every edit has an impact.",
      icon: "🎬",
      subServices: [
        {
          name: "AI Editing",
          desc: "Fast AI-driven edits for quick content delivery.",
          icon: "🤖",
        },
        {
          name: "Short Video Editing",
          desc: "Dynamic cuts designed for Reels, Shorts, and TikToks.",
          icon: "🎞️",
        },
        {
          name: "Marketing Videos",
          desc: "Compelling advertisements and promos to grow your business.",
          icon: "📢",
        },
      ],
    },
    {
      title: "Music Distribution",
      summary:
        "Launch your music across digital platforms worldwide with transparency and strategy.",
      description:
        "We help artists distribute globally, grow their audience, and maximise royalties.",
      icon: "🎵",
      subServices: [
        {
          name: "Global Release",
          desc: "Distribute across Spotify, Apple Music, and all major stores.",
          icon: "🌍",
        },
        {
          name: "Royalty Management",
          desc: "Track and manage your music earnings with clarity.",
          icon: "💰",
        },
        {
          name: "Artist Promotion",
          desc: "Tailored strategies to promote your music effectively.",
          icon: "🚀",
        },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-[var(--bg-color)]">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Our Services
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-[var(--text-color)] mb-12 max-w-3xl mx-auto">
            Explore our core services below. Click on <b>Summary</b> to view detailed explanations and child services.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollAnimation key={i} animation="fade-in-up" delay={0.1 * i}>
              <div className="card rounded-lg p-6 shadow-md bg-[var(--card-bg)] hover:scale-[1.02] transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-4xl">{service.icon}</span>
                  <h3 className="text-xl font-semibold gold-text">{service.title}</h3>
                </div>

                {/* Always visible summary */}
                <p className="text-[var(--text-color)] font-medium italic">
                  {service.summary}
                </p>

                {/* Summary trigger */}
                <button
                  onClick={() => toggleService(i)}
                  className="mt-3 text-sm font-semibold gold-text hover:underline"
                >
                  {openIndex === i ? "Hide details ▲" : "Read more ▼"}
                </button>

                {/* Expandable explanation */}
                <div
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    openIndex === i ? "max-h-[1200px] mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-[var(--text-color)] mb-4">
                    {service.description}
                  </p>

                  {/* Sub services */}
                  <div className="grid gap-3 animate-fade-in-stagger">
                    {service.subServices.map((sub, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-md bg-[var(--card-bg)] shadow-sm 
                                   transition duration-500 group hover:bg-[var(--primary)]"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-xl transition-colors duration-500 group-hover:text-white">
                            {sub.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold text-[var(--text-color)] transition-colors duration-500 group-hover:text-white">
                              {sub.name}
                            </h4>
                            <p className="text-sm text-[var(--text-color)] opacity-80 transition-colors duration-500 group-hover:text-white">
                              {sub.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;