// src/pages/ServicesPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';

const ServicesPage = () => {
  const services = [
    {
      title: 'Brand Identity Design',
      description: 'We create comprehensive visual identities that communicate your brand essence and values. Our process includes logo design, color palette selection, typography, and brand guidelines.',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines'],
      price: 'Starting at $1,200'
    },
    {
      title: 'Print Design',
      description: 'From business cards to brochures, we design print materials that make a lasting impression. We ensure all designs are print-ready and optimized for production.',
      features: ['Business Cards', 'Brochures', 'Flyers', 'Posters'],
      price: 'Starting at $300'
    },
    {
      title: 'Digital Graphics',
      description: 'Enhance your online presence with custom digital graphics designed for various platforms including social media, websites, and digital advertisements.',
      features: ['Social Media Graphics', 'Web Banners', 'Email Templates', 'Digital Ads'],
      price: 'Starting at $150'
    },
    {
      title: 'Packaging Design',
      description: 'Create packaging that stands out on shelves and communicates your product value. We consider both aesthetics and practical aspects of packaging design.',
      features: ['Product Packaging', 'Labels', 'Box Design', 'Retail Displays'],
      price: 'Starting at $800'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Services</h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            We offer a comprehensive range of graphic design services to help your business stand out.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.1 * index}
            >
              <div className="card rounded-lg p-8 h-full">
                <h2 className="text-2xl font-bold mb-4 gold-text">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Includes:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <p className="text-lg font-semibold gold-text">{service.price}</p>
                  <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={0.6}>
          <div className="mt-16 text-center">
            <div className="card rounded-lg p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Custom Projects</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have a unique project in mind? We love tackling new challenges and creating custom solutions tailored to your specific needs.
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                Contact Us for a Quote
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ServicesPage;