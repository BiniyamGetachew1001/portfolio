import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Zap, Download, ArrowRight, Layers, Clock, Eye, Film } from 'lucide-react';

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================

const AnimatedCounter: React.FC<{ 
  value: number; 
  suffix?: string;
  duration?: number;
}> = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * value));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// ============================================
// CLEAN CINEMATIC PORTRAIT
// ============================================

const CinematicPortrait: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <div className="w-full lg:w-5/12 h-[50vh] lg:h-screen sticky top-0 overflow-hidden bg-[#020202] border-b lg:border-b-0 lg:border-r border-white/5">
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src="https://images.unsplash.com/photo-1626307416562-ee839676f5b1?q=80&w=1887&auto=format&fit=crop"
          alt="Cinematic Setup"
          className="w-full h-full object-cover grayscale-[30%] contrast-[1.1] saturate-[1.1]"
        />

        {/* Minimal Letterbox & Gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 pointer-events-none" />
      </motion.div>

      {/* Clean HUD Overlay */}
      <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-between">
        <div className="flex justify-between items-center text-white/80">
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase">REC</span>
          </div>
          <span className="font-mono text-[10px] font-bold tracking-widest text-violet-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            4K // ProRes
          </span>
        </div>

        <div className="flex justify-between items-end text-white/60 font-mono text-[10px] tracking-widest">
           <div className="flex flex-col gap-1">
              <span>SYS.OP: BINIYAM</span>
              <span className="text-violet-400">ARCHITECT</span>
           </div>
           <div className="flex gap-4 opacity-50 hidden md:flex">
              <span>ISO 800</span>
              <span>f/1.8</span>
              <span>5600K</span>
           </div>
        </div>
      </div>

      {/* Subtle Grain */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// ============================================
// MAIN ABOUT COMPONENT
// ============================================

const skills = [
  { name: 'Premiere Pro', level: 98, category: 'NLE' },
  { name: 'After Effects', level: 92, category: 'VFX' },
  { name: 'DaVinci Resolve', level: 95, category: 'Color' },
];

const stats = [
  { value: 5, suffix: '+', label: 'Years Active', icon: Clock },
  { value: 100, suffix: 'M+', label: 'Views Engineered', icon: Eye },
  { value: 350, suffix: '+', label: 'Assets Delivered', icon: Film },
  { value: 99, suffix: '%', label: 'Client Retention', icon: Zap },
];

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-[#020202] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left: Clean Portrait */}
      <CinematicPortrait />

      {/* Right: Content Streamlined */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center px-6 py-20 lg:p-24 z-10">
        <div className="max-w-2xl w-full">
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 mb-8 backdrop-blur-md"
          >
            <Camera size={14} className="text-violet-500" />
            <span className="font-mono text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase">
              The Architect
            </span>
          </motion.div>

          {/* Headline & Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h3 className="font-display text-5xl md:text-7xl mb-6 text-white leading-[0.9] uppercase italic tracking-tighter">
              Beyond <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">The Cut.</span>
            </h3>
            <p className="text-gray-400 font-mono text-sm leading-loose mt-8">
              I don't just edit footage; I <span className="text-white font-bold bg-white/5 px-1 rounded border border-white/10">engineer retention</span>. 
              Specializing in high-energy visuals with a cinematic edge, I blend pacing, color theory, and advanced sound 
              design to transform raw chaos into rhythmic, scroll-stopping storytelling. 
            </p>
            
            <div className="mt-8 relative pl-6 border-l-2 border-violet-500/50">
              <h4 className="font-display text-2xl text-white uppercase tracking-tight mb-2">
                Retention Architecture
              </h4>
              <p className="text-gray-500 font-mono text-xs leading-relaxed">
                In an age of 3-second attention spans, I build structures that keep eyes glued.
                From the micro-hook to the macro-narrative, every frame serves a strategic purpose.
              </p>
            </div>
          </motion.div>

          {/* Simplified Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-8">
               <Layers size={16} className="text-violet-500" />
               <h3 className="font-display text-3xl text-white uppercase italic tracking-tight">Core Stack</h3>
            </div>
            
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-lg text-white font-display uppercase tracking-wider">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">
                      {skill.category}
                    </span>
                  </div>
                  <div className="h-[2px] bg-white/5 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="group">
                <h4 className="font-display text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h4>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-[0.2em] group-hover:text-violet-400 transition-colors">
                    {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a href="/pricing.html" className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(127,0,255,0.4)] hover:scale-[1.02] transition-all">
                Initiate Protocol
                <ArrowRight size={14} />
            </a>
            
            <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                <Download size={14} />
                Download Deck
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
