import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Shield, 
  BrainCircuit, 
  Code2, 
  Lock, 
  Network, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Database,
  Cpu,
  Layers
} from 'lucide-react';
import { DomainFocus, DomainDetail } from '../types';
import { soundFX } from '../utils/audio';

interface NodePoint {
  id: DomainFocus;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  category: string;
}

const DOMAIN_DATA: Record<DomainFocus, DomainDetail> = {
  DEVELOPER: {
    id: 'DEVELOPER',
    title: 'Software Development & Architecture',
    badge: 'CORE_ENGINEERING',
    tagline: 'Engineered for resilience, high throughput, and developer elegance.',
    description: 'Specialized in building full-stack distributed systems, deterministic logic, and high-performance applications with modern stacks like React, Node.js, Express, and modern C++/Python backends.',
    metrics: [
      { label: 'Primary Languages', value: 'C++, Python, Java, JS/TS' },
      { label: 'Architecture', value: 'Event-Driven & Microservices' },
      { label: 'Code Quality', value: 'Type-Safe & Modular' }
    ],
    technologies: ['React', 'Node.js', 'Express', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    subsystems: ['Distributed Backend Pipelines', 'Reactive State Hydration', 'REST/WebSocket Streaming', 'Memory-Safe Core Engines']
  },
  AI: {
    id: 'AI',
    title: 'AI Engineering & Neural Systems',
    badge: 'COGNITIVE_INTELLIGENCE',
    tagline: 'Bridging algorithmic models with real-world autonomous agency.',
    description: 'Designing context-aware autonomous agentic architectures, neural network integrations, and robotics cognition systems (NEUROBOTS) for spatial problem-solving and automated decision engines.',
    metrics: [
      { label: 'Core Paradigms', value: 'Autonomous Agents & LLMs' },
      { label: 'Frameworks', value: 'PyTorch, LangChain, OpenCV' },
      { label: 'Application', value: 'Robotics & Vision Agents' }
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Autonomous Logic', 'Vector DBs'],
    subsystems: ['NEUROBOTS Agent Controller', 'Spatial Perception Pipeline', 'Semantic Retrieval & RAG', 'Embedded Edge Inference']
  },
  CYBERSECURITY: {
    id: 'CYBERSECURITY',
    title: 'Offensive & Defensive Cybersecurity',
    badge: 'THREAT_RECON_&_DEFENSE',
    tagline: 'Hardening modern perimeters through proactive threat modeling.',
    description: 'Deep understanding of application security, vulnerability assessment, network penetration testing, and zero-trust authentication protocols to safeguard mission-critical systems against vector exploits.',
    metrics: [
      { label: 'Focus Area', value: 'AppSec & Network Defense' },
      { label: 'Protocols', value: 'Zero-Trust, TLS 1.3, AuthN/AuthZ' },
      { label: 'Audit Rigor', value: 'OWASP Top 10 Aligned' }
    ],
    technologies: ['Wireshark', 'Burp Suite', 'Linux Hardening', 'Network Telemetry', 'Reverse Engineering', 'Cryptography'],
    subsystems: ['Packet Telemetry Analyzer', 'Penetration Defense Matrix', 'Identity & Access Enclave', 'Audit Anomaly Engine']
  },
  PQC: {
    id: 'PQC',
    title: 'Post-Quantum Cryptography',
    badge: 'NEXT_GEN_SECURITY',
    tagline: 'Safeguarding communication against quantum-computing decryptors.',
    description: 'Pioneering research and implementation in lattice-based cryptography, Kyber/Dilithium key encapsulation, and hybrid quantum-resilient encryption schemes (featured in Project Kryptcom).',
    metrics: [
      { label: 'NIST Standards', value: 'ML-KEM (Kyber) & ML-DSA' },
      { label: 'Application', value: 'Quantum-Resistant Messaging' },
      { label: 'Readiness', value: 'Forward Secrecy 2030+' }
    ],
    technologies: ['CRYSTALS-Kyber', 'Lattice Cryptography', 'Secure Enclaves', 'End-to-End Encryption', 'PQC Handshakes'],
    subsystems: ['Kyber Key Encapsulation', 'Dilithium Digital Signatures', 'Ephemeral Hybrid Enclaves', 'Zero-Knowledge Proofs']
  },
  SYSTEMS: {
    id: 'SYSTEMS',
    title: 'Computer Science & Business Systems',
    badge: 'STRATEGIC_ENTERPRISE',
    tagline: 'Harmonizing deep technical architecture with business value velocity.',
    description: 'Pursuing specialized B.Tech in CSBS — a hybrid engineering curriculum designed to model scalable enterprise software, computational economics, algorithmic decisioning, and industrial compliance.',
    metrics: [
      { label: 'Discipline', value: 'B.Tech CSBS' },
      { label: 'Competitions', value: 'SIH & MSME Internal Selections' },
      { label: 'Focus', value: 'Enterprise Systems & Tech Strategy' }
    ],
    technologies: ['Enterprise Architecture', 'Financial Tech Modeling', 'Agile Product Lifecycle', 'Cloud Scalability', 'Compliance & Risk'],
    subsystems: ['Business Process Automation', 'Data-Driven Decision Mesh', 'Scalable Cloud Topology', 'Enterprise Governance']
  }
};

export const CommandCenterHero: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<DomainFocus>('DEVELOPER');
  const [hoveredWord, setHoveredWord] = useState<DomainFocus | null>(null);
  const [laserCoordinates, setLaserCoordinates] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Update laser connection line coordinates between hovered word and telemetry panel
  const updateLaserThread = (domain: DomainFocus | null) => {
    if (!domain) {
      setLaserCoordinates(null);
      return;
    }
    const wordEl = wordRefs.current[domain];
    const panelEl = panelRef.current;
    const containerEl = containerRef.current;

    if (wordEl && panelEl && containerEl) {
      const cRect = containerEl.getBoundingClientRect();
      const wRect = wordEl.getBoundingClientRect();
      const pRect = panelEl.getBoundingClientRect();

      setLaserCoordinates({
        x1: wRect.right - cRect.left,
        y1: wRect.top + wRect.height / 2 - cRect.top,
        x2: pRect.left - cRect.left,
        y2: pRect.top + 60 - cRect.top
      });
    }
  };

  const handleWordHover = (domain: DomainFocus) => {
    soundFX.playLaserBlip();
    setActiveDomain(domain);
    setHoveredWord(domain);
    updateLaserThread(domain);
  };

  const handleWordLeave = () => {
    setHoveredWord(null);
    setLaserCoordinates(null);
  };

  // Canvas Dynamic Interactive Node Network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodes: NodePoint[] = [
      { id: 'DEVELOPER', label: 'DEV_CORE', x: width * 0.25, y: height * 0.35, vx: 0.2, vy: 0.15, radius: 10, color: '#00F2FE', category: 'Software' },
      { id: 'AI', label: 'NEURAL_AI', x: width * 0.75, y: height * 0.28, vx: -0.18, vy: 0.22, radius: 11, color: '#8B5CF6', category: 'Cognition' },
      { id: 'CYBERSECURITY', label: 'CYBER_SEC', x: width * 0.35, y: height * 0.72, vx: 0.15, vy: -0.15, radius: 10, color: '#38BDF8', category: 'Defense' },
      { id: 'PQC', label: 'PQC_ENCLAVE', x: width * 0.8, y: height * 0.68, vx: -0.12, vy: -0.18, radius: 9, color: '#C084FC', category: 'Quantum' },
      { id: 'SYSTEMS', label: 'CSBS_STRAT', x: width * 0.52, y: height * 0.5, vx: 0.1, vy: -0.1, radius: 8, color: '#10B981', category: 'Enterprise' },
      // Background auxiliary nodes
      { id: 'DEVELOPER', label: 'API_GATEWAY', x: width * 0.15, y: height * 0.6, vx: -0.1, vy: 0.12, radius: 5, color: '#64748B', category: 'Sub' },
      { id: 'AI', label: 'ROBOTICS_NODE', x: width * 0.62, y: height * 0.18, vx: 0.12, vy: -0.1, radius: 6, color: '#64748B', category: 'Sub' },
      { id: 'CYBERSECURITY', label: 'FIREWALL_L3', x: width * 0.45, y: height * 0.88, vx: -0.14, vy: 0.08, radius: 5, color: '#64748B', category: 'Sub' },
    ];

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (const node of nodes) {
        const dx = clickX - node.x;
        const dy = clickY - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 15) {
          soundFX.playLaserBlip();
          setActiveDomain(node.id);
          break;
        }
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid dots inside canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let x = 10; x < width; x += 40) {
        for (let y = 10; y < height; y += 40) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        // Mouse repelling
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          node.x -= (dx / dist) * force * 1.5;
          node.y -= (dy / dist) * force * 1.5;
        }
      });

      // Connect nodes with glowing lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 170;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            const isHighlighted = n1.id === activeDomain || n2.id === activeDomain;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isHighlighted
              ? `rgba(0, 242, 254, ${alpha * 1.8})`
              : `rgba(255, 255, 255, ${alpha * 0.4})`;
            ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
            ctx.stroke();

            // Traveling pulses along active paths
            if (isHighlighted && dist > 50) {
              const time = Date.now() * 0.002;
              const t = (Math.sin(time + i + j) + 1) / 2;
              const px = n1.x + dx * t;
              const py = n1.y + dy * t;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#00F2FE';
              ctx.fill();
            }
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        const isCurrentActive = node.id === activeDomain;
        const isHovered =
          Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2) < node.radius + 6;

        // Outer glow aura
        if (isCurrentActive || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = isCurrentActive ? 'rgba(0, 242, 254, 0.18)' : 'rgba(139, 92, 246, 0.15)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = isCurrentActive ? '#00F2FE' : '#8B5CF6';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Inner solid node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isCurrentActive ? '#00F2FE' : node.color;
        ctx.shadowColor = isCurrentActive ? '#00F2FE' : node.color;
        ctx.shadowBlur = isCurrentActive ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node center core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#030407';
        ctx.fill();

        // Node Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = isCurrentActive ? '#00F2FE' : 'rgba(226, 232, 240, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onCanvasClick);
    };
  }, [activeDomain]);

  const activeDetail = DOMAIN_DATA[activeDomain];

  return (
    <section id="command" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-mde-cyan/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-mde-violet/10 blur-[120px] pointer-events-none" />

      {/* SVG Laser thread connector between hovered text and telemetry panel */}
      {laserCoordinates && (
        <svg className="absolute inset-0 pointer-events-none z-30 w-full h-full">
          <defs>
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00F2FE" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={`M ${laserCoordinates.x1} ${laserCoordinates.y1} C ${(laserCoordinates.x1 + laserCoordinates.x2) / 2} ${laserCoordinates.y1}, ${(laserCoordinates.x1 + laserCoordinates.x2) / 2} ${laserCoordinates.y2}, ${laserCoordinates.x2} ${laserCoordinates.y2}`}
            fill="none"
            stroke="url(#laserGrad)"
            strokeWidth="2.5"
            strokeDasharray="6 3"
            filter="url(#glow)"
            className="animate-pulse"
          />
          <circle cx={laserCoordinates.x1} cy={laserCoordinates.y1} r="4" fill="#00F2FE" />
          <circle cx={laserCoordinates.x2} cy={laserCoordinates.y2} r="5" fill="#8B5CF6" />
        </svg>
      )}

      <div ref={containerRef} className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Command Center Text & Interactive Keyword Triggers (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* System Status Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-mde-cyan/30 bg-mde-cyan/5 text-xs font-mono text-mde-cyan shadow-cyan-subtle">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mde-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mde-cyan"></span>
              </span>
              <span className="font-semibold tracking-wide">SYSTEM KERNEL // ONLINE</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">PERSONAL DIGITAL ENVIRONMENT</span>
            </div>

            {/* Main Title */}
            <div>
              <p className="font-mono text-xs text-mde-muted uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-mde-cyan" />
                <span>WORKSPACE MANIFEST // ARCHITECT</span>
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-sans leading-[1.1]">
                MANUJ <span className="text-mde-cyan glow-text-cyan">U.</span>
              </h1>
            </div>

            {/* Dynamic Interactive Role Badges / Keywords with Glow Connector */}
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                // HOVER KEYWORD TO ENGAGE TELEMETRY THREAD:
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono">
                
                {/* 1. DEVELOPER */}
                <span
                  ref={(el) => (wordRefs.current['DEVELOPER'] = el)}
                  onMouseEnter={() => handleWordHover('DEVELOPER')}
                  onMouseLeave={handleWordLeave}
                  onClick={() => setActiveDomain('DEVELOPER')}
                  className={`cursor-pointer px-3 py-1.5 rounded border transition-all duration-200 select-none flex items-center gap-1.5 ${
                    activeDomain === 'DEVELOPER'
                      ? 'bg-mde-cyan/20 border-mde-cyan text-white shadow-cyan-glow font-bold scale-105'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-mde-cyan/40'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-mde-cyan" />
                  <span>DEVELOPER</span>
                </span>

                <span className="text-white/20 font-mono">/</span>

                {/* 2. AI ENGINEERING */}
                <span
                  ref={(el) => (wordRefs.current['AI'] = el)}
                  onMouseEnter={() => handleWordHover('AI')}
                  onMouseLeave={handleWordLeave}
                  onClick={() => setActiveDomain('AI')}
                  className={`cursor-pointer px-3 py-1.5 rounded border transition-all duration-200 select-none flex items-center gap-1.5 ${
                    activeDomain === 'AI'
                      ? 'bg-mde-violet/25 border-mde-violet text-white shadow-violet-glow font-bold scale-105'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-mde-violet/40'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4 text-mde-violet" />
                  <span>AI ENGINEERING</span>
                </span>

                <span className="text-white/20 font-mono">/</span>

                {/* 3. CYBERSECURITY */}
                <span
                  ref={(el) => (wordRefs.current['CYBERSECURITY'] = el)}
                  onMouseEnter={() => handleWordHover('CYBERSECURITY')}
                  onMouseLeave={handleWordLeave}
                  onClick={() => setActiveDomain('CYBERSECURITY')}
                  className={`cursor-pointer px-3 py-1.5 rounded border transition-all duration-200 select-none flex items-center gap-1.5 ${
                    activeDomain === 'CYBERSECURITY'
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-cyan-glow font-bold scale-105'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-sky-400/40'
                  }`}
                >
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span>CYBERSECURITY</span>
                </span>

                <span className="text-white/20 font-mono">/</span>

                {/* 4. PQC */}
                <span
                  ref={(el) => (wordRefs.current['PQC'] = el)}
                  onMouseEnter={() => handleWordHover('PQC')}
                  onMouseLeave={handleWordLeave}
                  onClick={() => setActiveDomain('PQC')}
                  className={`cursor-pointer px-2.5 py-1.5 rounded border transition-all duration-200 select-none flex items-center gap-1 text-xs ${
                    activeDomain === 'PQC'
                      ? 'bg-purple-500/20 border-purple-400 text-white shadow-violet-glow font-bold scale-105'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>PQC</span>
                </span>
              </div>
            </div>

            {/* Academic Specialization Tag */}
            <div className="flex items-center gap-2 font-mono text-xs text-mde-muted bg-white/[0.02] border border-white/5 px-3 py-2 rounded-lg w-fit">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Specialization:</span>
              <span className="text-white font-medium">Computer Science and Business Systems (CSBS)</span>
            </div>

            {/* Short Technical Introduction */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Entering a developer&apos;s personal digital workspace. Building resilient software architectures, 
              autonomous AI cognitive pipelines, and next-generation quantum-resistant cryptographic systems.
            </p>

            {/* Action Buttons: Explore Projects & View Resume */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => soundFX.playChirp(800, 0.04)}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-mono text-sm font-semibold text-black bg-gradient-to-r from-mde-cyan via-sky-300 to-white hover:shadow-cyan-glow transition-all duration-300 overflow-hidden"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#resume"
                onClick={() => soundFX.playChirp(600, 0.04)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-mono text-sm font-medium text-white border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-mde-cyan/40 transition-all duration-300 shadow-sm"
              >
                <FileText className="w-4 h-4 text-mde-cyan" />
                <span>VIEW RESUME</span>
              </a>

              <a
                href="#arsenal"
                onClick={() => soundFX.playChirp(500, 0.03)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-mde-cyan transition-colors"
              >
                <span>// inspect arsenal</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Fast Telemetry Strip */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-4 max-w-lg font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">NODE STATUS</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  OPERATIONAL
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">PRIMARY FOCUS</span>
                <span className="text-xs text-white font-semibold">AI + CRYPTO + FULLSTACK</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">LATENCY</span>
                <span className="text-xs text-mde-cyan font-semibold">12ms // SYNCED</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Synapse Canvas & Telemetry Panel (5 Cols) */}
          <div className="lg:col-span-5 relative space-y-4">
            
            {/* Interactive Network Visualizer Canvas */}
            <div className="relative w-full h-[260px] sm:h-[300px] rounded-xl border border-white/10 bg-mde-black/80 overflow-hidden shadow-2xl">
              <div className="absolute top-2.5 left-3 z-20 flex items-center gap-2 font-mono text-[10px] text-mde-muted">
                <Network className="w-3.5 h-3.5 text-mde-cyan" />
                <span>SYNAPSE SPATIAL MESH // CLICK NODES</span>
              </div>
              <div className="absolute top-2.5 right-3 z-20 font-mono text-[10px] text-slate-500">
                ACTIVE: <span className="text-mde-cyan font-bold">{activeDomain}</span>
              </div>
              
              <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

              <div className="absolute bottom-2 left-3 right-3 z-20 flex justify-between font-mono text-[9px] text-slate-500 border-t border-white/5 pt-1.5">
                <span>INTERACTIVE 2D NODE GRAPH</span>
                <span>PHYSICS // SPRING-REPULSION</span>
              </div>
            </div>

            {/* Domain Telemetry Panel (Reacts to hovered / selected domain) */}
            <div
              ref={panelRef}
              className={`p-5 rounded-xl border transition-all duration-300 relative ${
                activeDomain === 'DEVELOPER'
                  ? 'glass-panel-active border-mde-cyan/40'
                  : activeDomain === 'AI'
                  ? 'glass-panel bg-mde-card/90 border-mde-violet/40 shadow-violet-glow'
                  : 'glass-panel bg-mde-card/90 border-white/15'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg border ${
                    activeDomain === 'AI' 
                      ? 'bg-mde-violet/20 border-mde-violet/40 text-mde-violet'
                      : 'bg-mde-cyan/20 border-mde-cyan/40 text-mde-cyan'
                  }`}>
                    {activeDomain === 'AI' ? (
                      <BrainCircuit className="w-4 h-4" />
                    ) : activeDomain === 'CYBERSECURITY' ? (
                      <Shield className="w-4 h-4" />
                    ) : activeDomain === 'PQC' ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Code2 className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-mde-muted uppercase block leading-none">
                      {activeDetail.badge}
                    </span>
                    <h3 className="font-sans text-sm font-bold text-white mt-0.5">
                      {activeDetail.title}
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-mde-cyan">
                  {hoveredWord ? 'LIVE STREAM' : 'LOCKED'}
                </span>
              </div>

              {/* Tagline & Description */}
              <div className="py-3 space-y-2">
                <p className="font-mono text-xs text-mde-cyan/90 font-medium">
                  &gt; {activeDetail.tagline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {activeDetail.description}
                </p>
              </div>

              {/* Subsystems & Technologies */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {activeDetail.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Subsystems List */}
                <div className="space-y-1 font-mono text-[11px] pt-1 text-slate-400">
                  {activeDetail.subsystems.slice(0, 2).map((sub, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-mde-cyan"></span>
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
