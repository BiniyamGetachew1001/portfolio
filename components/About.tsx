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
  Download
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
            className={`w-2 h-1 rounded-[1px] ${color}`}
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

// Optimized FocusBrackets using MotionValues to prevent parent re-renders
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
        className="relative w-32 h-32"
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 1.5, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Corner brackets */}
        {[
          'top-0 left-0 border-t-2 border-l-2',
          'top-0 right-0 border-t-2 border-r-2',
          'bottom-0 left-0 border-b-2 border-l-2',
          'bottom-0 right-0 border-b-2 border-r-2'
        ].map((classes, i) => (
          <motion.div
            key={i}
            className={`absolute w-5 h-5 border-white ${classes}`}
            animate={{ 
              boxShadow: isHovered 
                ? '0 0 10px rgba(255,255,255,0.8)' 
                : 'none' 
            }}
          />
        ))}
        
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-[1px] bg-white/80" />
          <div className="w-[1px] h-4 bg-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Focus confirmation */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-500/90 rounded text-[8px] font-mono text-white"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
          transition={{ delay: 0.3 }}
        >
          FOCUS LOCK
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ScanLines: React.FC = React.memo(() => (
  <div 
    className="absolute inset-0 pointer-events-none z-40 opacity-[0.03]"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
    }}
  />
));

ScanLines.displayName = 'ScanLines';

// Isolated component for recording timer to prevent re-rendering entire viewfinder
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
    <div className="flex items-center gap-3">
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: isRecording ? [1, 0.3, 1] : 0.3 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-600'} shadow-[0_0_10px_rgba(220,38,38,0.8)]`} />
        <span className="text-white/90">{isRecording ? 'REC' : 'STBY'}</span>
      </motion.div>
      <span className="text-gray-400 tabular-nums">
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}:{formatTime(time.frames)}
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
  
  // OPTIMIZATION: Use MotionValues for mouse position
  // This avoids re-rendering the entire Viewfinder component on every pixel of mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Update MotionValues directly - no React render
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="w-full md:w-1/2 h-[70vh] md:h-screen sticky top-0 overflow-hidden bg-black group cursor-crosshair"
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
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1887&auto=format&fit=crop"
            alt="Video Editor Portrait"
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              filter: isHovered 
                ? 'grayscale(0%) blur(0px) contrast(1.1) saturate(1.2)' 
                : 'grayscale(100%) blur(3px) contrast(1) saturate(1)'
            }}
          />
        </motion.div>

        {/* Vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        
        {/* Bottom gradient for mobile text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 md:opacity-30" />
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
      <div className="absolute inset-0 p-4 md:p-8 pointer-events-none z-20 flex flex-col justify-between font-mono text-[10px] md:text-xs tracking-wider">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start text-white/90">
          <RecordingIndicator isRecording={isRecording} />
          
          <div className="flex items-center gap-4">
            <motion.button
              className="pointer-events-auto flex items-center gap-1 px-2 py-1 bg-black/50 rounded border border-white/20 hover:border-white/40 transition-colors"
              onClick={() => setIsRecording(!isRecording)}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? <Pause size={12} /> : <Play size={12} />}
            </motion.button>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-4 h-4 border border-white/50 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-sm" />
              </div>
              <span>[ BATT 84% ]</span>
            </div>
          </div>
        </div>

        {/* Center Info (shown when not hovering) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <div className="text-white/30 text-sm">HOVER TO FOCUS</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end text-white/80">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <span className="bg-black/40 px-2 py-0.5 rounded">ISO 800</span>
              <span className="bg-black/40 px-2 py-0.5 rounded">WB 5600K</span>
              <span className="bg-black/40 px-2 py-0.5 rounded">f/2.8</span>
              <span className="hidden md:inline bg-black/40 px-2 py-0.5 rounded">1/50</span>
            </div>
            <Histogram isActive={isHovered} />
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 items-end">
              <Volume2 size={14} className="text-white/50" />
              <AudioMeter channel="L" isActive={isHovered} />
              <AudioMeter channel="R" isActive={isHovered} />
            </div>
            <div className="text-right hidden md:block">
              <div className="text-white">4K UHD</div>
              <div className="text-gray-500">ProRes 422 / 24fps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Film Grain */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Color Aberration Edge Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'linear-gradient(to right, rgba(255,0,0,0.1) 0%, transparent 5%, transparent 95%, rgba(0,255,255,0.1) 100%)'
        }}
      />
    </div>
  );
};

// ============================================
// SKILLS SECTION
// ============================================

