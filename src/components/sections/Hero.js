// src/components/sections/Hero.js
import React from 'react';
import { Link } from "react-router-dom";
import ScrollAnimation from '../ScrollAnimation';
import { ReactTyped } from "react-typed";

const Hero = () => { 
  return (
<<<<<<< HEAD
    <section 
      className="min-h-screen flex items-center justify-center py-16 relative"
      style={{
        backgroundImage: 'url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 text-center relative z-10">

        {/* Heading with typing effect */}
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
=======
    <section className="min-h-screen flex items-center justify-center gradient-bg py-16">
      <div className="container mx-auto px-4 text-center">

        {/* Heading with typing effect */}
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
>>>>>>> 13aa030d6766559ab3903a74de99062b8c572b7f
            <ReactTyped
              strings={["Ashrafi <span class='gold-text'>Graphic</span>"]}
              typeSpeed={70}
              backSpeed={40}
              showCursor={false}
              smartBackspace={true}
              loop={false}
            />
          </h1>
        </ScrollAnimation>

        {/* Tagline with typing loop */}
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
<<<<<<< HEAD
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
=======
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
>>>>>>> 13aa030d6766559ab3903a74de99062b8c572b7f
            <ReactTyped
              strings={[
                "Creativity, Culture & Connection",
                "Design that speaks louder than words",
                "Turning ideas into reality",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </p>
        </ScrollAnimation>

        {/* Button */}
        <ScrollAnimation animation="fade-in-up" delay={0.4}>
          <div className="flex justify-center">
            {/* 🔗 Link to Discover Projects */}
            <Link
              to="/discover-projects"
              className="bg-[#d4af37] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#b8962e] transition-colors"
            >
              Discover Projects
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Hero;
