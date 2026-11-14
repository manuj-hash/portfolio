import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
}

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'MANUJ DIGITAL ENVIRONMENT [Version 2.6.4-PQC]'
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Kernel: Linux x86_64 // Subsystem: CSBS // Status: ONLINE'
    },
    {
      id: 'init-3',
      type: 'output',
      content: 'Type "help" to display accessible system commands.'
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundFX.playLaserBlip();

    // Append command to history
    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    const newLines: TerminalLine[] = [
      { id: Date.now().toString(), type: 'input', content: rawCmd }
    ];

    switch (cmd) {
      case 'help':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: (
            <div className="space-y-1 text-slate-300">
              <div className="text-mde-cyan font-semibold">AVAILABLE SYSTEM COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                <div><span className="text-white font-mono font-bold">about</span> : Engineer biography & CSBS discipline</div>
                <div><span className="text-white font-mono font-bold">skills</span> : Technical arsenal across 5 categories</div>
                <div><span className="text-white font-mono font-bold">projects</span> : Flagship initiatives (NEUROBOTS, Kryptcom)</div>
                <div><span className="text-white font-mono font-bold">sih</span> : SIH & MSME internal selection details</div>
                <div><span className="text-white font-mono font-bold">pqc</span> : Post-Quantum Cryptography telemetry</div>
                <div><span className="text-white font-mono font-bold">contact</span> : Transmission links & email address</div>
                <div><span className="text-white font-mono font-bold">goto &lt;sec&gt;</span> : Jump to command | about | arsenal | projects | resume</div>
                <div><span className="text-white font-mono font-bold">clear</span> : Flush terminal screen buffer</div>
                <div><span className="text-white font-mono font-bold">exit</span> : Terminate session and close console</div>
              </div>
            </div>
          )
        });
        break;

      case 'about':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: 'MANUJ U. // B.Tech in Computer Science and Business Systems (CSBS). Specializing in autonomous AI systems, high-performance distributed backends, and quantum-resilient cryptographic protocols.'
        });
        break;

      case 'skills':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: '• Programming: C, C++, Java, Python\n• Frontend: HTML, CSS, React, Tailwind\n• Backend: Node.js, Express, Microservices\n• Database: MongoDB, SQL\n• Exploring: AI (Autonomous Agents), Cybersecurity, PQC (CRYSTALS-Kyber)'
        });
        break;

      case 'projects':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: '1. NEUROBOTS - Autonomous Agentic Robotics & Spatial Cognition (SIH / MSME Finalist)\n2. Kryptcom - Post-Quantum Cryptographic Secure Enclave (NIST ML-KEM)\n3. CyberSentry - 1.2Gbps Real-Time Network Packet IDS\n4. Nexus CSBS - Enterprise Event-Sourced Transaction Mesh'
        });
        break;

      case 'sih':
      case 'msme':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: '★ QUALIFIED: NEUROBOTS was successfully shortlisted through internal institutional screening panels for both the Smart India Hackathon (SIH) and MSME Prototype Incubation tracks.'
        });
        break;

      case 'pqc':
      case 'kryptcom':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: 'QUANTUM ENCLAVE // Implements NIST FIPS 203 (ML-KEM / CRYSTALS-Kyber) and FIPS 204 (ML-DSA / Dilithium) to guarantee forward secrecy against Shor & Grover quantum algorithmic deciphering.'
        });
        break;

      case 'contact':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: 'TRANSMISSION CHANNELS:\n• Email: manuj.csbs@gmail.com\n• GitHub: https://github.com\n• LinkedIn: https://linkedin.com'
        });
        break;

      case 'goto command':
      case 'goto about':
      case 'goto arsenal':
      case 'goto projects':
      case 'goto journey':
      case 'goto resume':
        const target = cmd.replace('goto ', '');
        onNavigateSection?.(target);
        onClose();
        return;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `Command not recognized: "${rawCmd}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'about', 'skills', 'projects', 'sih', 'msme', 'pqc', 'contact', 'clear', 'exit'];
      const match = commands.find((c) => c.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div
        className={`relative w-full rounded-2xl border border-mde-cyan/40 bg-mde-black/95 shadow-cyan-glow flex flex-col transition-all duration-200 overflow-hidden ${
          isExpanded ? 'h-[95vh] max-w-5xl' : 'h-[550px] max-w-3xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-mde-card/90">
          <div className="flex items-center gap-2 text-xs text-mde-cyan">
            <TerminalIcon className="w-4 h-4" />
            <span className="font-bold">MDE TERMINAL CONSOLE // MANUJ U.</span>
            <span className="hidden sm:inline text-slate-500">v2.6.4</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs leading-relaxed">
          {history.map((line) => {
            if (line.type === 'input') {
              return (
                <div key={line.id} className="flex items-center gap-2 text-white font-medium">
                  <span className="text-mde-cyan">guest@mde-os:~$</span>
                  <span>{line.content}</span>
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-slate-500 font-mono">
                  [SYS] {line.content}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-red-400 font-mono">
                  [ERR] {line.content}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-300 font-mono whitespace-pre-wrap pl-4 border-l border-white/5">
                {line.content}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="px-4 py-3 border-t border-white/10 bg-mde-card/60 flex items-center gap-2">
          <span className="text-mde-cyan text-xs font-bold">guest@mde-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white text-xs font-mono outline-none border-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1 text-slate-500 hover:text-mde-cyan"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
