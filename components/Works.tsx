
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, LayoutGrid, Info } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  span: string; // Tailwind grid span
  thumbnail: string;
  video: string;
  accent: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "NIKE // VELOCITY", 
    category: "COMMERCIAL", 
    span: "md:col-span-2 md:row-span-2", 
    thumbnail: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4",
    accent: "violet-500"
  },
  { 
    id: 2, 
    title: "NEON NIGHTS", 
    category: "MUSIC VIDEO", 
    span: "md:col-span-1 md:row-span-2", 
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/4207908/4207908-hd_1920_1080_25fps.mp4",
    accent: "fuchsia-500"
  },
  { 
    id: 3, 
    title: "CYBERPUNK UI", 
    category: "MOTION GFX", 
    span: "md:col-span-1 md:row-span-1", 
    thumbnail: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1887&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/6575193/6575193-hd_1920_1080_30fps.mp4",
    accent: "blue-500"
  },
  { 
    id: 4, 
    title: "TECH REVIEW", 
    category: "DOCUMENTARY", 
    span: "md:col-span-1 md:row-span-1", 
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/2792370/2792370-hd_1920_1080_30fps.mp4",
    accent: "amber-500"
  },
  { 
    id: 5, 
    title: "LIFESTYLE VLOG", 
    category: "SHORT-FORM", 
    span: "md:col-span-1 md:row-span-1", 
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/852423/852423-hd_1920_1080_25fps.mp4",
    accent: "emerald-500"
  }
];

const categories = ["ALL", "COMMERCIAL", "SHORT-FORM", "DOCUMENTARY", "MUSIC VIDEO", "MOTION GFX"];

export const Works: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="work" className="w-full bg-black py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Elite Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/5 pb-12">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Cinematic_Archive</span>
                </motion.div>
                <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-none">
                    Selected <span className="text-stroke text-transparent">Works</span>
                </h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 rounded-lg font-mono text-[10px] tracking-widest transition-all duration-300 border ${
                            activeFilter === cat 
                                ? 'bg-violet-600 border-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* The Elite Bento Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]"
        >
            <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`relative group rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/30 ${activeFilter === 'ALL' ? project.span : 'col-span-1 row-span-1'}`}
                    >
                        {/* Media Container */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className={`w-full h-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100 ${hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`}
                            />
                            
                            {/* Video Preview */}
                            <div className={`absolute inset-0 transition-opacity duration-700 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                                <video 
                                    src={project.video}
                                    autoPlay muted loop playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <motion.div 
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full font-mono text-[9px] text-white tracking-widest"
                                >
                                    {project.category}
                                </motion.div>
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight group-hover:text-violet-400 transition-colors leading-none mb-4">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                     <div className="flex items-center gap-2 font-mono text-[9px] text-gray-400 capitalize">
                                        <Play size={10} className="text-violet-500" />
                                        <span>Preview Loaded</span>
                                     </div>
                                     <div className="flex items-center gap-2 font-mono text-[9px] text-gray-400 capitalize">
                                        <Info size={10} className="text-violet-500" />
                                        <span>Case Study Available</span>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Glow Effect */}
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${project.accent}/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
            <button className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                    Decrypt All Archives
                    <LayoutGrid size={14} className="group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
        </div>
      </div>
    </section>
  );
};
