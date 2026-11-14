import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Cpu, Command, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarHUDProps {
  onOpenTerminal: () => void;
  activeSection: string;
}

export const NavbarHUD: React.FC<NavbarHUDProps> = ({ onOpenTerminal, activeSection }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(soundFX.getMuted());
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: '01. COMMAND', href: '#command' },
    { label: '02. PROFILE', href: '#about' },
    { label: '03. ARSENAL', href: '#arsenal' },
    { label: '04. PROJECTS', href: '#projects' },
    { label: '05. JOURNEY', href: '#journey' },
    { label: '06. RESUME', href: '#resume' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 border-b border-white/5 bg-mde-void/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity / System Status */}
        <div className="flex items-center gap-4">
          <a
            href="#command"
            onClick={() => soundFX.playChirp(600, 0.03)}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg border border-mde-cyan/40 bg-mde-card/80 flex items-center justify-center group-hover:border-mde-cyan transition-colors shadow-cyan-subtle">
              <Cpu className="w-4 h-4 text-mde-cyan group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-wider text-white flex items-center gap-1.5">
                MANUJ <span className="text-mde-cyan">//</span> MDE
              </span>
              <span className="font-mono text-[9px] text-mde-muted tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SYS_ONLINE
              </span>
            </div>
          </a>

          {/* Vertical divider */}
          <div className="hidden md:block h-6 w-px bg-white/10" />

          {/* Telemetry pill */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-mde-muted px-2.5 py-1 rounded bg-white/[0.03] border border-white/5">
            <span className="text-mde-violet font-semibold">CSBS</span>
            <span className="text-white/20">|</span>
            <span>DEV.AI.SEC</span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundFX.playChirp(700, 0.03)}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                  isActive
                    ? 'text-mde-cyan bg-mde-cyan/10 border border-mde-cyan/30 shadow-cyan-subtle'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Controls & Terminal CTA */}
        <div className="flex items-center gap-2.5">
          {/* Clock */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-slate-300 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-md">
            <span className="text-[10px] text-mde-cyan">UTC</span>
            <span>{currentTime || '00:00:00'}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
            className="p-1.5 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-mde-cyan/40 text-slate-400 hover:text-mde-cyan transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-mde-cyan" />}
          </button>

          {/* Terminal Command Palette Button */}
          <button
            onClick={() => {
              soundFX.playLaserBlip();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-mde-cyan/30 bg-mde-cyan/10 text-mde-cyan hover:bg-mde-cyan/20 text-xs font-mono transition-all shadow-cyan-subtle group"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TERMINAL</span>
            <span className="hidden md:inline-flex items-center text-[10px] bg-black/40 px-1 py-0.5 rounded border border-mde-cyan/20 text-mde-cyan">
              <Command className="w-2.5 h-2.5 mr-0.5" />K
            </span>
          </button>

          {/* Resume link button */}
          <a
            href="#resume"
            onClick={() => soundFX.playChirp(800, 0.03)}
            className="hidden sm:flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-md bg-gradient-to-r from-mde-violet to-mde-cyan text-black font-semibold hover:opacity-90 transition-opacity"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 font-mono text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                soundFX.playChirp(700, 0.03);
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded text-slate-300 hover:text-mde-cyan hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between px-3 text-xs text-slate-400">
            <span>MDE_NODE // 127.0.0.1</span>
            <span className="text-emerald-400">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      )}
    </header>
  );
};
