
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Package, Activity, Zap, PenTool, PlayCircle } from 'lucide-react';

const steps = [
  { 
    id: '01', 
    title: 'INGESTION & DECONSTRUCTION', 
    desc: 'Deep deconstruction of raw assets. We identify the narrative core and emotional beats before the first cut.',
    icon: Search,
    detail: '4K RAW // LOG Analysis'
  },
  { 
    id: '02', 
    title: 'THE ASSEMBLY SKELETON', 
    desc: 'Building the narrative foundation. Framing the story rhythm without the distraction of effects.',
    icon: Package,
    detail: 'Narrative Flow // Pacing'
  },
  { 
    id: '03', 
    title: 'KINETIC RHYTHM', 
    desc: 'Injecting energy. Frame-perfect synchronization between visual velocity and auditory impact.',
    icon: Activity,
    detail: 'Frame-Sync // Momentum'
  },
  { 
    id: '04', 
    title: 'COLOR & VFX ALCHEMY', 
    desc: 'Technical artistry. Atmospheric grading and seamless visual effects integration.',
    icon: Zap,
    detail: 'ACES // Node-Based'
  },
  { 
    id: '05', 
    title: 'FINAL MASTERING', 
    desc: 'The elite finish. Metadata optimization and multi-platform delivery standards.',
    icon: PenTool,
    detail: '4K HDR // ProRES 4444'
  },
];

export const Process: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#030303]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Background Label */}
        <div className="absolute top-12 left-12 flex items-center gap-4">
           <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
           <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em]">System // Workflow_V2.0</span>
        </div>

        {/* The "Timeline" Header */}
        <div className="absolute top-1/4 left-12 z-20">
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-none italic">
                Workflow <br /> <span className="text-stroke text-transparent">Architecture</span>
            </h2>
        </div>

        {/* Progress Tape (NLE Style) */}
        <div className="absolute bottom-24 left-0 w-full h-16 border-t border-b border-white/5 bg-black/40 backdrop-blur-sm z-30 flex items-center px-12">
            <div className="flex items-center gap-8 w-full">
                <div className="font-mono text-[10px] text-violet-500 font-bold whitespace-nowrap">TIMELINE // MASTER</div>
                <div className="flex-1 h-[1px] bg-white/10 relative">
                    <motion.div 
                        style={{ scaleX: scrollYProgress }}
                        className="absolute inset-0 bg-violet-600 origin-left shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                    />
                    {/* Playhead */}
                    <motion.div 
                        style={{ left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-violet-600 rounded-sm rotate-45 z-10"
                    />
                </div>
                <div className="font-mono text-[10px] text-gray-500">00:00:24:12</div>
            </div>
        </div>

        {/* Horizontal Moving Cards */}
        <div className="relative flex items-center px-12 md:px-[40vw]">
          <motion.div style={{ x: springX }} className="flex gap-12 md:gap-32">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="relative w-[85vw] md:w-[600px] flex-shrink-0"
              >
                {/* Large Background ID */}
                <div className="absolute -top-12 -left-8 font-display text-[12rem] md:text-[20rem] font-bold text-white/[0.03] select-none pointer-events-none">
                    {step.id}
                </div>

                <div className="relative z-10 p-8 md:p-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl group hover:border-violet-500/50 transition-colors duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div className="p-4 rounded-xl bg-violet-600/20 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                            <step.icon size={32} />
                        </div>
                        <div className="font-mono text-[10px] text-gray-500 tracking-widest">{step.detail}</div>
                    </div>

                    <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase mb-6 tracking-tight group-hover:text-violet-400 transition-colors">
                        {step.title}
                    </h3>
                    
                    <p className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed mb-8 max-w-md">
                        {step.desc}
                    </p>

                    <div className="flex items-center gap-3 py-4 border-t border-white/5">
                        <PlayCircle size={14} className="text-violet-500" />
                        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">Protocol Verified // 100% Locked</span>
                    </div>
                </div>

                {/* Vertical Connector Path */}
                {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-24 w-16 h-[1px] bg-gradient-to-r from-violet-500 to-transparent opacity-30" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/5 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};