
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  outcomes: string[];
  githubUrl: string;
  liveUrl?: string;
  category: 'Full Stack' | 'DevOps';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  points: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}