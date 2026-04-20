import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="w-full bg-black py-20 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">TALK</span>
          </h2>
          <a href="mailto:hello@biniyam.edit" className="font-mono text-gray-400 hover:text-white transition-colors text-lg">
            hello@biniyam.edit
          </a>
        </motion.div>

        <div className="flex gap-8 mb-12">
          {[Github, Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full pt-8 border-t border-white/5 font-mono text-xs text-gray-600">
          <p>© 2024 BINIYAM EDITS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, 'contact')} 
              className="hover:text-gray-400 transition-colors"
            >
              PRIVACY
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, 'contact')} 
              className="hover:text-gray-400 transition-colors"
            >
              TERMS
            </a>
            <a 
              href="#top" 
              onClick={(e) => handleSmoothScroll(e, 'top')} 
              className="hover:text-gray-400 transition-colors"
            >
              SITEMAP
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};