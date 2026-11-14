import React, { useState, useEffect } from 'react';
import { BootSequence } from './components/BootSequence';
import { NavbarHUD } from './components/NavbarHUD';
import { CommandCenterHero } from './components/CommandCenterHero';
import { EditorialAbout } from './components/EditorialAbout';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ResumeHUD } from './components/ResumeHUD';
import { FooterHUD } from './components/FooterHUD';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { CursorAura } from './components/CursorAura';

export function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('command');

  // Keyboard shortcut Ctrl+K or Cmd+K for Terminal HUD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section for HUD telemetry
  useEffect(() => {
    const sections = ['command', 'about', 'arsenal', 'projects', 'journey', 'resume'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-mde-void text-mde-text relative selection:bg-mde-cyan selection:text-black">
      {/* 2-Second Cinematic Boot Sequence Overlay */}
      {!isBooted && (
        <BootSequence onComplete={() => setIsBooted(true)} />
      )}

      {/* Main Digital Environment Workspace (Always mounted and ready) */}
      <div className="w-full relative z-10">
        <CursorAura />
        
        <NavbarHUD
          onOpenTerminal={() => setTerminalOpen(true)}
          activeSection={activeSection}
        />

        <main className="relative">
          <CommandCenterHero />
          <EditorialAbout />
          <TechnicalArsenal />
          <ProjectShowcase />
          <JourneyTimeline />
          <ResumeHUD />
        </main>

        <FooterHUD />

        {/* Global Interactive Command Terminal */}
        <InteractiveTerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onNavigateSection={handleNavigateSection}
        />
      </div>
    </div>
  );
}

export default App;
