
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, CheckCircle2, Sparkles, X } from 'lucide-react';

export const LeadMagnet: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('LOADING');
        // Simulate API call
        setTimeout(() => setStatus('SUCCESS'), 1500);
    };

    return (
        <section className="w-full bg-[#030303] py-24 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-16 overflow-hidden shadow-2xl">
                    {/* Animated Grain Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Left Content */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles size={16} className="text-violet-500" />
                                <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest font-bold">Limited Asset Drop</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase leading-tight">
                                Get My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 text-stroke">2024 LUT Pack</span> For Free.
                            </h2>
                            <p className="font-mono text-xs md:text-sm text-gray-500 mb-8 max-w-sm leading-relaxed">
                                Tested on RED, ARRI, and Sony LOG footage. Built for that specific "Cinematic Noir" density.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                                    <CheckCircle2 size={14} className="text-violet-500" />
                                    <span>5 Professional .CUBE files</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                                    <CheckCircle2 size={14} className="text-violet-500" />
                                    <span>Installation & Workflow PDF</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {status === 'SUCCESS' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center p-8 bg-violet-600/10 border border-violet-500/20 rounded-2xl backdrop-blur-md"
                                    >
                                        <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                                            <Download size={24} className="text-white" />
                                        </div>
                                        <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase">Access Granted</h3>
                                        <p className="font-mono text-xs text-gray-400 mb-6">Check your inbox for the dng/cube assets.</p>
                                        <button 
                                            onClick={() => setStatus('IDLE')}
                                            className="text-violet-400 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            Reset Portal
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input 
                                                required
                                                type="email"
                                                placeholder="ENTER ENCRYPTED EMAIL"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 pl-14 pr-6 font-mono text-xs text-white focus:border-violet-500 outline-none transition-colors"
                                            />
                                        </div>
                                        <button 
                                            disabled={status === 'LOADING'}
                                            type="submit"
                                            className="w-full group relative py-5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all duration-500 disabled:opacity-50 overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {status === 'LOADING' ? 'Decrypting...' : 'DOWNLOAD PROTOCOL'}
                                                <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                                            </span>
                                            <motion.div 
                                                className="absolute inset-0 bg-violet-600"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '0%' }}
                                                transition={{ duration: 0.4, ease: "circOut" }}
                                            />
                                        </button>
                                        <p className="text-[9px] font-mono text-gray-600 text-center uppercase tracking-tighter">
                                            Trusted by 1.2k+ Editors. Zero Spam Architecture.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
