// src/pages/AboutPage.js
import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const AboutPage = () => {
  const beliefPoints = [
    "Creativity that uplifts values and culture.",
    "Quality storytelling across design and sound.",
    "Sincerity and collaboration with each project.",
    "Innovation guided by purpose, not trend.",
    "Mentoring youth to create with meaning.",
  ];

  return (
    <div className="pt-5 bg-gradient-to-b from-yellow-50 via-white to-yellow-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100">
     
           {/* 🏗 Our Story */}
      <section className="container mx-auto px-6 py-12">
        <ScrollAnimation animation="fade-in-up" delay={0.15}>
          <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md p-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-center gold-text mb-8">
              Our Journey
            </h2>
            <p className="text-[var(--text-color)] dark:text-[var(--text-color)] text-lg leading-relaxed">
              Founded in 2020 by Kaif Ashrafi, Ashrafi Graphic is a creative and cultural brand that brings together 
              graphic design, cinematic video editing, customized products, and music distribution under one ecosystem. 
              Through AG Store, AG Studios, and Voice of Ashrafi Graphic, the brand continues to inspire with a unique mix 
              of tradition, innovation, and global reach.
            </p>
          </div>
        </ScrollAnimation>
      </section>

      {/* 🎯 Mission & Vision */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <ScrollAnimation animation="fade-in-up" delay={0.25}>
          <div className="rounded-xl bg-yellow-100/60 dark:bg-gray-800 p-8 shadow-lg hover:shadow-yellow-300/50 transition">
            <h3 className="text-2xl font-semibold gold-text mb-3">🌟 Our Mission</h3>
            <p className="leading-relaxed">
              To promote creativity infused with sincerity — shaping designs, audio, and 
              cultural experiences that celebrate faith and beauty.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.35}>
          <div className="rounded-xl bg-yellow-100/60 dark:bg-gray-800 p-8 shadow-lg hover:shadow-yellow-300/50 transition">
            <h3 className="text-2xl font-semibold gold-text mb-3">🚀 Our Vision</h3>
            <p className="leading-relaxed">
              To become a global creative house for meaningful Islamic and cultural media, 
              empowering new voices through art and technology.
            </p>
          </div>
        </ScrollAnimation>
      </section>

      {/* ⚡ Beliefs / Highlights (each point animated) */}
      <section className="container mx-auto px-6 py-16">
        <ScrollAnimation animation="fade-in-up" delay={0.45}>
          <h2 className="text-3xl font-bold gold-text text-center mb-8">
            What We Believe In
          </h2>
        </ScrollAnimation>

        <ul className="max-w-3xl mx-auto list-disc list-inside space-y-3 text-lg leading-relaxed">
          {beliefPoints.map((point, index) => (
            <ScrollAnimation
              key={index}
              animation="fade-in-up"
              delay={0.4 + index * 0.15} // each point delayed slightly
            >
              <li className="hover:translate-x-2 transition-transform duration-300">
                {point}
              </li>
            </ScrollAnimation>
          ))}
        </ul>
      </section>

      {/* 🌈 Call‑to‑Action footer (same background and design) */}
      <footer className="text-center py-16 bg-yellow-100/60 dark:bg-gray-800 p-8 shadow-lg hover:shadow-yellow-300/50 transition">
        <ScrollAnimation animation="fade-in-up" delay={0.6}>
          <h3 className="text-2xl font-bold mb-4 gold-text">Join Our Journey</h3>
          <p className="max-w-xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
            Follow <span className="font-semibold">Ashrafi Graphics</span> on our creative path — 
            explore art, design, videos, and heartfelt productions rooted in faith.
          </p>
          <a
            href="https://www.youtube.com/@voiceofashrafigraphic"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold shadow transition"
          >
            Visit Our Channel →
          </a>
        </ScrollAnimation>
      </footer>
    </div>
  );
};

export default AboutPage;