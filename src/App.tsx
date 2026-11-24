import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowUpRight, Mail, Menu, X, Download,
  Code2, ShieldCheck, BriefcaseBusiness, GraduationCap, Award, Cpu,
  ExternalLink, Terminal, Layers3, BookOpen, Sparkles
} from 'lucide-react';
import AnchorParticleScene from './components/AnchorParticleScene';

const navigation = ['About', 'Projects', 'Skills', 'Journey', 'Achievements', 'Education', 'Contact'];

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [.22, 1, .36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const projects = [
  {
    number: '01',
    name: 'BizInsight',
    category: 'BUSINESS ANALYTICS & DECISION SUPPORT SYSTEM',
    status: 'IN DEVELOPMENT',
    description: 'A business-focused analytics platform designed to help users understand business activity and make more informed decisions. The project brings key business workflows into one place instead of treating inventory as an isolated feature.',
    details: [
      'Dashboard for an at-a-glance view of business activity',
      'Inventory, analytics and reporting sections',
      'A planned end-to-end workflow from sign-in to business insights'
    ],
    stack: ['React', 'CSS', 'Node.js', 'Express.js', 'MongoDB'],
    link: 'https://github.com/manuj-hash/bizinsight',
    linkLabel: 'VIEW REPOSITORY',
    tone: 'blue'
  },
  {
    number: '02',
    name: 'ECDAT',
    category: 'ENTERPRISE CRYPTOGRAPHIC DISCOVERY & ANALYSIS TOOL',
    status: 'PROJECT DEVELOPMENT',
    description: 'A cybersecurity project focused on discovering cryptographic assets and helping organizations understand their exposure as they prepare for post-quantum cryptography.',
    details: [
      'Cryptographic Bill of Materials (CBOM) visibility',
      'Quantum-risk assessment and dependency-aware analysis',
      'PQC and hybrid-cryptography migration guidance'
    ],
    stack: ['Cybersecurity', 'Cryptographic discovery', 'CBOM', 'PQC'],
    link: 'https://github.com/cheenu-exe/ecdat-platform',
    linkLabel: 'VIEW PROJECT',
    tone: 'violet'
  },
  {
    number: '03',
    name: 'Kryptcom',
    category: 'SECURE COMMUNICATION PLATFORM',
    status: 'ADVANCED TO FINAL ROUND',
    description: 'A secure communication platform project with the goal of enabling highly secure communication and exploring readiness for post-quantum cryptography.',
    details: [
      'Communication platform concept with a security-first focus',
      'Exploration of post-quantum cryptographic readiness',
      'Selected through the project process and progressed to the final round'
    ],
    stack: ['Secure communication', 'Cryptography', 'Post-quantum readiness'],
    link: '',
    linkLabel: '',
    tone: 'cyan'
  },
  {
    number: '04',
    name: 'MSME Ambulance Project',
    category: 'PROBLEM-SOLVING & INNOVATION',
    status: 'COLLEGE SELECTION',
    description: 'A project concept developed in the MSME innovation context, centred on an ambulance-related real-world problem. The project was selected through the college internal selection process.',
    details: [
      'Started from a practical, real-world problem statement',
      'Developed as part of an innovation-focused project effort',
      'Selected in the college internal round'
    ],
    stack: ['Innovation', 'Problem solving', 'Project development'],
    link: '',
    linkLabel: '',
    tone: 'amber'
  }
];

const skillGroups = [
  { title: 'PROGRAMMING', icon: Code2, items: [{name:'C',level:'CORE'},{name:'C++',level:'CORE'},{name:'Java',level:'BEGINNER'},{name:'Python',level:'BEGINNER'}] },
  { title: 'FRONTEND DEVELOPMENT', icon: Layers3, items: [{name:'HTML',level:'LEARNING'},{name:'CSS',level:'LEARNING'},{name:'React',level:'PROJECT USE'}] },
  { title: 'BACKEND & DATABASE', icon: Terminal, items: [{name:'Node.js',level:'PROJECT USE'},{name:'Express.js',level:'PROJECT USE'},{name:'MongoDB',level:'PROJECT USE'},{name:'SQL',level:'FUNDAMENTALS'}] },
  { title: 'TOOLS & INTERESTS', icon: Cpu, items: [{name:'Git & GitHub',level:'WORKFLOW'},{name:'Power BI',level:'CERTIFIED LEARNING'},{name:'Cybersecurity',level:'EXPLORING'},{name:'PQC',level:'EXPLORING'}] }
];

const certifications = [
  { name: 'Power BI', area: 'DATA VISUALIZATION' },
  { name: 'Fundamentals of AI', area: 'ARTIFICIAL INTELLIGENCE' },
  { name: 'Predictive Analytics using Python and Excel', area: 'DATA & ANALYTICS' },
  { name: 'AI in Healthcare', area: 'APPLIED AI' },
  { name: 'English Language for Competitive Exams', area: 'NPTEL' },
  { name: 'NEUROBOTS', area: 'TECHNICAL PROGRAM' }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setBooting(false), 2100);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const ids = ['home', ...navigation.map(item => item.toLowerCase())];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id === 'home' ? 'Home' : visible.target.id[0].toUpperCase() + visible.target.id.slice(1));
    }, { rootMargin: '-22% 0px -60% 0px', threshold: [0, .15, .35, .6] });
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (name: string) => {
    document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="nav-wrap anchor-nav">
        <a className="wordmark" href="#home" onClick={event => { event.preventDefault(); goTo('Home'); }}>MANUJ<span>.</span>U</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {navigation.map(item => (
            <a key={item} className={active === item ? 'active' : ''} href={'#' + item.toLowerCase()} onClick={event => { event.preventDefault(); goTo(item); }}>{item}</a>
          ))}
        </nav>
        <a className="nav-availability" href="mailto:manuj1903u@gmail.com"><span /> OPEN TO OPPORTUNITIES</a>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />\n          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>
              <span className="eyebrow-line" /> COMPUTER SCIENCE & BUSINESS SYSTEMS
            </motion.div>
            <motion.p className="hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>HELLO, I'M MANUJ U.</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .32, ease: [.22, 1, .36, 1] }}>
              I BUILD<br />WITH <em>PURPOSE.</em>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>
              A computer science student, developer and curious problem-solver. I explore ideas across software, business technology and cybersecurity — then work to turn them into useful products.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .82 }}>
              <a className="button button-light" href="#projects" onClick={event => { event.preventDefault(); goTo('Projects'); }}>EXPLORE PROJECTS <ArrowUpRight size={16} /></a>
              <a className="button button-quiet" href="mailto:manuj1903u@gmail.com?subject=Resume%20request"><Mail size={15} /> CONTACT FOR RESUME</a>
            </motion.div>
            <div className="hero-index"><span>01</span> / DEVELOPER PORTFOLIO <span className="index-rule" /></div>
          </div>
          <div className="hero-visual anchor-hero-visual">
            <AnchorParticleScene />
            <div className="scene-vignette" />
            <div className="scene-label scene-label-top"><span className="live-dot" /> DIGITAL ECOSYSTEM <span>01 / 07</span></div>
            <div className="scene-label scene-label-bottom">PARTICLE FIELD <span>REACTIVE ENVIRONMENT</span></div>
            <div className="floating-card floating-card-left"><span className="floating-icon">✳</span><div><strong>Curious by nature</strong><small>Always exploring</small></div></div>
            <div className="floating-card floating-card-right"><span className="floating-icon">⌘</span><div><strong>Building with purpose</strong><small>Code · Systems · Ideas</small></div></div>
          </div>
          <a className="scroll-cue" href="#about" onClick={event => { event.preventDefault(); goTo('About'); }}><span className="scroll-line" /> SCROLL TO EXPLORE <ArrowDown size={13} /></a>
          <div className="hero-side-note">THINK / BUILD / IMPROVE</div>
        </section>

        <section className="intro-strip">
          <span>CURIOUS BY NATURE</span><span className="strip-star">✳</span><span>BUILDING THROUGH PRACTICE</span><span className="strip-star">✳</span><span>ALWAYS LEARNING</span>
        </section>

        <section className="section about-section" id="about">
          <Reveal>
            <div className="section-kicker">01 — ABOUT ME</div>
            <div className="about-layout">
              <div><p className="overline">A STUDENT WITH A BUILDER'S MINDSET</p><h2>CURIOUS<br />BY NATURE.<br /><em>BUILDER BY CHOICE.</em></h2></div>
              <div className="about-copy">
                <p className="lead">I'm Manuj U., a second-year Computer Science and Business Systems student at Karpagam Academy of Higher Education.</p>
                <p>I enjoy learning how software works, understanding real-world problems and building technology that can make everyday processes clearer and more useful. My interests move between programming, business analytics, artificial intelligence and cybersecurity.</p>
                <p>I'm still growing as a developer. I value strong fundamentals, hands-on practice, teamwork and the process of improving an idea through building and feedback.</p>
                <a className="text-link" href="https://github.com/manuj-hash" target="_blank" rel="noreferrer">EXPLORE MY GITHUB <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </Reveal>
          <div className="about-stats">
            <Reveal className="about-stat"><span>01 / EDUCATION</span><strong>2nd Year</strong><small>Computer Science & Business Systems</small></Reveal>
            <Reveal className="about-stat"><span>02 / INSTITUTION</span><strong>Karpagam Academy</strong><small>of Higher Education</small></Reveal>
            <Reveal className="about-stat"><span>03 / ACADEMICS</span><strong>7.78</strong><small>Current CGPA</small></Reveal>
            <Reveal className="about-stat"><span>04 / APPROACH</span><strong>Learn. Build. Improve.</strong><small>Practical, continuous learning</small></Reveal>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <Reveal>
            <div className="section-kicker">02 — SELECTED PROJECTS</div>
            <div className="section-heading"><h2>WORK THAT<br /><em>KEEPS ME BUILDING.</em></h2><p>Projects across business technology, cybersecurity and real-world problem solving. Some are ongoing explorations; each reflects a problem I wanted to understand better.</p></div>
          </Reveal>
          <div className="project-list">
            {projects.map(project => (
              <Reveal key={project.number} className={'project-card project-' + project.tone}>
                <div className="project-topline"><span>{project.number} / FEATURED PROJECT</span><span className="project-status">{project.status}</span></div>
                <div className="project-content">
                  <div className="project-main">
                    <div className="project-type">{project.category}</div>
                    <h3>{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <div className="project-details">
                    <span className="detail-label">WHAT I'M EXPLORING</span>
                    <ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                  </div>
                </div>
                <div className="project-bottom">
                  <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                  {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={16} /></a> : <span className="project-private">PROJECT DETAILS AVAILABLE ON REQUEST</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <Reveal>
            <div className="section-kicker">03 — TECHNICAL SKILLS</div>
            <div className="section-heading"><h2>TOOLS I USE.<br /><em>SKILLS I GROW.</em></h2><p>A practical snapshot of my current toolkit. Skill labels indicate my current exposure, not a claim of mastery.</p></div>
          </Reveal>
          <div className="skill-groups">
            {skillGroups.map(group => {
              const Icon = group.icon;
              return <Reveal className="skill-group" key={group.title}>
                <div className="skill-group-heading"><Icon /><h3>{group.title}</h3></div>
                <div className="skill-items">{group.items.map(item => <div className="skill-item" key={item.name}><span>{item.name}</span><small>{item.level}</small></div>)}</div>
              </Reveal>;
            })}
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <Reveal>
            <div className="section-kicker">04 — MY JOURNEY</div>
            <div className="section-heading"><h2>GROWING<br /><em>THROUGH DOING.</em></h2><p>My journey so far is shaped by academic learning, collaborative projects and opportunities to test ideas beyond the classroom.</p></div>
          </Reveal>
          <div className="timeline">
            <Reveal className="timeline-item"><span className="timeline-dot" /><div className="timeline-meta">CURRENT · UNDERGRADUATE</div><h3>Computer Science & Business Systems</h3><p>Karpagam Academy of Higher Education</p><small>Building foundations in computing, business systems and software development.</small></Reveal>
            <Reveal className="timeline-item"><span className="timeline-dot" /><div className="timeline-meta">COLLEGE PROJECT SELECTION</div><h3>MSME & Smart India Hackathon</h3><p>Selected through college internal selection rounds.</p><small>Collaborative problem-solving and project development experience.</small></Reveal>
            <Reveal className="timeline-item"><span className="timeline-dot" /><div className="timeline-meta">PROJECT MILESTONE</div><h3>Kryptcom</h3><p>Secure communication platform project.</p><small>Progressed to the final round; exploring post-quantum cryptographic readiness.</small></Reveal>
            <Reveal className="timeline-item"><span className="timeline-dot" /><div className="timeline-meta">ONGOING PROJECT WORK</div><h3>BizInsight & ECDAT</h3><p>Business analytics and cryptographic discovery.</p><small>Developing practical understanding of full-stack product building and cybersecurity concepts.</small></Reveal>
          </div>
        </section>

        <section className="section achievements-section" id="achievements">
          <Reveal>
            <div className="section-kicker">05 — ACHIEVEMENTS & LEARNING</div>
            <div className="section-heading"><h2>PROGRESS<br /><em>IN PRACTICE.</em></h2><p>Milestones and learning experiences that have helped me explore new areas and take on bigger challenges.</p></div>
          </Reveal>
          <div className="achievement-grid">
            <Reveal className="achievement-card"><Award /><span>PROJECT SELECTION</span><h3>Smart India Hackathon</h3><p>Selected in the college internal selection round.</p></Reveal>
            <Reveal className="achievement-card"><BriefcaseBusiness /><span>PROJECT SELECTION</span><h3>MSME Project</h3><p>Selected through the college internal round for an ambulance-related project concept.</p></Reveal>
            <Reveal className="achievement-card"><ShieldCheck /><span>FINAL ROUND</span><h3>Kryptcom</h3><p>Advanced to the final round with a secure communication platform project.</p></Reveal>
          </div>
          <div className="cert-heading"><div><span className="overline">CONTINUOUS LEARNING</span><h3>Certifications & programmes</h3></div><BookOpen /></div>
          <div className="cert-list">
            {certifications.map((cert, index) => <div className="cert-row" key={cert.name}><span className="cert-number">{String(index + 1).padStart(2, '0')}</span><strong>{cert.name}</strong><small>{cert.area}</small><ArrowUpRight size={15} /></div>)}
          </div>
        </section>

        <section className="section education-section" id="education">
          <Reveal>
            <div className="section-kicker">06 — EDUCATION</div>
            <div className="education-panel">
              <div className="education-icon"><GraduationCap /></div>
              <div className="education-copy"><span className="overline">UNDERGRADUATE · CURRENT</span><h2>Karpagam Academy<br /><em>of Higher Education.</em></h2><h3>Computer Science and Business Systems</h3><p>Currently pursuing the second year of study, combining computing foundations with business-oriented problem solving.</p></div>
              <div className="education-score"><span>CGPA</span><strong>7.78</strong><small>Current academic record</small></div>
            </div>
          </Reveal>
        </section>

        <section className="contact-section" id="contact">
          <Reveal>
            <div className="section-kicker">07 — GET IN TOUCH</div>
            <h2>LET'S MAKE<br /><em>IDEAS HAPPEN.</em></h2>
            <p>I'm open to learning opportunities, collaborations and conversations around software, technology and interesting problems.</p>
            <a className="button button-light contact-cta" href="mailto:manuj1903u@gmail.com">SAY HELLO <Mail size={16} /></a>
          </Reveal>
          <div className="social-links">
            <a href="https://github.com/manuj-hash" target="_blank" rel="noreferrer"><Code2 /> GITHUB <ArrowUpRight size={13} /></a>
            <a href="https://www.linkedin.com/in/manuj-u" target="_blank" rel="noreferrer"><BriefcaseBusiness /> LINKEDIN <ArrowUpRight size={13} /></a>
            <a href="https://leetcode.com/u/MANUJ_U/" target="_blank" rel="noreferrer"><Code2 /> LEETCODE <ArrowUpRight size={13} /></a>
            <a href="https://www.codechef.com/users/spry_club_63" target="_blank" rel="noreferrer"><ExternalLink /> CODECHEF <ArrowUpRight size={13} /></a>
            <a href="mailto:manuj1903u@gmail.com"><Mail /> EMAIL <ArrowUpRight size={13} /></a>
          </div>
        </section>
      </main>

      <footer><a className="wordmark" href="#home" onClick={event => { event.preventDefault(); goTo('Home'); }}>MANUJ<span>.</span>U</a><span>DESIGNED & BUILT WITH CURIOSITY.</span><span>© {new Date().getFullYear()} MANUJ U.</span></footer>
    </div>
  );
}
