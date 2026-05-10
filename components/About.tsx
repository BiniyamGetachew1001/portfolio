import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue,
  AnimatePresence,
  MotionValue
} from 'framer-motion';
import { 
  Camera, 
  Film, 
  Sparkles, 
  Award, 
  Zap, 
  Play, 
  Pause,
  Volume2,
  Eye,
  Clock,
  Layers,
  Download,
  ArrowRight
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

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
// VIEWFINDER COMPONENTS
// ============================================

const Histogram: React.FC<{ isActive: boolean }> = React.memo(({ isActive }) => {
  const bars = useMemo(() => 
    Array.from({ length: 32 }, (_, i) => ({
      height: Math.sin(i * 0.3) * 30 + Math.random() * 40 + 20,
      delay: i * 0.02
    })), 
  []);

  return (
    <div className="flex items-end gap-[1px] h-8 opacity-60">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-gradient-to-t from-green-500/50 via-green-400 to-yellow-400"
          initial={{ height: 4 }}
          animate={{ 
            height: isActive ? `${bar.height}%` : 4,
            opacity: isActive ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{ 
            height: { duration: 0.5, delay: bar.delay },
            opacity: { duration: 1, repeat: Infinity, delay: i * 0.05 }
          }}
        />
      ))}
    </div>
  );
});

Histogram.displayName = 'Histogram';

const AudioMeter: React.FC<{ channel: 'L' | 'R'; isActive: boolean }> = ({ channel, isActive }) => {
  const segments = 12;
  
  return (
    <div className="flex flex-col-reverse gap-[2px]">
      <span className="text-[8px] font-mono text-gray-500 text-center mt-1">{channel}</span>
      {Array.from({ length: segments }, (_, i) => {
        const threshold = i / segments;
        const color = i > 9 ? 'bg-red-500' : i > 6 ? 'bg-yellow-500' : 'bg-green-500';
        
        return (
          <motion.div
            key={i}
            className={`w-3 h-1 rounded-[1px] ${color}`}
            initial={{ opacity: 0.1 }}
            animate={isActive ? {
              opacity: [0.1, threshold < 0.7 ? 1 : 0.1, 0.1],
            } : { opacity: 0.1 }}
            transition={{
              duration: 0.3 + Math.random() * 0.2,
              repeat: Infinity,
              delay: Math.random() * 0.5
            }}
          />
        );
      })}
    </div>
  );
};

// Optimized FocusBrackets using MotionValues
const FocusBrackets: React.FC<{ 
  mouseX: MotionValue<number>; 
  mouseY: MotionValue<number>; 
  isHovered: boolean;
}> = ({ mouseX, mouseY, isHovered }) => {
  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      style={{ 
        left: x, 
        top: y,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <motion.div
        className="relative w-40 h-40"
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 1.5, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Corner brackets */}
        {[
          'top-0 left-0 border-t-[3px] border-l-[3px]',
          'top-0 right-0 border-t-[3px] border-r-[3px]',
          'bottom-0 left-0 border-b-[3px] border-l-[3px]',
          'bottom-0 right-0 border-b-[3px] border-r-[3px]'
        ].map((classes, i) => (
          <motion.div
            key={i}
            className={`absolute w-6 h-6 border-white/80 ${classes}`}
            animate={{ 
              boxShadow: isHovered 
                ? '0 0 15px rgba(255,255,255,0.4), inset 0 0 15px rgba(255,255,255,0.4)' 
                : 'none' 
            }}
          />
        ))}
        
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-[1px] bg-white/60" />
          <div className="w-[1px] h-6 bg-white/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 shadow-[0_0_8px_rgba(239,68,68,1)]" />
        </div>

        {/* Focus confirmation */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500/20 border border-green-500/50 backdrop-blur-sm rounded text-[9px] font-mono text-green-400 tracking-widest uppercase shadow-[0_0_10px_rgba(34,197,94,0.3)]"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
          transition={{ delay: 0.3 }}
        >
          Auto Focus Locked
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ScanLines: React.FC = React.memo(() => (
  <div 
    className="absolute inset-0 pointer-events-none z-40 opacity-[0.04]"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)',
    }}
  />
));

ScanLines.displayName = 'ScanLines';

