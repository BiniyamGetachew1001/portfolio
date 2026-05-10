import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Monitor, Play, Cpu, Box, Film, Terminal, Zap, Crosshair } from 'lucide-react';

const btsItems = [
  {
    id: '01',
    title: 'Timeline Architecture',
    category: 'Post-Production',
    description: 'Deconstructing a complex 4K narrative sequence. Every cut is a calculated decision in rhythm, pacing, and narrative flow. We engineer attention through precise visual beats.',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be44d0?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Layer Density', value: '428+', type: 'bar', fill: 85 },
      { label: 'Cuts per Minute', value: '120', type: 'bar', fill: 95 },
      { label: 'Audio Tracks', value: '32', type: 'text' }
    ],
    accent: 'violet'
  },
  {
    id: '02',
    title: 'Technical VFX',
    category: 'Compositing',
    description: 'Multi-layer compositing, advanced motion tracking, and procedural asset integration. We build immersive worlds that feel grounded, tactile, and completely invisible to the viewer.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Render Nodes', value: '12', type: 'bar', fill: 60 },
      { label: 'Object Tracking', value: 'Sub-pixel', type: 'text' },
      { label: 'Clean Plate', value: 'Active', type: 'text' }
    ],
    accent: 'fuchsia'
  },
  {
    id: '03',
    title: 'The Color Protocol',
    category: 'Grading',
    description: 'Transforming logarithmic sensor data into high-contrast cinematic noir. Building mood, separating subjects, and enforcing brand identity through surgical tonal density.',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'ACES Pipeline', value: 'Active', type: 'text' },
      { label: 'Look Up Tables', value: 'Custom', type: 'text' },
      { label: 'Grain Synthesis', value: '35mm', type: 'text' }
    ],
    accent: 'amber'
  }
];

export const BTS: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="bts" className="w-full bg-black py-40 px-4 relative overflow-hidden">
      {/* Dynamic Background Glow based on active index */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000 opacity-20 pointer-events-none" 
           style={{ 
             background: `radial-gradient(circle at 70% 50%, var(--tw-colors-${btsItems[activeIndex].accent}-600), transparent 50%)` 
           }} 
      />
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 mb-6 backdrop-blur-md">
              <Terminal size={12} className="text-violet-500" />
              <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">System Diagnostics</span>
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-bold uppercase text-white leading-none tracking-tighter italic">
              Behind The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Scenes</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.2em] max-w-sm ml-auto border-l-2 border-violet-500/30 pl-4">
              Accessing core project files. <br/>
              Decrypting workflow data. <br/>
              Visual engineering in progress.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Menu Column */}
          <div className="lg:col-span-4 flex flex-col gap-4 relative">
            {/* Vertical Connection Line */}
            <div className="absolute left-[33px] top-8 bottom-8 w-[1px] bg-white/5 z-0" />

            {btsItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative text-left p-4 rounded-2xl transition-all duration-500 z-10 ${
                    isActive 
                      ? 'bg-white/[0.03] border border-white/10 shadow-[0_0_30px_rgba(127,0,255,0.1)] backdrop-blur-md' 
                      : 'bg-transparent border border-transparent hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon Box */}
                    <div className={`relative p-4 rounded-xl transition-all duration-500 ${
                      isActive 
                        ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30 shadow-[0_0_15px_rgba(127,0,255,0.3)]' 
                        : 'bg-black text-gray-600 border border-white/5 group-hover:border-white/20 group-hover:text-white'
                    }`}>
                      <item.icon size={20} />
                      {isActive && (
                          <div className="absolute inset-0 border border-violet-400 rounded-xl animate-ping opacity-20" />
                      )}
                    </div>
                    
                    {/* Text Details */}
                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${isActive ? 'text-violet-400' : 'text-gray-600'}`}>
                          Protocol {item.id}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600">
                          {item.category}
                        </span>
                      </div>
                      <h3 className={`font-display text-2xl tracking-wide uppercase italic transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="bts-active-indicator" 
                      className="absolute -left-px top-4 bottom-4 w-[2px] bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-r-full shadow-[0_0_10px_rgba(127,0,255,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Visual Content Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Main Media Container */}
                <div className="relative aspect-[16/10] md:aspect-video rounded-3xl overflow-hidden border border-white/10 group bg-black shadow-2xl">
                  <img 
                    src={btsItems[activeIndex].image} 
                    alt={btsItems[activeIndex].title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/50 via-transparent to-[#020202]/50 opacity-50" />
                  
                  {/* Digital Glitch/Scanlines */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                       style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />

                  {/* HUD Elements */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-mono text-[9px] text-white tracking-[0.2em] font-bold shadow-black drop-shadow-md">LIVE FEED</span>
                  </div>
                  
                  <div className="absolute top-6 right-6 font-mono text-[9px] text-white/50 tracking-[0.2em] flex flex-col items-end">
                    <span>SYS.OP // {btsItems[activeIndex].id}</span>
                    <span className="text-violet-400">{btsItems[activeIndex].category}</span>
                  </div>

                  {/* Center Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                     <Crosshair size={100} strokeWidth={0.5} className="text-white" />
                  </div>

                  {/* Play HUD */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all cursor-none overflow-hidden relative">
                       <Play size={24} className="text-white fill-white ml-2 relative z-10" />
                       <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/40 to-fuchsia-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Telemetry Data Card */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Description Box */}
                  <div className="md:col-span-7 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={14} className="text-violet-500" />
                      <h4 className="font-display text-xl text-white uppercase tracking-wider">Mission Brief</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed font-mono">
                      {btsItems[activeIndex].description}
                    </p>
                  </div>
                  
                  {/* Stats / Parameters Box */}
                  <div className="md:col-span-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm hover:border-violet-500/20 transition-colors group">
                    <div className="flex items-center justify-between mb-6">
                       <span className="font-mono text-[10px] text-violet-400 font-bold uppercase tracking-[0.2em]">Telemetry Data</span>
                       <Box size={14} className="text-gray-600 group-hover:text-violet-400 transition-colors" />
                    </div>
                    
                    <div className="flex flex-col gap-5">
                      {btsItems[activeIndex].stats.map((stat, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between items-center text-[10px] font-mono">
                             <span className="text-gray-500 uppercase tracking-widest">{stat.label}</span>
                             <span className="text-white font-bold tracking-wider">{stat.value}</span>
                           </div>
                           {stat.type === 'bar' && (
                             <div className="h-1 w-full bg-black rounded-full overflow-hidden border border-white/5">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${stat.fill}%` }}
                                 transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                 className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-[0_0_10px_rgba(127,0,255,0.5)]" 
                               />
                             </div>
                           )}
                           {stat.type === 'text' && (
                              <div className="w-full border-t border-dashed border-white/10 pt-1" />
                           )}
                        </div>
                      ))}
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
