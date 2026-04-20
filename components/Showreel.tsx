import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

export const Showreel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen flex items-center justify-center bg-black py-20">
      
      {/* Ambient background glow when active */}
      <motion.div 
        animate={{ opacity: isInView ? 0.3 : 0 }}
        className="absolute inset-0 bg-blue-900/20 blur-[150px] transition-opacity duration-1000"
      />

      <div className="w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex justify-between items-end mb-4 font-mono text-xs text-gray-500">
          <span>SHOWREEL 2024</span>
          <span>00:60</span>
        </div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0.5 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-video w-full bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden group cursor-pointer"
        >
          {/* Overlay Play Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-20">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center bg-white/5"
            >
              <Play className="fill-white text-white ml-1" size={24} />
            </motion.div>
          </div>

          <video 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            loop
            muted
            playsInline
            // Placeholder showreel
            poster="https://picsum.photos/1920/1080?grayscale"
          >
             <source src="https://videos.pexels.com/video-files/3205915/3205915-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          
          {/* Custom minimal controls UI simulation */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-[1px] bg-white/20">
              <div className="w-1/3 h-full bg-white relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};