const RecordingIndicator: React.FC<{ isRecording: boolean }> = ({ isRecording }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 14, seconds: 23, frames: 9 });

  useEffect(() => {
    if (!isRecording) return;
    
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds, frames } = prev;
        frames++;
        if (frames >= 24) { frames = 0; seconds++; }
        if (seconds >= 60) { seconds = 0; minutes++; }
        if (minutes >= 60) { minutes = 0; hours++; }
        return { hours, minutes, seconds, frames };
      });
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-4 bg-black/40 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/5">
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: isRecording ? [1, 0.4, 1] : 0.4 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className={`w-3.5 h-3.5 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-600'} shadow-[0_0_12px_rgba(220,38,38,0.9)]`} />
        <span className="text-white font-bold text-xs tracking-wider">{isRecording ? 'REC' : 'STBY'}</span>
      </motion.div>
      <span className="text-red-400 tabular-nums font-mono text-sm tracking-wider">
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}<span className="text-red-400/50">:{formatTime(time.frames)}</span>
      </span>
    </div>
  );
};

// ============================================
// VIEWFINDER IMAGE COMPONENT
// ============================================

const ViewfinderImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 overflow-hidden bg-black group cursor-crosshair border-b lg:border-b-0 lg:border-r border-white/10"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        {/* Handheld drift */}
        <motion.div
          className="w-[110%] h-[110%] -ml-[5%] -mt-[5%]"
          animate={{
            x: ["-0.5%", "0.5%", "-0.3%", "0.3%", "0%"],
            y: ["-0.5%", "0.3%", "0.5%", "-0.3%", "0%"],
            rotate: [-0.2, 0.2, -0.1, 0.1, 0]
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1626307416562-ee839676f5b1?q=80&w=1887&auto=format&fit=crop"
            alt="Cinematic Setup"
            className="w-full h-full object-cover transition-all duration-1000 ease-out"
            style={{
              filter: isHovered 
                ? 'grayscale(0%) blur(0px) contrast(1.15) saturate(1.2)' 
                : 'grayscale(100%) blur(2px) contrast(1.2) saturate(0.8)'
            }}
          />
        </motion.div>

        {/* Cinematic Letterbox / Vignette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
          }}
        />
      </motion.div>

      {/* Scan lines */}
      <ScanLines />

      {/* Focus brackets that follow mouse via MotionValues */}
      <FocusBrackets 
        mouseX={mouseX} 
        mouseY={mouseY} 
        isHovered={isHovered} 
      />

      {/* Viewfinder UI Overlay */}
      <div className="absolute inset-0 p-6 pointer-events-none z-20 flex flex-col justify-between font-mono text-[10px] md:text-[11px] tracking-wider">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start text-white">
          <RecordingIndicator isRecording={isRecording} />
          
          <div className="flex items-center gap-6">
            <motion.button
              className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded border border-white/20 hover:border-white transition-colors"
              onClick={() => setIsRecording(!isRecording)}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? <Pause size={12} className="text-white" /> : <Play size={12} className="text-white" />}
              <span className="font-bold">{isRecording ? 'PAUSE' : 'RECORD'}</span>
            </motion.button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded border border-white/10">
              <div className="w-4 h-2 border border-white rounded-[1px] flex p-[1px]">
                <div className="w-full h-full bg-green-500 rounded-[1px]" />
              </div>
              <span className="text-green-400 font-bold">100%</span>
            </div>
          </div>
        </div>

        {/* Center Info (shown when not hovering) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 border-2 border-dashed border-white/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="text-white/40 text-xs font-bold tracking-[0.3em] bg-black/40 px-3 py-1 rounded backdrop-blur-sm">HOVER TO INITIALIZE</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end text-white/90">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-violet-300 font-bold">ISO 800</span>
              <span className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-blue-300 font-bold">5600K</span>
              <span className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded font-bold">f/1.8</span>
              <span className="hidden md:inline bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded font-bold">1/48</span>
              <span className="hidden lg:inline bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-yellow-300 font-bold">ND 0.6</span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/10 w-fit">
               <Histogram isActive={isHovered} />
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4 items-end bg-black/40 backdrop-blur-sm p-3 rounded border border-white/10">
              <Volume2 size={16} className="text-white/50 mb-1" />
              <AudioMeter channel="L" isActive={isHovered} />
              <AudioMeter channel="R" isActive={isHovered} />
            </div>
            <div className="text-right hidden md:block bg-black/40 backdrop-blur-sm px-4 py-2 rounded border border-white/10">
              <div className="text-white font-bold tracking-widest">RED V-RAPTOR 8K VV</div>
              <div className="text-violet-400 mt-1">REDCODE RAW HQ / 23.98FPS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Film Grain */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Color Aberration Edge Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
        style={{
          background: 'radial-gradient(circle at center, transparent 50%, rgba(127,0,255,0.1) 80%, rgba(255,0,255,0.15) 100%)'
        }}
      />
    </div>
  );
};

