import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
  CheckCircle,
  FileText,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'experience'>('overview');

  const handleOpenStandaloneCV = () => {
    window.open('/biniyam_cv.html', '_blank');
  };

  const handlePrintCV = () => {
    const printWindow = window.open('/biniyam_cv.html', '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 sm:p-2">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c10] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121218]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-white/5 shrink-0">
                  <img src="/cv photo.JPG" alt="Biniyam Getachew Teka" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-none tracking-wide">
                    BINIYAM GETACHEW TEKA
                  </h3>
                  <p className="text-xs text-amber-400 font-mono mt-1">
                    Curriculum Vitae · Video Editor & Motion Designer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrintCV}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-500 text-black hover:bg-amber-400 font-semibold text-xs rounded-full font-mono transition-all shadow-lg shadow-amber-500/20"
                >
                  <Printer size={14} />
                  <span>EXPORT PDF</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="px-6 py-3 bg-amber-500/5 border-b border-amber-500/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <a
                  href="tel:0988401249"
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Phone size={13} className="text-amber-400" />
                  <span className="font-semibold text-white">0988401249</span>
                </a>

                <a
                  href="mailto:Biniyam1001@gmail.com"
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Mail size={13} className="text-amber-400" />
                  <span className="font-semibold text-white">Biniyam1001@gmail.com</span>
                </a>

                <a
                  href="https://biniyam-cinematic-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-amber-400 hover:underline font-semibold"
                >
                  <ExternalLink size={13} />
                  <span>biniyam-cinematic-portfolio.vercel.app</span>
                </a>
              </div>

              <button
                onClick={handleOpenStandaloneCV}
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold text-xs"
              >
                <span>Full Web View</span>
                <ExternalLink size={12} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-gray-300">
              
              {/* Bio Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-2">
                  <Sparkles size={14} /> Executive Summary
                </h4>
                <p className="text-sm leading-relaxed text-gray-300 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  Results-driven Video Editor and Motion Designer with 4+ years delivering cinematic, algorithm-optimized content for brands, creators, and agencies worldwide. Combines technical mastery of Premiere Pro, After Effects, and DaVinci Resolve with retention engineering intuition to craft high-impact storytelling.
                </p>
              </div>

              {/* Technical Arsenal & Core Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Technical Skills */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} /> Software Proficiency
                  </h4>
                  
                  {[
                    { name: 'Adobe Premiere Pro', pct: 95 },
                    { name: 'Adobe After Effects', pct: 90 },
                    { name: 'DaVinci Resolve', pct: 88 },
                    { name: 'Adobe Photoshop', pct: 82 }
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white">{skill.name}</span>
                        <span className="font-mono text-amber-400">{skill.pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                          style={{ width: `${skill.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Services */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-2">
                    <TrendingUp size={14} /> Core Services
                  </h4>

                  <div className="space-y-2">
                    <div className="p-3 bg-white/[0.02] border-l-2 border-amber-500 rounded-r-lg">
                      <div className="text-xs font-bold text-white">Retention Engineering</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Hook optimization, drop-off mapping & pacing for high audience retention.</div>
                    </div>

                    <div className="p-3 bg-white/[0.02] border-l-2 border-amber-500 rounded-r-lg">
                      <div className="text-xs font-bold text-white">Long-Form Narrative Editing</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Documentary storytelling, chapter architecture & emotional arc design.</div>
                    </div>

                    <div className="p-3 bg-white/[0.02] border-l-2 border-amber-500 rounded-r-lg">
                      <div className="text-xs font-bold text-white">2D/3D Motion Graphics & VFX</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Bespoke title cards, lower thirds, kinetic text & VFX compositing.</div>
                    </div>

                    <div className="p-3 bg-white/[0.02] border-l-2 border-amber-500 rounded-r-lg">
                      <div className="text-xs font-bold text-white">Color Grading & Audio Mastering</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">DaVinci 10-bit color pipelines, custom LUTs & multi-track sound mixing.</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Experience Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
                  <Award size={14} /> Experience Highlights
                </h4>

                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-3">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <div className="text-sm font-bold text-white">Lead Video Editor & Motion Designer</div>
                    <div className="text-xs font-mono text-amber-400">2020 – PRESENT</div>
                  </div>
                  <div className="text-xs font-mono text-gray-400">BINIYAM EDITS · ADDIS ABABA & REMOTE WORLDWIDE</div>

                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Engineered high-performing video assets across music videos, brand commercials, documentary series, and social content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Maintained high audience retention rates on short and long-form content through data-driven hook & pacing engineering.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>Delivered agency-level post-production under demanding 48–72 hour sprint timelines with exceptional client satisfaction.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Footer Control Bar */}
            <div className="px-6 py-4 bg-[#121218] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-gray-400 font-mono">
                Direct Contact: <span className="text-amber-400">0988401249</span> | <span className="text-amber-400">Biniyam1001@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenStandaloneCV}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-full transition-colors flex items-center gap-2"
                >
                  <FileText size={14} />
                  <span>Open Full Web HTML</span>
                </button>

                <button
                  onClick={handlePrintCV}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs rounded-full transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Printer size={14} />
                  <span>EXPORT PDF</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
