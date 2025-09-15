// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold gold-text mb-4">Ashrafi Graphics</h3>
            <p className="text-gray-300">Creating stunning visual solutions for your business needs.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:gold-text transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:gold-text transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:gold-text transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:gold-text transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Branding</span></li>
              <li><span className="text-gray-300">Print Design</span></li>
              <li><span className="text-gray-300">Digital Graphics</span></li>
              <li><span className="text-gray-300">Packaging</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <address className="text-gray-300 not-italic">
              <p>123 Design Street</p>
              <p>Creative City, CC 12345</p>
              <p className="mt-2">Email: info@ashrafigraphics.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ashrafi Graphics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;