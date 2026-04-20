import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  span: string; // Tailwind grid span class
  videoUrl: string; // Placeholder for video/image
  aspect: string;
}

const categories = ["ALL", "COMMERCIAL", "SHORT-FORM", "DOCUMENTARY", "MUSIC VIDEO", "MOTION GFX"];

const projects: Project[] = [
  { id: 1, title: "NIKE // VELOCITY", category: "COMMERCIAL", span: "md:col-span-2 md:row-span-2", videoUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-video" },
  { id: 2, title: "LIFESTYLE VLOG", category: "SHORT-FORM", span: "md:col-span-1 md:row-span-2", videoUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop", aspect: "aspect-[9/16]" },
  { id: 3, title: "TECH REVIEW", category: "DOCUMENTARY", span: "md:col-span-1 md:row-span-1", videoUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-square" },
  { id: 4, title: "CYBERPUNK UI", category: "MOTION GFX", span: "md:col-span-1 md:row-span-1", videoUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-square" },
  { id: 5, title: "NEON NIGHTS", category: "MUSIC VIDEO", span: "md:col-span-1 md:row-span-1", videoUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-video" },
];

export const Works: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="work" className="w-full bg-[#050505] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase mb-2">Selected <span className="text-stroke text-transparent">Works</span></h2>
            <span className="font-mono text-xs text-gray-500">[ 2021 — 2024 ]</span>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full font-mono text-[10px] md:text-xs tracking-wider transition-all border ${
                  activeFilter === cat 
                    ? 'bg-violet-600/20 border-violet-600 text-violet-400' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min min-h-[500px]"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                data-cursor-text="PLAY"
                className={`relative group overflow-hidden rounded-md border border-white/5 bg-[#0a0a0a] ${activeFilter === "ALL" ? project.span : 'col-span-1 row-span-1 aspect-video'} ${project.aspect === 'aspect-[9/16]' && activeFilter === "ALL" ? 'h-[600px]' : 'h-full min-h-[300px]'}`}
              >
                {/* Image/Video Placeholder */}
                <img 
                  src={project.videoUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300 ease-in-out"
                />
                
                {/* Permanent Vignette Overlay for Readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                
                {/* Additional Subtle Overlay on entire image that fades on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-[10px] font-mono border border-white/20 rounded backdrop-blur-md text-white bg-black/50">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white">{project.title}</h3>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_0.8s_ease-in-out] pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Archive Access Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full font-mono text-xs text-gray-400 hover:text-white hover:border-white transition-all hover:bg-white/5"
          >
            <span>VIEW FULL ARCHIVE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
