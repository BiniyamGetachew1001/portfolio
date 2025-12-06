import React from 'react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, duration: 1, ease: "circOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
        <span className="font-display font-bold text-lg tracking-tight text-white">BE.</span>
        
        <div className="hidden md:flex gap-6 font-mono text-xs text-gray-300">
          <a href="#work" className="hover:text-white transition-colors">WORK</a>
          <a href="#services" className="hover:text-white transition-colors">SERVICES</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        </div>

        <a href="#contact" className="bg-white text-black font-bold font-mono text-xs px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
          LET'S TALK
        </a>
      </div>
    </motion.nav>
  );
};