// ============================================
// SKILLS SECTION
// ============================================

const skills: Skill[] = [
  { name: 'Premiere Pro', level: 98, category: 'NLE' },
  { name: 'After Effects', level: 92, category: 'VFX' },
  { name: 'DaVinci Resolve', level: 95, category: 'Color' },
  { name: 'Pro Tools / Audition', level: 88, category: 'Audio' },
];

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-end mb-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-violet-500 uppercase tracking-widest font-mono font-bold">
            {skill.category}
          </span>
          <span className="text-lg md:text-xl text-white font-display uppercase tracking-wider group-hover:text-fuchsia-400 transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="font-display text-2xl text-gray-500 group-hover:text-white transition-colors">
          {isVisible ? skill.level : 0}<span className="text-sm opacity-50">%</span>
        </span>
      </div>
      <div className="h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-white shadow-[0_0_10px_rgba(217,70,239,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </motion.div>
  );
};

// ============================================
// TIMELINE SECTION
// ============================================

const timeline: TimelineEvent[] = [
  { year: 'PHASE 1', title: 'The Foundation', description: 'Mastering the technical fundamentals. Deep dives into pacing, rhythm, and narrative structure for independent creators.' },
  { year: 'PHASE 2', title: 'Viral Velocity', description: 'Engineering the hook. Scaled short-form systems that generated millions of views and defined the modern retention style.' },
  { year: 'PHASE 3', title: 'The Agency Era', description: 'Partnering with top-tier brands and agencies. Elevating standard content into premium, cinematic brand experiences.' },
  { year: 'CURRENT', title: 'Systematic Excellence', description: 'Running a full-stack post-production architecture focused on extreme quality and unparalleled viewer retention.' },
];

