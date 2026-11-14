import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Terminal, 
  ArrowUpRight, 
  X, 
  Layers, 
  Activity, 
  Sparkles,
  ChevronRight,
  Award
} from 'lucide-react';
import { Project } from '../types';
import { soundFX } from '../utils/audio';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS: Project[] = [
  {
    id: 'neurobots',
    title: 'NEUROBOTS: Autonomous Agentic Robotics & Spatial Cognition',
    codename: 'PROJ-NEUROBOTS // V2.4',
    category: 'Autonomous Systems / AI',
    tagline: 'Multi-agent cognitive orchestrator for autonomous robotic navigation and spatial decisioning.',
    description: 'NEUROBOTS bridges advanced computer vision perception with decentralized agentic decision loops. Built for complex terrain and unstructured industrial environments, it achieves autonomous obstacle evasion, semantic mapping, and real-time path optimization.',
    architectureNotes: [
      'Edge Perception Pipeline: OpenCV & TensorRT for sub-45ms real-time object detection',
      'Cognitive Agent Mesh: Decentralized micro-agents handling perception, pathing, and actuator telemetry',
      'Hardware-in-the-Loop: Low-latency serial/WebSocket bridge connecting ROS nodes to physical controllers',
      'Safety Subsystem: Fail-safe watchdog timer and deterministic fallback routines'
    ],
    features: [
      'Autonomous spatial mapping & dynamic obstacle rerouting',
      'Multi-agent decision arbitration with zero cloud dependencies',
      'Telemetry dashboard streaming live point-clouds and motor currents',
      'Qualified for Smart India Hackathon (SIH) & MSME internal selection'
    ],
    metrics: [
      { label: 'Inference Latency', value: '< 42ms' },
      { label: 'Obstacle Accuracy', value: '98.4%' },
      { label: 'Qualification', value: 'SIH & MSME' },
      { label: 'Architecture', value: 'Edge-Native' }
    ],
    tags: ['Python', 'PyTorch', 'OpenCV', 'ROS', 'Autonomous Agents', 'C++', 'WebSockets'],
    status: 'ACTIVE_DEPLOYMENT',
    demoUrl: 'https://github.com/manuj-u/neurobots',
    githubUrl: 'https://github.com/manuj-u/neurobots',
    featured: true,
    highlightStats: 'SIH & MSME SELECTION FINALIST'
  },
  {
    id: 'kryptcom',
    title: 'Kryptcom: Post-Quantum Cryptographic Secure Enclave',
    codename: 'PROJ-KRYPTCOM // PQC-CORE',
    category: 'Cybersecurity & PQC',
    tagline: 'Lattice-based quantum-resistant end-to-end secure communications and key encapsulation.',
    description: 'Designed to protect digital communications against the impending threat of quantum computing decryptors (Harvest Now, Decrypt Later attacks). Kryptcom integrates NIST-standardized CRYSTALS-Kyber (ML-KEM) key encapsulation and Dilithium digital signatures for post-quantum forward secrecy.',
    architectureNotes: [
      'Hybrid Key Exchange: Dual ECDH + CRYSTALS-Kyber KEM for seamless classical and post-quantum security',
      'Zero-Knowledge Identity Verification: Authentication without transmitting plaintext or shared secrets',
      'Double Ratchet Protocol: Continuous ephemeral session key updates per message chunk',
      'Memory Enclave Sanitization: Secure in-memory wipes following sensitive cryptographic handshakes'
    ],
    features: [
      'Quantum-resilient key exchange resisting Shor & Grover algorithmic attacks',
      'End-to-end encrypted messaging with zero server metadata retention',
      'Post-quantum digital signature validation for message origin integrity',
      'Lightweight client library compatible with web, desktop, and embedded devices'
    ],
    metrics: [
      { label: 'Security Level', value: 'NIST Level 5 (Kyber-1024)' },
      { label: 'Handshake Time', value: '< 18ms' },
      { label: 'Quantum Immunity', value: '100% Forward-Safe' },
      { label: 'Crypto Standard', value: 'FIPS 203 / 204' }
    ],
    tags: ['PQC', 'CRYSTALS-Kyber', 'Node.js', 'TypeScript', 'WebCrypto', 'Zero-Trust', 'C++'],
    status: 'ACTIVE_DEPLOYMENT',
    demoUrl: 'https://github.com/manuj-u/kryptcom',
    githubUrl: 'https://github.com/manuj-u/kryptcom',
    featured: true,
    highlightStats: 'NIST POST-QUANTUM ALIGNED'
  },
  {
    id: 'cybersentry',
    title: 'CyberSentry: Real-Time Network Threat Telemetry & IDS',
    codename: 'PROJ-CYBERSENTRY // SEC-MESH',
    category: 'Cybersecurity & PQC',
    tagline: 'High-throughput packet dissection and behavioral anomaly detection engine.',
    description: 'An intrusion detection system that analyzes real-time network telemetry streams to identify abnormal packet flows, port sweep patterns, and unauthorized payload signatures before exploitation occurs.',
    architectureNotes: [
      'Raw Packet Ingestion: Asynchronous libpcap wrapper with ring buffer queueing',
      'Heuristic Threat Engine: Statistical rate-of-change and entropy analysis on incoming packet payloads',
      'Automated Rule Dispatcher: Instant generation of iptables / firewall drops upon signature match',
      'Telemetry Visualizer: Real-time traffic heatmaps and IP reputation scoring'
    ],
    features: [
      'Deep packet inspection (DPI) across TCP, UDP, and ICMP protocols',
      'Automated IP blacklisting and microsegmentation triggering',
      'OWASP Top 10 payload vector pattern matching',
      'Exportable forensic packet capture logs (PCAP) with SHA-256 integrity'
    ],
    metrics: [
      { label: 'Throughput', value: '1.2 Gbps' },
      { label: 'Detection Speed', value: '< 5ms' },
      { label: 'False Positive', value: '< 0.08%' },
      { label: 'Protocol Coverage', value: 'L3 / L4 / L7' }
    ],
    tags: ['Python', 'C++', 'Networking', 'Wireshark', 'Linux Sockets', 'Threat Modeling'],
    status: 'PRODUCTION',
    demoUrl: 'https://github.com/manuj-u/cybersentry',
    githubUrl: 'https://github.com/manuj-u/cybersentry',
    featured: false,
    highlightStats: '1.2 GBPS REAL-TIME DPI'
  },
  {
    id: 'enterprise-mesh',
    title: 'Nexus CSBS: Enterprise Transaction Mesh & Workflow Engine',
    codename: 'PROJ-NEXUS-CSBS // ENTERPRISE',
    category: 'Full-Stack Architecture',
    tagline: 'High-concurrency full-stack transaction engine bridging CS algorithms with business system workflows.',
    description: 'Directly applying Computer Science and Business Systems (CSBS) principles: built a fault-tolerant transaction processing pipeline with event-driven state reconciliation, audit logging, and automated compliance verification.',
    architectureNotes: [
      'Event Sourcing Architecture: Immutable ledger recording all state transitions with strict replayability',
      'Dual Database Topology: MongoDB for document agility + PostgreSQL for ACID financial ledgers',
      'Reactive Frontend: High-density interactive dashboard built with React and Tailwind CSS',
      'Distributed Locks: Redis-based concurrency controls preventing race conditions in financial operations'
    ],
    features: [
      'Sub-millisecond ledger state updates with idempotent transaction guarantees',
      'Granular role-based access control (RBAC) with audit trail forensics',
      'Real-time WebSocket data stream for financial and operational metrics',
      'Automated compliance reporting aligned with enterprise governance standards'
    ],
    metrics: [
      { label: 'Concurrency', value: '10k+ Req/sec' },
      { label: 'Consistency', value: 'ACID Strict' },
      { label: 'Uptime Index', value: '99.99%' },
      { label: 'Discipline', value: 'CSBS Core' }
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Redis', 'TypeScript'],
    status: 'PRODUCTION',
    demoUrl: 'https://github.com/manuj-u/nexus-csbs',
    githubUrl: 'https://github.com/manuj-u/nexus-csbs',
    featured: false,
    highlightStats: 'ACID EVENT-SOURCED ARCHITECTURE'
  }
];

export const ProjectShowcase: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredProjects = filterCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(filterCategory));

  const openInspection = (project: Project) => {
    soundFX.playLaserBlip();
    setActiveModalProject(project);
  };

  return (
    <section id="projects" className="relative py-28 border-t border-white/5 bg-mde-void overflow-hidden">
      {/* Background glow pools */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-mde-cyan/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-mde-violet/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-mde-cyan uppercase tracking-[0.25em] mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>04 // SYSTEM PRODUCTION ARTIFACTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              FEATURED <span className="text-mde-cyan glow-text-cyan">PROJECTS</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">CORE EMPHASIS</span> // HIGHEST PRIORITY SECTION
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 font-mono text-xs">
          {[
            { id: 'ALL', label: 'ALL INITIATIVES' },
            { id: 'AI', label: 'AUTONOMOUS / AI' },
            { id: 'Cybersecurity', label: 'PQC & CYBERSECURITY' },
            { id: 'Architecture', label: 'ENTERPRISE / FULL-STACK' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundFX.playChirp(700, 0.03);
                setFilterCategory(f.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                filterCategory === f.id
                  ? 'bg-mde-cyan/15 border-mde-cyan text-white shadow-cyan-subtle font-semibold'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Primary Project Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between overflow-hidden ${
                project.featured
                  ? 'bg-gradient-to-b from-mde-card to-mde-surface border-mde-cyan/30 shadow-2xl hover:border-mde-cyan/60 hover:shadow-cyan-glow'
                  : 'bg-mde-card/70 border-white/10 hover:border-white/25 hover:bg-mde-card/90'
              }`}
            >
              {/* Top Accent Strip */}
              <div className="h-1 w-full bg-gradient-to-r from-mde-violet via-mde-cyan to-transparent" />

              <div className="p-7 space-y-6 flex-1">
                {/* Status Bar */}
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-mde-cyan text-[11px] font-bold">
                      {project.codename}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-sans text-2xl font-bold text-white group-hover:text-mde-cyan transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-mde-cyan/90 font-medium mt-2">
                    &gt; {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>

                {/* Highlight Badge (e.g. SIH / MSME / NIST) */}
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-mde-cyan" />
                    <span>MILESTONE:</span>
                  </span>
                  <span className="text-white font-semibold text-[11px]">
                    {project.highlightStats}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 font-mono">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded bg-white/[0.02] border border-white/5">
                      <span className="text-[9px] text-slate-500 block uppercase">{m.label}</span>
                      <span className="text-xs text-white font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="px-7 py-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => openInspection(project)}
                  className="font-mono text-xs text-mde-cyan hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>INSPECT SYSTEM ARCHITECTURE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playChirp(700, 0.03)}
                    className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-mde-cyan/40 bg-white/[0.02] transition-colors"
                    title="Source Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playChirp(800, 0.03)}
                    className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-mde-cyan hover:border-mde-cyan/40 bg-white/[0.02] transition-colors"
                    title="Live Enclave / Demo"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Architecture Inspection Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-mde-cyan/40 bg-mde-card p-6 sm:p-8 shadow-cyan-glow space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="font-mono text-xs text-mde-cyan flex items-center gap-2 mb-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SUBSYSTEM BLUEPRINT // {activeModalProject.codename}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  SYSTEM OVERVIEW & PROBLEM DEFINITION
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Deep Architecture Notes */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3 font-mono text-xs">
                <span className="text-mde-cyan font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>ENGINEERING ARCHITECTURE SPECIFICATIONS</span>
                </span>
                <div className="space-y-2 pt-1 text-slate-300">
                  {activeModalProject.architectureNotes.map((note, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-2">
                      <span className="text-mde-cyan mt-0.5">&gt;</span>
                      <span className="leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  DEPLOYED SUBSYSTEMS & CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProject.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-mde-cyan flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
                {activeModalProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                    <span className="text-[10px] text-slate-400 uppercase block">{m.label}</span>
                    <span className="text-sm font-bold text-mde-cyan mt-1 block">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white"
                >
                  CLOSE INSPECTION
                </button>
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-lg bg-mde-cyan text-black font-bold flex items-center gap-1.5 hover:opacity-90"
                >
                  <span>VIEW REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
