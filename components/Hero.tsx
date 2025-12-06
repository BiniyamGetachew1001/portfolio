import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 grayscale scale-105"
        >
          {/* Using a placeholder abstract video */}
          <source src="https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* SVG Mask Layer for "Text Window" Effect - Visual concept logic */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-black mix-blend-screen" />
      
      {/* Content Container */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 text-center px-4 mix-blend-lighten"
      >
        <h1 className="font-display font-bold text-5xl md:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-transparent opacity-90">
          CHAOS INTO <br />
          <span className="relative italic font-sans font-extrabold text-stroke inline-block">
            RHYTHM
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent pointer-events-none mix-blend-overlay">
              RHYTHM
            </span>
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-6 font-mono text-gray-400 text-xs md:text-base max-w-lg mx-auto"
        >
          BINIYAM EDITS. HIGH-IMPACT STORYTELLING FOR BRANDS & CREATORS.
        </motion.p>
      </motion.div>

      {/* Magnetic CTA Wrapper */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-16 z-30 flex flex-col items-center gap-6"
      >
        <button 
          data-cursor-text="WATCH"
          className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
        >
          <span className="font-mono text-xs font-bold tracking-widest text-white">WATCH REEL</span>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform">
            <ArrowDown size={14} />
          </div>
        </button>
        
        <p className="font-display text-sm tracking-widest text-violet-400/80 uppercase">
          Designing Emotion. Engineering Impact.
        </p>
      </motion.div>
      
      {/* Overlay gradient at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
};
