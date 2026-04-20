
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Crown, ArrowRight, Check, Crosshair, Target } from 'lucide-react';

const models = [
  {
    id: '01',
    title: 'THE SPRINT',
    subtitle: 'Tactical Deployment',
    icon: Zap,
    scope: 'Rapid production for high-impact deliverables. We execute specific assets with precision speed.',
    targets: ['Music Videos', 'Ad Spots', 'Thumbnails'],
    details: '48-72h Turnaround',
    highlight: false
  },
  {
    id: '02',
    title: 'THE CAMPAIGN',
    subtitle: 'Strategic Narrative',
    icon: Repeat,
    scope: 'Comprehensive narrative structuring. We build cohesive visual systems across multiple deliverables.',
    targets: ['Product Launches', 'Doc Series', 'Brand Awareness'],
    details: 'Multi-Asset Delivery',
    highlight: false
  },
  {
    id: '03',
    title: 'THE PARTNER',
    subtitle: 'Full Spectrum Retainer',
    icon: Crown,
    scope: 'Your dedicated post-production division. Priority queue, Slack integration, and monthly asset systems.',
    targets: ['YouTubers', 'Agencies', 'Global Brands'],
    details: 'Dedicated Pipeline',
    highlight: true
  }
];

const AccordionItem: React.FC<{ 
  model: typeof models[0]; 
  isOpen: boolean; 
  onClick: () => void; 
}> = ({ model, isOpen, onClick }) => {
  return (
    <motion.div 
      className={`relative border-b border-white/10 overflow-hidden group transition-all duration-500 ${
        isOpen ? 'bg-gradient-to-r from-violet-900/10 via-black to-black' : 'hover:bg-white/5 bg-transparent'
      } ${model.highlight ? 'border-l-[2px] border-l-violet-500' : 'border-l-[2px] border-l-transparent'}`}
      onClick={onClick}
    >
      {/* "Limited" Badge for Partner */}
      {model.highlight && (
        <div className="absolute top-4 left-4 md:left-8 px-2 py-0.5 bg-violet-600/20 border border-violet-500/50 rounded text-[10px] font-mono text-violet-400 tracking-widest uppercase">
          Limited Availability
        </div>
      )}

      {/* Header (Always Visible) */}
      <div className="relative flex items-center justify-between py-8 md:py-12 px-4 md:px-8 cursor-pointer z-20">
        <div className="flex flex-col gap-1">
          <motion.h3 
            className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-gray-600 group-hover:text-white'
            }`}
          >
            {model.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
            className="font-mono text-violet-400 text-xs md:text-sm tracking-widest uppercase"
          >
            // {model.subtitle}
          </motion.div>
        </div>

        {/* Big Number */}
        <div className={`font-display text-6xl md:text-8xl font-bold transition-all duration-500 ${
          isOpen 
            ? 'text-white opacity-20 translate-x-0' 
            : 'text-stroke text-transparent opacity-20 group-hover:opacity-40 translate-x-4 group-hover:translate-x-0'
        }`}>
          {model.id}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 md:px-8 pb-12 pt-4 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                
                {/* Col 1: Scope */}
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Crosshair size={16} className="text-violet-500" />
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Mission Scope</span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {model.scope}
                  </p>
                </div>

                {/* Col 2: Targets */}
                <div className="md:col-span-4">
                   <div className="flex items-center gap-2 mb-4">
                    <Target size={16} className="text-violet-500" />
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Ideal Targets</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {model.targets.map(target => (
                      <div key={target} className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="w-1 h-1 bg-gray-600 rounded-full" />
                        {target}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 3: Action */}
                <div className="md:col-span-3 flex flex-col justify-end">
                  <button className="group relative w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden">
                    <span className="relative z-10">Initialize</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="mt-3 text-center">
                    <span className="font-mono text-[10px] text-gray-600 uppercase">
                      Protocol: {model.details}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Glow Effect */}
      {isOpen && (
        <motion.div 
          layoutId="glow"
          className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-transparent pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export const Engagement: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('02');

  return (
    <section className="w-full bg-[#030303] py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 pl-4 border-l border-white/20">
           <h2 className="font-mono text-violet-400 text-xs tracking-widest uppercase mb-2">
              Partnership Protocols
           </h2>
           <div className="font-display text-3xl md:text-4xl font-bold text-white uppercase">
              Select Engagement Model
           </div>
        </div>

        {/* Accordion Stack */}
        <div className="flex flex-col border-t border-white/10">
          {models.map((model) => (
            <AccordionItem 
              key={model.id} 
              model={model} 
              isOpen={expandedId === model.id} 
              onClick={() => setExpandedId(expandedId === model.id ? null : model.id)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};
