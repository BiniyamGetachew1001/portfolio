import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Smartphone, TrendingUp, X, Zap } from 'lucide-react';

type Clip = {
  id: number;
  title: string;
  views: string;
  video: string;
  color: string;
};

const clipColors = ["bg-violet-600", "bg-fuchsia-600", "bg-blue-600", "bg-amber-500"];
const clipLabels = ["Cinematic Flow", "Retention Hook", "Visual Narrative", "Dynamic Grade"];

const videoModules = import.meta.glob(
  '../Glowing Motion Graphics Reels Bundle-20260412T121753Z-3-002/Glowing Motion Graphics Reels Bundle/*.mp4',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const getClipNumber = (path: string) => {
  const match = path.match(/\((\d+)\)\.mp4$/);
  return match ? Number(match[1]) : 0;
};

const clips: Clip[] = Object.entries(videoModules)
  .sort(([a], [b]) => getClipNumber(a) - getClipNumber(b))
  .map(([path, video], index) => ({
    id: index + 1,
    title: `${clipLabels[index % clipLabels.length]} ${String(index + 1).padStart(2, '0')}`,
    views: "PLAY",
    video,
    color: clipColors[index % clipColors.length],
  }));

const VerticalFrame = ({ clip, onSelect }: { clip: Clip; onSelect: (clip: Clip) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPreview = () => {
    videoRef.current?.play();
  };

  const stopPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const openPlayer = () => {
    stopPreview();
    onSelect(clip);
  };

  return (
    <div
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onClick={openPlayer}
      className="relative aspect-[9/16] w-64 md:w-80 shrink-0 rounded-[2rem] overflow-hidden border border-white/10 group cursor-none mx-4"
      data-cursor-text="PLAY"
    >
      <video
        ref={videoRef}
        data-short-form-video="true"
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

const FocusedPlayer = ({ clip, onClose }: { clip: Clip; onClose: () => void }) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    playerRef.current?.play();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative h-full max-h-[88vh] aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <video
          ref={playerRef}
          key={clip.video}
          src={clip.video}
          className="h-full w-full object-cover"
          autoPlay
          controls
          playsInline
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
          <div>
            <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
              Reel {clip.id.toString().padStart(2, '0')}
            </div>
            <div className="mt-1 font-display text-xl text-white font-bold uppercase italic leading-none">
              {clip.title}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close focused video player"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
        >
          <X size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export const PremiumShowreel: React.FC = () => {
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
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
            Browse the reel stream, then click any piece to lock it in place and watch with sound.
          </p>
        </div>
      </div>

      {/* Horizontal Looping Marquee */}
      <div className="flex w-full overflow-hidden relative py-10">
        <motion.div 
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ 
            duration: Math.max(260, clips.length * 5.5),
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap"
        >
          {loopClips.map((clip, index) => (
            <VerticalFrame key={`${clip.id}-${index}`} clip={clip} onSelect={setSelectedClip} />
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

      <AnimatePresence>
        {selectedClip && (
          <FocusedPlayer
            clip={selectedClip}
            onClose={() => setSelectedClip(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
