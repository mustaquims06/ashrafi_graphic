// src/components/Footer.js
import React from 'react';
import { FaInstagram, FaYoutube, FaTelegram } from 'react-icons/fa'; // ✅ social icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-xl font-bold gold-text mb-4">Ashrafi Graphic</h3>
            <p className="text-gray-300">
              Creating stunning visual solutions for your business needs.
            </p>
          </div>
          
          {/* ✅ Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://instagram.com/yourpage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:gold-text transition-colors"
                >
                  <FaInstagram className="text-pink-500 text-xl" /> 
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/yourchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:gold-text transition-colors"
                >
                  <FaYoutube className="text-red-500 text-xl" /> 
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/yourchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:gold-text transition-colors"
                >
                  <FaTelegram className="text-sky-400 text-xl" /> 
                  <span>Telegram</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Graphic Design</span></li>
              <li><span className="text-gray-300">Video Editing</span></li>
              <li><span className="text-gray-300">Music Distribution</span></li>
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
          <p>&copy; {new Date().getFullYear()} Ashrafi Graphic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
