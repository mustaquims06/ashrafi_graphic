// src/components/sections/Hero.js
import React from 'react';
import ScrollAnimation from '../ScrollAnimation';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-bg py-16">
      <div className="container mx-auto px-4 text-center">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Elevate Your <span className="gold-text">Brand</span> With Premium Graphics
          </h1>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            We create stunning visual solutions that help your business stand out and make a lasting impression.
          </p>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-in-up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              View Our Work
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
              Get in Touch
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Hero;