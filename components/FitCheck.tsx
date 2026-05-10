import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

type FitItem = {
  lead: string;
  follow: string;
};

const forYou: FitItem[] = [
  {
    lead: "You're ready to charge more",
    follow: 'and position your edits as a premium product, not a commodity.'
  },
  {
    lead: 'You care about retention',
    follow: 'hooks, pacing, pattern interrupts, and ending with a clear CTA.'
  },
  {
    lead: 'You want a repeatable system',
    follow: 'so your output stays consistent even when the timeline is chaotic.'
  }
];

const notForYou: FitItem[] = [
  {
    lead: "You're fine staying average",
    follow: 'and you just want to deliver “good enough” edits.'
  },
  {
    lead: 'You want quick hacks only',
    follow: 'and you are not interested in craft, taste, or iteration.'
  },
  {
    lead: 'You avoid feedback loops',
    follow: 'and prefer guessing instead of testing and refining.'
  }
];

export const FitCheck: React.FC = () => {
  return (
    <section
      id="fit"
      className="relative w-full bg-[#030303] px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden"
      aria-label="Fit Check"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-900/10 blur-[160px] rounded-full" />
        <div className="absolute -bottom-32 right-[-10%] w-[700px] h-[700px] bg-fuchsia-900/10 blur-[180px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-wider">
              See If We Are A Match
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
            <span className="text-white">Fit </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Check
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto font-mono text-xs md:text-sm text-gray-500 leading-relaxed">
            A quick filter. No pressure. If this sounds like you, we should talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 size={18} className="text-green-400" />
              <h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight">
                This Is For You
              </h3>
            </div>
            <div className="space-y-4">
              {forYou.map((item) => (
                <div key={item.lead} className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-green-400/80 shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <span className="text-white font-semibold">{item.lead}</span> {item.follow}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <XCircle size={18} className="text-red-400" />
              <h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight">
                Probably Not For You
              </h3>
            </div>
            <div className="space-y-4">
              {notForYou.map((item) => (
                <div key={item.lead} className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-red-400/80 shrink-0" />
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    <span className="text-white/90 font-semibold">{item.lead}</span> {item.follow}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 md:mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Book A Call
          </a>
          <p className="mt-3 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            Inspired by high-converting editor landing pages
          </p>
        </motion.div>
      </div>
    </section>
  );
};

