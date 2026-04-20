
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Clock, Zap } from 'lucide-react';

const cases = [
  {
    title: 'THE NIKE PROJECT',
    slug: 'nike-velocity',
    challenge: 'Compressing 48 hours of raw stadium footage into a 15-second high-velocity social spot without losing narrative impact.',
    solution: 'Implemented a speed-ramp centric editing style with sound-integrated transitions to maintain a constant "pulse" throughout the edit.',
    results: ['2.4M Views', '18% Higher Retention', 'Viral Trend Status'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    color: '#FF3E3E'
  },
  {
    title: 'CYBERPUNK SHORT',
    slug: 'cyberpunk-2077',
    challenge: 'Achieving a high-budget holographic UI aesthetic on a limited indie timeline.',
    solution: 'Developed a custom procedural After Effects plugin to generate hud elements dynamically based on track data.',
    results: ['Award-Winning VFX', 'Festival Selection', '0% Reshoots'],
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1887&auto=format&fit=crop',
    color: '#00F0FF'
  }
];

export const CaseStudies: React.FC = () => {
  return (
    <section id="cases" className="w-full bg-black py-32 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-24">
           <span className="font-mono text-violet-500 text-xs tracking-[0.3em] uppercase">Deep Dives</span>
           <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-none">
              Strategic <br /> <span className="text-stroke text-transparent">Execution</span>
           </h2>
        </div>

        <div className="flex flex-col gap-32">
          {cases.map((project, index) => (
            <div key={project.slug} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              {/* Visual Side */}
              <div className="w-full lg:w-3/5 group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[16/10] bg-[#0a0a0a] border border-white/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-8 right-8">
                   <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <ArrowUpRight size={24} />
                   </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-2/5">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-violet-500" />
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Case_Study_{index + 1}</span>
                 </div>
                 
                 <h3 className="font-display text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">{project.title}</h3>
                 
                 <div className="space-y-8">
                    <div>
                       <div className="flex items-center gap-2 mb-3">
                          <Clock size={16} className="text-violet-500" />
                          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">The Challenge</span>
                       </div>
                       <p className="text-gray-300 text-base leading-relaxed">{project.challenge}</p>
                    </div>

                    <div>
                       <div className="flex items-center gap-2 mb-3">
                          <Zap size={16} className="text-violet-500" />
                          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">The Solution</span>
                       </div>
                       <p className="text-gray-300 text-base leading-relaxed">{project.solution}</p>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                       <div className="flex items-center gap-2 mb-4">
                          <BarChart3 size={16} className="text-violet-500" />
                          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Impact Metrics</span>
                       </div>
                       <div className="flex flex-wrap gap-4">
                          {project.results.map((result) => (
                             <div key={result} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] text-white">
                                {result}
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-violet-900/40 via-black to-black border border-violet-500/20 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
             <h4 className="font-display text-2xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">Need a Strategy-First Edit?</h4>
             <p className="font-mono text-gray-400 text-sm mb-8 max-w-xl mx-auto">
                Stop producing content. Start building narratives that move metrics.
             </p>
             <button className="px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all duration-300">
                Book Execution Call
             </button>
        </div>
      </div>
    </section>
  );
};
