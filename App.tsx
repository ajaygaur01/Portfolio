import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink, Code2, Server, Terminal, ChevronRight, Twitter, MessageSquare, ArrowRight, Activity, Clock, MapPin, Settings, Layout, Download, Play, Pause, Volume2, VolumeX, Phone, MessageCircle, Copy, Check, GitCommit, GitBranch, GitPullRequest, Hash, Cpu, Layers, ShieldCheck, Box, Zap, Braces, Music } from 'lucide-react';
import { PROJECTS, EXPERIENCE, SKILL_CATEGORIES } from './constants';
import { Project, Experience } from './types';

// --- Background Music Component ---
const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Google Drive Music Link ID: 1tPQaAAlCTbpwZVRM4tvT2k_VUmIVGnQO
  // Direct direct download link for HTML5 Audio element
  const audioSrc = "https://docs.google.com/uc?export=download&id=1tPQaAAlCTbpwZVRM4tvT2k_VUmIVGnQO";

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Playback blocked or link inaccessible. Ensure the Drive file is shared as 'Anyone with the link can view'.", err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      {/* Native HTML5 Audio Element for high-quality background playback */}
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        preload="auto"
      />

      {/* Controller UI */}
      <div className="flex items-center gap-3 bg-[#0B0F14]/90 backdrop-blur-xl border border-[#1F2937] p-2 pr-4 rounded-full shadow-2xl transition-all hover:border-emerald-500/40">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-[#1F2937] text-gray-400 hover:text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>
        
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500">Neural Soundscape</span>
            {isPlaying && (
              <div className="flex items-end gap-[2px] h-2 mb-[1px]">
                <div className="w-[2px] bg-emerald-500 animate-[music-bar_0.8s_ease-in-out_infinite]"></div>
                <div className="w-[2px] bg-emerald-500 animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]"></div>
                <div className="w-[2px] bg-emerald-500 animate-[music-bar_0.5s_ease-in-out_infinite_0.2s]"></div>
              </div>
            )}
          </div>
          <span className="text-[9px] font-medium text-gray-500 truncate max-w-[100px]">Interactive Focus</span>
        </div>
      </div>

      {/* Visualizer Animation */}
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 2px; }
          50% { height: 8px; }
        }
      `}</style>
    </div>
  );
};

// Simple Animation Wrapper
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

// Refined Typewriter Effect Component
const Typewriter: React.FC = () => {
  const prefix = "NIGHTOWL / ";
  const phrases = useMemo(() => ["DEVELOPER", "DEVOPS"], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <div className="flex items-center gap-2 text-emerald-500 font-mono font-bold tracking-[0.2em] text-[10px] md:text-[13px] uppercase">
      <span className="text-gray-600 opacity-60 select-none">{prefix}</span>
      <span className="relative flex items-center">
        {phrases[index].substring(0, subIndex)}
        <span className={`${blink ? 'opacity-100' : 'opacity-0'} inline-block w-[2px] h-[1em] bg-emerald-500 ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]`}></span>
      </span>
    </div>
  );
};

// --- Dashboard Sub-Components ---

const ActivityGrid = () => (
  <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 mb-4">
    <div className="flex flex-wrap gap-[3px] mb-5 opacity-80 justify-center">
      {Array.from({ length: 98 }).map((_, i) => {
        const levels = [0, 0, 1, 0, 2, 0, 0, 3, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 3, 0];
        const level = levels[i % levels.length];
        const colors = ['bg-[#1F2937]', 'bg-emerald-900/40', 'bg-emerald-700/60', 'bg-emerald-500'];
        return <div key={i} className={`w-[9px] h-[9px] rounded-[1px] shrink-0 ${colors[level]}`}></div>;
      })}
    </div>
    <div className="grid grid-cols-4 gap-2 text-center border-t border-[#1F2937] pt-4">
      <div>
        <p className="text-[13px] font-bold text-white leading-none">36</p>
        <p className="text-[7px] uppercase tracking-wider text-gray-500 mt-1">Repos</p>
      </div>
      <div>
        <p className="text-[13px] font-bold text-white leading-none">884</p>
        <p className="text-[7px] uppercase tracking-wider text-gray-500 mt-1">Contribs</p>
      </div>
      <div>
        <p className="text-[13px] font-bold text-white leading-none">29</p>
        <p className="text-[7px] uppercase tracking-wider text-gray-500 mt-1">Followers</p>
      </div>
      <div>
        <p className="text-[13px] font-bold text-white leading-none">45</p>
        <p className="text-[7px] uppercase tracking-wider text-gray-500 mt-1">Following</p>
      </div>
    </div>
  </div>
);

const PinnedCard = ({ title, desc, icon: Icon, href }: any) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block p-2.5 bg-[#0B0F14] border border-[#1F2937] rounded-lg mb-2 last:mb-0 hover:border-emerald-500/40 hover:bg-[#111827] hover:scale-[1.02] transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-emerald-500/10"
  >
    <div className="flex items-center gap-2 mb-0.5">
      <Icon className="w-3 h-3 text-gray-500 group-hover:text-emerald-500 transition-colors" />
      <span className="text-[11px] font-semibold text-gray-200 group-hover:text-white transition-colors">{title}</span>
    </div>
    <p className="text-[9px] text-gray-500 line-clamp-1 group-hover:text-gray-400 transition-colors">{desc}</p>
  </a>
);

const SocialPill = ({ icon: Icon, label, href }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#111827] border border-[#1F2937] px-5 py-3.5 rounded-xl hover:bg-[#1F2937] transition-all group mb-3 last:mb-0">
    <div className="flex items-center gap-4">
      <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      <span className="text-[14px] font-medium text-gray-200 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
  </a>
);

const MediaItem = ({ title, subtitle, status, img, href }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-4 last:mb-0 group hover:bg-[#1F2937]/50 p-1.5 rounded-lg transition-colors">
    <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#1F2937] bg-[#0B0F14] relative shrink-0">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <Play className="w-4 h-4 text-white fill-white" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h4 className="text-[12px] font-semibold text-gray-100 truncate group-hover:text-emerald-400 transition-colors">{title}</h4>
        <span className="text-[8px] font-bold uppercase tracking-tighter text-emerald-500 whitespace-nowrap ml-2">{status}</span>
      </div>
      <p className="text-[10px] text-gray-500 truncate">{subtitle}</p>
    </div>
  </a>
);

const TerminalMonitor = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const pods = [
    { name: 'synapse-mesh-v2', ready: '1/1', status: 'Running', restarts: '0', age: '14d' },
    { name: 'nebula-proxy-7f', ready: '2/2', status: 'Running', restarts: '1', age: '3h' },
    { name: 'hyperion-db-0', ready: '1/1', status: 'Running', restarts: '0', age: '45d' },
    { name: 'nexus-ingress', ready: '1/1', status: 'Running', restarts: '0', age: '8d' },
    { name: 'quantum-worker-8', ready: '1/1', status: 'Running', restarts: '0', age: '12m' },
    { name: 'sentinel-core', ready: '0/1', status: 'Starting', restarts: '0', age: '2s' },
  ];

  return (
    <div className="bg-[#0B0F14] border border-[#1F2937] rounded-xl overflow-hidden font-mono shadow-2xl shadow-emerald-500/5 group hover:border-emerald-500/20 transition-all">
      <div className="bg-[#1F2937]/50 px-4 py-2 border-b border-[#1F2937] flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/60"></div>
        </div>
        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-2.5 h-2.5 animate-pulse text-emerald-500" />
          K8S PROD_CLUSTER
        </div>
      </div>
      
      <div className="p-4 text-[9px] leading-relaxed">
        <div className="flex gap-2 mb-3">
          <span className="text-emerald-500">$</span>
          <span className="text-gray-300">kubectl get pods -n infrastructure</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-gray-500 font-bold mb-2 border-b border-[#1F2937] pb-1 uppercase tracking-tighter">
          <span className="col-span-2">Name</span>
          <span>Ready</span>
          <span>Status</span>
          <span className="text-right">Age</span>
        </div>

        <div className="space-y-1.5">
          {pods.map((pod, i) => (
            <div key={pod.name} className="grid grid-cols-5 gap-2 group/row">
              <span className="col-span-2 text-gray-400 group-hover/row:text-white transition-colors truncate">{pod.name}</span>
              <span className="text-gray-500">{pod.ready}</span>
              <span className={pod.status === 'Running' ? 'text-emerald-500/80' : 'text-yellow-500/80 animate-pulse'}>
                {pod.status === 'Starting' ? `Starting${dots}` : pod.status}
              </span>
              <span className="text-right text-gray-600 font-medium">{pod.age}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-[#1F2937]/50 flex justify-between items-center text-gray-600 font-bold italic">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            SYSTEM STABLE
          </div>
          <span className="text-[8px] opacity-40 uppercase">Cluster: AWS-EKS-01</span>
        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; centered?: boolean }> = ({ title, centered }) => (
  <h2 className={`text-[28px] font-bold mb-10 flex items-center gap-3 text-white tracking-tight ${centered ? 'justify-center' : ''}`}>
    {!centered && <span className="w-4 h-[1px] bg-emerald-500/50 block"></span>}
    {title}
    {centered && <span className="w-4 h-[1px] bg-emerald-500/50 block"></span>}
  </h2>
);

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1F2937] bg-black/90 backdrop-blur-sm">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 font-semibold text-[15px] tracking-tight text-white cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>ajay.gaur</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[12px] font-medium text-gray-400">
          <button onClick={() => scrollToSection('dashboard')} className="hover:text-white transition-colors cursor-pointer">Dashboard</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors cursor-pointer">Projects</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors cursor-pointer">Skills</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-white transition-colors cursor-pointer">Experience</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
        </div>
      </div>
    </nav>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-[12px] p-8 transition-all duration-300 hover:border-emerald-500/40 flex flex-col h-full group hover:shadow-xl hover:shadow-emerald-500/5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[20px] font-bold text-white tracking-tight group-hover:text-emerald-500 transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-4">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors" title="GitHub Repository">
            <Github className="w-4 h-4" />
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-500 transition-colors" title="Live Demo">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-6 font-normal">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-8 text-[11px] font-mono font-medium text-[#6B7280]">
        {project.techStack.map((tech, i) => (
          <React.Fragment key={tech}>
            <span className="text-emerald-500/80 tracking-tight">{tech}</span>
            {i < project.techStack.length - 1 && <span className="text-gray-800 opacity-50">•</span>}
          </React.Fragment>
        ))}
      </div>

      <ul className="space-y-4 mt-auto">
        {project.outcomes.map((outcome, i) => (
          <li key={i} className="flex gap-4 items-start text-[14px] text-gray-400 font-normal leading-relaxed group/item">
            <div className="w-1 h-1 rounded-full bg-emerald-500/40 mt-2.5 shrink-0 group-hover/item:bg-emerald-500 transition-colors"></div>
            {outcome}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ExperienceItem: React.FC<{ exp: Experience, index: number }> = ({ exp, index }) => {
  const hash = useMemo(() => Math.random().toString(16).substring(2, 9), []);
  
  return (
    <div className="relative pl-12 pb-16 last:pb-0 group">
      <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent group-last:bg-none"></div>
      
      <div className="absolute left-0 top-0 z-10 w-[48px] h-[48px] flex items-center justify-center">
        <div className="relative">
          <GitCommit className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#0B0F14] rounded border border-[#1F2937] text-emerald-500">
              <Hash className="w-3 h-3" />
              {hash}
            </span>
            <span className="flex items-center gap-1.5 text-blue-400/80">
              <GitBranch className="w-3 h-3" />
              main / production
            </span>
            <span className="hidden md:inline text-gray-700">•</span>
            <span className="text-gray-500">deployed by nightowl</span>
          </div>

          <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden transition-all group-hover:border-emerald-500/20 group-hover:shadow-2xl group-hover:shadow-emerald-500/5">
            <div className="bg-[#1F2937]/30 px-6 py-3 border-b border-[#1F2937] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/10"></div>
              </div>
              <span className="font-mono text-[10px] text-gray-500">experience.log</span>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-emerald-500 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-emerald-500/80 font-mono text-sm">
                    <span className="opacity-50">@</span>
                    {exp.company}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-gray-500 bg-[#0B0F14] px-3 py-1 rounded border border-[#1F2937]">
                  STATUS: COMPLETED
                </div>
              </div>

              <div className="space-y-4">
                {exp.points.map((point, i) => (
                  <div key={i} className="flex gap-4 group/item">
                    <div className="mt-1.5 shrink-0">
                      <GitPullRequest className="w-3.5 h-3.5 text-gray-700 group-hover/item:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-[15px] text-gray-400 font-normal leading-relaxed group-hover/item:text-gray-300 transition-colors">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillIcon = ({ title }: { title: string }) => {
  const iconProps = { className: "w-5 h-5 text-emerald-500/60" };
  switch (title) {
    case 'Frontend': return <Layout {...iconProps} />;
    case 'Backend': return <Server {...iconProps} />;
    case 'DevOps': return <Terminal {...iconProps} />;
    case 'Tools': return <Settings {...iconProps} />;
    default: return <Code2 {...iconProps} />;
  }
};

const useISTClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return formatter.format(time);
};

const ContactNode: React.FC<{ icon: any, label: string, value: string, href: string, colorClass: string }> = ({ icon: Icon, label, value, href, colorClass }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative flex flex-col items-center justify-center p-8 bg-[#111827] border border-[#1F2937] rounded-2xl transition-all duration-300 hover:border-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
    >
      <div className={`p-4 rounded-xl mb-4 bg-black/40 border border-[#1F2937] group-hover:border-emerald-500/30 transition-all ${colorClass}`}>
        <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1 select-none">{label}</p>
      <p className="text-[15px] font-semibold text-white tracking-tight">{value}</p>
      
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 text-gray-600 hover:text-white hover:bg-black/40 transition-all"
        title="Copy to clipboard"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      <ArrowRight className="w-4 h-4 text-gray-700 absolute bottom-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all" />
    </a>
  );
};

