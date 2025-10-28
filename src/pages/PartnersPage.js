// src/pages/PartnersPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
// ① Rename your file on disk to something like poshak-mens-wear-logo.png 
//    Then import without spaces/apostrophes:
import dhLogo from '../assets/partners/Poshak Men’s Wear.png.jpg';

const PartnersPage = () => {
  // only one featured partner now
  const partner = {
    name: "Poshak Men’s Wear",
    website: 'https://www.instagram.com/poshak_mens_wear_?igsh=dmVvbGJ3djV2NGJw',
    logo: dhLogo,
    description:
      'At Poshak Men’s Wear, we specialize in crafting premium, tailor-made outfits for men that combine tradition with modern style.',
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">

        {/* Page title */}
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Our Partner
          </h1>
        </ScrollAnimation>

        {/* Featured partner card */}
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <div className="card rounded-lg p-8 max-w-xl mx-auto flex flex-col items-center text-center space-y-6">
            
            {/* ② Logo is now wrapped in an <a> pointing to partner.website */}
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-32 mb-4"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-auto object-contain mx-auto"
              />
            </a>

            <h2 className="text-2xl font-semibold">{partner.name}</h2>
            <p className="text-[var(--text-color)] max-w-md">
              {partner.description}
            </p>

            {/* removed the View Profile button */}

          </div>
        </ScrollAnimation>

      </div>
    </div>
  );
};

export default PartnersPage;