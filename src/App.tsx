
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Code2, GraduationCap, Menu, ShieldCheck, X } from 'lucide-react';


function GitHubMark() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.14 3.32 1.63.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.24-5.1 5.52.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z"/></svg>;
}

function LinkedInMark() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 3.2a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9h3.6v11.6H3.4V9Zm5.8 0h3.4v1.6h.05A3.72 3.72 0 0 1 16 8.7c3.65 0 4.33 2.4 4.33 5.52v6.38h-3.6v-5.66c0-1.35-.02-3.08-1.88-3.08-1.89 0-2.18 1.47-2.18 2.98v5.76H9.2V9Z"/></svg>;
}

const projects = [
  { n: '01', name: 'BizInsight', category: 'BUSINESS ANALYTICS · FULL STACK', status: 'IN DEVELOPMENT', desc: 'A business analytics and decision-support platform designed to turn operational data into clearer business decisions.', tags: ['React', 'Node.js', 'Express', 'Supabase'], visual: 'biz', href: 'https://github.com/manuj-hash/bizinsight', note: 'Analytics · Inventory · Reports' },
  { n: '02', name: 'ECDAT', category: 'CYBERSECURITY · CRYPTOGRAPHY', status: 'RESEARCH & DEVELOPMENT', desc: 'An Enterprise Cryptographic Discovery & Analysis Tool focused on cryptographic discovery, CBOM generation and post-quantum migration readiness.', tags: ['Cybersecurity', 'CBOM', 'PQC', 'Blockchain'], visual: 'ecdat', href: 'https://github.com/cheenu-exe/ecdat-platform', note: 'Discover · Assess · Migrate' },
  { n: '03', name: 'Kryptcom', category: 'SECURE COMMUNICATION · PQC', status: 'SELECTED · FINAL ROUND', desc: 'A secure communication platform exploring post-quantum cryptographic readiness and stronger foundations for private digital communication.', tags: ['Secure Systems', 'Cryptography', 'PQC'], visual: 'krypt', note: 'Privacy · Trust · Readiness' }
];

const skillGroups = [
  { title: 'PROGRAMMING', items: ['C', 'C++', 'Java · Beginner', 'Python · Beginner'] },
  { title: 'WEB & BACKEND', items: ['HTML', 'CSS', 'React', 'Node.js', 'Express.js'] },
  { title: 'DATA & TOOLS', items: ['SQL', 'Supabase', 'Git', 'GitHub'] },
  { title: 'EXPLORING', items: ['AI & Analytics', 'Cybersecurity', 'Post-Quantum Cryptography'] }
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const a = window.setTimeout(() => setExit(true), 1800);
    const b = window.setTimeout(onComplete, 2000);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [onComplete]);
  return <div className={'boot-screen' + (exit ? ' boot-screen--exit' : '')}>
    <div className="boot-grid" />
    <div className="boot-inner">
      <div className="boot-top"><span>MU / PERSONAL SYSTEM</span><span>BUILD 2026.11</span></div>
      <div className="boot-mark">m<span>.</span></div>
      <p className="boot-kicker">INITIALIZING PERSONAL SPACE</p>
      <h1>MANUJ<span>.</span>DEV</h1>
      <div className="boot-log">
        <p><b>&gt;</b> loading identity profile <i>OK</i></p>
        <p><b>&gt;</b> preparing selected work <i>OK</i></p>
        <p><b>&gt;</b> establishing creative direction <i>OK</i></p>
      </div>
      <div className="boot-progress"><span /></div>
      <div className="boot-bottom"><span>DESIGNING WITH INTENT</span><span>00:02</span></div>
    </div>
  </div>;
}

