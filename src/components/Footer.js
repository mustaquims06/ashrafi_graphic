// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaYoutube,
  FaTelegram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold gold-text mb-4">Ashrafi Graphic</h3>
            <p className="text-gray-300">
              Creativity, Culture & Connection,
              Design that speaks louder than words,
              Turning ideas into reality.
            </p>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.instagram.com/ashrafi_graphic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  <FaInstagram className="text-xl text-pink-500" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/16ij5aYnpb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  <FaFacebook className="text-xl text-blue-500" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pin.it/66vGZIxMq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  <FaPinterest className="text-xl text-red-500" />
                  <span>Pinterest</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@voiceofashrafigraphic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  <FaYoutube className="text-xl text-red-600" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/Ashrafi_graphic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  <FaTelegram className="text-xl text-sky-400" />
                  <span>Telegram</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  Music Distribution
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <address className="not-italic text-gray-300 space-y-1">
              <p>Doodh Bazar</p>
              <p>Nashik, Maharashtra</p>
              <p>Email: <a href="mailto:ashrafigraphicservices@gmail.com" className="hover:text-[var(--primary)]">ashrafigraphicservices@gmail.com</a></p>
              <p>Phone: <a href="tel:+918007869205" className="hover:text-[var(--primary)]">(+91) 8007869205</a></p>
            </address>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ashrafi Graphic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;