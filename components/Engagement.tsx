
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Crown, ArrowRight, Crosshair, Target, Cpu, Activity, Shield, BarChart3, Terminal } from 'lucide-react';

// ============================================
// DATA MODELS
// ============================================

const models = [
  {
    id: '01',
    code: 'PROTOCOL_ALPHA',
    title: 'THE SPRINT',
    type: 'TACTICAL DEPLOYMENT',
    description: 'High-velocity execution for time-critical objectives. Rapid deployment of single assets with maximum impact.',
    stats: [
      { label: 'SPEED', value: 95 },
      { label: 'COMPLEXITY', value: 40 },
      { label: 'REVISION', value: 60 }
    ],
    loadout: ['Music Videos', 'Social Edits', 'Ad Spots'],
    duration: '48-72 HOURS',
    price: 'STARTING AT $500',
    icon: Zap,
    accent: 'text-amber-500',
    border: 'border-amber-500/50',
    bg: 'bg-amber-500/10'
  },
  {
    id: '02',
    code: 'PROTOCOL_BETA',
    title: 'THE CAMPAIGN',
    type: 'STRATEGIC NARRATIVE',
    description: 'Comprehensive narrative structuring across multiple vectors. Cohesive visual systems designed for sustained engagement.',
    stats: [
      { label: 'SPEED', value: 70 },
      { label: 'COMPLEXITY', value: 85 },
      { label: 'REVISION', value: 90 }
    ],
    loadout: ['Product Launches', 'Doc-Series', 'Commercials'],
    duration: '1-2 WEEKS',
    price: 'CUSTOM QUOTE',
    icon: Repeat,
    accent: 'text-violet-500',
    border: 'border-violet-500/50',
    bg: 'bg-violet-500/10'
  },
  {
    id: '03',
    code: 'PROTOCOL_OMEGA',
    title: 'THE PARTNER',
    type: 'FULL SPECTRUM',
    description: 'Complete post-production integration. Dedicated pipeline access with unlimited scaling potential.',
    stats: [
      { label: 'SPEED', value: 100 },
      { label: 'COMPLEXITY', value: 100 },
      { label: 'REVISION', value: 100 }
    ],
    loadout: ['Full Channel Mgmt', 'Agency Support', 'Brand Retainer'],
    duration: 'MONTHLY RETAINER',
    price: 'SUBSCRIPTION',
    icon: Crown,
    accent: 'text-emerald-500',
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-500/10'
  }
];

// ============================================
// SUB-COMPONENTS
// ============================================

