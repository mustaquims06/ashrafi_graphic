// src/components/sections/Services.js
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../ScrollAnimation';

const Services = () => {
  const services = [
    {
      title: 'Brand Identity Design',
      description: 'Create a unique visual identity that represents your brand values and resonates with your target audience.',
      icon: '🎨'
    },
    {
      title: 'Print Design',
      description: 'Brochures, business cards, flyers, and other printed materials that make a lasting impression.',
      icon: '📄'
    },
    {
      title: 'Digital Graphics',
      description: 'Social media graphics, web banners, and other digital assets that enhance your online presence.',
      icon: '💻'
    },
    {
      title: 'Packaging Design',
      description: 'Eye-catching packaging solutions that stand out on shelves and communicate your product value.',
      icon: '📦'
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Services</h2>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            We offer a comprehensive range of graphic design services to meet all your business needs.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.1 * index}
            >
              <div className="card rounded-lg p-6 h-full flex flex-col transition-transform duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 gold-text">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
                <Link 
                  to="/services" 
                  className="text-primary font-semibold hover:underline mt-auto"
                >
                  Learn more →
                </Link>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={0.6}>
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Services;