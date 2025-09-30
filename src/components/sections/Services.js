// src/components/sections/Services.js
import React, { useState } from "react";
import ScrollAnimation from "../ScrollAnimation";

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
      icon: "🎨",
      subServices: [
        {
          name: "Poster Design",
          desc: "Eye-catching posters tailored for events and campaigns.",
          icon: "🖼️",
        },
        {
          name: "Thumbnail Design",
          desc: "Professional thumbnails that boost engagement.",
          icon: "📸",
        },
        {
          name: "Logo Design",
          desc: "Memorable logos that define your brand identity.",
          icon: "⚜️",
        },
      ],
    },
    {
      title: "Video Editing",
      description:
        "Professional editing solutions that turn raw footage into engaging videos.",
      icon: "🎬",
      subServices: [
        {
          name: "AI Editing",
          desc: "Fast AI-driven edits for quick delivery.",
          icon: "🤖",
        },
        {
          name: "Short Video Editing",
          desc: "Dynamic edits for Reels, Shorts, and TikToks.",
          icon: "🎞️",
        },
        {
          name: "Marketing Videos",
          desc: "Compelling ads and promos for your business.",
          icon: "📢",
        },
      ],
    },
    {
      title: "Music Distribution",
      description:
        "Seamless digital distribution services to launch your music worldwide.",
      icon: "🎵",
      subServices: [
        {
          name: "Global Release",
          desc: "Distribute across Spotify, Apple Music, and more.",
          icon: "🌍",
        },
        {
          name: "Royalty Management",
          desc: "Track and manage your earnings transparently.",
          icon: "💰",
        },
        {
          name: "Artist Promotion",
          desc: "Boost reach with tailored promotional strategies.",
          icon: "🚀",
        },
      ],
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Services
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Click a service below to explore its sub-services with details.
          </p>
        </ScrollAnimation>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollAnimation
              key={index}
              animation="fade-in-up"
              delay={0.1 * index}
            >
              <div
                className="card rounded-lg p-6 cursor-pointer transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800 shadow-md"
                onClick={() => toggleService(index)}
              >
                {/* Service Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{service.icon}</div>
                    <h3 className="text-xl font-semibold gold-text">
                      {service.title}
                    </h3>
                  </div>
                  <span className="text-2xl">
                    {activeService === index ? "−" : "+"}
                  </span>
                </div>

                {/* Main Description */}
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {service.description}
                </p>

                {/* Sub-services Expand/Collapse */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    activeService === index ? "max-h-[1000px] mt-6" : "max-h-0"
                  }`}
                >
                  <div className="grid gap-4">
                  {service.subServices.map((sub, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-md 
                                bg-[var(--card-bg)] 
                                shadow-md cursor-pointer
                                transition-colors duration-500 ease-in-out
                                group hover:bg-[var(--primary)]"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl transition-colors duration-500 ease-in-out group-hover:text-white">
                          {sub.icon}
                        </span>
                        <div>
                          <h4 className="font-semibold text-[var(--text-color)] transition-colors duration-500 ease-in-out group-hover:text-white">
                            {sub.name}
                          </h4>
                          <p className="text-sm opacity-80 text-[var(--text-color)] transition-colors duration-500 ease-in-out group-hover:text-white">
                            {sub.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;