import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 800px)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#contact"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ width: 'auto', paddingRight: '20px' }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-0 overflow-hidden h-14 bg-violet-600 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)] text-white group"
          style={{ width: '56px' }} // Start as circle
        >
          <div className="min-w-[56px] h-full flex items-center justify-center">
            <MessageSquare size={24} className="fill-white" />
          </div>
          <span className="font-mono text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-2">
            LET'S TALK
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};
