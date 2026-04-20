import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 200); // Slight pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      {/* Left Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={isComplete ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#030303] z-20 border-r border-white/5"
      />

      {/* Right Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={isComplete ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#030303] z-20 border-l border-white/5"
      />

      {/* Content (Fades out as curtains open) */}
      <motion.div 
        animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-30 flex flex-col items-center"
      >
        <div className="flex items-end gap-1 font-mono text-6xl md:text-8xl font-bold text-white tracking-tighter">
            <span className="w-[3ch] text-right tabular-nums">
                {Math.floor(count).toString().padStart(2, '0')}
            </span>
            <span className="text-2xl md:text-4xl text-gray-500 mb-2">:</span>
            <span className="text-2xl md:text-4xl text-gray-500 mb-2 tabular-nums">
                {(count % 1 * 100).toFixed(0).padStart(2, '0')}
            </span>
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-2">
            <div className="h-[2px] w-32 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-white"
                    style={{ width: `${count}%` }}
                />
            </div>
            <p className="font-mono text-[10px] text-gray-500 tracking-[0.3em] animate-pulse">
                INITIALIZING SEQUENCE
            </p>
        </div>
      </motion.div>
    </motion.div>
  );
};