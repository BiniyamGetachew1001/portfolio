import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    // Detect if we are currently on the homepage
    const path = window.location.pathname;
    const isHome = path === '/' || path === '/index.html' || path === '';
    setIsHomePage(isHome);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, duration: 1, ease: "circOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
        <a href="/" className="font-display font-bold text-lg tracking-tight text-white cursor-none">BE.</a>
        
        <div className="hidden md:flex gap-6 font-mono text-xs text-gray-300">
          <a href={isHomePage ? "#work" : "/#work"} className="hover:text-white transition-colors">WORK</a>
          <a href="/gallery.html" className="hover:text-white transition-colors">GRAPHICS</a>
          <a href="/pricing.html" className="hover:text-white transition-colors">PRICING</a>
          <a href={isHomePage ? "#services" : "/#services"} className="hover:text-white transition-colors">SERVICES</a>
          <a href={isHomePage ? "#about" : "/#about"} className="hover:text-white transition-colors">ABOUT</a>
          <a href="/biniyam_cv.html" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">CV / RESUME</a>
        </div>

        <a href={isHomePage ? "#contact" : "/#contact"} className="bg-white text-black font-bold font-mono text-xs px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
          LET'S TALK
        </a>
      </div>
    </motion.nav>
  );
};