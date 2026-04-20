
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Monitor, Play, Cpu, Box, Film } from 'lucide-react';

const btsItems = [
  {
    id: '01',
    title: 'TIMELINE ARCHITECTURE',
    category: 'Post-Production',
    description: 'Deconstructing a complex 4K narrative sequence. Every cut is a calculated decision in rhythm and narrative flow.',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be44d0?q=80&w=2070&auto=format&fit=crop',
    stats: ['428 Layers', '120+ Cuts', '32 Audio Tracks']
  },
  {
    id: '02',
    title: 'TECHNICAL VFX',
    category: 'Compositing',
    description: 'Multi-layer compositing, motion tracking, and procedural asset integration for immersive world-building.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    stats: ['Object Tracking', 'Clean Plate', 'Roto-Paint']
  },
  {
    id: '03',
    title: 'THE "COLOR" PROTOCOL',
    category: 'Grading',
    description: 'Transforming logarithmic sensor data into high-contrast cinematic noir. Building mood through tonal density.',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop',
    stats: ['ACES Pipeline', 'Color Space Transform', 'Grain Synthesis']
  }
];

export const BTS: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="bts" className="w-full bg-[#030303] py-32 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Layers size={12} className="text-violet-400" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Post-Production Intel</span>
            </div>
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase text-white">
              Behind The <span className="text-stroke text-transparent">Scenes</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest max-w-sm ml-auto">
              [ ACCESSING CORE FILES // ENCRYPTED WORKFLOW DATA ]
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Menu Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {btsItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`group relative text-left p-6 rounded-xl border transition-all duration-500 ${
                  activeIndex === index 
                    ? 'bg-white/5 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
                    : 'bg-transparent border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg transition-colors ${
                    activeIndex === index ? 'bg-violet-500 text-white' : 'bg-white/5 text-gray-500 group-hover:text-white'
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-gray-500 mb-1 block">{item.id} // {item.category}</span>
                    <h3 className={`font-display text-lg tracking-wide transition-colors ${
                      activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
                {activeIndex === index && (
                  <motion.div 
                    layoutId="bts-active-pill" 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-violet-500 rounded-r-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Visual Content Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Image Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                  <img 
                    src={btsItems[activeIndex].image} 
                    alt={btsItems[activeIndex].title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  />
                  
                  {/* Digital Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

                  {/* Corner Marks */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/30" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/30" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/30" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/30" />

                  {/* Play Button HUD */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center">
                       <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <p className="text-gray-400 text-base leading-relaxed font-mono">
                      {btsItems[activeIndex].description}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                       <span className="font-mono text-[10px] text-violet-400 uppercase tracking-[0.2em] mb-4 block underline underline-offset-4">Project Parameters</span>
                       <div className="flex flex-col gap-3">
                          {btsItems[activeIndex].stats.map((stat) => (
                            <div key={stat} className="flex items-center gap-3 text-xs font-mono text-gray-500">
                               <Box size={12} className="text-violet-500" />
                               {stat}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
