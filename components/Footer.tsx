
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="tabular-nums font-mono text-xs text-gray-500">
      {time.toLocaleTimeString('en-US', { timeZone: 'Africa/Addis_Ababa', hour: '2-digit', minute: '2-digit' })}
    </span>
  );
};

export const Footer: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', vision: '' });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT' | 'ERROR'>('IDLE');

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');

    // VALIDATION
    if (!form.name || !form.email || !form.vision) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
      return;
    }

    // TELEGRAM LOGIC
    // NOTE: In a real production app, move this to a backend function to hide the token.
    const token = "7547565922:AAHS9N3m-496ZODt4E_5t6_6ZzXfS_dZzXfS"; // Placeholder - User to replace
    const chatId = "514456958"; // Placeholder - User to replace

    const text = `
🚀 *NEW PROJECT INITIATION*

👤 *Name:* ${form.name}
📧 *Email:* ${form.email}

📝 *Vision:*
${form.vision}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown'
        }),
      });

      setStatus('SENT');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ffffff', '#8b5cf6']
      });
    } catch (err) {
      console.error(err);
      setStatus('ERROR');
    }
  };

  return (
    <footer id="contact" className="relative w-full min-h-[90vh] bg-[#050505] flex items-center justify-center overflow-hidden px-4 py-20">

      {/* Background Gradient - Subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">

        {/* Left Column: Typography */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Open for Commissions</span>
            </div>

            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.8] mb-8">
              <span className="text-white block">READY TO</span>
              <span className="text-transparent block" style={{ WebkitTextStroke: '2px white' }}>
                SCALE?
              </span>
            </h2>

            <div className="mt-12 flex items-center gap-6">
              <div className="h-px w-12 bg-white/20" />
              <TimeDisplay />
              <span className="font-mono text-xs text-gray-500">ADDIS ABABA</span>
            </div>

            <div className="mt-12 flex gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                >
                  <link.icon size={18} className="group-hover:text-violet-400 transition-colors duration-300" />
                  <span className="font-mono text-xs hidden md:block">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Cinematic HUD Form */}
        <div className="flex flex-col justify-center items-start lg:pl-12">

          <AnimatePresence mode="wait">
            {status === 'SENT' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-80 flex flex-col items-center justify-center text-center border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-2">REQUEST RECEIVED</h3>
                <p className="font-mono text-xs text-gray-400 tracking-widest uppercase">
                  STANDBY FOR TRANSMISSION
                </p>
                <button
                  onClick={() => { setStatus('IDLE'); setForm({ name: '', email: '', vision: '' }); }}
                  className="mt-8 text-xs text-white/50 hover:text-white underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-12"
              >
                <div className="space-y-12">
                  {/* Name Input */}
                  <div className="group relative">
                    <label className="absolute -top-6 left-0 text-[10px] font-mono text-gray-500 uppercase tracking-widest group-focus-within:text-violet-500 transition-colors duration-300">
                      Identify Yourself
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="ENTER NAME"
                      className="w-full bg-transparent border-b border-neutral-800 py-4 text-white font-display text-xl placeholder:text-neutral-800 focus:outline-none focus:border-white focus:border-b-2 transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group relative">
                    <label className="absolute -top-6 left-0 text-[10px] font-mono text-gray-500 uppercase tracking-widest group-focus-within:text-violet-500 transition-colors duration-300">
                      Communication Line
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ENTER EMAIL"
                      className="w-full bg-transparent border-b border-neutral-800 py-4 text-white font-display text-xl placeholder:text-neutral-800 focus:outline-none focus:border-white focus:border-b-2 transition-all duration-300"
                    />
                  </div>

                  {/* Vision Input */}
                  <div className="group relative">
                    <label className="absolute -top-6 left-0 text-[10px] font-mono text-gray-500 uppercase tracking-widest group-focus-within:text-violet-500 transition-colors duration-300">
                      Mission Brief
                    </label>
                    <textarea
                      rows={2}
                      value={form.vision}
                      onChange={(e) => setForm({ ...form, vision: e.target.value })}
                      placeholder="TELL ME ABOUT THE PROJECT..."
                      className="w-full bg-transparent border-b border-neutral-800 py-4 text-white font-sans text-lg placeholder:text-neutral-800 focus:outline-none focus:border-white focus:border-b-2 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'SENDING'}
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(139,92,246,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full h-20 bg-white hover:bg-black text-black hover:text-white border border-transparent hover:border-white/20 transition-all duration-300 flex items-center justify-between px-8 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button Text with RHYTHM Style */}
                  <span className="relative font-sans font-black italic text-xl tracking-tighter uppercase flex items-center gap-3 z-10">
                    {status === 'SENDING' ? 'TRANSMITTING...' : 'INITIATE PROJECT'}

                    {/* Shimmer Overlay for Text */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent pointer-events-none mix-blend-overlay">
                      {status === 'SENDING' ? 'TRANSMITTING...' : 'INITIATE PROJECT'}
                    </span>

                    {status === 'SENDING' && <Loader2 size={20} className="animate-spin" />}
                  </span>

                  <Send size={28} className="relative z-10 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 group-hover:text-violet-500" />

                  {status === 'ERROR' && (
                    <div className="absolute inset-0 bg-red-600 flex items-center justify-center z-20">
                      <span className="text-white font-mono text-xs font-bold flex items-center gap-2">
                        <AlertCircle size={16} /> FAILED. TRY AGAIN.
                      </span>
                    </div>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Cinematic Watermark */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.05]">
        <h1 className="font-display font-black text-[25vw] leading-[0.7] tracking-tighter text-white whitespace-nowrap">
          BINIYAM
        </h1>
      </div>

    </footer>
  );
};