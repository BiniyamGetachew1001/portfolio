import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Youtube, Instagram, Twitter, Flame } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    user: "@CinemaPhile",
    handle: "cinemaphile_edits",
    time: "3 hours ago",
    content: "The editing on this is absolutely INSANE. The transition at 0:45?? 🤯",
    likes: "2.4K",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/150?u=1",
    isViral: true,
    offset: "md:ml-20"
  },
  {
    id: 2,
    user: "Sarah Creative",
    handle: "sarah_c",
    time: "5m ago",
    content: "Just got the first draft back from Biniyam. No revisions needed. He just gets it.",
    likes: "450",
    platform: "twitter",
    avatar: "https://i.pravatar.cc/150?u=2",
    isViral: false,
    offset: "md:ml-40"
  },
  {
    id: 3,
    user: "Marcus [Lead]",
    handle: "marcus_agency",
    time: "Today at 10:42 AM",
    content: "Client is blown away by the sound design. Great work team.",
    likes: "18",
    platform: "twitter",
    avatar: "https://i.pravatar.cc/150?u=3",
    isViral: false,
    offset: "md:ml-4"
  },
  {
    id: 4,
    user: "visual_vibes",
    handle: "visual_vibes",
    time: "1d ago",
    content: "This color grade is delicious 🍭 Need this workflow!",
    likes: "832",
    platform: "instagram",
    avatar: "https://i.pravatar.cc/150?u=4",
    isViral: false,
    offset: "md:ml-32"
  },
  {
    id: 5,
    user: "@ToohReviewer",
    handle: "tooh_reviewer",
    time: "45m ago",
    content: "Editing game leveled up 📈 this retention is gonna go crazy.",
    likes: "1.2K",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/150?u=5",
    isViral: true,
    offset: "md:ml-2"
  },
  {
    id: 6,
    user: "Alex Creator",
    handle: "alex_editor",
    time: "2h ago",
    content: "Finally found an editor who understands pacing. Invaluable.",
    likes: "232",
    platform: "twitter",
    avatar: "https://i.pravatar.cc/150?u=6",
    isViral: false,
    offset: "md:ml-24"
  }
];

const TestimonialCard = ({ data, index }: { data: any, index: number }) => {
  const PlatformIcon = data.platform === 'youtube' ? Youtube : data.platform === 'instagram' ? Instagram : Twitter;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.7, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      className={`relative p-5 rounded-2xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 w-full max-w-[380px] shadow-2xl ${data.offset}`}
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img src={data.avatar} alt={data.user} className="w-10 h-10 rounded-full object-cover grayscale-[30%]" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center">
            <PlatformIcon size={10} className={data.platform === 'youtube' ? 'text-red-500' : data.platform === 'instagram' ? 'text-pink-500' : 'text-blue-400'} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col truncate">
              <span className="text-white font-bold text-sm leading-none">{data.user}</span>
              <span className="text-gray-500 text-[10px] font-mono mt-1">{data.handle}</span>
            </div>
            <span className="text-gray-600 text-[9px] font-mono whitespace-nowrap mt-0.5">{data.time}</span>
          </div>
          <p className="text-gray-300 text-[11px] leading-relaxed mt-3 font-sans">
            {data.content}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.03]">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Heart size={12} className="hover:text-red-500 transition-colors cursor-pointer" />
                <span className="text-[10px] font-mono">{data.likes}</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                <MessageSquare size={12} />
                <span className="text-[10px] font-mono">Reply</span>
              </div>
            </div>
            {data.isViral && (
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                <Flame size={10} className="text-red-500 fill-red-500 animate-pulse" />
                <span className="text-red-500 font-bold text-[8px] uppercase tracking-wider italic">Viral</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="w-full bg-black py-40 px-4 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-fuchsia-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 lg:gap-0">
        
        {/* Left Column: Branding & Stats */}
        <div className="w-full lg:w-[42%] lg:sticky lg:top-40 self-start space-y-14">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 font-mono text-[9px] uppercase tracking-widest font-bold">Live Feedback</span>
            </div>

            <h2 className="font-display text-7xl md:text-[9rem] font-bold text-white uppercase italic leading-[0.8] tracking-tighter">
              The internet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-electric-violet">
                has spoken.
              </span>
            </h2>

            <p className="font-mono text-[11px] text-gray-500 max-w-sm leading-relaxed uppercase tracking-widest opacity-80">
              Real reactions from real audiences. No filtered press releases—just raw engagement and community validation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-violet-500/30 transition-colors"
            >
              <div className="font-display text-6xl text-white font-bold tracking-tight">4.9/5</div>
              <div className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em] mt-2 group-hover:text-gray-400 transition-colors">Average Client Rating</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-fuchsia-500/30 transition-colors"
            >
              <div className="font-display text-6xl text-white font-bold tracking-tight">50M+</div>
              <div className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em] mt-2 group-hover:text-gray-400 transition-colors">Total Views Generated</div>
            </motion.div>
          </div>

          <motion.a
            href="/pricing.html"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(127, 0, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="block text-center w-full max-w-md py-6 rounded-full border border-electric-violet/40 text-white font-mono text-xs font-bold uppercase tracking-[0.4em] transition-all"
          >
            Start Project
          </motion.a>
        </div>

        {/* Right Column: Staggered Cards */}
        <div className="w-full lg:w-[58%] flex flex-col gap-8 pt-10 relative">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} data={t} index={i} />
          ))}
          
          {/* Visual depth elements */}
          <div className="absolute top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-60 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
        </div>

      </div>
    </section>
  );
};