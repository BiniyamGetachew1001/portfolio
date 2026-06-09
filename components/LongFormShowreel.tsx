import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Film, Award, Monitor } from 'lucide-react';

const longFormProjects = [
  {
    title: "Documentary: The Silent Rhythm",
    duration: "12:45",
    description: "A deep dive into the world of underground street racing. Edited for cinematic immersion and narrative depth.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/3205915/3205915-hd_1920_1080_25fps.mp4"
  },
  {
    title: "Brand Story: Horizon Labs",
    duration: "08:20",
    description: "Corporate storytelling redefined. A blend of high-end motion graphics and interview-driven pacing.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4"
  }
];

export const LongFormShowreel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="w-full bg-[#050505] py-40 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
          >
            <Film size={14} className="text-violet-500" />
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Cinema & Long Form</span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase italic leading-none mb-8">
            NARRATIVE <br/>
            <span className="text-stroke text-transparent">ARCHITECTURE</span>
          </h2>
        </div>

        {/* Cinematic Showcase */}
        <div className="space-y-40">
          {longFormProjects.map((project, index) => (
            <motion.div
              key={project.title}
              style={{ scale, opacity }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
            >
              {/* Theater Frame */}
              <div className="w-full lg:w-2/3 group relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-black cursor-pointer shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center bg-white/5"
                    >
                        <Play className="fill-white text-white ml-1" size={32} />
                    </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/50 bg-black/60 px-3 py-1 rounded-md backdrop-blur-md">
                    {project.duration}
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-1/3 space-y-8">
                <div className="space-y-4">
                    <h3 className="font-display text-3xl md:text-5xl text-white font-bold uppercase leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-gray-500 font-mono text-xs leading-loose uppercase tracking-wider">
                        {project.description}
                    </p>
                </div>

                <div className="flex gap-10">
                    <div className="flex flex-col gap-2">
                        <Award size={18} className="text-violet-500" />
                        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">Award Winning Grade</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Monitor size={18} className="text-violet-500" />
                        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">Mastered for 4K</span>
                    </div>
                </div>

                <button className="group flex items-center gap-4 font-mono text-[10px] text-white uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-colors">
                    View Project Case Study
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-violet-600/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-fuchsia-600/5 to-transparent pointer-events-none" />
    </section>
  );
};
