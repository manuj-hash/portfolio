import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Download, Code2, Layers3, GraduationCap, Sparkles } from 'lucide-react';
import ParticlePortrait from './components/ParticlePortrait';

const nav = ['About', 'Projects', 'Skills', 'Journey', 'Contact'];
const skills = ['C++', 'C', 'Python', 'Java', 'JavaScript', 'React', 'HTML', 'CSS', 'SQL', 'Git', 'GitHub', 'Node.js', 'MongoDB'];
const projects = [
  { n: '01', name: 'BizInsight', label: 'BUSINESS ANALYTICS & DECISION SUPPORT', description: 'A business-focused analytics platform designed to help turn operational data into clearer decisions.', tags: ['React', 'Node.js', 'Express', 'MongoDB'], url: 'https://github.com/manuj-hash/bizinsight' },
  { n: '02', name: 'ECDAT', label: 'CRYPTOGRAPHIC DISCOVERY & ANALYSIS', description: 'An enterprise cryptographic discovery and analysis project focused on CBOM visibility, quantum-risk assessment and migration guidance.', tags: ['Cryptographic discovery', 'CBOM', 'PQC', 'Security research'], url: 'https://github.com/cheenu-exe/ecdat-platform' },
  { n: '03', name: 'Kryptcom', label: 'SECURE COMMUNICATION PLATFORM', description: 'A secure communication platform project exploring post-quantum cryptographic readiness.', tags: ['Cryptography', 'Secure communication', 'PQC'], url: '' }
];
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .72, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export default function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  useEffect(() => {
    const ids = ['home', ...nav.map(n => n.toLowerCase())];
    const observer = new IntersectionObserver(entries => {
      const item = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (item) setActive(item.target.id === 'home' ? 'Home' : item.target.id[0].toUpperCase()+item.target.id.slice(1));
    }, { rootMargin: '-24% 0px -58% 0px', threshold: [0,.1,.3,.6] });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  return <div className="site-shell">
    <div className="grain" aria-hidden="true"/>
    <header className="nav-wrap">
      <a className="wordmark" href="#home" onClick={e=>{e.preventDefault();go('Home')}}>MANUJ<span>.</span>U</a>
      <nav className={open?'nav-links open':'nav-links'} aria-label="Main navigation">{nav.map(n=><a key={n} className={active===n?'active':''} href={'#'+n.toLowerCase()} onClick={e=>{e.preventDefault();go(n)}}>{n}</a>)}</nav>
      <a className="nav-availability" href="https://github.com/manuj-hash"><span/> OPEN TO OPPORTUNITIES</a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-grid"/>
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.18}}><span className="eyebrow-line"/> COMPUTER SCIENCE & BUSINESS SYSTEMS</motion.div>
          <motion.p className="hello" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>HELLO, I'M MANUJ.</motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.85,delay:.36,ease:[.22,1,.36,1]}}>BUILDING<br/>THE FUTURE<br/><em>THROUGH CODE.</em></motion.h1>
          <motion.p className="hero-description" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.72}}>Computer Science student and developer exploring technology, building digital products and solving real-world problems.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.9}}>
            <a className="button button-light" href="#projects" onClick={e=>{e.preventDefault();go('Projects')}}>EXPLORE MY WORK <ArrowUpRight size={16}/></a>
            <a className="button button-quiet" href="/resume.pdf" download><Download size={15}/> DOWNLOAD RESUME</a>
          </motion.div>
          <div className="hero-index"><span>01</span> / PERSONAL PORTFOLIO <span className="index-rule"/></div>
        </div>
        <div className="hero-visual"><ParticlePortrait/><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="visual-coordinate">11°00' N<br/>76°58' E</div></div>
        <a className="scroll-cue" href="#about" onClick={e=>{e.preventDefault();go('About')}}><span className="scroll-line"/> SCROLL TO EXPLORE <ArrowDown size={13}/></a>
        <div className="hero-side-note">DESIGNING / BUILDING / LEARNING</div>
      </section>
      <section className="intro-strip"><span>CURIOUS BY NATURE</span><span className="strip-star">✳</span><span>BUILDER BY PRACTICE</span><span className="strip-star">✳</span><span>ALWAYS IN PROGRESS</span></section>
      <section className="section about-section" id="about">
        <Reveal><div className="section-kicker">01 — A LITTLE ABOUT ME</div><div className="about-layout"><h2>BEYOND<br/>THE <em>CODE.</em></h2><div className="about-copy"><p className="lead">I'm a Computer Science and Business Systems student interested in software development, problem-solving, artificial intelligence and building meaningful technology.</p><p>I enjoy exploring how technology can solve practical problems — from business intelligence to cryptographic discovery and secure communication. I'm continuously learning, experimenting and turning ideas into working projects.</p><a className="text-link" href="https://github.com/manuj-hash" target="_blank" rel="noreferrer">MORE ABOUT MY WORK <ArrowUpRight size={15}/></a></div></div></Reveal>
        <div className="fact-grid">
          <Reveal className="fact-card"><GraduationCap/><span>EDUCATION</span><strong>CS & Business Systems</strong><small>Karpagam Academy of Higher Education</small></Reveal>
          <Reveal className="fact-card"><Code2/><span>DEVELOPER JOURNEY</span><strong>Learning by building</strong><small>From fundamentals to full-stack projects</small></Reveal>
          <Reveal className="fact-card"><Layers3/><span>TECHNICAL INTERESTS</span><strong>Software · AI · Security</strong><small>Exploring technology across disciplines</small></Reveal>
          <Reveal className="fact-card"><Sparkles/><span>CURRENT FOCUS</span><strong>Better products, better code</strong><small>Problem-solving and practical development</small></Reveal>
        </div>
      </section>
      <section className="section projects-section" id="projects">
        <Reveal><div className="section-kicker">02 — SELECTED WORK</div><div className="section-heading"><h2>IDEAS INTO<br/><em>INTERFACES.</em></h2><p>A selection of projects and explorations. Each one is a step forward in learning how to build useful technology.</p></div></Reveal>
        <div className="project-list">{projects.map(p=><Reveal key={p.n} className="project-row"><div className="project-number">{p.n}</div><div className="project-main"><div className="project-type">{p.label}</div><h3>{p.name}</h3><p>{p.description}</p><div className="tag-list">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div><div className="project-action">{p.url?<a href={p.url} target="_blank" rel="noreferrer" aria-label={'Open '+p.name+' repository'}><ArrowUpRight/></a>:<span className="coming-soon">IN DEVELOPMENT</span>}</div></Reveal>)}</div>
      </section>
      <section className="section skills-section" id="skills">
        <Reveal><div className="section-kicker">03 — TOOLS I WORK WITH</div><div className="section-heading"><h2>MY TECH<br/><em>STACK.</em></h2><p>A growing toolkit. Technologies I'm learning, exploring or using across my projects.</p></div></Reveal>
        <div className="skills-cloud">{skills.map((s,i)=><Reveal key={s} className="skill-chip"><span>{String(i+1).padStart(2,'0')}</span>{s}<ArrowUpRight size={14}/></Reveal>)}</div>
      </section>
      <section className="section journey-section" id="journey">
        <Reveal><div className="section-kicker">04 — THE JOURNEY SO FAR</div><div className="section-heading"><h2>STILL<br/><em>BECOMING.</em></h2><p>Learning, building and taking on challenges — one experience at a time.</p></div></Reveal>
        <div className="timeline">
          <Reveal className="timeline-item"><span className="timeline-dot"/><div className="timeline-meta">EDUCATION · CURRENT</div><h3>Karpagam Academy of Higher Education</h3><p>Computer Science and Business Systems</p><small>Undergraduate studies</small></Reveal>
          <Reveal className="timeline-item"><span className="timeline-dot"/><div className="timeline-meta">PROJECT SELECTION</div><h3>MSME & Smart India Hackathon</h3><p>Selected through college internal selection rounds.</p></Reveal>
          <Reveal className="timeline-item"><span className="timeline-dot"/><div className="timeline-meta">PROJECT DEVELOPMENT</div><h3>Kryptcom</h3><p>Secure communication platform project exploring post-quantum cryptographic readiness; progressed to the final round.</p></Reveal>
          <Reveal className="timeline-item"><span className="timeline-dot"/><div className="timeline-meta">CONTINUOUS LEARNING</div><h3>Certifications & technical exploration</h3><p>Building knowledge across programming, analytics, AI and cybersecurity.</p></Reveal>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <Reveal><div className="section-kicker">05 — HAVE SOMETHING IN MIND?</div><h2>LET'S BUILD<br/><em>SOMETHING GREAT.</em></h2><p>Have an idea, project or opportunity? Let's connect.</p><a className="button button-light contact-cta" href="https://www.linkedin.com/in/manuj-u" target="_blank" rel="noreferrer">START A CONVERSATION <ArrowUpRight size={16}/></a></Reveal>
        <div className="social-links"><a href="https://github.com/manuj-hash" target="_blank" rel="noreferrer"><Github/> GITHUB <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/manuj-u" target="_blank" rel="noreferrer"><Linkedin/> LINKEDIN <ArrowUpRight size={13}/></a><a href="mailto:your-email@example.com"><Mail/> EMAIL <ArrowUpRight size={13}/></a></div>
      </section>
    </main>
    <footer><a className="wordmark" href="#home" onClick={e=>{e.preventDefault();go('Home')}}>MANUJ<span>.</span>U</a><span>DESIGNED & BUILT WITH CURIOSITY.</span><span>© {new Date().getFullYear()} MANUJ U.</span></footer>
  </div>;
}