const skills: Skill[] = [
  { name: 'Premiere Pro', level: 95, category: 'Editing' },
  { name: 'After Effects', level: 90, category: 'Motion' },
  { name: 'DaVinci Resolve', level: 88, category: 'Color' },
  { name: 'Cinema 4D', level: 75, category: '3D' },
  { name: 'Audition', level: 85, category: 'Audio' },
  { name: 'Photoshop', level: 82, category: 'Design' },
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white group-hover:text-violet-400 transition-colors">
            {skill.name}
          </span>
          <span className="text-[10px] text-gray-600 uppercase tracking-wider px-2 py-0.5 bg-white/5 rounded">
            {skill.category}
          </span>
        </div>
        <span className="font-mono text-xs text-gray-500">
          {isVisible ? skill.level : 0}%
        </span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// ============================================
// TIMELINE SECTION
// ============================================

const timeline: TimelineEvent[] = [
  { year: '2020', title: 'Started Freelancing', description: 'Began creating content for small creators and businesses' },
  { year: '2021', title: 'First Viral Video', description: 'Edited a video that reached 10M+ views on YouTube' },
  { year: '2022', title: 'Agency Partnership', description: 'Joined forces with top-tier content agencies' },
  { year: '2023', title: 'Studio Launch', description: 'Established full-service video production studio' },
  { year: '2024', title: '50M+ Views', description: 'Crossed 50 million total views across all projects' },
];

const Timeline: React.FC = () => {
  return (
    <div className="relative mt-12 pl-4">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600 via-violet-600/50 to-transparent" />
      
      {timeline.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.15 }}
          className="relative mb-8 last:mb-0 pl-6 group"
        >
          {/* Dot */}
          <motion.div 
            className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-[#050505] border-2 border-violet-600 group-hover:bg-violet-600 transition-colors"
            whileHover={{ scale: 1.5 }}
          />
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-mono text-sm text-violet-400 font-bold">
              {event.year}
            </span>
            <span className="font-display text-lg text-white">
              {event.title}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {event.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================
// STATS DATA
// ============================================

const stats: Stat[] = [
  { value: 4, suffix: '+', label: 'Years Experience', icon: Clock },
  { value: 50, suffix: 'M+', label: 'Views Generated', icon: Eye },
  { value: 200, suffix: '+', label: 'Projects Completed', icon: Film },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Award },
];

// ============================================
// MAIN ABOUT COMPONENT
// ============================================

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'skills' | 'journey'>('story');

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-[#050505] flex flex-col md:flex-row"
      aria-label="About Section"
    >
      {/* Left: Viewfinder Image */}
      <ViewfinderImage />

      {/* Right: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:p-12 lg:p-20 z-10 bg-[#050505]">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Camera size={16} className="text-violet-500" />
          <span className="font-mono text-violet-400 text-sm tracking-widest">
            THE ARCHITECT
          </span>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-lg w-fit">
          {[
            { id: 'story', label: 'Story', icon: Sparkles },
            { id: 'skills', label: 'Skills', icon: Layers },
            { id: 'journey', label: 'Journey', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs tracking-wider transition-all ${
                activeTab === tab.id 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div>
                <motion.h3 
                  className="font-display text-2xl md:text-3xl lg:text-4xl mb-4 text-white leading-tight"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  BEYOND THE CUT.
                </motion.h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  I don't just edit footage; I <span className="text-white font-semibold">engineer retention</span>. 
                  Specializing in high-energy visuals with a cinematic edge, I blend pacing, color, and sound 
                  design to transform raw chaos into rhythmic storytelling. My goal is simple: 
                  Cuts that feel alive. Stories that stay.
                </p>
                <p className="font-display text-lg text-violet-400 mt-4 italic">
                  "Designing Emotion. Engineering Impact."
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative pl-6 border-l border-violet-600/50"
              >
                <div className="absolute left-0 top-0 w-1 h-8 bg-gradient-to-b from-violet-600 to-transparent" />
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-white">
                  RETENTION ARCHITECTURE
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  In an age of 3-second attention spans, I build structures that keep eyes glued.
                  From the hook to the CTA, every frame serves a strategic purpose.
                </p>
              </motion.div>

              {/* Download Asset Link */}
              <div>
                <motion.a 
                  href="#"
                  className="inline-flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
                  whileHover={{ x: 5 }}
                >
                  <Download size={12} />
                  DOWNLOAD CAPABILITIES DECK / RESUME
                </motion.a>
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-display text-2xl text-white mb-6">Technical Proficiency</h3>
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-2xl text-white mb-2">The Path So Far</h3>
              <p className="text-gray-500 text-sm mb-6">A brief timeline of milestones</p>
              <Timeline />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 pt-8 border-t border-white/10"
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
              className="group text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <stat.icon size={16} className="text-violet-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-mono text-2xl md:text-3xl font-bold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h4>
              </div>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
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
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-white font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Create Together</span>
            <Zap size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
