export type DomainFocus = 'DEVELOPER' | 'AI' | 'CYBERSECURITY' | 'PQC' | 'SYSTEMS';

export interface DomainDetail {
  id: DomainFocus;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  subsystems: string[];
}

export interface Project {
  id: string;
  title: string;
  codename: string;
  category: 'Autonomous Systems / AI' | 'Cybersecurity & PQC' | 'Full-Stack Architecture' | 'Research Prototype';
  tagline: string;
  description: string;
  architectureNotes: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  status: 'ACTIVE_DEPLOYMENT' | 'PRODUCTION' | 'PROTOTYPE_V2' | 'CLASSIFIED_RESEARCH';
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  highlightStats: string;
}

export interface SkillCategory {
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Exploring';
  icon: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Core Subsystem", "Production Grade", "Active Research"
    percentage: number;
    tags: string[];
  }[];
}

export interface TimelineMilestone {
  period: string;
  category: 'EDUCATION' | 'COMPETITION' | 'INITIATIVE' | 'CERTIFICATION' | 'RESEARCH';
  title: string;
  organization: string;
  description: string;
  highlights: string[];
  badge: string;
}
