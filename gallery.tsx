import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Layers, Monitor, Cpu, Box, Film, Terminal as TerminalIcon, 
  Zap, Crosshair, ArrowLeft, ArrowRight, X, Sparkles, LayoutGrid, Paintbrush, 
  HelpCircle, Compass, CheckCircle2, ChevronRight, Sliders, Settings 
} from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Define Interface for gallery items
interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categorySlug: 'cinematic-art' | 'thumbnails' | 'branding' | 'motion-assets';
  description: string;
  image: string;
  beforeImage: string;
  software: string[];
  resolution: string;
  layers: string;
  client: string;
  code: string;
  accent: string;
  bgGlow: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: '01',
    title: 'CYBERPUNK 2077: RUNNERS',
    category: 'Cinematic Art',
    categorySlug: 'cinematic-art',
    description: 'Surgical design and multi-layered compositing for a cyberpunk cinematic key frame. Involves extreme high-range color grading, hand-drawn digital highlights, hyper-realistic neon light spill mapping, and customized typography architecture to maximize futuristic cinematic immersion.',
    image: 'https://images.unsplash.com/photo-1515260268569-9271009adfdb?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop',
    software: ['Adobe Photoshop', 'Wacom Tablet', 'Nik Collection'],
    resolution: '7680 x 4320 // 8K DCI',
    layers: '240+ Active Groups',
    client: 'Cyberpunk Fansite Core',
    code: 'KEY.CP2077',
    accent: '#a855f7', // Violet
    bgGlow: 'rgba(168, 85, 247, 0.15)'
  },
  {
    id: '02',
    title: 'THE OVERKILL PODCAST',
    category: 'YouTube Thumbnails',
    categorySlug: 'thumbnails',
    description: 'High-clickrate thumbnail architecture engineered for ultra-high audience retention and premium positioning. Combines custom metallic 3D titles, subject face-contour edge lighting, volumetric flare filters, and surgically enhanced saturation layers designed for visual dominance on mobile and desktop screens.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1974&auto=format&fit=crop',
    software: ['Photoshop', 'Cinema 4D', 'Redshift Engine'],
    resolution: '3840 x 2160 // 4K UHD',
    layers: '115+ Layers',
    client: 'Overkill Media Group',
    code: 'YT.OVK-09',
    accent: '#ec4899', // Pink
    bgGlow: 'rgba(236, 72, 153, 0.15)'
  },
  {
    id: '03',
    title: 'CHRONOS: TEMPORAL SYSTEMS',
    category: 'Branding & Vector',
    categorySlug: 'branding',
    description: 'Full corporate brand guidelines and typography identity structure designed for an elite timepiece manufacturer. Sculpting pure vector architecture, customized geometric lettering, ultra-clean negative space usage, and dark-obsidian brand mockup layouts that communicate high-end technical superiority.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop',
    software: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    resolution: 'Vector // Infinitely Scalable',
    layers: '100% Scalable Paths',
    client: 'Chronos Watches',
    code: 'BRD.CHR-01',
    accent: '#06b6d4', // Cyan
    bgGlow: 'rgba(6, 182, 212, 0.15)'
  },
  {
    id: '04',
    title: 'MOTION INTERFACE PROTOCOL',
    category: 'Motion Assets',
    categorySlug: 'motion-assets',
    description: 'Custom head-up display overlay packages and digital telemetry assets for video production pipelines. Comprises interactive dashboard grids, procedural vector lines, loading meters, and retro-futuristic sound wave HUD overlays designed to quickly overlay onto cinematic videos.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
    software: ['Adobe After Effects', 'Illustrator', 'Cinema 4D'],
    resolution: '3840 x 2160 // 60 FPS Asset',
    layers: 'Procedural Vectors',
    client: 'Video Creators Market',
    code: 'MOT.HUD-04',
    accent: '#10b981', // Emerald
    bgGlow: 'rgba(16, 185, 129, 0.15)'
  },
  {
    id: '05',
    title: 'NIGHTFALL: MOVIE KEY ART',
    category: 'Cinematic Art',
    categorySlug: 'cinematic-art',
    description: 'Official promotional theatrical key art for a moody independent mystery film. Heavy emphasis on matte painting workflows, combining multiple atmospheric raw photographs of skies, forests, and cabins into a single high-contrast cinematic masterpiece under a digitally synthesized milky way.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    software: ['Adobe Photoshop', 'Lightroom', 'Wacom Intuos Pro'],
    resolution: '5400 x 8100 // 300 DPI Print',
    layers: '180+ Active Composites',
    client: 'Starlight Pictures',
    code: 'KEY.NIGHT',
    accent: '#f59e0b', // Amber
    bgGlow: 'rgba(245, 158, 11, 0.15)'
  },
  {
    id: '06',
    title: 'ECLIPSE ESPORTS SYSTEM',
    category: 'Branding & Vector',
    categorySlug: 'branding',
    description: 'Comprehensive branding visual reboot for a competitive electronic sports league. Formulating energetic graphic design guidelines, aggressive custom vector mascot marks, screen-ready merchandise designs, and dynamic social media graphic panels optimized for immediate attention and brand loyalty.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    software: ['Adobe Illustrator', 'Photoshop', 'C4D Lite'],
    resolution: 'Various Retina Formats',
    layers: '100% Scalable Vector',
    client: 'Eclipse Esports Team',
    code: 'BRD.ECL-06',
    accent: '#f43f5e', // Rose
    bgGlow: 'rgba(244, 63, 94, 0.15)'
  }
];