function ParticleTree({ wide = false }: { wide?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, tick = 0;
    let dots: { x: number; y: number; r: number; p: number }[] = [];
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width; h = box.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: Math.max(100, Math.floor(w * .24)) }, () => {
        const y = .08 + Math.random() * .82;
        return { x: .5 + (Math.random() - .5) * (.06 + y * .82), y, r: .7 + Math.random() * 1.5, p: Math.random() * 6.28 };
      });
    };
    const draw = () => {
      tick += .006;
      ctx.clearRect(0, 0, w, h);
      const points = dots.map(d => ({ x: d.x * w + Math.sin(tick + d.p) * 5, y: d.y * h, r: d.r, p: d.p }));
      const halo = ctx.createRadialGradient(w * .5, h * .53, 0, w * .5, h * .53, w * .48);
      halo.addColorStop(0, 'rgba(89,126,255,.18)'); halo.addColorStop(1, 'rgba(89,126,255,0)');
      ctx.fillStyle = halo; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x, dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 48) {
          ctx.strokeStyle = 'rgba(145,174,255,' + ((1 - dist / 48) * .2) + ')';
          ctx.lineWidth = .65; ctx.beginPath(); ctx.moveTo(points[i].x, points[i].y); ctx.lineTo(points[j].x, points[j].y); ctx.stroke();
        }
      }
      points.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(177,198,255,' + (.5 + Math.sin(tick * 2 + p.p) * .25) + ')';
        ctx.shadowColor = '#7195ff'; ctx.shadowBlur = 9; ctx.fill();
      });
      ctx.shadowBlur = 0;
      raf = window.requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener('resize', resize);
    return () => { window.cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className={'particle-tree' + (wide ? ' particle-tree--wide' : '')} aria-hidden="true" />;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect(); }
    }, { threshold: .14 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={'reveal' + (shown ? ' is-visible' : '') + ' ' + className}>{children}</div>;
}

function ProjectArtwork({ visual }: { visual: string }) {
  if (visual === 'biz') return <div className="biz-art"><div className="art-label">OVERVIEW / 01</div><small>REVENUE OVERVIEW</small><strong>+24.8%</strong><div className="biz-bars">{[28, 46, 39, 62, 52, 73, 65, 88, 100].map((v, i) => <i key={i} style={{ height: v + '%' }} />)}</div></div>;
  if (visual === 'ecdat') return <div className="ecdat-art"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="art-core"><ShieldCheck size={36} /></div><span className="node node-a">CBOM</span><span className="node node-b">PQC</span><span className="node node-c">SCAN</span></div>;
  return <div className="krypt-art"><div className="krypt-ring ring-a" /><div className="krypt-ring ring-b" /><div className="krypt-core"><ShieldCheck size={42} /></div><span>SECURE CHANNEL / READY</span></div>;
}