const Timeline: React.FC = () => {
  return (
    <div className="relative mt-12">
      {/* Vertical Track */}
      <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-violet-600/80 via-fuchsia-600/30 to-transparent" />
      
      {timeline.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.15 }}
          className="relative mb-12 last:mb-0 pl-12 group"
        >
          {/* Glowing Node */}
          <div className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center">
            <motion.div 
                className="w-2 h-2 rounded-full bg-violet-500 z-10"
                whileHover={{ scale: 2 }}
            />
            <div className="absolute inset-0 bg-violet-600/20 rounded-full blur-sm group-hover:bg-violet-600/40 transition-colors animate-pulse" />
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] bg-white/5 border border-white/10 w-fit px-2 py-1 rounded text-violet-400 font-bold uppercase tracking-widest">
              {event.year}
            </span>
            <h4 className="font-display text-2xl md:text-3xl text-white uppercase italic tracking-tight">
              {event.title}
            </h4>
            <p className="text-sm md:text-base text-gray-400 font-mono leading-relaxed mt-1">
              {event.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================
// STATS DATA
// ============================================

const stats: Stat[] = [
  { value: 5, suffix: '+', label: 'Years Active', icon: Clock },
  { value: 100, suffix: 'M+', label: 'Views Engineered', icon: Eye },
  { value: 350, suffix: '+', label: 'Assets Delivered', icon: Film },
  { value: 99, suffix: '%', label: 'Client Retention', icon: Award },
];

// ============================================
// MAIN ABOUT COMPONENT
// ============================================

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'skills' | 'journey'>('story');

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden"
      aria-label="About Section"
    >
      {/* Ambient background for the text side */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none opacity-50" />
      
      {/* Left: Viewfinder Image */}
      <ViewfinderImage />

      {/* Right: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-20 lg:p-24 z-10">
        
        <div className="max-w-2xl mx-auto lg:mx-0 w-full">
            {/* Section Label */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
            >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30">
                <Camera size={14} className="text-violet-400" />
            </div>
            <span className="font-mono text-violet-400 text-xs font-bold tracking-[0.3em] uppercase">
                The Architect
            </span>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-12 p-1.5 bg-white/[0.02] border border-white/[0.05] rounded-xl w-fit backdrop-blur-md">
            {[
                { id: 'story', label: 'Philosophy', icon: Sparkles },
                { id: 'skills', label: 'Stack', icon: Layers },
                { id: 'journey', label: 'Timeline', icon: Clock }
            ].map(tab => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
                >
                <tab.icon size={12} className={activeTab === tab.id ? 'text-white' : 'text-gray-500'} />
                {tab.label}
                </button>
            ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                {activeTab === 'story' && (
                    <motion.div
                    key="story"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-12"
                    >
                    <div>
                        <motion.h3 
                        className="font-display text-5xl md:text-7xl mb-6 text-white leading-[0.9] uppercase italic tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        >
                        Beyond <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">The Cut.</span>
                        </motion.h3>
                        <p className="text-gray-400 font-mono text-sm leading-loose mt-8">
                        I don't just edit footage; I <span className="text-white font-bold bg-white/10 px-1 rounded">engineer retention</span>. 
                        Specializing in high-energy visuals with a cinematic edge, I blend pacing, color theory, and advanced sound 
                        design to transform raw chaos into rhythmic, scroll-stopping storytelling. 
                        </p>
                    </div>

                    <div className="relative pl-8 border-l-2 border-white/10">
                        <div className="absolute left-[-2px] top-0 w-[2px] h-12 bg-gradient-to-b from-violet-500 to-fuchsia-500" />
                        <h4 className="font-display text-2xl md:text-3xl mb-3 text-white uppercase tracking-tight">
                        Retention Architecture
                        </h4>
                        <p className="text-gray-500 font-mono text-xs leading-relaxed">
                        In an age of 3-second attention spans, I build structures that keep eyes glued.
                        From the micro-hook to the macro-narrative, every single frame serves a strategic purpose.
                        </p>
                    </div>

                    {/* Download Asset Link */}
                    <div className="pt-4">
                        <motion.a 
                        href="#"
                        className="group inline-flex items-center gap-3 font-mono text-[10px] font-bold text-white uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        >
                        <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        Download Capabilities Deck
                        </motion.a>
                    </div>
                    </motion.div>
                )}

                {activeTab === 'skills' && (
                    <motion.div
                    key="skills"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-10"
                    >
                    <div className="space-y-2 mb-8">
                        <h3 className="font-display text-4xl text-white uppercase italic tracking-tight">The Arsenal</h3>
                        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Industry-standard tools mastered for extreme velocity.</p>
                    </div>
                    
                    <div className="grid gap-8">
                        {skills.map((skill, index) => (
                        <SkillBar key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>
                    </motion.div>
                )}

                {activeTab === 'journey' && (
                    <motion.div
                    key="journey"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                    <div className="space-y-2 mb-8">
                        <h3 className="font-display text-4xl text-white uppercase italic tracking-tight">Trajectory</h3>
                        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">The evolution of a cinematic editor.</p>
                    </div>
                    <Timeline />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            {/* Stats Grid */}
            <motion.div 
            className="grid grid-cols-2 gap-6 mt-16 pt-12 border-t border-white/[0.05]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            >
            {stats.map((stat, index) => (
                <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:border-violet-500/30 transition-colors"
                >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/10 group-hover:border-violet-500/50 transition-colors">
                        <stat.icon size={14} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
                    </div>
                </div>
                <h4 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h4>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
                    {stat.label}
                </span>
                </motion.div>
            ))}
            </motion.div>

            {/* CTA */}
            <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            >
            <motion.a
                href="/pricing.html"
                className="group flex items-center justify-between w-full p-6 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl hover:bg-violet-600/30 transition-all"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <div className="flex flex-col gap-1">
                    <span className="font-display text-2xl text-white uppercase italic tracking-tight">Initiate Protocol</span>
                    <span className="font-mono text-[10px] text-violet-300 uppercase tracking-[0.2em]">View Monthly Retainers</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <ArrowRight size={20} />
                </div>
            </motion.a>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
