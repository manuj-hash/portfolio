import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database as DbIcon, 
  Cpu, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2,
  Lock,
  BrainCircuit
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface SkillItem {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Exploring';
  level: string;
  description: string;
  tags: string[];
  signalStrength: number; // 0-100
}

const ARSENAL_CATEGORIES = [
  { id: 'ALL', label: '00 // ALL ARSENAL' },
  { id: 'Programming', label: '01 // PROGRAMMING' },
  { id: 'Frontend', label: '02 // FRONTEND' },
  { id: 'Backend', label: '03 // BACKEND' },
  { id: 'Database', label: '04 // DATABASE' },
  { id: 'Exploring', label: '05 // EXPLORING' },
];

const SKILLS_DATA: SkillItem[] = [
  // Programming
  {
    name: 'C',
    category: 'Programming',
    level: 'Core Memory & Foundations',
    description: 'Direct memory addressing, pointers, manual memory allocation, and hardware-close system performance.',
    tags: ['Pointers', 'POSIX', 'Algorithms', 'Low-Level'],
    signalStrength: 92
  },
  {
    name: 'C++',
    category: 'Programming',
    level: 'High-Performance & OOP',
    description: 'Object-oriented architecture, STL algorithms, templates, and high-throughput computational problem solving.',
    tags: ['STL', 'OOP', 'Data Structures', 'Competitive Coding'],
    signalStrength: 94
  },
  {
    name: 'Java',
    category: 'Programming',
    level: 'Enterprise & Design Patterns',
    description: 'Robust enterprise patterns, JVM ecosystem, multi-threading paradigms, and object-oriented architectures.',
    tags: ['JVM', 'OOP', 'Multi-Threading', 'Enterprise Systems'],
    signalStrength: 88
  },
  {
    name: 'Python',
    category: 'Programming',
    level: 'AI, Scripting & Automation',
    description: 'Rapid prototyping, data processing pipelines, neural network development, and cybersecurity scripting.',
    tags: ['PyTorch', 'Automation', 'Asyncio', 'Scripting'],
    signalStrength: 95
  },

  // Frontend
  {
    name: 'HTML5',
    category: 'Frontend',
    level: 'Semantic Web Architecture',
    description: 'Accessible DOM structuring, web standards, canvas API rendering, and search engine optimization.',
    tags: ['Semantic DOM', 'Accessibility', 'Canvas API', 'Web Standards'],
    signalStrength: 96
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    level: 'Modern Layouts & Shaders',
    description: 'Tailwind CSS, responsive flexbox/grid topologies, hardware-accelerated animations, and glassmorphism styling.',
    tags: ['Tailwind', 'Keyframes', 'Flex/Grid', 'Dark Themes'],
    signalStrength: 95
  },
  {
    name: 'React',
    category: 'Frontend',
    level: 'Component Systems & State',
    description: 'Hooks, virtual DOM optimizations, custom hooks, real-time client hydration, and interactive UI systems.',
    tags: ['Hooks', 'TypeScript', 'State Management', 'Vite / Next'],
    signalStrength: 94
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    level: 'Async Event Loop & Runtime',
    description: 'Non-blocking I/O event architecture, worker threads, stream pipelines, and high-concurrency microservices.',
    tags: ['V8 Engine', 'Event Loop', 'Streams', 'Async/Await'],
    signalStrength: 92
  },
  {
    name: 'Express',
    category: 'Backend',
    level: 'RESTful Services & Middleware',
    description: 'REST API design, rate-limiting, JWT/session authentication pipelines, middleware chaining, and error telemetry.',
    tags: ['REST APIs', 'Auth Middleware', 'CORS', 'Security Headers'],
    signalStrength: 90
  },

  // Database
  {
    name: 'MongoDB',
    category: 'Database',
    level: 'Document Schemas & NoSQL',
    description: 'Flexible JSON-like document modeling, aggregation pipelines, replica set queries, and Mongoose ORM/ODM.',
    tags: ['Aggregation', 'NoSQL', 'Indexing', 'Mongoose'],
    signalStrength: 90
  },
  {
    name: 'SQL',
    category: 'Database',
    level: 'Relational Schemas & ACID',
    description: 'Relational data integrity, complex JOIN queries, schema normalization, indexing strategies, and ACID transactions.',
    tags: ['PostgreSQL', 'MySQL', 'Normalization', 'ACID Transactions'],
    signalStrength: 89
  },

  // Exploring
  {
    name: 'AI & Neural Systems',
    category: 'Exploring',
    level: 'Active Frontier',
    description: 'Autonomous multi-agent architectures, neural model fine-tuning, RAG pipelines, and cognitive robotics (NEUROBOTS).',
    tags: ['Autonomous Agents', 'LLMs', 'Cognitive Systems', 'PyTorch'],
    signalStrength: 93
  },
  {
    name: 'Cybersecurity',
    category: 'Exploring',
    level: 'Active Frontier',
    description: 'Vulnerability assessment, network packet dissection, zero-trust infrastructure, and OWASP penetration testing.',
    tags: ['Threat Modeling', 'AppSec', 'Packet Analysis', 'Zero Trust'],
    signalStrength: 91
  },
  {
    name: 'PQC (Post-Quantum Crypto)',
    category: 'Exploring',
    level: 'Active Research',
    description: 'Lattice-based cryptography, NIST PQC standards (CRYSTALS-Kyber, Dilithium), and quantum-resilient messaging (Kryptcom).',
    tags: ['Lattice Crypto', 'CRYSTALS-Kyber', 'Quantum Resilience', 'Handshakes'],
    signalStrength: 90
  }
];

