// data/core-lang.ts
// ─────────────────────────────────────────
// Planets orbiting the Java central star.
// Set link: '...' to open an external URL on click.
// ─────────────────────────────────────────

import type { CorePlanet } from '@/types'

export const CORE: CorePlanet[] = [
  {
    id: 'DSA-01',
    name: 'Data Structures & Algorithms',
    col: '#FFD43B',
    hex: 0xffd43b,
    desc: 'Trees, graphs, dynamic programming, sorting. Consistent competitive practice.',
    link: null,
  },
  {
    id: 'LC-02',
    name: 'LeetCode',
    col: '#FFA116',
    hex: 0xffa116,
    desc: 'Active problem solver. Click to view LeetCode profile.',
    link: 'https://leetcode.com/shyamsunderpandey',
  },
  {
    id: 'OOP-03',
    name: 'OOP & Design Patterns',
    col: '#68A063',
    hex: 0x68a063,
    desc: 'SOLID principles, GoF design patterns, clean architecture in Java.',
    link: null,
  },
  {
    id: 'CP-04',
    name: 'Competitive Programming',
    col: '#CE93D8',
    hex: 0xce93d8,
    desc: 'Algorithms, time/space complexity, problem-solving under pressure.',
    link: null,
  },
  {
    id: 'SPR-05',
    name: 'Spring Boot',
    col: '#6DB33F',
    hex: 0x6db33f,
    desc: 'Java backend framework — REST APIs, microservices, dependency injection.',
    link: null,
  },
]
