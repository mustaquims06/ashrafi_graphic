// src/pages/AboutPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Outer container */}
      <div className="container mx-auto px-4">
        
        {/* Page Title */}
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About Ashrafi Graphics
          </h1>
        </ScrollAnimation>

        {/* OUR STORY */}
        <div className="max-w-4xl mx-auto mb-16">
          <ScrollAnimation animation="fade-in-up" delay={0.2}>
            <div className="card rounded-lg p-8 mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 gold-text text-center">
                Our Story
              </h2>
              {/* paragraph now uses --text-color so it shows up */}
              <p className="text-[var(--text-color)] dark:text-[var(--text-color)] text-lg leading-relaxed">
                Founded in 2021 by Kaif Ashrafi, Ashrafi Graphic is a creative and cultural brand 
                that brings together graphic design, cinematic video editing, customized products, 
                and music distribution under one ecosystem. Through AG Store, AG Studios, and Voice 
                of Ashrafi Graphic, the brand continues to inspire with a unique mix of tradition, 
                innovation, and global reach.
              </p>
            </div>
          </ScrollAnimation>
        </div>

        {/* KEY HIGHLIGHTS */}
        <div className="max-w-4xl mx-auto mb-16">
          <ScrollAnimation animation="fade-in-up" delay={0.3}>
            <h2 className="text-3xl font-bold gold-text mb-4 text-center">
              Key Highlights of Ashrafi Graphic
            </h2>
            <ul className="list-disc list-inside space-y-3 text-[var(--text-color)] text-lg leading-relaxed">
              <li>
                Founded in 2021 with expertise in Graphic Design, Cinematic Editing, and AI Integration.
              </li>
              <li>
                AG Studios → Expanding into music distribution, making Islamic content available on global platforms.
              </li>
              <li>
                AG Store → Offering acrylic frames, customized art, and lifestyle products.
              </li>
              <li>
                Voice of Ashrafi Graphic → YouTube channel dedicated to Naats, Manqabats, and Islamic productions.
              </li>
              <li>
                Strong and growing presence across Instagram, YouTube, and global media platforms.
              </li>
            </ul>
          </ScrollAnimation>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;