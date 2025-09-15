// src/pages/ProductsPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';

const ProductsPage = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Products</h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Explore our range of design products and templates. Coming soon with e-commerce integration.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.4}>
          <div className="card rounded-lg p-12 text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold mb-4">E-Commerce Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're currently developing our product catalog and e-commerce functionality. Soon you'll be able to purchase design templates, branding kits, and other digital products directly from our website.
            </p>
            <p className="text-lg gold-text font-semibold">
              Check back later or contact us for custom design requests.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ProductsPage;