// data/domains.ts
// ─────────────────────────────────────────
// Each entry becomes a colored particle nebula.
// p: [x, y, z] is the world-space position.
// ─────────────────────────────────────────

import type { Domain } from '@/types'

export const DOMAINS: Domain[] = [
  {
    name: 'AI / ML',
    col: '#9C27B0',
    hex: 0x9c27b0,
    p: [-24, 42, -100],
    desc: 'PyTorch · LangChain · Whisper · distilBERT · LaMa · ESRGAN',
  },
  {
    name: 'Cybersecurity',
    col: '#F44336',
    hex: 0xf44336,
    p: [24, 48, -100],
    desc: 'Threat Detection · Agentic Security · SIEM · Network Analysis',
  },
  {
    name: 'Full Stack Web',
    col: '#2196F3',
    hex: 0x2196f3,
    p: [-20, 36, -114],
    desc: 'React · Next.js · Node.js · REST APIs · PostgreSQL · Prisma',
  },
  {
    name: 'DevOps & Cloud',
    col: '#00BCD4',
    hex: 0x00bcd4,
    p: [20, 52, -114],
    desc: 'Docker · GitHub Actions · Vercel · Render · Supabase · Neon',
  },
  {
    name: 'Blockchain',
    col: '#FF9800',
    hex: 0xff9800,
    p: [0, 34, -100],
    desc: 'Algorand · ARC-19 NFTs · IPFS · Smart Contracts · DPDP Act',
  },
  {
    name: 'DSA / CP',
    col: '#4CAF50',
    hex: 0x4caf50,
    p: [0, 56, -110],
    desc: 'Java · Data Structures · Algorithms · Competitive Programming',
  },
]
