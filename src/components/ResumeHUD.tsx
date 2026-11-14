import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Check, 
  Copy, 
  Mail, 
  ExternalLink,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ResumeHUD: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const contactEmail = 'manuj.dev@workspace.internal'; // Professional placeholder, customizable

  const copyToClipboard = () => {
    soundFX.playLaserBlip();
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    soundFX.playLaserBlip();
    window.print();
  };

  return (
    <section id="resume" className="relative py-28 border-t border-white/5 bg-mde-void overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mde-cyan/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-mde-cyan uppercase tracking-[0.25em] mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>06 // PROFESSIONAL PROFILE & CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              RESUME & <span className="text-mde-cyan glow-text-cyan">DOSSIER</span>
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundFX.playChirp(700, 0.03);
                setPreviewModalOpen(true);
              }}
              className="px-4 py-2 rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-mde-cyan/40 text-xs font-mono text-white flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4 text-mde-cyan" />
              <span>EXPAND PREVIEW</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-mde-cyan to-white text-black font-mono text-xs font-bold flex items-center gap-2 shadow-cyan-subtle hover:shadow-cyan-glow transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD / PRINT PDF</span>
            </button>
          </div>
        </div>

        {/* Two Column Layout: Resume Sheet on Left, Quick Profile Summary & Contact on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Styled Digital Resume Sheet (8 Cols) */}
          <div className="lg:col-span-8 p-8 rounded-2xl border border-white/10 bg-mde-card/80 backdrop-blur-xl shadow-2xl space-y-8 font-sans">
            
            {/* Resume Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  MANUJ U.
                </h3>
                <p className="font-mono text-xs text-mde-cyan font-medium mt-1">
                  SOFTWARE DEVELOPER // AI ENGINEERING // CYBERSECURITY & PQC
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  B.Tech in Computer Science and Business Systems (CSBS)
                </p>
              </div>

              <div className="font-mono text-xs text-slate-400 space-y-1 text-left sm:text-right">
                <div className="flex sm:justify-end items-center gap-1.5 text-mde-cyan">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFIED DOSSIER</span>
                </div>
                <div>Available for High-Impact Roles</div>
                <div className="text-[11px] text-slate-500">REV: 2026.4</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-mde-cyan uppercase tracking-wider block font-semibold">
                // EXECUTIVE SUMMARY
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Multidisciplinary software engineer specializing in high-performance full-stack architectures, autonomous agentic cognitive systems, and post-quantum cryptography (PQC). Solid theoretical foundation via Computer Science and Business Systems, combined with proven project deployments in autonomous robotics (NEUROBOTS — qualified in SIH & MSME internal rounds) and quantum-resilient communications (Kryptcom).
              </p>
            </div>

            {/* Core Competencies Summary */}
            <div className="space-y-3 pt-2 border-t border-white/5 font-mono text-xs">
              <span className="text-mde-cyan uppercase tracking-wider block font-semibold">
                // TECHNICAL ARSENAL SUMMARY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[11px] block">PROGRAMMING & RUNTIMES:</span>
                  <span className="text-white font-medium">C, C++, Java, Python, JavaScript, TypeScript, Node.js</span>
                </div>
                <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[11px] block">FULL-STACK & DATABASES:</span>
                  <span className="text-white font-medium">React, Express, Tailwind CSS, MongoDB, SQL (PostgreSQL, MySQL)</span>
                </div>
                <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[11px] block">AI & AUTONOMOUS SYSTEMS:</span>
                  <span className="text-white font-medium">Autonomous Multi-Agent Architecture, PyTorch, OpenCV, TensorRT</span>
                </div>
                <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[11px] block">SECURITY & CRYPTOGRAPHY:</span>
                  <span className="text-white font-medium">Post-Quantum Crypto (CRYSTALS-Kyber), Zero Trust, Threat Modeling</span>
                </div>
              </div>
            </div>

            {/* Featured Projects Summary */}
            <div className="space-y-3 pt-2 border-t border-white/5 font-mono text-xs">
              <span className="text-mde-cyan uppercase tracking-wider block font-semibold">
                // KEY SYSTEM DEPLOYMENTS
              </span>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center text-white font-bold">
                    <span>NEUROBOTS: Autonomous Agentic Robotics Platform</span>
                    <span className="text-mde-cyan text-[11px]">SIH & MSME INTERNAL FINALIST</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Architected edge computer vision and decentralized decision loop running sub-45ms spatial pathing without cloud latency.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center text-white font-bold">
                    <span>Kryptcom: Post-Quantum Cryptographic Secure Enclave</span>
                    <span className="text-mde-violet text-[11px]">NIST PQC ML-KEM</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Implemented lattice-based hybrid key encapsulation and zero-knowledge identity validation to provide quantum-resilient forward secrecy.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Achievements */}
            <div className="space-y-3 pt-2 border-t border-white/5 font-mono text-xs">
              <span className="text-mde-cyan uppercase tracking-wider block font-semibold">
                // EDUCATION & HONORS
              </span>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="text-white font-bold">Bachelor of Technology (B.Tech)</div>
                  <div className="text-slate-300">Computer Science and Business Systems (CSBS)</div>
                </div>
                <div className="text-slate-400 sm:text-right">
                  <div className="text-emerald-400 font-semibold">Smart India Hackathon (SIH) & MSME Selection</div>
                  <div className="text-[11px]">Consistent High Academic & Technical Standing</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Professional Contact & Telemetry (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Professional Contact Card */}
            <div className="p-6 rounded-2xl border border-mde-cyan/30 bg-mde-card/90 backdrop-blur-xl shadow-cyan-subtle space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-mde-cyan flex items-center gap-1.5 font-semibold">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT TRANSMISSION</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div>
                <h4 className="text-white font-bold text-base font-sans">
                  Connect with Manuj
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1">
                  Open for software engineering roles, high-impact research projects, and collaborative technical initiatives.
                </p>
              </div>

              {/* Copy Email Button */}
              <div className="space-y-2 font-mono text-xs">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  COMMUNICATION CHANNEL
                </span>
                <button
                  onClick={copyToClipboard}
                  className="w-full p-3 rounded-lg bg-black/50 border border-white/10 hover:border-mde-cyan/50 text-slate-200 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Mail className="w-4 h-4 text-mde-cyan flex-shrink-0" />
                    <span className="truncate text-xs">manuj.csbs@gmail.com</span>
                  </div>
                  <span className="p-1 rounded bg-white/5 text-slate-400 group-hover:text-mde-cyan">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </span>
                </button>
                {copied && (
                  <span className="text-[11px] text-emerald-400 font-mono block animate-pulse">
                    ✓ Email copied to clipboard!
                  </span>
                )}
              </div>

              {/* Verified Links */}
              <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  VERIFIED DIRECTORIES
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playChirp(700, 0.03)}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/30 text-white flex items-center gap-2 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-mde-cyan" />
                    <span>GITHUB</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playChirp(700, 0.03)}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/30 text-white flex items-center gap-2 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-400" />
                    <span>LINKEDIN</span>
                  </a>
                </div>
              </div>

              {/* Direct Mail Client Trigger */}
              <a
                href="mailto:manuj.csbs@gmail.com"
                onClick={() => soundFX.playLaserBlip()}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-mde-violet to-mde-cyan text-black font-mono text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>INITIATE ENCRYPTED EMAIL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>

            {/* Quick Summary Pill */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.015] font-mono text-xs space-y-2 text-slate-400">
              <div className="flex items-center justify-between text-white">
                <span>DEGREE:</span>
                <span className="text-mde-cyan">B.TECH CSBS</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>PRIMARY FOCUS:</span>
                <span>AI + CYBER + DEV</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>DEPLOYMENTS:</span>
                <span className="text-emerald-400">NEUROBOTS, KRYPTCOM</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Resume Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-mde-cyan/40 bg-mde-card p-6 sm:p-10 shadow-cyan-glow space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-mde-cyan">
                <FileText className="w-4 h-4" />
                <span>OFFICIAL DOSSIER PREVIEW // MANUJ U.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-mde-cyan text-black font-mono text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PRINT / PDF</span>
                </button>
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-300 font-sans leading-relaxed">
              <div className="text-center space-y-1 pb-4 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">MANUJ U.</h2>
                <p className="font-mono text-xs text-mde-cyan">
                  Software Developer | AI Engineering | Cybersecurity & PQC
                </p>
                <p className="text-xs text-slate-400">
                  B.Tech in Computer Science and Business Systems (CSBS)
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-mde-cyan uppercase tracking-wider mb-2 font-bold">
                  Summary
                </h4>
                <p className="text-xs text-slate-300">
                  Passionate technologist driving convergence across full-stack engineering, autonomous agentic cognitive pipelines, and quantum-resilient post-quantum encryption protocols. Finalist in internal Smart India Hackathon and MSME project selections.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-mde-cyan uppercase tracking-wider mb-2 font-bold">
                  Education & Honors
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>Bachelor of Technology (B.Tech) - CSBS</span>
                    <span>2024 — Present</span>
                  </div>
                  <p className="text-slate-400">Computer Science and Business Systems</p>
                  <p className="text-emerald-400">Selected for SIH & MSME Internal Institutional Tracks</p>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-mde-cyan uppercase tracking-wider mb-2 font-bold">
                  Flagship Projects
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-white">NEUROBOTS: Autonomous Robotics & Cognitive Agent Mesh</span>
                    <p className="text-slate-400 mt-0.5">
                      Edge-native perception, OpenCV and TensorRT obstacle evasion under 45ms latency with hardware-in-the-loop validation.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-white">Kryptcom: Post-Quantum Cryptographic Secure Enclave</span>
                    <p className="text-slate-400 mt-0.5">
                      NIST ML-KEM (CRYSTALS-Kyber) lattice key encapsulation, zero-knowledge verification, and quantum forward secrecy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white font-mono text-xs"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
