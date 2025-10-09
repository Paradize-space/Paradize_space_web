import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center xl:text-lg md:text-md sm:text-xs">
        <p>&copy; 2025 paradize.space. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="https://x.com/paradize_space" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 transition-transform duration-300 hover:scale-125" />
          </a>
          <a href="http://linkedin.com/company/paradize-space" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6 transition-transform duration-300 hover:scale-125" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
