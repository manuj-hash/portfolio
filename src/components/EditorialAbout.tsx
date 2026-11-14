import React from 'react';
import { GraduationCap, Compass, Lightbulb, Target, Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';

export const EditorialAbout: React.FC = () => {
  return (
    <section id="about" className="relative py-24 border-t border-white/5 bg-mde-void/90 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-mde-cyan/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-mde-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header / Editorial Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-mde-cyan uppercase tracking-[0.25em] mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>02 // PERSONAL PROFILE & PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              ENGINEERING <span className="text-mde-cyan glow-text-cyan">MANIFESTO</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm text-left md:text-right">
            <span>EDITORIAL DOSSIER</span>
            <span className="block text-white/40 text-[11px] mt-0.5">
              CSBS HYBRID RIGOR // AUTONOMOUS AI // QUANTUM DEFENSE
            </span>
          </div>
        </div>

        {/* Editorial Grid: 12-column Magazine/System Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Lead Introduction & Philosophy (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Editorial Lead Paragraph */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-mde-violet font-semibold tracking-wider uppercase block">
                [ EXECUTIVE SUMMARY ]
              </span>
              <p className="text-xl sm:text-2xl font-light text-slate-100 leading-snug">
                I build at the exact convergence where <span className="text-mde-cyan font-medium">software engineering</span>,{' '}
                <span className="text-mde-violet font-medium">autonomous AI pipelines</span>, and{' '}
                <span className="text-sky-400 font-medium">post-quantum security</span> meet enterprise-grade scalability.
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Rather than treating software as isolated scripts or surface-level interfaces, I treat every project as an interconnected system. My focus centers on building resilient digital infrastructure that stands up to adversarial environments, cognitive automation, and the post-quantum horizon.
              </p>
            </div>

            {/* Editorial Quote Box */}
            <div className="relative pl-6 py-4 border-l-2 border-mde-cyan bg-white/[0.015] rounded-r-lg">
              <p className="font-mono text-sm text-slate-200 italic leading-relaxed">
                &ldquo;Master the fundamental primitives first — memory layout, cryptographic handshakes, and event loops — before abstracting upwards into autonomous agents.&rdquo;
              </p>
              <span className="block font-mono text-[11px] text-mde-muted mt-2">
                — Core Engineering Principle
              </span>
            </div>

            {/* Two Sub-Columns: Learning Approach & Career Direction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              {/* Learning Approach */}
              <div className="p-5 rounded-xl border border-white/5 bg-mde-card/40 space-y-3">
                <div className="flex items-center gap-2 text-mde-cyan font-mono text-xs font-semibold">
                  <Lightbulb className="w-4 h-4" />
                  <span>LEARNING APPROACH</span>
                </div>
                <h4 className="text-white font-medium text-sm">First-Principles Rigor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deconstructing RFCs, cryptographic specifications (e.g. NIST PQC standards), and neural network papers directly to write clean, unbloated implementations from scratch.
                </p>
              </div>

              {/* Career Direction */}
              <div className="p-5 rounded-xl border border-white/5 bg-mde-card/40 space-y-3">
                <div className="flex items-center gap-2 text-mde-violet font-mono text-xs font-semibold">
                  <Target className="w-4 h-4" />
                  <span>CAREER TRAJECTORY</span>
                </div>
                <h4 className="text-white font-medium text-sm">Mission-Critical Systems</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Directing focus toward architecting secure AI agents, enterprise-scale software backends, and quantum-safe communications that protect real human infrastructure.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Structured Profile Dossier (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Dossier Card */}
            <div className="p-6 rounded-xl border border-white/10 bg-mde-card/60 backdrop-blur-md relative overflow-hidden group hover:border-mde-cyan/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-mde-muted uppercase tracking-wider block">
                      FORMAL ACADEMICS
                    </span>
                    <h3 className="font-sans text-base font-bold text-white">
                      B.Tech in CSBS
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  UNDERGRADUATE
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div className="font-mono text-xs text-white">
                  Computer Science and Business Systems
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A high-impact hybrid program engineered in partnership with top industrial tech firms, uniting algorithmic computer science rigor (DS, algorithms, OS, cryptography) with business intelligence, enterprise architecture, and financial technology systems.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Algorithms', 'Enterprise Systems', 'Business Strategy', 'Systems Architecture', 'DBMS'].map((item) => (
                    <span key={item} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Interests Matrix */}
            <div className="p-6 rounded-xl border border-white/10 bg-mde-card/60 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 font-mono text-xs">
                <span className="text-mde-cyan flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>ACTIVE TECHNICAL AXES</span>
                </span>
                <span className="text-slate-500">4 AXES</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-white font-medium block">Autonomous Agentic AI</span>
                    <span className="text-[11px] text-slate-400">Autonomous multi-agent workflows, spatial cognition (NEUROBOTS)</span>
                  </div>
                  <span className="text-[10px] text-mde-violet px-1.5 py-0.5 rounded bg-mde-violet/10">ACTIVE</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-white font-medium block">Post-Quantum Cryptography</span>
                    <span className="text-[11px] text-slate-400">Lattice-based encryption, CRYSTALS-Kyber, secure communications</span>
                  </div>
                  <span className="text-[10px] text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/10">RESEARCH</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-white font-medium block">Full-Stack Distributed Systems</span>
                    <span className="text-[11px] text-slate-400">React, Node.js, Express, high-concurrency database pipelines</span>
                  </div>
                  <span className="text-[10px] text-mde-cyan px-1.5 py-0.5 rounded bg-mde-cyan/10">CORE</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-white font-medium block">Offensive & Defensive Security</span>
                    <span className="text-[11px] text-slate-400">Threat modeling, network analysis, vulnerability assessment</span>
                  </div>
                  <span className="text-[10px] text-sky-400 px-1.5 py-0.5 rounded bg-sky-500/10">PRACTICE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
