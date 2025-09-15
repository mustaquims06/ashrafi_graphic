// src/pages/PartnersPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';

const PartnersPage = () => {
  const partners = [
    {
      name: 'DesignHub Studios',
      logo: 'https://via.placeholder.com/200x100?text=DesignHub',
      description: 'Collaborating on large-scale branding projects since 2018.'
    },
    {
      name: 'PrintMaster',
      logo: 'https://via.placeholder.com/200x100?text=PrintMaster',
      description: 'Our preferred printing partner for high-quality production.'
    },
    {
      name: 'TechInnovate',
      logo: 'https://via.placeholder.com/200x100?text=TechInnovate',
      description: 'Joint digital solutions for tech industry clients.'
    },
    {
      name: 'EcoBrands',
      logo: 'https://via.placeholder.com/200x100?text=EcoBrands',
      description: 'Sustainable design initiatives and eco-friendly projects.'
    },
    {
      name: 'Global Media',
      logo: 'https://via.placeholder.com/200x100?text=Global+Media',
      description: 'International marketing and advertising collaborations.'
    },
    {
      name: 'Creative Alliance',
      logo: 'https://via.placeholder.com/200x100?text=Creative+Alliance',
      description: 'Network of creative professionals and resource sharing.'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Partners</h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            We believe in the power of collaboration. These are some of the organizations we work with to deliver exceptional results.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.1 * index}
            >
              <div className="card rounded-lg p-6 h-full flex flex-col items-center text-center">
                <div className="h-20 mb-4 flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{partner.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={0.8}>
          <div className="mt-16 text-center">
            <div className="card rounded-lg p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Interested in partnering with us? We're always looking for talented agencies, printers, and creative professionals to collaborate with.
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                Contact Us About Partnership
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default PartnersPage;