export default function App() {
  const fullStackProjects = PROJECTS.filter(p => p.category === 'Full Stack');
  const devOpsProjects = PROJECTS.filter(p => p.category === 'DevOps');
  const istTime = useISTClock();
  const profileImg = "https://res.cloudinary.com/djfgukmxo/image/upload/v1771107157/WhatsApp_Image_2026-02-15_at_3.39.58_AM_qgm4ka.jpg";
  const resumeLink = "https://drive.google.com/file/d/1HYO5__hKuSfuzNxQ1YqyLtMnmPkNFDO2/view?usp=sharing";

  return (
    <div className="min-h-screen bg-black text-[#E5E7EB] pb-24 selection:bg-emerald-500/30">
      <Navbar />
      <BackgroundMusic />

      <main className="mx-auto max-w-[1200px] px-6">
        <section className="py-16 md:py-24">
          <FadeInSection>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="relative mb-12 group">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#1F2937] bg-[#111827] shadow-2xl shadow-emerald-500/10 transition-transform duration-500 group-hover:scale-105">
                  <img src={profileImg} alt="Ajay Gaur" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                </div>
              </div>
              
              <div className="mb-10">
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight flex items-center justify-center leading-tight">
                  <span className="text-emerald-500 font-mono text-[0.6em] mr-[0.4em] opacity-70">&lt;</span>
                  <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">Ajay Gaur</span>
                  <span className="text-emerald-500 font-mono text-[0.6em] ml-[0.4em] opacity-70">/&gt;</span>
                </h1>
              </div>
              
              <div className="mb-14 flex justify-center w-full">
                <Typewriter />
              </div>
              
              <p className="max-w-xl text-gray-400 text-base md:text-lg mb-12 leading-relaxed font-light">
                I build scalable applications and deploy them with <span className="text-white font-medium">production-grade</span> cloud infrastructure.
              </p>
              
              <div className="flex items-center gap-6 text-[11px] text-gray-500 font-mono mb-10">
                <span className="flex items-center gap-2 bg-[#0B0F14] px-3 py-1 rounded-full border border-[#1F2937]"><Clock className="w-3 h-3 text-emerald-500" /> {istTime} · IST</span>
                <span className="flex items-center gap-2 bg-[#0B0F14] px-3 py-1 rounded-full border border-[#1F2937]"><MapPin className="w-3 h-3 text-emerald-500" /> India</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#111827] border border-[#1F2937] px-4 py-1.5 rounded-full text-[11px] text-gray-400 font-bold uppercase tracking-widest cursor-default hover:bg-[#1F2937]/80 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                All Systems Operational
              </div>
            </div>

            <div id="dashboard" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3">
                <ActivityGrid />
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 mb-6">
                  <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4">Pinned</h3>
                  <PinnedCard title="EazyPregnancy" desc="Founding engineering health-tech platform" icon={Code2} href="https://www.linkedin.com/company/eazypregnancy/posts/?feedView=all" />
                  <PinnedCard title="EKS Platform" desc="Production Kubernetes infrastructure" icon={Terminal} href="https://github.com/ajaygaur01/RetailStoreDeployment" />
                </div>
                {/* Image Poster Section replaced Languages section */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden group">
                  <img 
                    src="https://i.pinimg.com/736x/67/44/db/6744db8b8b7c2112a22499843bda1604.jpg" 
                    alt="Engineering Dashboard Visual" 
                    className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col">
                <SocialPill icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/ajay-gaur-87362b279/" />
                <SocialPill icon={Github} label="GitHub" href="https://github.com/ajaygaur01" />
                <SocialPill icon={Mail} label="Email" href="mailto:gaurajay787@gmail.com" />
                <SocialPill icon={Twitter} label="X" href="https://x.com/ajay_gaur01" />
                <SocialPill icon={MessageSquare} label="Discord" href="#" />
              </div>

              <div className="md:col-span-3 space-y-6">
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <img src={profileImg} className="w-5 h-5 rounded-md object-cover" alt="av" />
                      <span className="text-[12px] font-bold text-gray-200">Ajay</span>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Rotation</span>
                  </div>
                  <MediaItem title="Express Ways" subtitle="Dhanji" status="Vibing" img="https://img.youtube.com/vi/xt2DmQgCJC0/mqdefault.jpg" href="https://www.youtube.com/watch?v=xt2DmQgCJC0" />
                  <MediaItem title="AWAAZ KAM" subtitle="OG Lucifer & Encore" status="Repeat" img="https://img.youtube.com/vi/71lxVyNcLFE/mqdefault.jpg" href="https://www.youtube.com/watch?v=71lxVyNcLFE" />
                  <MediaItem title="Rent is Due" subtitle="Siege" status="Current" img="https://img.youtube.com/vi/7lUuiv7txQs/mqdefault.jpg" href="https://www.youtube.com/watch?v=7lUuiv7txQs" />
                  <div className="mt-4 pt-4 border-t border-[#1F2937] text-center">
                    <span className="text-[10px] text-gray-600 font-medium">Top picks for the week</span>
                  </div>
                </div>
                <TerminalMonitor />
              </div>
            </div>
          </FadeInSection>
        </section>

        <section id="about" className="py-24 border-t border-[#1F2937]">
          <FadeInSection>
            <SectionHeader title="About" centered />
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-10 leading-relaxed text-gray-400 font-normal max-w-3xl mx-auto text-left md:text-center text-base">
              <p className="mb-6">
                Specialized in bridging clean application code with robust cloud operations. My focus is on <span className="text-white font-medium">backend systems</span> and <span className="text-white font-medium">cloud architecture</span> that scale efficiently.
              </p>
              <p className="mb-10">
                From <span className="text-white font-medium">Next.js</span> applications to <span className="text-white font-medium">Kubernetes</span> orchestration, I prioritize minimal, high-signal engineering that delivers real business value.
              </p>
              <div className="flex justify-center">
                <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-lg transition-all text-sm font-bold shadow-lg shadow-emerald-500/10">
                  <FileText className="w-4 h-4" /> View My Resume
                </a>
              </div>
            </div>
          </FadeInSection>
        </section>

        <section id="projects" className="py-24">
          <FadeInSection>
            <SectionHeader title="Projects" />
            <div className="mb-20">
              <h3 className="text-[14px] uppercase font-bold text-emerald-500 tracking-widest mb-10 flex items-center gap-4">
                DevOps & Infrastructure
                <span className="h-[1px] flex-1 bg-emerald-500/20"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {devOpsProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[14px] uppercase font-bold text-emerald-500 tracking-widest mb-10 flex items-center gap-4">
                Full Stack Development
                <span className="h-[1px] flex-1 bg-emerald-500/20"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fullStackProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        <section id="skills" className="py-24">
          <FadeInSection>
            <SectionHeader title="Stack" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SKILL_CATEGORIES.map(category => (
                <div key={category.title} className="bg-[#111827] border border-[#1F2937] rounded-xl p-10 group hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-8">
                    <SkillIcon title={category.title} />
                    <h3 className="text-[18px] font-bold tracking-tight text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-[#0B0F14] border border-[#1F2937] rounded-md text-[13px] font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </section>

        <section id="experience" className="py-24 border-t border-[#1F2937]">
          <FadeInSection>
            <SectionHeader title="Experience" centered />
            <div className="max-w-4xl mx-auto text-left relative">
              {EXPERIENCE.map((exp, idx) => (
                <ExperienceItem key={exp.id} exp={exp} index={idx} />
              ))}
            </div>
          </FadeInSection>
        </section>

        <section id="contact" className="py-24 border-t border-[#1F2937]">
          <FadeInSection>
            <SectionHeader title="Contact" centered />
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[#9CA3AF] mb-16 max-w-lg mx-auto text-base leading-relaxed">
                Currently looking for high-impact opportunities in <span className="text-white font-medium">Backend Engineering</span> and <span className="text-white font-medium">Cloud Infrastructure</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <ContactNode icon={Mail} label="Direct Email" value="gaurajay787@gmail.com" href="mailto:gaurajay787@gmail.com" colorClass="text-emerald-500" />
                <ContactNode icon={MessageCircle} label="WhatsApp" value="+91 9528879392" href="https://wa.me/919528879392" colorClass="text-emerald-500" />
                <ContactNode icon={Phone} label="Mobile" value="+91 9528879392" href="tel:+919528879392" colorClass="text-emerald-500" />
              </div>
              <div className="flex items-center justify-center gap-8 pt-8">
                <a href="https://github.com/ajaygaur01" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center group-hover:border-white group-hover:bg-gray-800 transition-all">
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-300">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/ajay-gaur-87362b279/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center group-hover:border-[#0077B5] group-hover:bg-[#0077B5]/10 transition-all">
                    <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#0077B5]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-300">LinkedIn</span>
                </a>
                <a href="https://x.com/ajay_gaur01" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-500/10 transition-all">
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-sky-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-300">Twitter</span>
                </a>
              </div>
            </div>
          </FadeInSection>
        </section>

        <footer className="pt-20 pb-12 mt-12 text-center">
          <p className="text-[11px] text-gray-600 mb-6 font-mono">© {new Date().getFullYear()} · Ajay Gaur · build:b6fb1ad</p>
          <div className="flex justify-center gap-6 font-mono text-[9px] uppercase tracking-widest text-gray-700">
            <span>200 OK</span>
            <span>Region: global</span>
            <span>Latency: 3.97ms</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
