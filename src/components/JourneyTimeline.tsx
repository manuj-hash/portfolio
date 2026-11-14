import React, { useState } from 'react';
import { 
  Milestone, 
  GraduationCap, 
  Award, 
  Cpu, 
  Lock, 
  BookOpen, 
  Terminal, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { TimelineMilestone } from '../types';
import { soundFX } from '../utils/audio';

const MILESTONES: TimelineMilestone[] = [
  {
    period: '2024 — PRESENT',
    category: 'EDUCATION',
    title: 'B.Tech in Computer Science and Business Systems (CSBS)',
    organization: 'Undergraduate Engineering Program',
    description: 'Pursuing a specialized engineering curriculum developed to unify computational algorithms, distributed computing, database systems, and low-level programming with enterprise business mechanics and systems architecture.',
    highlights: [
      'Mastered Data Structures, Algorithms, C/C++, Java, and Operating Systems',
      'Integrated enterprise business systems, computational economics, and financial modeling',
      'Consistently executing high-performance technical projects and research initiatives'
    ],
    badge: 'CORE_DISCIPLINE'
  },
  {
    period: '2024 — 2025',
    category: 'COMPETITION',
    title: 'SIH & MSME Internal Selections // NEUROBOTS Architecture',
    organization: 'Smart India Hackathon & MSME Incubation Evaluations',
    description: 'Spearheaded the design and development of NEUROBOTS, an autonomous agentic robotics cognition platform. Successfully cleared rigorous internal screening and evaluation panels for both the Smart India Hackathon (SIH) and MSME initiative.',
    highlights: [
      'Architected edge computer vision pipeline with real-time obstacle avoidance in <45ms',
      'Demonstrated multi-agent autonomous decision loops without reliance on external cloud APIs',
      'Validated institutional selection criteria for industrial-scale prototype deployment'
    ],
    badge: 'QUALIFIED_FINALIST'
  },
  {
    period: '2024 — 2025',
    category: 'INITIATIVE',
    title: 'Kryptcom: Post-Quantum Cryptographic Protocol Genesis',
    organization: 'Independent Cryptographic Research & Engineering',
    description: 'Initiated the Kryptcom project to counter quantum computing decryption vulnerabilities. Implemented NIST PQC standards (CRYSTALS-Kyber key encapsulation and Dilithium signatures) for forward-secure, eavesdrop-proof communications.',
    highlights: [
      'Implemented lattice-based hybrid key exchange resisting Grover and Shor quantum attacks',
      'Engineered zero-knowledge authentication and forward-secrecy double ratchet session keys',
      'Published open-source architecture blueprints and cryptographic benchmarks'
    ],
    badge: 'PQC_INNOVATION'
  },
  {
    period: '2024 — 2025',
    category: 'CERTIFICATION',
    title: 'Professional Certifications & Systems Credentials',
    organization: 'Recognized Technical Industry & Academic Portals',
    description: 'Earned verified certifications across Full-Stack Web Development (React, Node.js, Express, MongoDB), Cybersecurity fundamentals, and Data Structures in C++ / Python.',
    highlights: [
      'Full-Stack Developer Specialization (MERN Ecosystem & RESTful API Architecture)',
      'Cybersecurity & Network Defense Fundamentals (OWASP, TCP/IP Security)',
      'Algorithmic Problem Solving & Competitive Programming Certifications'
    ],
    badge: 'VERIFIED_CREDENTIALS'
  },
  {
    period: 'CURRENT FOCUS',
    category: 'RESEARCH',
    title: 'Advanced Frontier: Agentic AI & Quantum Zero-Trust',
    organization: 'Continuous Engineering Exploration',
    description: 'Deep diving into agentic autonomous loops, spatial perception algorithms for next-gen NEUROBOTS, and hardware-accelerated lattice cryptography for embedded quantum-safe microcontrollers.',
    highlights: [
      'Experimenting with multi-agent cognitive orchestration and local LLM runtime optimization',
      'Benchmarking Post-Quantum Cryptography performance on resource-constrained micro-nodes',
      'Expanding distributed backend fault-tolerance patterns'
    ],
    badge: 'ACTIVE_FRONTIER'
  }
];

export const JourneyTimeline: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredMilestones = activeFilter === 'ALL'
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === activeFilter);

  const getMilestoneIcon = (category: string) => {
    switch (category) {
      case 'EDUCATION':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'COMPETITION':
        return <Award className="w-4 h-4 text-mde-cyan" />;
      case 'INITIATIVE':
        return <Lock className="w-4 h-4 text-mde-violet" />;
      case 'CERTIFICATION':
        return <CheckCircle2 className="w-4 h-4 text-sky-400" />;
      case 'RESEARCH':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      default:
        return <Milestone className="w-4 h-4 text-mde-cyan" />;
    }
  };

  return (
    <section id="journey" className="relative py-24 border-t border-white/5 bg-mde-black/80 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-mde-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-mde-cyan uppercase tracking-[0.25em] mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>05 // TRAJECTORY & RECOGNITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              JOURNEY & <span className="text-mde-cyan glow-text-cyan">ACHIEVEMENTS</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-400">
            CHRONOLOGICAL ENGINE // <span className="text-mde-cyan">VERIFIED MILESTONES</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 font-mono text-xs">
          {[
            { id: 'ALL', label: 'ALL MILESTONES' },
            { id: 'EDUCATION', label: 'EDUCATION' },
            { id: 'COMPETITION', label: 'SIH / MSME' },
            { id: 'INITIATIVE', label: 'PROJECT GENESIS' },
            { id: 'CERTIFICATION', label: 'CREDENTIALS' },
            { id: 'RESEARCH', label: 'ACTIVE RESEARCH' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFX.playChirp(700, 0.03);
                setActiveFilter(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeFilter === cat.id
                  ? 'bg-mde-cyan/15 border-mde-cyan text-white shadow-cyan-subtle font-semibold'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Futuristic Timeline Spine */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-mde-cyan before:via-mde-violet before:to-transparent">
          {filteredMilestones.map((m, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Glowing Node Dot */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full border border-mde-cyan bg-mde-black flex items-center justify-center shadow-cyan-subtle group-hover:scale-125 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-mde-cyan animate-pulse"></span>
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-mde-card/70 backdrop-blur-md hover:border-mde-cyan/40 hover:bg-mde-card/90 transition-all duration-300 space-y-4">
                
                {/* Milestone Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-white/[0.04] border border-white/10">
                      {getMilestoneIcon(m.category)}
                    </span>
                    <span className="text-slate-400">{m.organization}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/10 text-mde-cyan font-bold flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{m.period}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-mde-violet/15 border border-mde-violet/30 text-mde-violet text-[10px] font-bold">
                      {m.badge}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-mde-cyan transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans mt-2">
                    {m.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-2 border-t border-white/5 space-y-2 font-mono text-xs text-slate-300">
                  {m.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <span className="text-mde-cyan font-bold mt-0.5">&gt;</span>
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
