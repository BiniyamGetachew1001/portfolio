import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';

const VIDEO_NAMES = [
  "THE SOCIAL GAME (28).mp4",
  "THE SOCIAL GAME (37).mp4",
  "THE SOCIAL GAME (46).mp4",
  "THE SOCIAL GAME (60).mp4",
  "THE SOCIAL GAME (92).mp4",
  "THE SOCIAL GAME (126).mp4",
  "THE SOCIAL GAME (127).mp4",
  "THE SOCIAL GAME (175).mp4",
  "THE SOCIAL GAME (229).mp4",
  "THE SOCIAL GAME (240).mp4",
  "THE SOCIAL GAME (264).mp4",
  "THE SOCIAL GAME (265).mp4",
  "THE SOCIAL GAME (277).mp4",
  "THE SOCIAL GAME (309).mp4",
  "THE SOCIAL GAME (356).mp4",
  "THE SOCIAL GAME (381).mp4",
  "THE SOCIAL GAME (385).mp4",
  "THE SOCIAL GAME (388).mp4",
  "THE SOCIAL GAME (403).mp4",
  "THE SOCIAL GAME (450).mp4",
  "THE SOCIAL GAME (526).mp4",
  "THE SOCIAL GAME (529).mp4",
  "THE SOCIAL GAME (633).mp4",
  "THE SOCIAL GAME (750).mp4",
  "THE SOCIAL GAME (773).mp4",
  "THE SOCIAL GAME (813).mp4",
  "THE SOCIAL GAME (850).mp4",
  "THE SOCIAL GAME (872).mp4",
  "THE SOCIAL GAME (874).mp4",
  "THE SOCIAL GAME (905).mp4",
  "THE SOCIAL GAME (928).mp4",
  "THE SOCIAL GAME (947).mp4",
  "THE SOCIAL GAME (963).mp4",
  "THE SOCIAL GAME (986).mp4",
  "THE SOCIAL GAME (987).mp4",
  "THE SOCIAL GAME (1057).mp4",
  "THE SOCIAL GAME (1082).mp4",
  "THE SOCIAL GAME (1106).mp4",
  "THE SOCIAL GAME (1165).mp4",
  "THE SOCIAL GAME (1193).mp4",
  "THE SOCIAL GAME (1236).mp4",
  "THE SOCIAL GAME (1263).mp4",
  "THE SOCIAL GAME (1267).mp4",
  "THE SOCIAL GAME (1297).mp4",
  "THE SOCIAL GAME (1339).mp4",
  "THE SOCIAL GAME (1347).mp4",
  "THE SOCIAL GAME (1374).mp4",
  "THE SOCIAL GAME (1392).mp4",
  "THE SOCIAL GAME (1394).mp4",
  "THE SOCIAL GAME (1417).mp4",
  "THE SOCIAL GAME (1452).mp4",
  "THE SOCIAL GAME (1453).mp4",
  "THE SOCIAL GAME (1468).mp4",
  "THE SOCIAL GAME (1477).mp4",
  "THE SOCIAL GAME (1481).mp4",
  "THE SOCIAL GAME (1505).mp4",
];

const ROW_A = VIDEO_NAMES.slice(0, 28);
const ROW_B = VIDEO_NAMES.slice(28);

const CDN_BASE = 'https://res.cloudinary.com/dblwp7agu/video/upload/q_auto,vc_auto/reels';

// --- Lightbox Modal ---
interface LightboxProps {
  src: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.play().catch(() => { v.muted = true; v.play(); });
    }
  }, [src]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Card */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[10px] text-gray-400 hover:text-white tracking-widest uppercase transition-colors"
        >
          <X size={14} />
          <span>CLOSE</span>
        </button>

        {/* Video */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: 'min(340px, 85vw)',
            aspectRatio: '9/16',
            boxShadow: '0 0 0 1px rgba(127,0,255,0.4), 0 0 60px 12px rgba(127,0,255,0.15)',
          }}
        >
          <video
            ref={videoRef}
            src={`${CDN_BASE}/${encodeURIComponent(src)}`}
            controls
            playsInline
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Label */}
        <div className="mt-4 flex items-center gap-2">
          <Volume2 size={11} className="text-violet-400" />
          <span className="font-mono text-[9px] text-violet-400 tracking-[0.25em] uppercase">
            With Audio
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Video Card ---
interface VideoCardProps {
  src: string;
  index: number;
  onOpen: (src: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, index, onOpen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Intersection Observer — only play when visible in viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] rounded-xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: '9/16' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(src)}
    >
      {/* Glow border */}
      <div
        className="absolute inset-0 rounded-xl z-20 pointer-events-none transition-all duration-300"
        style={{
          boxShadow: hovered
            ? '0 0 0 1.5px #7F00FF, 0 0 24px 4px rgba(127,0,255,0.35)'
            : '0 0 0 1px rgba(255,255,255,0.07)',
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
        }}
      />

      {/* Clip number (always visible, fades on hover) */}
      <div
        className="absolute top-2 left-2 z-20 pointer-events-none transition-opacity duration-200"
        style={{ opacity: hovered ? 0 : 0.4 }}
      >
        <span className="font-mono text-[9px] text-white tracking-widest">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Hover CTA */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-0 left-0 right-0 z-20 p-3 pointer-events-none"
          >
            <div className="flex items-center gap-1.5">
              <Volume2 size={10} className="text-violet-400" />
              <span className="font-mono text-[9px] text-violet-400 tracking-widest uppercase">
                Tap to open
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <video
        ref={videoRef}
        src={`${CDN_BASE}/${encodeURIComponent(src)}`}
        muted
        playsInline
        loop
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
      />
    </div>
  );
};

// --- Marquee Row ---
interface MarqueeRowProps {
  videos: string[];
  direction?: 'left' | 'right';
  speed?: number;
  startIndex?: number;
  onOpen: (src: string) => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  videos,
  direction = 'left',
  speed = 35,
  startIndex = 0,
  onOpen,
}) => {
  const tripled = [...videos, ...videos, ...videos];

  return (
    <div className="overflow-hidden w-full group/row">
      <div
        className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} group-hover/row:[animation-play-state:paused]`}
        style={
          {
            '--marquee-duration': `${speed}s`,
            '--marquee-width': `${videos.length * 216}px`,
          } as React.CSSProperties
        }
      >
        {tripled.map((name, i) => (
          <VideoCard
            key={`${name}-${i}`}
            src={name}
            index={(startIndex + (i % videos.length)) % VIDEO_NAMES.length}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
};

// --- Section ---
export const ShortFormReel: React.FC = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const openLightbox = useCallback((src: string) => setLightboxSrc(src), []);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  return (
    <>
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} onClose={closeLightbox} />
        )}
      </AnimatePresence>

      <section className="relative w-full bg-[#030303] py-20 overflow-hidden">
        {/* Section header */}
        <div className="px-4 md:px-8 max-w-7xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-violet-500 uppercase mb-3">
                [ Short-Form Content ]
              </p>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none">
                The Social{' '}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
                >
                  Game
                </span>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                {VIDEO_NAMES.length} Clips
              </span>
              <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">
                TikTok · Instagram · Reels
              </span>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-4">
          <MarqueeRow videos={ROW_A} direction="left" speed={40} startIndex={0} onOpen={openLightbox} />
          <MarqueeRow videos={ROW_B} direction="right" speed={50} startIndex={28} onOpen={openLightbox} />
        </div>

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
          style={{ background: 'linear-gradient(to right, #030303 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
          style={{ background: 'linear-gradient(to left, #030303 0%, transparent 100%)' }}
        />
      </section>
    </>
  );
};
