import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, PenTool, Activity, Zap, Package, Radio } from 'lucide-react';

const steps = [
  { id: '01', title: 'Discovery', desc: 'Deconstructing the creative brief & story objectives.', icon: Search },
  { id: '02', title: 'Assembly', desc: 'Raw footage breakdown & narrative skeleton.', icon: Package },
  { id: '03', title: 'Rhythm', desc: 'Pacing, flow, and retention optimization.', icon: Activity },
  { id: '04', title: 'Alchemy', desc: 'Motion graphics, color grading & sound design.', icon: Zap },
  { id: '05', title: 'Delivery', desc: 'Final polish & format optimization.', icon: PenTool },
];

const TimelineCard: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "-40% 0px -40% 0px", once: false });

  return (
    <div 
      ref={cardRef}
      className={`relative flex items-center justify-between md:justify-center w-full mb-24 last:mb-0 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
        {/* Empty Half for Grid Alignment (Desktop) */}
        <div className="hidden md:block w-5/12" />

        {/* Center Node on the Line */}
        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
            <motion.div
                animate={{ 
                  scale: isInView ? 1 : 0, 
                  backgroundColor: isInView ? "#8b5cf6" : "#1a1a1a",
                  borderColor: isInView ? "#8b5cf6" : "#333"
                }}
                className="w-4 h-4 rounded-full border-2 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-colors duration-500"
            >
              {isInView && (
                 <motion.div 
                   className="absolute inset-0 rounded-full bg-violet-500"
                   animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                 />
              )}
            </motion.div>
        </div>

        {/* The Card */}
        <motion.div
            className={`w-[calc(100%-4rem)] md:w-5/12 ml-16 md:ml-0 p-1`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <motion.div
              animate={{
                 opacity: isInView ? 1 : 0.3,
                 filter: isInView ? 'grayscale(0%)' : 'grayscale(100%)',
                 scale: isInView ? 1 : 0.95,
                 borderColor: isInView ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.05)'
              }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#8b5cf6',
                opacity: 1,
                filter: 'grayscale(0%)'
              }}
              transition={{ duration: 0.3 }}
              className="relative p-6 md:p-8 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 overflow-hidden group cursor-default"
            >
                {/* Background Noise Texture */}
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                
                {/* Background Number */}
                <div className="absolute -right-2 -bottom-6 font-display font-bold text-8xl md:text-9xl text-white/[0.02] z-0 select-none group-hover:text-violet-500/[0.05] transition-colors duration-500 text-stroke">
                    {step.id}
                </div>

                {/* Content Container */}
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-violet-500/10 text-violet-400 group-hover:text-white group-hover:bg-violet-500 transition-all duration-300 ${isInView ? 'animate-pulse-slow' : ''}`}>
                            <step.icon size={24} />
                        </div>
                        <Radio size={16} className={`text-violet-500 ${isInView ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                    </div>

                    <h3 className={`font-display text-xl md:text-2xl mb-2 transition-colors duration-300 ${isInView ? 'text-white' : 'text-gray-500'}`}>
                        {step.title}
                    </h3>
                    
                    <p className="font-mono text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        {step.desc}
                    </p>
                </div>

                {/* Active Beam Gradient Inside Card */}
                {isInView && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-transparent pointer-events-none" 
                  />
                )}
            </motion.div>
        </motion.div>
    </div>
  );
};

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="w-full bg-[#030303] py-32 px-4 relative overflow-hidden">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto relative">
             {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24 md:mb-32 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">System Boot Sequence</span>
                </div>
                <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tight text-white mb-2">
                    Workflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Architecture</span>
                </h2>
            </motion.div>

            <div className="relative">
                {/* Center Timeline Track (Background) */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full" />

                {/* Active Beam (Foreground) */}
                <motion.div
                    style={{ height }}
                    className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-violet-500 via-fuchsia-500 to-violet-500 -translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.6)] z-10 rounded-full"
                />

                {/* Beam Head (Leading Edge) */}
                <motion.div 
                    style={{ top: height }}
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-transparent to-violet-500 blur-sm z-10 -translate-y-full"
                />

                {/* Steps */}
                <div className="relative z-20 pb-24">
                    {steps.map((step, index) => (
                        <TimelineCard key={step.id} step={step} index={index} />
                    ))}
                </div>
            </div>
            
            {/* Bottom Connector */}
            <div className="flex justify-center mt-[-6rem] relative z-20">
                <div className="w-3 h-3 bg-white/10 rounded-full border border-white/20" />
            </div>
        </div>
    </section>
  );
};