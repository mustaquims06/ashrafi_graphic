import React from 'react';
import { FaInstagram, FaFacebook, FaPinterest, FaYoutube, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-0"> {/* mt-0 gap remove */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold gold-text">Ashrafi Graphic</h3>
          <p className="text-sm opacity-80 leading-snug">
            Creativity, Culture & Connection.  
            Design that speaks louder than words.
          </p>
        </div>
        
        {/* Social Media */}
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/ashrafi_graphic" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl text-pink-500 hover:text-[var(--primary)] transition-colors" />
          </a>
          <a href="https://www.facebook.com/share/16ij5aYnpb/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-xl text-blue-500 hover:text-[var(--primary)] transition-colors" />
          </a>
          <a href="https://pin.it/66vGZIxMq" target="_blank" rel="noopener noreferrer">
            <FaPinterest className="text-xl text-red-500 hover:text-[var(--primary)] transition-colors" />
          </a>
          <a href="https://youtube.com/@voiceofashrafigraphic" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-xl text-red-600 hover:text-[var(--primary)] transition-colors" />
          </a>
          <a href="https://t.me/Ashrafi_graphic" target="_blank" rel="noopener noreferrer">
            <FaTelegram className="text-xl text-sky-400 hover:text-[var(--primary)] transition-colors" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right text-sm opacity-80">
          <p>Doodh Bazar, Nashik</p>
          <p>
            <a href="mailto:ashrafigraphicservices@gmail.com" className="hover:text-[var(--primary)]">
              ashrafigraphicservices@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+918007869205" className="hover:text-[var(--primary)]">
              (+91) 8007869205
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 mt-3">
        <p>&copy; {new Date().getFullYear()} Ashrafi Graphic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;