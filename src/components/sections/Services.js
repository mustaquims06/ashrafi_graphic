// src/components/sections/Services.js
import React, { useState } from "react";
import ScrollAnimation from "../ScrollAnimation";

// React Icons Import
import { FaPaintBrush, FaFileImage, FaRegImage, FaPalette } from "react-icons/fa";
import { FaVideo, FaRobot, FaCut, FaBullhorn } from "react-icons/fa";
import { FaMusic, FaGlobe, FaMoneyBillWave, FaRocket } from "react-icons/fa";

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const toggleService = (index) => {
    setActiveService(activeService === index ? null : index);
  };

  const services = [
    {
      title: "Graphic Design",
      description:
        "Creative visuals that bring your ideas to life and make your brand stand out.",
      icon: <FaPaintBrush className="text-4xl text-[var(--primary)]" />,
      subServices: [
        {
          name: "Poster Design",
          desc: "Eye-catching posters tailored for events and campaigns.",
          icon: <FaFileImage />,
        },
        {
          name: "Thumbnail Design",
          desc: "Professional thumbnails that boost engagement.",
          icon: <FaRegImage />,
        },
        {
          name: "Logo Design",
          desc: "Memorable logos that define your brand identity.",
          icon: <FaPalette />,
        },
      ],
    },
    {
      title: "Video Editing",
      description:
        "Professional editing solutions that turn raw footage into engaging videos.",
      icon: <FaVideo className="text-4xl text-[var(--primary)]" />,
      subServices: [
        {
          name: "AI Editing",
          desc: "Fast AI-driven edits for quick delivery.",
          icon: <FaRobot />,
        },
        {
          name: "Short Video Editing",
          desc: "Dynamic edits for Reels, Shorts, and TikToks.",
          icon: <FaCut />,
        },
        {
          name: "Marketing Videos",
          desc: "Compelling ads and promos for your business.",
          icon: <FaBullhorn />,
        },
      ],
    },
    {
      title: "Music Distribution",
      description:
        "Seamless digital distribution services to launch your music worldwide.",
      icon: <FaMusic className="text-4xl text-[var(--primary)]" />,
      subServices: [
        {
          name: "Global Release",
          desc: "Distribute across Spotify, Apple Music, and more.",
          icon: <FaGlobe />,
        },
        {
          name: "Royalty Management",
          desc: "Track and manage your earnings transparently.",
          icon: <FaMoneyBillWave />,
        },
        {
          name: "Artist Promotion",
          desc: "Boost reach with tailored promotional strategies.",
          icon: <FaRocket />,
        },
      ],
    },
  ];

  return (
    <section id="services" className="relative py-20">
      {/* Gradient Overlay Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-gray-100 dark:via-gray-800 to-[var(--bg-color)] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gold-text heading-font">
            Our Services
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Click a service card to explore its sub-services.
          </p>
        </ScrollAnimation>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollAnimation key={index} animation="fade-in-up" delay={0.1 * index}>
              <div
                className="card rounded-lg p-6 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-md"
                onClick={() => toggleService(index)}
              >
                {/* Service Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {service.icon}
                    <h3 className="text-xl font-semibold gold-text">{service.title}</h3>
                  </div>
                  <span className="text-2xl">{activeService === index ? "−" : "+"}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {service.description}
                </p>

                {/* Sub-services accordion */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    activeService === index ? "max-h-[1000px] mt-6" : "max-h-0"
                  }`}
                >
                  <div className="grid gap-4 animate-fade-in-stagger">
                    {service.subServices.map((sub, i) => (
                      <div
                        key={i}
                        className="sub-service p-4 rounded-md bg-[var(--card-bg)] shadow-md cursor-pointer transition-colors duration-500 ease-in-out hover:bg-[var(--primary)]"
                      >
                        <div className="flex items-center space-x-3">
                          {/* Icon animation */}
                          <span className="text-xl text-[var(--text-color)] sub-service-icon bounce">
                            {sub.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold text-[var(--text-color)] hover:text-white transition">
                              {sub.name}
                            </h4>
                            <p className="text-sm opacity-80 text-[var(--text-color)] hover:text-white transition">
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
    </section>
  );
};

export default Services;