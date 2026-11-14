import React from 'react';
import { Terminal, Shield, ArrowUp, Cpu, Heart, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const FooterHUD: React.FC = () => {
  const scrollToTop = () => {
    soundFX.playLaserBlip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-mde-void/95 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Footer Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-mde-cyan/40 bg-mde-card flex items-center justify-center">
              <Cpu className="w-4 h-4 text-mde-cyan" />
            </div>
            <div>
              <span className="font-bold text-white font-sans text-sm tracking-wide block">
                MANUJ DIGITAL ENVIRONMENT
              </span>
              <span className="text-[10px] text-mde-muted">
                Software Developer // AI Engineering // Cybersecurity
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL SYSTEMS SECURE & OPTIMIZED
            </span>
            <span className="text-white/20">|</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-white/10 hover:border-mde-cyan/50 hover:text-white bg-white/[0.02] transition-colors flex items-center gap-1"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Philosophy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} MANUJ U. // B.Tech CSBS Discipline.</span>
            <span className="block text-[10px] text-slate-600 mt-0.5">
              Architected with React, Tailwind CSS, TypeScript & NIST PQC specifications.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-400">
              PRESS <span className="text-mde-cyan">CTRL + K</span> FOR TERMINAL
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
