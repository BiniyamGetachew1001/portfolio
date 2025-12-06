
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, ThumbsUp, Heart, Share2, Youtube, Twitter, Instagram } from 'lucide-react';

const comments = [
  {
    id: 1,
    platform: 'youtube',
    user: '@CinemaPhile',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    content: "The editing on this is absolutely INSANE. The transition at 0:45?? 🤯",
    likes: '2.4K',
    time: '2 hours ago',
    type: 'viral'
  },
  {
    id: 2,
    platform: 'twitter',
    user: 'Sarah Creative',
    handle: '@sarah_create',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: "Just got the first draft back from Biniyam. No revisions needed. He just gets it.",
    likes: '450',
    time: '5m ago',
    type: 'pro'
  },
  {
    id: 3,
    platform: 'discord',
    user: 'Marcus [Lead]',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    content: "Client is blown away by the sound design. Great work team.",
    likes: '🔥 10',
    time: 'Today at 10:42 AM',
    type: 'internal'
  },
  {
    id: 4,
    platform: 'instagram',
    user: 'visual_vibes',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    content: "This color grade is delicious 🍭 Need this workflow!",
    likes: '892',
    time: '1d ago',
    type: 'fan'
  },
  {
    id: 5,
    platform: 'youtube',
    user: '@TechReviewer',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    content: "Editing game leveled up 📈 this retention is gonna go crazy.",
    likes: '1.2K',
    time: '45m ago',
    type: 'viral'
  },
  {
    id: 6,
    platform: 'twitter',
    user: 'Alex Creator',
    handle: '@alex_vids',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    content: "Finally found an editor who understands pacing. Invaluable.",
    likes: '230',
    time: '2h ago',
    type: 'pro'
  }
];

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform) {
    case 'youtube': return <Youtube size={14} className="text-red-500" />;
    case 'twitter': return <Twitter size={14} className="text-blue-400" />;
    case 'instagram': return <Instagram size={14} className="text-pink-500" />;
    default: return <MessageCircle size={14} className="text-violet-500" />;
  }
};

const CommentCard: React.FC<{ comment: typeof comments[0]; index: number }> = ({ comment, index }) => {
  // Random vertical offset for "scattered" look
  const yOffset = index % 2 === 0 ? 40 : -40;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
      className={`relative w-[300px] md:w-[350px] p-5 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl
        ${index % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'}
        ${comment.type === 'viral' ? 'bg-[#1a1a1a]/80' :
          comment.type === 'pro' ? 'bg-indigo-950/40 border-indigo-500/30' :
            'bg-neutral-900/80'}
      `}
      style={{ marginLeft: index % 2 === 0 ? '0' : 'auto', marginRight: index % 2 === 0 ? 'auto' : '0' }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative">
          <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover border border-white/20" />
          <div className="absolute -bottom-1 -right-1 bg-[#0a0a0a] p-0.5 rounded-full">
            <PlatformIcon platform={comment.platform} />
          </div>
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-bold text-sm text-gray-200">{comment.user}</span>
            <span className="text-[10px] text-gray-500">{comment.time}</span>
          </div>

          {/* Content */}
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            {comment.content}
          </p>

          {/* Social Proof Actions */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <ThumbsUp size={12} />
              <span>{comment.likes}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <MessageCircle size={12} />
              <span>Reply</span>
            </div>
            {comment.likes.includes('K') && (
              <span className="ml-auto flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full text-[10px]">
                <Heart size={10} fill="currentColor" /> Viral
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="relative w-full py-40 bg-[#050505] overflow-hidden">

      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] animate-grain pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left: Sticky Text */}
        <div className="relative z-10 md:sticky md:top-40 self-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Live Feedback</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.9]">
            The internet<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              has spoken.
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
            Real reactions from real audiences. No filtered press releases—just raw engagement and community validation.
          </p>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Average Client Rating</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1">50M+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Total Views Generated</div>
            </div>

            {/* "You're Next" CTA embedded naturally */}
            <a href="#contact" className="mt-4 group relative inline-flex items-center justify-center p-4 px-8 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-violet-500 rounded-full shadow-md">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-violet-500 group-hover:translate-x-0 ease">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-violet-500 transition-all duration-300 transform group-hover:translate-x-full ease font-bold tracking-widest uppercase">Start Project</span>
              <span className="relative invisible">Start Project</span>
            </a>
          </div>
        </div>

        {/* Right: Floating Stream */}
        <motion.div style={{ y }} className="relative flex flex-col gap-6 py-20 md:py-0">
          {/* Fade Gradient Top/Bottom */}
          <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-10" />
          <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10" />

          {comments.map((comment, index) => (
            <CommentCard key={comment.id} comment={comment} index={index} />
          ))}

          {/* Decorative Elements in Stream */}
          <div className="absolute top-1/2 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
};