// Before / After Slider Component
const BeforeAfterSlider: React.FC<{ before: string; after: string; active?: boolean }> = ({ before, after, active }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-none bg-black flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => { isDragging.current = true; }}
      onTouchStart={() => { isDragging.current = true; }}
      data-cursor-text="DRAG"
    >
      {/* After Image (Full View) */}
      <img 
        src={after} 
        alt="After Render" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped View) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <img 
          src={before} 
          alt="Before Design/Sketch" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter grayscale contrast-125"
          style={{ width: containerRef.current?.getBoundingClientRect().width, height: containerRef.current?.getBoundingClientRect().height }}
        />
        {/* Label Before */}
        <div className="absolute top-6 left-6 bg-black/70 border border-white/10 backdrop-blur-md px-3 py-1 rounded font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">
          RAW CONCEPT / WIREFRAME
        </div>
      </div>

      {/* Label After */}
      <div 
        className="absolute top-6 right-6 bg-violet-600/70 border border-violet-500/20 backdrop-blur-md px-3 py-1 rounded font-mono text-[9px] text-white font-bold uppercase tracking-widest"
        style={{ opacity: sliderPosition < 85 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        FINAL GRAPHIC MASTER
      </div>

      {/* Slider Bar */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <Sliders size={12} className="rotate-90" />
        </div>
      </div>

      {/* Digital Hud lines on edges */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none" />
      <div className="absolute top-3 left-3 bottom-3 right-3 border border-white/[0.02] border-dashed pointer-events-none" />
    </div>
  );
};

export default function GalleryApp() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle short entrance animation buffer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.categorySlug === activeCategory);

  const categories = [
    { name: 'ALL LABS', slug: 'all', icon: LayoutGrid },
    { name: 'CINEMATIC KEY ART', slug: 'cinematic-art', icon: Film },
    { name: 'YOUTUBE THUMBNAILS', slug: 'thumbnails', icon: Monitor },
    { name: 'BRANDING & VECTOR', slug: 'branding', icon: Paintbrush },
    { name: 'MOTION GRAPHICS', slug: 'motion-assets', icon: Cpu }
  ];

  return (
    <>
      <CustomCursor />
      
      {/* Aperture Aperture Shutter Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
            exit={{ 
              opacity: 0,
              filter: 'blur(20px)',
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
          >
            <div className="relative flex flex-col items-center space-y-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="relative p-6 rounded-full border border-violet-500/20 bg-white/[0.01] shadow-[0_0_50px_rgba(127,0,255,0.05)]"
              >
                <Settings size={40} className="text-violet-500 animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-dashed border-violet-400/20 animate-spin" style={{ animationDuration: '10s' }} />
              </motion.div>
              
              <div className="flex flex-col items-center">
                <span className="font-mono text-[9px] text-gray-500 tracking-[0.4em] uppercase">SYSTEM INITIALIZATION</span>
                <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider mt-1">GRAPHICS PROTOCOLS</h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full bg-black min-h-screen selection:bg-white selection:text-black">
        <Navbar />

        {/* Ambient background grid lines and colorful spots */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
             style={{
               backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }} 
        />
        
        {/* Ambient light flares */}
        <div className="fixed top-[-10%] left-[-15%] w-[60vw] h-[60vw] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-900/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Hero Section */}
        <section className="pt-48 pb-20 px-4 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md"
            >
              <TerminalIcon size={12} className="text-violet-500" />
              <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">VISUAL ENGINE V2.0</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] text-white"
            >
              Creative <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-rose-400 font-display italic">Chemistry.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-mono text-xs md:text-sm text-gray-400 max-w-2xl leading-relaxed uppercase tracking-widest"
            >
              High-velocity layouts, cybernetic key art, and high-conversion branding assets engineered with absolute structural precision.
            </motion.p>
          </div>
        </section>

        {/* Category Filters Bar */}
        <section className="py-6 px-4 relative z-10">
          <div className="max-w-6xl mx-auto flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 p-2 rounded-2xl bg-white/[0.02] border border-white/15 backdrop-blur-xl shadow-2xl"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`relative px-5 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-none ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <cat.icon size={12} className={isActive ? 'text-violet-400' : ''} />
                    <span>{cat.name}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="active-filter-bg"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl z-[-1] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Grid Showcase */}
        <section className="pb-32 pt-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="glow-card-gallery group p-4 flex flex-col justify-between"
                    onMouseMove={handleCardMouseMove}
                    onClick={() => setSelectedItem(item)}
                    data-cursor-text="INSPECT"
                  >
                    {/* Header Technical Banner */}
                    <div className="flex justify-between items-center mb-4 text-[9px] font-mono text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                        SYS.OP // {item.id}
                      </span>
                      <span className="border border-white/5 bg-white/[0.02] px-2 py-0.5 rounded">
                        {item.code}
                      </span>
                    </div>

                    {/* Image Container with HUD Corner Marks */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover scale-[1.03] group-hover:scale-100 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      
                      {/* Interactive Visual Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      
                      {/* Holographic grid scan lines on cover */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
                           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

                      {/* HUD Crosshair corner elements */}
                      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 pointer-events-none transition-colors group-hover:border-violet-400" />
                      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 pointer-events-none transition-colors group-hover:border-violet-400" />
                      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 pointer-events-none transition-colors group-hover:border-violet-400" />
                      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 pointer-events-none transition-colors group-hover:border-violet-400" />

                      {/* Accent Glow Circle */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${item.bgGlow}, transparent 55%)`
                        }}
                      />
                    </div>

                    {/* Info Card Body */}
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                          {item.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="font-mono text-[9px] text-violet-400 font-bold uppercase tracking-widest">
                          RESOLVE // DCI
                        </span>
                      </div>

                      <h3 className="font-display text-2xl tracking-wide uppercase text-white group-hover:text-violet-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-mono text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Trigger Info */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-2">
                        {item.software.slice(0, 2).map((sw, i) => (
                          <span key={i} className="font-mono text-[8px] text-gray-500 border border-white/5 bg-white/[0.01] px-2 py-0.5 rounded">
                            {sw.split(' ').pop()}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1 font-mono text-[9px] text-white/50 group-hover:text-white transition-colors">
                        <span>INSPECT</span>
                        <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Live interactive Before/After Spotlight (Saves full page scroll engagement!) */}
        <section className="py-24 border-t border-white/10 bg-noir-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Telemetry info left */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  <Sparkles size={12} className="text-violet-500" />
                  <span className="font-mono text-[9px] text-gray-300 font-bold uppercase tracking-[0.25em]">CRAFT COMPARISON</span>
                </div>
                
                <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-white leading-none tracking-tighter italic">
                  Raw Formula <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">To Render</span>
                </h2>
                
                <p className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed uppercase tracking-widest">
                  Good graphic design is calculated chemistry. Drag the vertical divider on the spotlight layout to witness the raw skeleton vector grid blueprint vs the final polished design asset.
                </p>

                <div className="space-y-4 pt-4 font-mono text-[10px] text-gray-500">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-violet-500" />
                    <span className="uppercase tracking-wider text-white">Surgically Calculated Typographic Grids</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-violet-500" />
                    <span className="uppercase tracking-wider text-white">Advanced Light Reflection Spill Maps</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-violet-500" />
                    <span className="uppercase tracking-wider text-white">100% Vector Integrity for Extreme Scales</span>
                  </div>
                </div>
              </div>

              {/* Slider View Right */}
              <div className="lg:col-span-7 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                <BeforeAfterSlider 
                  before="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
                  after="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Brand Consult Call to Action */}
        <section className="py-32 px-4 relative z-10 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase italic tracking-tighter text-white">
              Command <br/> <span className="text-stroke">Authority.</span>
            </h2>
            <p className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-widest leading-loose max-w-xl mx-auto">
              Need custom cinematic graphics, channel branding architecture, or high-velocity advertising key arts? We engineer complete visual kits tailored to stand out.
            </p>
            <a href="/#contact" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-electric-violet hover:text-white hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transition-all">
              Initialize Graphic Protocol
              <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <Footer />

        {/* Full Screen Immersive Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto"
            >
              {/* Outer HUD Box wrapper */}
              <motion.div 
                initial={{ scale: 0.95, filter: 'blur(10px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                exit={{ scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-7xl bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 relative max-h-[90vh] lg:max-h-[85vh]"
              >
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/75 border border-white/10 hover:border-white/30 text-white cursor-none hover:rotate-90 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                >
                  <X size={16} />
                </button>

                {/* Left Visual Column: Interactive Before/After Comparison inside Modal! */}
                <div className="lg:col-span-7 h-[45vh] lg:h-auto min-h-[300px] border-b lg:border-b-0 lg:border-r border-white/10 relative group">
                  <BeforeAfterSlider 
                    before={selectedItem.beforeImage} 
                    after={selectedItem.image}
                    active={true}
                  />

                  {/* Corner Crosshair Marks */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-mono text-[8px] text-white tracking-[0.2em] font-bold shadow-black drop-shadow-md">EXPANDED DATA FEED // {selectedItem.code}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 font-mono text-[8px] text-white/50 tracking-[0.2em] pointer-events-none flex items-center gap-2">
                    <Crosshair size={10} className="text-violet-400" />
                    <span>INTERACTIVE DRAG COMPILER</span>
                  </div>
                </div>

                {/* Right Technical Specs Column */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[85vh] bg-[#050505] relative">
                  
                  {/* Decorative telemetry graphic background */}
                  <div className="absolute top-0 right-0 p-8 font-mono text-[8px] text-white/5 pointer-events-none text-right">
                    SYS.LOG // OK <br/>
                    ACCENT // {selectedItem.accent}
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">PROTOCOL {selectedItem.id}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="font-mono text-[9px] text-violet-400 font-bold uppercase tracking-widest">{selectedItem.category}</span>
                      </div>
                      
                      <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-white tracking-tight italic">
                        {selectedItem.title}
                      </h2>
                    </div>

                    {/* Brief Description */}
                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 font-mono text-[9px] text-violet-400 uppercase tracking-widest">
                        <Sparkles size={12} />
                        <span>Creative Directive</span>
                      </div>
                      <p className="font-mono text-xs text-gray-400 leading-relaxed uppercase tracking-wider">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Telemetry Dashboard Data */}
                    <div className="space-y-4">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold block border-b border-white/5 pb-2">Technical Telemetry</span>
                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 font-mono text-[10px]">
                        <div>
                          <span className="text-gray-600 block uppercase tracking-widest mb-1">Canvas Resolution</span>
                          <span className="text-white font-bold">{selectedItem.resolution}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block uppercase tracking-widest mb-1">Layer Volume</span>
                          <span className="text-white font-bold">{selectedItem.layers}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block uppercase tracking-widest mb-1">System Operator</span>
                          <span className="text-white font-bold">Biniyam Edits</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block uppercase tracking-widest mb-1">Client Authority</span>
                          <span className="text-white font-bold">{selectedItem.client}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack used */}
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold block border-b border-white/5 pb-2">Software Blueprint</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedItem.software.map((sw, i) => (
                          <span key={i} className="font-mono text-[9px] text-white border border-white/10 bg-white/5 px-3 py-1 rounded-xl uppercase tracking-wider">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-10 mt-8 border-t border-white/5 flex gap-4">
                    <a 
                      href="/#contact" 
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 bg-white text-black py-4 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all text-center"
                    >
                      REQUEST BRAND PROTOCOL
                    </a>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

// Render React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GalleryApp />
    </React.StrictMode>
  );
}
