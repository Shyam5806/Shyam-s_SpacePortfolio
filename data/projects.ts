// data/projects.ts
// ─────────────────────────────────────────
// Each entry becomes a star in the Project Stars system.
// Click a star → full project modal with summary, tech, impact.
// ─────────────────────────────────────────

import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    id: 'A-AI001',
    name: 'Agentic AI Security Copilot(Nebula Stage)',
    col: '#7F77DD',
    hex: 0x7f77dd,
    sum: 'AI-powered real-time threat detection with autonomous multi-agent architecture. Analyzes network behavior patterns, identifies anomalies, and neutralizes attacks before they escalate to full breaches.',
    tech: ['Python', 'LangChain', 'FastAPI', 'React', 'Docker'],
    imp: 'Reduces threat response time by 80% for SMEs without dedicated security teams.',
    gh: 'https://github.com/Shyam5806',
    demo: '',
  },
  {
    id: 'G-DC002',
    name: 'GaonDoc(Nebula Stage)',
    col: '#1D9E75',
    hex: 0x1d9e75,
    sum: "Voice-first AI rural health triage for India. Supports 10+ regional languages. Integrates eSanjeevani infrastructure for last-mile healthcare in villages 50km+ from the nearest hospital.",
    tech: ['Python', 'Whisper AI', 'FastAPI', 'Flutter', 'NLP'],
    imp: 'Brings diagnostic capability to 500M+ rural Indians with limited connectivity.',
    gh: 'https://github.com/Shyam5806',
    demo: '',
  },
  {
    id: 'H-RD003',
    name: 'HackRadar',
    col: '#378ADD',
    hex: 0x378add,
    sum: 'Zero-cost hackathon discovery platform aggregating events from 15+ sources. Smart domain filtering, deadline alerts, and team formation — entirely on free-tier infrastructure with GitHub Actions automation.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'GitHub Actions'],
    imp: 'Helps 1000+ students discover and compete in hackathons they would otherwise miss.',
    gh: 'https://github.com/Shyam5806',
    demo: '',
  },
  {
    id: 'C-CH004',
    name: 'ConsentChain',
    col: '#E8A838',
    hex: 0xe8a838,
    sum: "Blockchain data consent management aligned with India's DPDP Act 2023. ARC-19 NFTs on Algorand give citizens cryptographic, verifiable proof of who has their data and under what terms.",
    tech: ['Algorand', 'IPFS', 'React', 'AES-256', 'Vibekit AI'],
    imp: 'Makes data consent verifiable, revocable, and legally compliant for every Indian citizen.',
    gh: 'https://github.com/Shyam5806',
    demo: '',
  },
  {
    id: 'R-AI005',
    name: 'RestorAI',
    col: '#E85D96',
    hex: 0xe85d96,
    sum: 'Multi-stage AI restoration pipeline — LaMa inpainting, Real-ESRGAN super-resolution, SAM segmentation, DDColor colorization — for complete damaged image restoration and automatic colorization.',
    tech: ['Python', 'PyTorch', 'LaMa', 'Real-ESRGAN', 'SAM', 'DDColor'],
    imp: 'Restores damaged archival photographs and historical documents with zero human input.',
    gh: 'https://github.com/Shyam5806',
    demo: '',
  },
  {
    id: 'C-SC006',
    name: 'CollegeScope',
    col: '#34acf2',
    hex: 0x0000FF,
    sum: 'A production-grade college discovery and decision-making web platform inspired by Careers360 and CollegeDunia. It allows students to search, explore, compare, and save colleges — helping them make informed admission decisions through a clean, data-driven interface.',
    tech: ['TypeScript','Next.js 14','Tailwind CSS', 'React', 'Node.js','Express.js-Rest API', 'PostgreSQL','Prisma ORM'],
    imp: 'Enables rapid development of high-performance web applications with consistent user experiences.',
    gh: 'https://github.com/Shyam5806',
    demo: '',
  },
]
