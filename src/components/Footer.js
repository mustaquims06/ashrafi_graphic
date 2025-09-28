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
    <footer className="bg-gray-800 text-white py-6 mt-16"> {/* height kam ki */}
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
          
          {/* Social Media - only icons horizontally */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ashrafi_graphic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors"
              >
                <FaInstagram className="text-2xl text-pink-500" />
              </a>

              <a
                href="https://www.facebook.com/share/16ij5aYnpb/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors"
              >
                <FaFacebook className="text-2xl text-blue-500" />
              </a>

              <a
                href="https://pin.it/66vGZIxMq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors"
              >
                <FaPinterest className="text-2xl text-red-500" />
              </a>

              <a
                href="https://youtube.com/@voiceofashrafigraphic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors"
              >
                <FaYoutube className="text-2xl text-red-600" />
              </a>

              <a
                href="https://t.me/Ashrafi_graphic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors"
              >
                <FaTelegram className="text-2xl text-sky-400" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[var(--primary)] transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[var(--primary)] transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[var(--primary)] transition-colors">
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
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ashrafi Graphic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;