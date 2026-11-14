import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Cpu, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { time: 200, text: 'BIOS // MDE-SYS-REV 4.9.1 INTEGRITY OK' },
  { time: 600, text: 'KERNEL // MOUNTING NEURAL & PQC PROTOCOLS' },
  { time: 1100, text: 'SYNAPSE // SPATIAL CANVAS SUBSYSTEM READY' },
  { time: 1600, text: 'STATUS // MANUJ DIGITAL ENVIRONMENT: ONLINE' }
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    soundFX.playBootHum();

    const startTime = Date.now();
    const duration = 2000; // Exactly 2 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= 1600) {
        setLogIndex(4);
      } else if (elapsed >= 1100) {
        setLogIndex(3);
      } else if (elapsed >= 600) {
        setLogIndex(2);
      } else if (elapsed >= 200) {
        setLogIndex(1);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 300); // 300ms smooth fade transition
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-mde-void text-mde-text select-none transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-mde-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-mde-violet/5 blur-3xl translate-x-20 translate-y-20 pointer-events-none" />

      <div className="relative w-full max-w-lg px-8 flex flex-col items-center">
        {/* Brand Core Icon */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl border border-mde-cyan/30 bg-mde-black/80 flex items-center justify-center shadow-cyan-glow">
            <Cpu className="w-8 h-8 text-mde-cyan animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mde-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-mde-cyan"></span>
          </span>
        </div>

        {/* Title & System Identity */}
        <div className="text-center mb-6">
          <div className="text-xs uppercase tracking-[0.3em] font-mono text-mde-cyan mb-1 flex items-center justify-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Digital Workspace Initialization</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            MANUJ <span className="text-mde-cyan glow-text-cyan">U.</span>
          </h1>
          <p className="text-xs text-mde-muted font-mono mt-1">
            Software Developer // AI Engineering // Cybersecurity
          </p>
        </div>

        {/* Terminal Line Log Output */}
        <div className="w-full h-16 mb-6 font-mono text-xs text-mde-muted/80 bg-mde-card/60 border border-white/5 rounded-lg p-3 flex flex-col justify-end overflow-hidden">
          {BOOT_LOGS.slice(0, logIndex).map((log, idx) => (
            <div key={idx} className="flex items-center gap-2 leading-relaxed text-slate-300">
              <span className="text-mde-cyan/70 font-mono text-[10px]">&gt;</span>
              <span className={idx === logIndex - 1 ? 'text-white font-medium terminal-cursor' : 'text-mde-muted'}>
                {log.text}
              </span>
            </div>
          ))}
          {logIndex === 0 && (
            <div className="text-mde-cyan/70 terminal-cursor">SYSTEM BOOTING...</div>
          )}
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="w-full space-y-2 font-mono">
          <div className="flex justify-between text-[11px] text-mde-muted">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-mde-violet" />
              <span>CORE KERNEL SYNC</span>
            </span>
            <span className="text-mde-cyan font-semibold">{progress}%</span>
          </div>

          <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-mde-violet via-mde-cyan to-white transition-all duration-75 shadow-cyan-glow"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>SYS_FREQ: 3.84 GHz</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-mde-cyan" />
              TIME DURATION: 2.0s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
