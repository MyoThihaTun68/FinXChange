// src/components/Footer.jsx

import React from 'react';
// Import the icons we need from the react-icons library
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import logo from '../assets/icons/logo.svg'; // Re-using the header logo

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12141D] text-zinc-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Top section with logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="FinXChange Logo" className="h-8 w-8" />
            <span className="text-white text-2xl font-bold">
              FinX<span className="text-cyan-400">Change</span>
            </span>
          </a>
        </div>

        {/* Divider line */}
        <hr className="border-zinc-700 mb-8" />

        {/* Bottom section with copyright and social icons */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} FinXChange Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;