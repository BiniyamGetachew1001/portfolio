import React from 'react';

const tools = [
  "PREMIERE PRO", "AFTER EFFECTS", "DAVINCI RESOLVE", "AUDITION", "PHOTOSHOP", "BLENDER", "CAPCUT"
];

export const Tools: React.FC = () => {
  return (
    <section className="w-full bg-black py-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 mb-8 flex items-center gap-4">
         <div className="h-px flex-1 bg-white/10" />
         <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">POWERED BY</span>
         <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="flex w-full whitespace-nowrap overflow-hidden mask-linear-fade">
        <div className="animate-marquee inline-flex items-center">
          {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
            <div 
              key={index} 
              className="mx-8 font-display text-2xl md:text-3xl font-bold text-gray-800 hover:text-white transition-colors duration-300 cursor-default select-none"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
    </section>
  );
};
