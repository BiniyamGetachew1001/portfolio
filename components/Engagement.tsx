
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Repeat, Crown, ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

const models = [
  {
    id: '01',
    name: 'THE SPRINT',
    subtitle: 'Tactical Deployment',
    icon: Zap,
    description: 'High-velocity production for specific, high-impact deliverables. Perfect for tight deadlines.',
    features: ['48-72h Turnaround', 'Single Asset Focus', 'Unlimited Revisions', 'Direct Slack Access'],
    price: 'Fixed Per Asset',
    color: 'from-blue-500/20 to-transparent',
    accent: 'blue-500'
  },
  {
    id: '02',
    name: 'THE CAMPAIGN',
    subtitle: 'Strategic Narrative',
    icon: Repeat,
    description: 'A comprehensive visual system across multiple formats. We build a cohesive brand story.',
    features: ['Multi-Asset Delivery', 'Content Strategy', 'Project Management', 'Cloud Review Pipeline'],
    price: 'Project Based',
    color: 'from-violet-500/20 to-transparent',
    accent: 'violet-500',
    popular: true
  },
  {
    id: '03',
    name: 'THE PARTNER',
    subtitle: 'Divisional Retainer',
    icon: Crown,
    description: 'I become your dedicated post-production department. Priority queue and systemic integration.',
    features: ['Priority Asset Queue', 'Daily Communication', 'Storage & Archival', 'Strategic Consulting'],
    price: 'Monthly Retainer',
    color: 'from-amber-600/20 to-transparent',
    accent: 'amber-600'
  }
];

export const Engagement: React.FC = () => {
  return (
    <section id="engagement" className="w-full bg-black py-32 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] text-violet-500 tracking-[0.4em] uppercase mb-4 block">Engagement Protocols</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold text-white uppercase italic">
                Choose Your <span className="text-stroke text-transparent">Velocity</span>
            </h2>
          </motion.div>
        </div>

        {/* Pricing/Engagement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group bg-[#080808] border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col h-full transition-all duration-500 hover:border-${model.accent}/30 overflow-hidden shadow-2xl`}
            >
              {/* Highlight Glow */}
              <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${model.color} opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`} />
              
              {/* Popular Badge */}
              {model.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-violet-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    Most Strategic
                </div>
              )}

              {/* ID & Icon */}
              <div className="relative z-10 flex items-center justify-between mb-12">
                 <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-${model.accent} transition-colors duration-500`}>
                    <model.icon size={28} />
                 </div>
                 <span className="font-display text-4xl font-bold text-white/[0.05] group-hover:text-white/10 transition-colors">
                    {model.id}
                 </span>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-2 mb-8">
                <span className={`font-mono text-[10px] text-${model.accent} uppercase tracking-widest font-bold`}>{model.subtitle}</span>
                <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">{model.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed pt-2">
                    {model.description}
                </p>
              </div>

              {/* Features */}
              <div className="relative z-10 flex-1 space-y-4 mb-10">
                 {model.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 size={14} className={`text-${model.accent}/60`} />
                        <span className="text-xs font-mono text-gray-400 group-hover:text-gray-200 transition-colors">{feature}</span>
                    </div>
                 ))}
              </div>

              {/* Action Area */}
              <div className="relative z-10 pt-8 border-t border-white/5 mt-auto">
                 <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] text-gray-500 uppercase">Protocol Cost</span>
                    <span className="font-display text-xl text-white uppercase">{model.price}</span>
                 </div>
                 
                 <button className={`w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn`}>
                    Initialize Engagement
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>

              {/* Decorative Corner Mark */}
              <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-${model.accent}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Metadata */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-gray-600" />
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Encrypted Metadata</span>
            </div>
            <div className="flex items-center gap-3">
                <Cpu size={18} className="text-gray-600" />
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Global CDN Delivery</span>
            </div>
        </div>
      </div>
    </section>
  );
};
