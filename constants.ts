import { Project, Experience, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  // Full Stack Projects
  {
    id: 'fs-1',
    title: 'Event-Driven Automation Platform',
    description: 'A microservices-based automation platform using a microservices architecture for distributed task execution.',
    techStack: ['Kafka', 'Next.js', 'PostgreSQL', 'Prisma', 'Solana', 'Docker', 'Express'],
    outcomes: [
      'Implemented the Outbox Pattern with PostgreSQL and Kafka to ensure reliable, at-least-once event processing.',
      'Designed microservices (Hooks, Processor, Worker) for clean decoupling and horizontal scalability.'
    ],
    githubUrl: 'https://github.com/ajaygaur01/Zapier',
    category: 'Full Stack'
  },
  {
    id: 'fs-2',
    title: 'Geolocation Attendance Tracking',
    description: 'Automated employee check-in/out system across multiple office locations using geofencing.',
    techStack: ['React Native', 'Node.js', 'Express.js', 'MongoDB'],
    outcomes: [
      'Automated attendance tracking across multiple locations, eliminating manual check-in processes.',
      'Improved reporting accuracy and real-time monitoring of workforce location during shifts.'
    ],
    githubUrl: 'https://github.com/example/geo-attendance',
    category: 'Full Stack'
  },
  // DevOps Projects
  {
    id: 'do-1',
    title: 'Automated VM Health Monitoring',
    description: 'Real-time, zero-intervention infrastructure monitoring system for high-availability cloud environments.',
    techStack: ['Ansible', 'Prometheus', 'Grafana', 'AWS SES'],
    outcomes: [
      'Built an automated monitoring system with zero manual intervention using Ansible and Node Exporter.',
      'Enabled automatic VM discovery and scalable visualization using Prometheus and Grafana.'
    ],
    githubUrl: 'https://github.com/ajaygaur01/vm-monitoring',
    category: 'DevOps'
  },
  {
    id: 'do-2',
    title: 'Scalable App Platform on AWS EKS',
    description: 'Production-grade Kubernetes deployment featuring a secure DevSecOps pipeline and automated scaling.',
    techStack: ['Kubernetes', 'Docker', 'Jenkins', 'ECR', 'CloudWatch', 'SonarQube', 'Trivy'],
    outcomes: [
      'Deployed a full-stack Dockerized application on Amazon EKS with ALB Ingress and HPA.',
      'Implemented Jenkins CI with SonarQube and Trivy scans for high-security production deployments.'
    ],
    githubUrl: 'https://github.com/ajaygaur01/Full-Stack-Blog-app',
    category: 'DevOps'
  },
  {
    id: 'do-3',
    title: 'Resilient Microservices with Istio',
    description: 'Advanced service mesh architecture featuring distributed databases and granular traffic management.',
    techStack: ['Istio', 'Kubernetes', 'NGINX Ingress', 'Canary Deployments'],
    outcomes: [
      'Architected a resilient environment featuring 5 services and 3 distributed databases with deep observability.',
      'Leveraged Canary deployments to allow for data-driven rollouts and automated rollbacks, reducing deployment risk.'
    ],
    githubUrl: 'https://github.com/ajaygaur01/RetailStoreDeployment',
    category: 'DevOps'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    company: 'EazyPregnancy (Health Tech Startup)',
    role: 'Founding Engineer',
    points: [
      'Creating a comprehensive health tech platform focused on pregnancy care and maternal wellness.',
      'Implementing features for tracking health metrics, appointment scheduling, and educational content delivery.'
    ]
  },
  {
    id: 'exp-2',
    company: 'BusinessRoom (US-based Startup)',
    role: 'Full Stack Developer Intern',
    points: [
      'Engineered scalable web applications using React.js, TypeORM, and MySQL.',
      'Developed key frontend and backend features under senior mentorship and contributed to production code.'
    ]
  },
  {
    id: 'exp-3',
    company: 'Svastha (Product of PowerByYoga)',
    role: 'Full Stack Developer Intern',
    points: [
      'Contributed to the development of a yoga EdTech platform providing personalized wellness solutions.',
      'Built interactive features for yoga sessions, progress tracking, and user engagement using modern web technologies.'
    ]
  },
  {
    id: 'exp-4',
    company: 'VALSCO TECHNOLOGY',
    role: 'Backend Developer',
    points: [
      'Built RESTful APIs using Node.js, Express, and MySQL for internal business tools.',
      'Collaborated with DevOps team to containerize backend services using Docker.'
    ]
  },
  {
    id: 'exp-5',
    company: 'Shiva Rudraksh',
    role: 'Full Stack Developer',
    points: [
      'Developing an eCommerce platform with NextJS, Prisma and PostgreSQL.',
      'Optimized database queries, improving API response time'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'Javascript', 'Typescript', 'React.js', 'Next.js', 'React Native', 'Redux', 'Tailwind.css']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'Kafka', 'MongoDB', 'PostgreSQL', 'Prisma', 'TypeORM', 'MySQL', 'Redis', 'Websockets']
  },
  {
    title: 'DevOps',
    skills: ['AWS', 'Docker', 'Jenkins', 'NGINX', 'Kubernetes', 'Terraform', 'Ansible', 'Bash Scripting', 'Linux']
  },
  {
    title: 'Tools',
    skills: ['Git/GitHub', 'VS Code', 'Postman', 'AI Tool']
  }
];