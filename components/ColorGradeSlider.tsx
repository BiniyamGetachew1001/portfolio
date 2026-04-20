
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { MoveHorizontal, Layers, Zap, Palette, Play, PenTool, LayoutGrid } from 'lucide-react';

// ============================================
// SUB-COMPONENT: COLOR SLIDER (Original Logic)
// ============================================
const ColorSlider = () => {
  const x = useMotionValue(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const clipPathStyle = useMotionTemplate`polygon(0 0, ${x}% 0, ${x}% 100%, 0 100%)`;
  const handleStyle = useMotionTemplate`${x}%`;

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (relativeX / rect.width) * 100;
      x.set(percent);
    }
  }, [x]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchend', stopDrag);
    } else {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    }
    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging]);

  const imageUrl = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="w-full flex flex-col gap-6"
    >
        <div 
          ref={containerRef}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden cursor-ew-resize group shadow-2xl"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          data-cursor-text="DRAG"
        >
          {/* Graded Image */}
          <div className="absolute inset-0">
             <img src={imageUrl} alt="Graded" className="w-full h-full object-cover pointer-events-none" />
             <div className="absolute top-6 right-6 font-mono text-xs font-bold bg-black/50 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-white">
               GRADED / FINAL
             </div>
          </div>

          {/* Raw Image */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: clipPathStyle }}
          >
             <img 
               src={imageUrl} 
               alt="Raw" 
               className="w-full h-full object-cover pointer-events-none filter sepia-[0.2] contrast-[0.8] brightness-[0.9] saturate-[0.5] grayscale-[0.3]" 
             />
             <div className="absolute top-6 left-6 font-mono text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-black/80">
               RAW / LOG
             </div>
          </motion.div>

          {/* Handle */}
          <motion.div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ left: handleStyle }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border border-white rounded-full flex items-center justify-center shadow-lg">
              <MoveHorizontal size={20} className="text-white" />
            </div>
          </motion.div>
        </div>
        
        <p className="font-mono text-gray-500 text-sm md:text-base text-center">
            <span className="text-violet-400">Cinematic Grading</span> & Mood Architecture.
        </p>
    </motion.div>
  );
};

