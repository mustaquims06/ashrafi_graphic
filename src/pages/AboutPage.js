// src/pages/AboutPage.js
import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const AboutPage = () => {
  const beliefPoints = [
    "Creativity that uplifts values and culture.",
    "Quality storytelling across design and sound.",
    "Sincerity and collaboration with each project.",
    "Innovation guided by purpose, not trend.",
    "Mentoring youth to create with meaning.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100">
     
      {/* 🏗 Our Story */}
      <section className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16 xl:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <ScrollAnimation animation="fade-in-up" delay={0.15}>
            <div className="w-full bg-white/80 dark:bg-gray-800/90 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg lg:shadow-xl backdrop-blur-sm sm:backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center gold-text mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Our Journey
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed md:leading-loose text-gray-800 dark:text-gray-200 px-2 sm:px-4">
                Founded in 2020 by Kaif Ashrafi, Ashrafi Graphic is a creative and cultural brand that brings together 
                graphic design, cinematic video editing, customized products, and music distribution under one ecosystem. 
                Through AG Store, AG Studios, and Voice of Ashrafi Graphic, the brand continues to inspire with a unique mix 
                of tradition, innovation, and global reach.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 🎯 Mission & Vision */}
      <section className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16 xl:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            <ScrollAnimation animation="fade-in-up" delay={0.25}>
              <div className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl bg-yellow-100/60 dark:bg-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200/50 dark:border-gray-700">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold gold-text mb-2 sm:mb-3 md:mb-4 lg:mb-5">🌟 Our Mission</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed md:leading-loose text-gray-700 dark:text-gray-300">
                  To promote creativity infused with sincerity — shaping designs, audio, and 
                  cultural experiences that celebrate faith and beauty.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in-up" delay={0.35}>
              <div className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl bg-yellow-100/60 dark:bg-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200/50 dark:border-gray-700">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold gold-text mb-2 sm:mb-3 md:mb-4 lg:mb-5">🚀 Our Vision</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed md:leading-loose text-gray-700 dark:text-gray-300">
                  To become a global creative house for meaningful Islamic and cultural media, 
                  empowering new voices through art and technology.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ⚡ Beliefs / Highlights */}
      <section className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16 xl:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <ScrollAnimation animation="fade-in-up" delay={0.45}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold gold-text text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2">
              What We Believe In
            </h2>
          </ScrollAnimation>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {beliefPoints.map((point, index) => (
              <ScrollAnimation
                key={index}
                animation="fade-in-up"
                delay={0.4 + index * 0.15}
              >
                <div className="flex items-start p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-xl bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-600/50 transition-all duration-300 border border-transparent hover:border-yellow-200/50 dark:hover:border-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 md:mr-4"></span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* 🌈 Call‑to‑Action footer */}
      <footer className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16 xl:px-12 bg-yellow-100/60 dark:bg-gray-800">
        <div className="w-full max-w-6xl mx-auto">
          <ScrollAnimation animation="fade-in-up" delay={0.6}>
            <div className="text-center px-2 sm:px-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold gold-text mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Join Our Journey
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed md:leading-loose">
                Follow <span className="font-semibold text-yellow-600 dark:text-yellow-400">Ashrafi Graphics</span> on our creative path — 
                explore art, design, videos, and heartfelt productions rooted in faith.
              </p>
              <a
                href="https://www.youtube.com/@voiceofashrafigraphic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base lg:text-lg min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
              >
                Visit Our Channel
                <span className="ml-1 sm:ml-2">→</span>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;