function App() {
  const [booted, setBooted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = ['home', 'about', 'work', 'approach', 'contact'];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-35% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const nav = [['About', 'about'], ['Selected work', 'work'], ['Approach', 'approach'], ['Contact', 'contact']];
  const closeMenu = () => setMenuOpen(false);

  return <div className={'site-shell' + (booted ? ' site-shell--ready' : '')}>
    {!booted && <BootSequence onComplete={() => setBooted(true)} />}
    <header className="site-header">
      <a className="wordmark" href="#home" onClick={closeMenu}>m<span>.</span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={'nav-pill' + (menuOpen ? ' nav-pill--open' : '')}>
        {nav.map(([label, id]) => <a key={id} className={active === id ? 'nav-link nav-link--active' : 'nav-link'} href={'#' + id} onClick={closeMenu}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-grain" />
        <div className="hero-copy">
          <div className="eyebrow"><i /> CSBS STUDENT · DEVELOPER IN PROGRESS</div>
          <h1>Ideas into<br /><em>useful</em> software<span>.</span></h1>
          <p>I'm Manuj — a computer science student exploring the space between software engineering, business thinking and emerging technology.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowUpRight size={17} /></a><a className="text-link" href="#about">A little about me <ArrowDown size={15} /></a></div>
          <div className="hero-foot"><span>BASED IN INDIA</span><span>BUILDING · LEARNING · EXPLORING</span></div>
        </div>
        <div className="hero-visual">
          <div className="visual-label visual-top"><span>FIG. 01</span><span>IDEAS IN MOTION</span></div>
          <div className="visual-orbit visual-orbit-a" /><div className="visual-orbit visual-orbit-b" />
          <ParticleTree />
          <div className="visual-caption"><span>01 / 03</span><b>CURIOUS BY DESIGN</b></div>
          <div className="visual-label visual-bottom"><span>SOFTWARE</span><span>PEOPLE</span><span>PROBLEMS</span></div>
        </div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section id="about" className="section about-section">
        <div className="section-index"><b>01</b><i /> ABOUT</div>
        <div className="about-grid">
          <Reveal><p className="eyebrow muted">A STUDENT OF TECHNOLOGY & BUSINESS</p><h2>Learning to build<br />things that <em>matter.</em></h2></Reveal>
          <Reveal className="about-copy">
            <p className="large-copy">I enjoy taking complex ideas, understanding the problem behind them, and shaping them into practical software.</p>
            <p>I'm pursuing Computer Science and Business Systems at Karpagam Academy of Higher Education. My interests span full-stack development, analytics, cybersecurity and post-quantum cryptography.</p>
            <p>I'm still learning, experimenting and improving — with a focus on building thoughtfully rather than building just to ship.</p>
            <div className="facts"><div><strong>7.78</strong><span>CGPA</span></div><div><strong>CSBS</strong><span>DEGREE</span></div><div><strong>02</strong><span>YEAR</span></div></div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="work-backdrop"><ParticleTree wide /></div>
        <div className="section-index light-index"><b>02</b><i /> SELECTED WORK</div>
        <div className="work-heading"><Reveal><h2>Curiosity, made<br /><em>tangible.</em></h2></Reveal><p>A selection of ideas and projects I'm exploring, developing and learning from.</p></div>
        <div className="project-list">
          {projects.map(project => <Reveal key={project.n}><article className="project-card">
            <div className="project-visual"><ProjectArtwork visual={project.visual} /><span className="project-number">{project.n} / 03</span></div>
            <div className="project-body">
              <div className="project-meta"><span>{project.category}</span><small><i />{project.status}</small></div>
              <h3>{project.name}<b>.</b></h3><p>{project.desc}</p>
              <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="project-footer"><span>{project.note}</span>{project.href ? <a href={project.href} target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={16} /></a> : <a href="#contact">Ask me about it <ArrowUpRight size={16} /></a>}</div>
            </div>
          </article></Reveal>)}
        </div>
      </section>

      <section id="approach" className="section approach-section">
        <div className="section-index"><b>03</b><i /> WHAT I'M WORKING WITH</div>
        <div className="approach-heading"><Reveal><h2>A growing<br /><em>toolkit.</em></h2></Reveal><Reveal><p>Tools are part of the process. Understanding the problem, learning the fundamentals and choosing the right tool matter more.</p></Reveal></div>
        <div className="skill-grid">{skillGroups.map((group, index) => <Reveal key={group.title} className="skill-card"><div className="skill-top"><span>0{index + 1}</span><Code2 size={18} /></div><h3>{group.title}</h3><div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>)}</div>
        <div className="learning-note"><span><GraduationCap size={20} /></span><p><b>Always learning.</b> I'm actively strengthening my foundations in data structures, full-stack development, analytics and security engineering.</p></div>
      </section>

      <section className="section journey-section">
        <div className="section-index"><b>04</b><i /> THE JOURNEY</div>
        <div className="journey-grid"><Reveal><h2>Progress over<br /><em>perfection.</em></h2></Reveal><div className="journey-items">
          <Reveal className="journey-item"><span>2026 — NOW</span><div><h3>Building with purpose</h3><p>Developing projects across business analytics, cryptographic discovery and secure communication.</p></div><i>↗</i></Reveal>
          <Reveal className="journey-item"><span>2026</span><div><h3>Project selections</h3><p>Selected through college internal rounds for SIH and MSME project tracks.</p></div><i>↗</i></Reveal>
          <Reveal className="journey-item"><span>FOUNDATION</span><div><h3>Computer Science & Business Systems</h3><p>Learning to connect technical problem-solving with business context at Karpagam Academy of Higher Education.</p></div><i>↗</i></Reveal>
        </div></div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-orb" />
        <div className="contact-content"><div className="section-index light-index"><b>05</b><i /> GET IN TOUCH</div><Reveal>
          <p className="eyebrow contact-eyebrow">HAVE AN IDEA, PROJECT OR OPPORTUNITY?</p>
          <h2>Let's make<br /><em>something</em><br />meaningful.</h2>
          <p className="contact-copy">I'm open to connecting with people who enjoy learning, building and solving thoughtful problems.</p>
          <a className="button button-light" href="https://www.linkedin.com/in/manuj-u/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={17} /></a>
        </Reveal></div>
        <footer className="contact-footer"><span>MANUJ U. · CSBS</span><div className="social-links"><a href="https://github.com/manuj-hash" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubMark /></a><a href="https://www.linkedin.com/in/manuj-u/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInMark /></a><a href="https://leetcode.com/u/MANUJ_U/" target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 size={18} /></a></div><span>© 2026 · BUILT WITH INTENT</span></footer>
      </section>
    </main>
  </div>;
}

export default App;
