import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MonitorPlay, 
  Layers, 
  Zap, 
  Film, 
  Activity, 
  ToggleRight, 
  ChevronRight,
  Sparkles,
  Play,
  Check
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface ServiceUIProps {
  isHovered: boolean;
  isExpanded: boolean;
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  features: string[];
  stats: { label: string; value: number; suffix: string };
  gradient: string;
  uiComponent: React.FC<ServiceUIProps>;
}

interface StackCardProps {
  service: Service;
  index: number;
  totalCards: number;
}

// ============================================
// ANIMATED UI COMPONENTS
// ============================================

const AlgorithmicMatchUI: React.FC<ServiceUIProps> = ({ isHovered }) => {
  const [progress, setProgress] = useState(0);
  
  React.useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setProgress(92), 100);
      return () => clearTimeout(timer);
    }
    setProgress(0);
  }, [isHovered]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
          Algorithmic Match
        </div>
        <motion.div 
          className="h-2 w-28 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ boxShadow: '0 0 20px rgba(127, 0, 255, 0.6)' }}
          />
        </motion.div>
        <AnimatedCounter value={progress} suffix="%" isActive={isHovered} />
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-500"
            initial={{ scale: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? [0.3, 1, 0.3] : 0 
            }}
            transition={{ 
              delay: i * 0.1,
              opacity: { repeat: Infinity, duration: 1.5, delay: i * 0.2 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

const EngagementWaveUI: React.FC<ServiceUIProps> = ({ isHovered }) => {
  const bars = [40, 70, 30, 80, 50, 90, 60, 40, 75, 55];
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Activity size={14} className="text-violet-500" />
        <span className="text-[10px] font-mono text-gray-500 uppercase">
          Engagement Wave
        </span>
      </div>
      <div className="flex gap-0.5 items-end h-8 px-2 py-1 bg-gray-900/50 rounded-lg">
        {bars.map((h, i) => (
          <motion.div 
            key={i}
            className="w-1.5 bg-gradient-to-t from-violet-600 to-fuchsia-400 rounded-sm"
            initial={{ height: 4 }}
            animate={{ 
              height: isHovered ? `${h}%` : 4,
              opacity: isHovered ? 1 : 0.3
            }}
            transition={{ 
              duration: 0.4, 
              delay: i * 0.05,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

const RenderStatusUI: React.FC<ServiceUIProps> = ({ isHovered }) => {
  const [phase, setPhase] = useState(0);
  const phases = ['INITIALIZING', 'COMPOSITING', 'RENDER ACTIVE'];
  
  React.useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setPhase(p => (p < 2 ? p + 1 : p));
      }, 400);
      return () => clearInterval(interval);
    }
    setPhase(0);
  }, [isHovered]);

  return (
    <div className="flex flex-col gap-2">
      <motion.div 
        className="flex items-center gap-3 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm"
        animate={{ 
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered ? '0 0 30px rgba(139, 92, 246, 0.2)' : 'none'
        }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full"
          animate={{ 
            backgroundColor: phase === 2 ? '#22c55e' : '#eab308',
            scale: [1, 1.2, 1]
          }}
          transition={{ scale: { repeat: Infinity, duration: 1 } }}
        />
        <span className="text-[10px] font-mono text-white tracking-widest">
          {phases[phase]}
        </span>
      </motion.div>
      <div className="flex gap-1 pl-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="h-1 rounded-full"
            initial={{ width: 0, backgroundColor: '#374151' }}
            animate={{ 
              width: phase >= i ? 20 : 0,
              backgroundColor: phase >= i ? '#8b5cf6' : '#374151'
            }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

const ColorGradingUI: React.FC<ServiceUIProps> = ({ isHovered }) => {
  const [isActive, setIsActive] = useState(false);
  
  React.useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setIsActive(true), 300);
      return () => clearTimeout(timer);
    }
    setIsActive(false);
  }, [isHovered]);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setIsActive(!isActive)}
        className="flex items-center gap-3 cursor-pointer group/toggle"
      >
        <span className="text-[10px] font-mono text-gray-400 group-hover/toggle:text-white transition-colors">
          LUT_CINEMATIC_V4
        </span>
        <motion.div
          className="relative w-10 h-5 rounded-full bg-gray-800 p-0.5"
          animate={{ backgroundColor: isActive ? 'rgb(139, 92, 246)' : 'rgb(31, 41, 55)' }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-white shadow-lg"
            animate={{ x: isActive ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </button>
      <div className="flex gap-1">
        {['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#9b5de5'].map((color, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
              opacity: isActive ? 1 : 0.2,
              scale: isActive ? 1 : 0.8,
              y: isActive ? [0, -2, 0] : 0
            }}
            transition={{ 
              delay: i * 0.05,
              y: { repeat: Infinity, duration: 2, delay: i * 0.2 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================

const AnimatedCounter: React.FC<{ 
  value: number; 
  suffix?: string; 
  isActive: boolean 
}> = ({ value, suffix = '', isActive }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  React.useEffect(() => {
    if (!isActive) {
      setDisplayValue(0);
      return;
    }
    
    let start = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplayValue(Math.round(eased * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, isActive]);

  return (
    <span className="font-mono text-sm text-white tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const FeatureList: React.FC<{ features: string[]; isVisible: boolean }> = ({ 
  features, 
  isVisible 
}) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ 
      height: isVisible ? 'auto' : 0, 
      opacity: isVisible ? 1 : 0 
    }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="overflow-hidden"
  >
    <div className="pt-6 border-t border-white/10 mt-6">
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isVisible ? 0 : -20, opacity: isVisible ? 1 : 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <Check size={14} className="text-violet-500" />
            <span className="text-sm text-gray-400">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// ============================================
// MAIN STACK CARD COMPONENT
// ============================================

const StackCard: React.FC<StackCardProps> = React.memo(({ service, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // 3D rotation transforms
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const UIComponent = service.uiComponent;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="sticky w-full max-w-5xl mx-auto mb-8 md:mb-16"
      style={{ 
        top: `calc(12vh + ${index * 50}px)`,
        zIndex: index + 10,
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX: isHovered ? rotateX : 0, rotateY: isHovered ? rotateY : 0 }}
        transition={{ type: "spring", ...springConfig }}
        className="relative rounded-2xl overflow-hidden group"
      >
        {/* Animated Border Gradient */}
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="absolute inset-0 animate-[spin_3s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${service.gradient}, transparent 60%)`,
              filter: 'blur(2px)'
            }}
          />
        </motion.div>

        {/* Card Background */}
        <div className="absolute inset-[2px] bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#080808] rounded-2xl" />
        
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Mouse-Following Spotlight */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${service.gradient}15 0%, transparent 70%)`,
            x: x,
            y: y,
            translateX: '-50%',
            translateY: '-50%',
            left: '50%',
            top: '50%'
          }}
        />

        {/* Content Container */}
        <div 
          className="relative p-8 md:p-10 lg:p-12"
          role="article"
          aria-label={`Service: ${service.title}`}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Column: ID + Icon */}
            <div className="flex lg:flex-col items-center gap-4 lg:gap-6">
              <motion.div 
                className="font-mono text-5xl lg:text-6xl font-bold text-white/5 select-none"
                animate={{ 
                  color: isHovered ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {service.id}
              </motion.div>
              
              <motion.div 
                className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255,255,255,0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon Glow */}
                <motion.div
                  className="absolute inset-0 bg-violet-500/20 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                />
                <service.icon 
                  size={32} 
                  className="relative z-10 text-gray-400 group-hover:text-violet-400 transition-colors duration-300" 
                />
              </motion.div>
            </div>

            {/* Middle Column: Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <motion.h3 
                  className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                  style={{
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text'
                  }}
                  animate={{ 
                    backgroundImage: isHovered 
                      ? 'linear-gradient(to right, #fff, #a78bfa)' 
                      : 'linear-gradient(to right, #fff, #fff)',
                    color: isHovered ? 'transparent' : 'white'
                  }}
                >
                  {service.title}
                </motion.h3>
                
                {/* Stats Badge */}
                <motion.div
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                  animate={{ 
                    borderColor: isHovered ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Sparkles size={12} className="text-violet-400" />
                  <AnimatedCounter 
                    value={service.stats.value} 
                    suffix={service.stats.suffix} 
                    isActive={isHovered} 
                  />
                  <span className="text-[10px] text-gray-500 uppercase">
                    {service.stats.label}
                  </span>
                </motion.div>
              </div>
              
              <p className="font-mono text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mb-4">
                {service.desc}
              </p>

              {/* Expand Button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors group/btn"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{isExpanded ? 'Show less' : 'Explore features'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              </motion.button>

              {/* Expandable Features */}
              <FeatureList features={service.features} isVisible={isExpanded} />
            </div>

            {/* Right Column: UI Component */}
            <div className="hidden lg:flex flex-col items-end justify-center min-w-[200px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-3">
                  Live Preview
                </div>
                <UIComponent isHovered={isHovered} isExpanded={isExpanded} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${service.gradient}, transparent)`
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0.3, 
            opacity: isHovered ? 1 : 0.3 
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
});

StackCard.displayName = 'StackCard';

// ============================================
// SERVICES DATA
// ============================================

const services: Service[] = [
  { 
    id: "01",
    icon: MonitorPlay, 
    title: "Retention Engineering", 
    desc: "Short-form content designed for algorithm dominance. We analyze drop-off points and optimize pacing to ensure maximum watch time and viral potential.",
    features: [
      "Hook optimization",
      "Pacing analysis", 
      "Drop-off mapping",
      "A/B testing"
    ],
    stats: { label: "AVG RETENTION", value: 92, suffix: "%" },
    gradient: "#8b5cf6",
    uiComponent: AlgorithmicMatchUI
  },
  { 
    id: "02",
    icon: Film, 
    title: "Narrative Long-Form", 
    desc: "Documentary-style storytelling for YouTube. Structuring chaos into coherent, emotionally resonant arcs that keep viewers invested until the end.",
    features: [
      "Story architecture",
      "Emotional mapping",
      "Audience retention",
      "Chapter design"
    ],
    stats: { label: "WATCH TIME", value: 45, suffix: "min" },
    gradient: "#ec4899",
    uiComponent: EngagementWaveUI
  },
  { 
    id: "03",
    icon: Layers, 
    title: "Motion Architecture", 
    desc: "Bespoke 2D/3D visual assets. Kinetic typography and seamless compositing that elevates production value beyond standard editing.",
    features: [
      "3D modeling",
      "Kinetic type",
      "VFX compositing",
      "Asset creation"
    ],
    stats: { label: "FPS OUTPUT", value: 60, suffix: "fps" },
    gradient: "#06b6d4",
    uiComponent: RenderStatusUI
  },
  { 
    id: "04",
    icon: Zap, 
    title: "Color & Sonic Depth", 
    desc: "The invisible art. Grading that sets the mood and sound design that builds the world. It's not just seen; it's felt in every frame.",
    features: [
      "Color grading",
      "Sound design",
      "Audio mixing",
      "LUT creation"
    ],
    stats: { label: "COLOR DEPTH", value: 10, suffix: "-bit" },
    gradient: "#f59e0b",
    uiComponent: ColorGradingUI
  },
];

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('services');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrolled = Math.max(0, -rect.top);
      const total = sectionHeight - viewportHeight;
      const percentage = Math.min(100, (scrolled / total) * 100);
      
      setProgress(percentage);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-2">
      <div className="h-32 w-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-gray-500 writing-mode-vertical">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

// ============================================
// MAIN SERVICES COMPONENT
// ============================================

export const Services: React.FC = () => {
  return (
    <section 
      id="services" 
      className="relative w-full bg-[#030303] px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-32"
      aria-label="Our Services"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-fuchsia-900/5 rounded-full blur-[180px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Scroll Progress */}
      <ScrollProgress />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Play size={12} className="text-violet-400" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              What We Do
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Technical </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Expertise
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-gray-700" />
            <span className="font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.2em] md:tracking-[0.3em]">
              SYSTEM CAPABILITIES
            </span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-gray-700" />
          </div>
        </motion.div>

        {/* Cards Container */}
        <div className="relative pb-32 md:pb-48">
          {services.map((service, index) => (
            <StackCard 
              key={service.id} 
              service={service} 
              index={index}
              totalCards={services.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;