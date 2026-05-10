import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Captions, Gauge, Play, Smartphone, Sparkles } from 'lucide-react';

const shortFormClips = [
  {
    title: 'Hook Cut',
    format: '0-3s retention',
    metric: '92%',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop',
    accent: 'from-violet-500 to-fuchsia-500'
  },
  {
    title: 'Caption Flow',
    format: 'Kinetic subtitles',
    metric: '4.8x',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900&auto=format&fit=crop',
    accent: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'Sales Reel',
    format: 'CTA sequence',
    metric: '38s',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=900&auto=format&fit=crop',
    accent: 'from-amber-300 to-red-500'
  }
];

export const Showreel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-black py-24 md:py-32 overflow-hidden"
    >
      
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Smartphone size={14} className="text-violet-400" />
              <span className="font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                Short Form Editing Showreel
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-none text-white">
              Built For The <span className="text-stroke text-transparent">First Scroll</span>
            </h2>

            <p className="mt-6 max-w-xl font-mono text-sm md:text-base text-gray-400 leading-relaxed">
              Fast hooks, caption rhythm, sound-led cuts, and platform-ready versions for Reels, Shorts, and TikTok.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Gauge, label: 'Pacing', value: 'Pattern interrupts' },
                { icon: Captions, label: 'Captions', value: 'Readable motion' },
                { icon: Sparkles, label: 'Polish', value: 'Grade + sound' }
              ].map((item) => (
                <div key={item.label} className="border border-white/10 bg-white/[0.03] px-4 py-4 rounded-lg">
                  <item.icon size={16} className="text-violet-400 mb-3" />
                  <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {shortFormClips.map((clip, index) => (
              <motion.div
                key={clip.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: index === 1 ? 28 : 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                className="group relative aspect-[9/16] overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a]"
              >
                <img
                  src={clip.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${clip.accent}`} />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest">
                    9:16
                  </span>
                  <span className="font-mono text-[9px] text-white/80 bg-black/40 border border-white/10 px-2 py-1 rounded-full">
                    {clip.metric}
                  </span>
                </div>

                <div className="absolute inset-x-3 bottom-3">
                  <div className="mb-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${clip.accent}`}
                      initial={{ width: '18%' }}
                      whileInView={{ width: `${52 + index * 16}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.25 + index * 0.15 }}
                    />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl text-white uppercase leading-none">
                    {clip.title}
                  </h3>
                  <p className="mt-1 font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
                    {clip.format}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