const StatBar: React.FC<{ label: string; value: number; colorClass: string }> = ({ label, value, colorClass }) => (
  <div className="flex items-center gap-4 text-xs font-mono tracking-wider">
    <div className="w-24 text-gray-500 text-right">{label}</div>
    <div className="flex-1 h-1.5 bg-white/10 rounded-sm overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "circOut" }}
        className={`h-full ${colorClass.replace('text-', 'bg-')}`}
      />
    </div>
    <div className="w-8 text-right text-gray-400">{value}%</div>
  </div>
);

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 translate-x-[2px] text-red-500 opacity-70 mix-blend-screen animate-pulse">{text}</span>
      <span className="absolute top-0 left-0 -z-10 -translate-x-[2px] text-blue-500 opacity-70 mix-blend-screen animate-pulse ring-offset-2">{text}</span>
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const Engagement: React.FC = () => {
  const [activeId, setActiveId] = useState('02');
  const activeModel = models.find(m => m.id === activeId) || models[0];

  return (
    <section className="w-full min-h-screen bg-[#050505] relative flex items-center py-24 border-t border-white/5 overflow-hidden">

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${activeModel.accent.replace('text-', 'from-')}/10 to-transparent rounded-full blur-[120px] transition-colors duration-1000`} />

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">

        {/* Header HUD */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-gray-500" />
            <span className="font-mono text-xs text-gray-500 tracking-[0.2em]">ENGAGEMENT_PROTOCOLS_V2.0</span>
          </div>
          <div className="font-mono text-xs text-gray-600 flex gap-4">
            <span>SYS.STATUS: ONLINE</span>
            <span>Encryp: AES-256</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

          {/* LEFT COLUMN: SELECTION LIST (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-2">
            {models.map((model) => (
              <motion.button
                key={model.id}
                onClick={() => setActiveId(model.id)}
                className={`group relative text-left p-6 border-l-2 transition-all duration-300 overflow-hidden ${activeId === model.id
                    ? `bg-white/[0.03] ${model.border} ${model.accent}`
                    : 'border-white/5 text-gray-600 hover:text-gray-300 hover:bg-white/[0.01]'
                  }`}
              >
                {/* Hover Reveal Background */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"
                />

                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest opacity-60 mb-1">{model.id} // {model.code}</div>
                    <div className="font-display text-2xl font-bold uppercase tracking-tight">{model.title}</div>
                  </div>
                  {activeId === model.id && (
                    <motion.div layoutId="arrow" transition={{ duration: 0.2 }}>
                      <ArrowRight size={18} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}

            {/* Decoration */}
            <div className="mt-8 p-4 border border-white/5 rounded bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Activity size={14} />
                <span className="font-mono text-[10px] tracking-widest uppercase">System Load</span>
              </div>
              <div className="flex gap-0.5 h-8 items-end opacity-50">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`w-1 bg-gray-500`} style={{ height: `${Math.random() * 100}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DATA TERMINAL (8 Cols) */}
          <div className="lg:col-span-8 relative min-h-[500px]">

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
                className="h-full bg-white/[0.02] backdrop-blur-sm border border-white/5 p-8 md:p-12 flex flex-col justify-between"
              >
                {/* Terminal Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border ${activeModel.border} ${activeModel.bg} ${activeModel.accent} mb-4`}>
                      <activeModel.icon size={14} />
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase">{activeModel.type}</span>
                    </div>
                    <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
                      <GlitchText text={activeModel.title} />
                    </h3>
                    <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed">
                      {activeModel.description}
                    </p>
                  </div>

                  {/* Big ID Number */}
                  <div className="hidden md:block text-right">
                    <div className={`font-display text-8xl font-bold opacity-10 ${activeModel.accent} text-stroke`}>
                      {activeModel.id}
                    </div>
                  </div>
                </div>

                {/* Stats & Loadout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-8">

                  {/* Column 1: Performance Matrix */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <BarChart3 size={14} />
                      <span className="font-mono text-[10px] tracking-widest uppercase">Performance Matrix</span>
                    </div>
                    {activeModel.stats.map(stat => (
                      <StatBar key={stat.label} label={stat.label} value={stat.value} colorClass={activeModel.accent} />
                    ))}
                  </div>

                  {/* Column 2: Mission Loadout */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <Target size={14} />
                      <span className="font-mono text-[10px] tracking-widest uppercase">Target Scope</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeModel.loadout.map(item => (
                        <span key={item} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[10px] text-gray-500 uppercase">Estimated Output</div>
                        <div className={`text-xl font-bold ${activeModel.accent}`}>{activeModel.duration}</div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-gray-500 uppercase">Investment</div>
                        <div className="text-white font-bold">{activeModel.price}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-12">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full group relative overflow-hidden py-4 ${activeModel.bg} border ${activeModel.border} flex items-center justify-center gap-3 transition-all hover:bg-white/10`}
                  >
                    <span className={`font-mono text-sm font-bold tracking-[0.2em] uppercase ${activeModel.accent} group-hover:text-white transition-colors`}>
                      Initialize Protocol
                    </span>
                    <Cpu size={16} className={`${activeModel.accent} group-hover:text-white transition-colors`} />

                    {/* Scanning beam effect */}
                    <motion.div
                      className={`absolute top-0 bottom-0 w-[2px] ${activeModel.accent.replace('text-', 'bg-')} opacity-50`}
                      animate={{ left: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.button>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
};
