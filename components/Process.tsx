import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Scissors, Activity, Aperture, HardDrive, Play, FastForward } from 'lucide-react';

const steps = [
  { 
    id: '01', 
    title: 'Ingestion & Logging', 
    desc: 'Deep deconstruction of raw assets. We identify the narrative core and emotional beats before the first cut. Proxy generation and metadata tagging.',
    icon: HardDrive,
    detail: '4K RAW // PROXY SYNC',
    color: 'from-blue-600 to-indigo-600'
  },
  { 
    id: '02', 
    title: 'The Assembly Skeleton', 
    desc: 'Building the narrative foundation. Framing the story rhythm, structuring the A-roll, and blocking the macro-pacing without effects.',
    icon: Scissors,
    detail: 'NARRATIVE FLOW // A-ROLL',
    color: 'from-violet-600 to-fuchsia-600'
  },
  { 
    id: '03', 
    title: 'Kinetic Rhythm', 
    desc: 'Injecting extreme energy. Frame-perfect synchronization between visual velocity, micro-hooks, and auditory impact. The B-roll integration.',
    icon: Activity,
    detail: 'FRAME-SYNC // B-ROLL',
    color: 'from-fuchsia-600 to-pink-600'
  },
  { 
    id: '04', 
    title: 'Color & VFX Alchemy', 
    desc: 'Technical artistry. Node-based atmospheric grading, motion tracking, and seamless visual effects integration to enforce brand identity.',
    icon: Aperture,
    detail: 'ACES PIPELINE // TRACKING',
    color: 'from-orange-500 to-amber-500'
  },
  { 
    id: '05', 
    title: 'Final Mastering', 
    desc: 'The elite finish. Audio mixing, metadata optimization, and exporting to strict multi-platform delivery standards.',
    icon: Search,
    detail: 'PRORES 422 // LUFS -14',
    color: 'from-green-500 to-emerald-500'
  },
];

export const Process: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // High scroll height to give enough time to read each card smoothly
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map progress to horizontal translation
  // Moves from 0% (first card center) to roughly -80% (last card center)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-violet-900/10 to-transparent" />
           <div 
             className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
           />
        </div>
        
        {/* Top Header Panel */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 flex justify-between items-start">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-violet-500 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
                   <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">System Architecture</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-white uppercase italic tracking-tighter">
                    Editing <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Pipeline</span>
                </h2>
            </div>
            
            <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase">
               <span>Module: Timeline.exe</span>
               <span>Status: Render Active</span>
            </div>
        </div>

        {/* The Central "Playhead" Target Line (Fixed in center of screen) */}
        <div className="absolute left-12 md:left-[40vw] top-0 bottom-0 w-[1px] bg-white/10 z-10 pointer-events-none">
            {/* Playhead Laser Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[300px] bg-gradient-to-b from-transparent via-violet-500 to-transparent opacity-50" />
        </div>

        {/* Horizontal Moving Cards Wrapper */}
        <div className="relative flex items-center px-12 md:px-[40vw] z-20 mt-16 md:mt-0">
          <motion.div style={{ x }} className="flex gap-8 md:gap-32 items-center">
            {steps.map((step, index) => {
              // Creating a staggered "clip" look
              return (
                <div 
                  key={step.id} 
                  className="relative w-[85vw] md:w-[600px] flex-shrink-0 group"
                >
                  {/* Clip Block Node Design */}
                  <div className="relative z-10 bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl transition-all duration-700 hover:bg-white/[0.04] hover:border-white/20 shadow-2xl">
                      
                      {/* Node Connection Points */}
                      <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-[10px] h-[10px] bg-black border-2 border-gray-600 rounded-full z-20" />
                      <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-[10px] h-[10px] bg-black border-2 border-gray-600 rounded-full z-20" />

                      {/* Header */}
                      <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-6">
                          <div className={`p-4 rounded-xl bg-gradient-to-br ${step.color} shadow-lg text-white`}>
                              <step.icon size={24} />
                          </div>
                          <div className="text-right">
                              <div className="font-display text-4xl font-bold text-white/20 italic leading-none">{step.id}</div>
                              <div className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.2em] mt-1">{step.detail}</div>
                          </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-white uppercase italic tracking-tight mb-4">
                          {step.title}
                      </h3>
                      
                      <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-md h-20">
                          {step.desc}
                      </p>

                      {/* Footer Tech Badge */}
                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Protocol Active // Node {step.id}</span>
                      </div>
                  </div>

                  {/* Horizontal Connector Line between nodes */}
                  {index < steps.length - 1 && (
                      <div className="absolute top-1/2 right-[-2rem] md:right-[-8rem] w-[2rem] md:w-[8rem] h-[2px] bg-white/10 z-0 flex items-center">
                         <div className="w-full h-full bg-gradient-to-r from-violet-500/50 to-transparent" />
                      </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* NLE Timeline UI (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 z-30 pt-4 pb-8 md:pb-12 px-6 md:px-12">
            
            {/* Timeline Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <Play size={14} className="text-white fill-white" />
                    <FastForward size={14} className="text-gray-500" />
                    <span className="font-mono text-[10px] text-violet-400 font-bold border border-violet-500/30 px-2 py-0.5 rounded ml-2">MASTERING SEQUENCE</span>
                </div>
                <div className="font-mono text-xs md:text-sm text-white tracking-widest">
                    <span className="text-gray-500">TC //</span> 01:24:<motion.span>{useTransform(smoothProgress, [0, 1], [0, 59], { clamp: true }).get().toFixed(0).padStart(2, '0')}</motion.span>:<span className="text-gray-500">12</span>
                </div>
            </div>

            {/* Scrubber / Waveform Area */}
            <div className="relative w-full h-16 bg-black/50 border border-white/5 rounded-lg overflow-hidden flex flex-col justify-end">
                {/* Fake Audio Waveform */}
                <div className="absolute inset-x-0 bottom-0 h-8 flex items-end gap-[2px] opacity-30 px-2">
                    {Array.from({ length: 150 }).map((_, i) => (
                        <div 
                           key={i} 
                           className="flex-1 bg-green-500" 
                           style={{ height: `${Math.random() * 100}%` }} 
                        />
                    ))}
                </div>

                {/* Progress Bar (Video Track) */}
                <div className="absolute top-2 inset-x-2 h-4 bg-white/5 rounded-[2px] overflow-hidden">
                    <motion.div 
                        style={{ scaleX: smoothProgress }}
                        className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 origin-left" 
                    />
                </div>

                {/* Vertical Playhead Scrubber */}
                <motion.div 
                    style={{ left: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                    className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-10 shadow-[0_0_10px_rgba(239,68,68,1)] ml-2"
                >
                    <div className="absolute -top-1 -translate-x-1/2 w-3 h-2 bg-red-500 rounded-sm" />
                </motion.div>
            </div>
        </div>

      </div>
    </section>
  );
};