import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, Smartphone, TrendingUp } from 'lucide-react';

const clips = [
  {
    id: 1,
    title: "Cinematic Flow",
    views: "1.2M",
    video: "https://videos.pexels.com/video-files/3205915/3205915-hd_1920_1080_25fps.mp4",
    color: "bg-violet-600"
  },
  {
    id: 2,
    title: "Retention Hook",
    views: "850K",
    video: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
    color: "bg-fuchsia-600"
  },
  {
    id: 3,
    title: "Visual Narrative",
    views: "2.4M",
    video: "https://videos.pexels.com/video-files/3205915/3205915-hd_1920_1080_25fps.mp4",
    color: "bg-blue-600"
  },
  {
    id: 4,
    title: "Dynamic Grade",
    views: "500K",
    video: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
    color: "bg-amber-500"
  }
];

const VerticalFrame = ({ clip }: { clip: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
      className="relative aspect-[9/16] w-64 md:w-80 shrink-0 rounded-[2rem] overflow-hidden border border-white/10 group cursor-none mx-4"
      data-cursor-text="PLAY"
    >
      <video
        ref={videoRef}
        src={clip.video}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
      
      {/* Metrics Badge */}
      <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2">
        <TrendingUp size={10} className="text-white" />
        <span className="font-mono text-[9px] text-white font-bold">{clip.views}</span>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-8 left-8 right-8 transition-transform duration-500 group-hover:translate-y-[-10px]">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${clip.color}`} />
          <span className="font-mono text-[8px] text-white/60 uppercase tracking-widest">{clip.id.toString().padStart(2, '0')} // Protocol</span>
        </div>
        <h3 className="font-display text-2xl text-white font-bold uppercase italic leading-none">{clip.title}</h3>
      </div>

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center bg-white/5">
          <Play className="fill-white text-white translate-x-0.5" size={20} />
        </div>
      </div>
    </div>
  );
};

export const PremiumShowreel: React.FC = () => {
  // Duplicate clips for seamless loop
  const loopClips = [...clips, ...clips, ...clips];

  return (
    <section id="work" className="w-full bg-black py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10 mb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-violet-500" />
              <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">The Short Form Engine</span>
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase italic leading-none">
                PREMIUM <br/>
                <span className="text-stroke text-transparent">SHOWREEL</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-500 max-w-xs uppercase tracking-widest leading-loose text-right">
            High-velocity edits engineered for maximum retention. We turn attention into authority.
          </p>
        </div>
      </div>

      {/* Horizontal Looping Marquee */}
      <div className="flex w-full overflow-hidden relative py-10">
        <motion.div 
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap"
        >
          {loopClips.map((clip, index) => (
            <VerticalFrame key={`${clip.id}-${index}`} clip={clip} />
          ))}
        </motion.div>

        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-24">
        {/* Bottom Metadata */}
        <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/10 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-4">
                <span>9:16 Optimized</span>
                <span>//</span>
                <span>4K ProRes Output</span>
            </div>
            <div className="flex items-center gap-2">
                <Smartphone size={12} />
                <span>Mobile-First Architecture</span>
            </div>
        </div>
      </div>
    </section>
  );
};
