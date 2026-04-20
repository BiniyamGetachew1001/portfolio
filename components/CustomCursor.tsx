import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  // PERFORMANCE: Use MotionValues instead of State for high-frequency updates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics handled by Framer Motion outside React render cycle
  const springConfig = { damping: 35, stiffness: 800, mass: 0.05 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string>("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Update motion values directly - NO RE-RENDER
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      setCursorText(text || "");

      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        !!text;
        
      setIsHovered(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Animation Variants
  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 1)",
      borderWidth: "1px",
      mixBlendMode: "difference" as const,
      scale: 1
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 0.5)",
      borderWidth: "1px",
      mixBlendMode: "difference" as const,
      scale: 1
    },
    text: {
        width: 80,
        height: 80,
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Translucent
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: "1px",
        mixBlendMode: "normal" as const, // Normal for glass effect
        scale: 1,
        backdropFilter: "blur(12px)" // Glass effect
    }
  };

  const cursorState = cursorText ? "text" : (isHovered ? "hover" : "default");

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
        <motion.div 
          className="rounded-full flex items-center justify-center relative overflow-hidden"
          variants={variants}
          animate={cursorState}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
           {/* Center Dot */}
           {cursorState === 'default' && (
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute" />
           )}

           {/* Content */}
           {cursorText && (
             <div className="relative z-10 flex items-center justify-center">
               {cursorText === "PLAY" ? (
                 <Play className="fill-white text-white translate-x-0.5" size={24} />
               ) : (
                 <span className="text-white font-display font-bold text-xs tracking-widest">{cursorText}</span>
               )}
             </div>
           )}
        </motion.div>
    </motion.div>
  );
};