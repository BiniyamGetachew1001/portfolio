import React from 'react';

const clients = [
  "HYPERLOOP", "FUTURE TECH", "NEON STUDIOS", "URBAN VIBE", "SONIC WAVE", "APEX GEAR", "HORIZON LABS", "KINETIC"
];

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-black py-20 border-y border-white/5 overflow-hidden">
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div className="animate-marquee inline-flex items-center">
          {clients.concat(clients).map((client, index) => (
            <div key={index} className="mx-8 flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-default">
              <span className="w-2 h-2 bg-white rounded-full block" />
              <span className="font-display text-4xl md:text-6xl font-bold text-transparent text-stroke hover:text-white transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.concat(clients).map((client, index) => (
            <div key={`dup-${index}`} className="mx-8 flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-default">
              <span className="w-2 h-2 bg-white rounded-full block" />
              <span className="font-display text-4xl md:text-6xl font-bold text-transparent text-stroke hover:text-white transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 max-w-4xl mx-auto text-center px-4">
        <p className="font-sans text-xl md:text-2xl text-gray-300 italic">
          "Biniyam transforms raw footage into pure gold. The pacing is unmatched."
        </p>
        <p className="mt-4 font-mono text-sm text-electric-violet uppercase tracking-widest">
          — Sarah Jenkins, Creative Director @ Neon Studios
        </p>
      </div>
    </section>
  );
};