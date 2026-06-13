// data/profile.ts
// ─────────────────────────────────────────
// All personal info — edit this file to update your portfolio.
// ─────────────────────────────────────────

import type { Profile } from '@/types'
import { Certificate } from 'crypto'

export const PROFILE: Profile = {
  name: 'SHYAM SUNDER PANDEY',
  tagline: 'Building at the intersection of AI, Security & Code',
  degree: 'B.Tech CSE — Pre-Final Year',
  university: 'University of Engineering & Management, Jaipur',
  email: 'shyamsunderpandey0508@gmail.com',
  github: 'https://github.com/shyam0508060409087',
  linkedin: 'https://linkedin.com/in/shyam-sunder-pandey-605542321',
  leetcode: 'https://leetcode.com/shyamsunderpandey',
  resume: 'https://drive.google.com/file/d/1dpiJgo4O_wVMnyPpJ33VvuKFO6kC9DC-/view?usp=sharing',   // ← Replace with your actual resume Google Drive / PDF link

  bio: `Pre-final-year B.Tech CSE student at UEM Jaipur with a deep passion for building
technology that matters. I work at the intersection of AI/ML, Cybersecurity,
Full Stack Web Development, and Blockchain — crafting solutions that solve real
problems at scale and having interest in cloud computing & devops. Hackathon enthusiast, open-source contributor, and believer
that great software starts with understanding the human behind the screen.`,

  achievements: [
    '🏆 HackUEM 3.0 — 3rd Place',
    '🏆 Won 3 College Tech Events — 1st Place in each',
    '🥈 AceHack 5.0 — 11th Place (vs IIT / IIIT teams)',
    '🌍 Laserhacks — International Finalist',
  ],

  hackathons: [
    {
      name: 'HackUEM 3.0 and Won many College Tech Events',
      result: '3rd Place in HackUEM 3.0 and Won 3 College Tech Events by securing 1st position🏆',
      org: 'UEM Jaipur',
      year: '2024',
      desc: 'Won the university flagship hackathon competing against 100+ teams across all departments.',
    },
    {
      name: 'AceHack 5.0',
      result: '11th Place 🥈',
      org: 'National Level',
      year: '2026',
      desc: 'Ranked 11th nationally competing against elite IIT and IIIT teams — top 5% out of 200+ teams. Also came 1st in our college category.',
    },
    
    {
      name: 'Laserhacks',
      result: 'International Finalist 🌍',
      org: 'International',
      year: '2025',
      desc: 'Selected as an international finalist, competing with teams from across the globe.',
    },

    
      
  ],

  academics: [
    {
      institution: 'University of Engineering & Management, Jaipur',
      degree: 'B.Tech — Computer Science & Engineering',
      year: '2024 – 2028',
      grade: 'Pre-Final Year(Aggregate 8.4 CGPA)',
      icon: '🎓',
    },
    {
      institution: 'D.A.V Public School— Class XII',   // ← Fill in your school
      degree: 'PCM with Computer Science',
      year: '2024',                                  // ← Fill in your year
      grade: '65 %',                                  // ← Fill in your grade
      icon: '🏫',
    },
    {
      institution: 'D.A.V Public School— Class X',    // ← Fill in your school
      degree: 'Secondary Education',
      year: '2022',                                  // ← Fill in your year
      grade: '80 %',                                  // ← Fill in your grade
      icon: '📚',
    },
  ],

  internships: [
    {
      company: 'InAmigos Foundation',
      role: 'Web Developer Intern',
      startDate: 'May 2026',
      endDate: 'May 2026',
      desc: 'Contributed to the development of a web application aimed at connecting volunteers with local NGOs, utilizing React for the frontend and Node.js for the backend. Did 4 tasks and got certificate for the internship completion.',
      certificateLink:'https://drive.google.com/file/d/1vzkXy4ZkkaXv-K-U5H-kfO8vz9lqu--3/view?usp=driversdk',
    },
  ],
}