// ============================================
// SUB-COMPONENT: MOTION GRID
// ============================================
const MotionGrid = () => {
    const items = [
        { id: 1, title: 'KINETIC TYPOGRAPHY', video: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4' },
        { id: 2, title: 'HUD / UI DESIGN', video: 'https://videos.pexels.com/video-files/852423/852423-hd_1920_1080_25fps.mp4' },
        { id: 3, title: 'LOGO ANIMATION', video: 'https://videos.pexels.com/video-files/2792370/2792370-hd_1920_1080_30fps.mp4' }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            {items.map((item) => (
                <div key={item.id} className="group relative aspect-[9/16] md:aspect-square lg:aspect-[4/3] bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/5 hover:border-violet-500/50 transition-colors">
                    <video 
                        src={item.video}
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6">
                        <div className="w-8 h-1 bg-violet-500 mb-2" />
                        <h4 className="font-display text-xl uppercase font-bold text-white">{item.title}</h4>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

// ============================================
// SUB-COMPONENT: VFX BREAKDOWN
// ============================================
const VfxBreakdown = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full"
        >
             <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/10 group">
                <video 
                    src="https://videos.pexels.com/video-files/6575193/6575193-hd_1920_1080_30fps.mp4"
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                />
                
                {/* Simulated Breakdown UI */}
                <div className="absolute top-6 left-6 flex gap-2">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded font-mono text-xs text-violet-400">LAYER: COMPOSITE</div>
                    <div className="px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded font-mono text-xs text-gray-400">PASS: FINAL</div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-1 bg-gray-800">
                    <motion.div 
                        className="h-full bg-violet-500"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </div>
             </div>
             <p className="font-mono text-gray-500 text-sm md:text-base text-center mt-6">
                From <span className="text-white">Wireframe</span> to <span className="text-white">Render</span>. Complex compositing breakdown.
             </p>
        </motion.div>
    );
};

// ============================================
// SUB-COMPONENT: DESIGN GRID (Bento Gallery)
// ============================================
const DesignGrid = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="w-full grid grid-cols-1 md:grid-cols-3 grid-rows-none md:grid-rows-2 gap-4 h-auto md:h-[600px]"
        >
            {/* Item A: Vertical Poster (Left, Vertical) */}
            <div className="md:row-span-2 md:col-span-1 relative group overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5 h-[400px] md:h-full">
                {/* Mockup Context: Dark Wall */}
                <div className="absolute inset-0 bg-[#050505]">
                    <img 
                        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1887&auto=format&fit=crop" 
                        alt="Poster Design"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-violet-400 font-mono text-xs mb-1 block tracking-wider">SOCIAL CAMPAIGN</span>
                    <h4 className="text-white font-display text-2xl uppercase">Vertical Story</h4>
                </div>
            </div>

            {/* Item B: YouTube Thumbnail (Top Right, Wide) */}
            <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl bg-[#0e0e0e] border border-white/5 flex items-center justify-center p-8 h-[300px] md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                {/* iPad Mockup Frame */}
                <div className="relative w-full max-w-[400px] aspect-video bg-black rounded-lg border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden transform group-hover:scale-[1.03] transition-transform duration-500">
                    <img 
                        src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2074&auto=format&fit=crop" 
                        alt="Thumbnail"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100" 
                    />
                    {/* Camera Dot */}
                    <div className="absolute top-1/2 left-2 -translate-y-1/2 w-1 h-1 bg-[#333] rounded-full"></div>
                    
                    {/* Screen Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-right">
                    <span className="text-violet-400 font-mono text-xs mb-1 block tracking-wider">YOUTUBE</span>
                    <h4 className="text-white font-display text-2xl uppercase">Thumbnail Design</h4>
                </div>
            </div>

            {/* Item C: UI/Overlay (Bottom Right, Wide) */}
            <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5 h-[300px] md:h-auto">
                <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop" 
                    alt="Stream Overlay"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* UI Element Simulation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="px-6 py-3 border border-violet-500/30 bg-violet-500/10 rounded backdrop-blur-md flex items-center gap-3">
                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                         <span className="font-display text-xl md:text-2xl font-bold text-white tracking-widest">LIVE OVERLAY</span>
                    </div>
                </div>
                
                <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-violet-400 font-mono text-xs mb-1 block tracking-wider">BROADCAST</span>
                    <h4 className="text-white font-display text-2xl uppercase">Identity System</h4>
                </div>
            </div>
        </motion.div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
export const VisualEngineering: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COLOR' | 'MOTION' | 'VFX' | 'DESIGN'>('COLOR');

  const tabs = [
      { id: 'COLOR', label: '01 COLOR', icon: Palette },
      { id: 'MOTION', label: '02 MOTION', icon: Zap },
      { id: 'VFX', label: '03 VFX', icon: Layers },
      { id: 'DESIGN', label: '04 DESIGN', icon: PenTool },
  ];

  return (
    <section className="w-full bg-black py-32 px-4 overflow-hidden select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 uppercase text-white">
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Engineering</span>
          </h2>
          <p className="font-mono text-gray-500 text-sm md:text-base tracking-widest uppercase">
            Technical Artistry & Post-Production
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`group relative flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm tracking-wider transition-all duration-300 ${
                        activeTab === tab.id 
                            ? 'bg-white/10 text-white border border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                            : 'bg-transparent text-gray-500 border border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                >
                    <tab.icon size={14} className={activeTab === tab.id ? 'text-violet-400' : 'group-hover:text-white transition-colors'} />
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full" />
                    )}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
                {activeTab === 'COLOR' && (
                    <motion.div key="COLOR" className="w-full">
                        <ColorSlider />
                    </motion.div>
                )}
                {activeTab === 'MOTION' && (
                    <motion.div key="MOTION" className="w-full">
                        <MotionGrid />
                    </motion.div>
                )}
                {activeTab === 'VFX' && (
                    <motion.div key="VFX" className="w-full">
                        <VfxBreakdown />
                    </motion.div>
                )}
                {activeTab === 'DESIGN' && (
                    <motion.div key="DESIGN" className="w-full">
                        <DesignGrid />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