export const TechnicalArsenal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);

  const filteredSkills = selectedCategory === 'ALL'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code2 className="w-4 h-4 text-mde-cyan" />;
      case 'Frontend':
        return <Layout className="w-4 h-4 text-sky-400" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-mde-violet" />;
      case 'Database':
        return <DbIcon className="w-4 h-4 text-emerald-400" />;
      case 'Exploring':
        return <BrainCircuit className="w-4 h-4 text-purple-400" />;
      default:
        return <Cpu className="w-4 h-4 text-mde-cyan" />;
    }
  };

  return (
    <section id="arsenal" className="relative py-24 border-t border-white/5 bg-mde-black/60 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-mde-cyan uppercase tracking-[0.25em] mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>03 // SUBSYSTEM ARSENAL & CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              TECHNICAL <span className="text-mde-cyan glow-text-cyan">ARSENAL</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-400">
            TOTAL TECHNOLOGIES: <span className="text-mde-cyan font-bold">{SKILLS_DATA.length} UNITS</span>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          {ARSENAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playChirp(750, 0.03);
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-2 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-mde-cyan/15 border-mde-cyan text-white shadow-cyan-subtle font-semibold'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Skill Cards on Left + Deep Telemetry Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Skill Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const isInspected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    soundFX.playLaserBlip();
                    setSelectedSkill(skill);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                    isInspected
                      ? 'bg-mde-card/90 border-mde-cyan/50 shadow-cyan-subtle ring-1 ring-mde-cyan/30'
                      : 'bg-mde-card/50 border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-base text-white group-hover:text-mde-cyan transition-colors">
                          {skill.name}
                        </h4>
                        <span className="font-mono text-[10px] text-mde-muted block">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs text-mde-cyan font-semibold">
                      {skill.signalStrength}%
                    </span>
                  </div>

                  {/* Level Tag */}
                  <div className="font-mono text-[11px] text-slate-300 mb-2">
                    &gt; {skill.level}
                  </div>

                  {/* Signal Strength Line Indicator */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-mde-violet to-mde-cyan rounded-full transition-all duration-500"
                      style={{ width: `${skill.signalStrength}%` }}
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/[0.03] text-slate-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Telemetry Inspector Panel (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 rounded-xl border border-mde-cyan/30 bg-mde-card/90 backdrop-blur-xl shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-mde-cyan flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>ARSENAL_INSPECTOR</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  READY
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] text-mde-muted uppercase tracking-wider block">
                  SELECTED SUBSYSTEM
                </span>
                <h3 className="font-sans text-2xl font-bold text-white mt-0.5 flex items-center gap-2">
                  <span>{selectedSkill.name}</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-white/[0.05] text-mde-cyan border border-white/10">
                    {selectedSkill.category}
                  </span>
                </h3>
                <p className="font-mono text-xs text-mde-cyan/80 mt-1">
                  &gt; {selectedSkill.level}
                </p>
              </div>

              {/* Description */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
                {selectedSkill.description}
              </div>

              {/* Telemetry Metrics */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>SUBSYSTEM PROFICIENCY</span>
                  <span className="text-white font-bold">{selectedSkill.signalStrength} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-mde-violet via-mde-cyan to-white rounded-full shadow-cyan-subtle"
                    style={{ width: `${selectedSkill.signalStrength}%` }}
                  />
                </div>
              </div>

              {/* Technical Capabilities Matrix */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                  CAPABILITY MATRIX
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-1 rounded bg-white/[0.04] text-slate-200 border border-white/10 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-mde-cyan" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 font-mono text-[10px] text-slate-500 border-t border-white/5 flex items-center justify-between">
                <span>STATUS: PRODUCTION GRADE</span>
                <span>MDE_SYS_V2</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
