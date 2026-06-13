// types/index.ts — Central TypeScript interfaces

import * as THREE from 'three'

export type SceneID =
  | 'asteroid_belt'
  | 'galaxy_tunnel'
  | 'solar_hub'
  | 'project_stars'
  | 'core_lang'
  | 'domains'

export interface SceneConfig {
  label: string
  cam: [number, number, number]
  look: [number, number, number]
}

export interface Hackathon {
  name: string
  result: string
  org: string
  year: string
  desc: string
}

export interface Academic {
  institution: string
  degree: string
  year: string
  grade: string
  icon: string
}
export interface Internship {
  company: string
  role: string
  startDate: string
  endDate: string
  desc: string
  certificateLink: string  // ← Your certificate URL goes here
}

export interface Profile {
  name: string
  tagline: string
  degree: string
  university: string
  email: string
  github: string
  linkedin: string
  leetcode: string
  resume: string
  bio: string
  achievements: string[]
  hackathons: Hackathon[]
  academics: Academic[]
  internships: Internship[]
}

export interface Tech {
  id: string
  name: string
  cat: string
  lvl: number
  col: string
  desc: string
}

export interface Project {
  id: string
  name: string
  col: string
  hex: number
  sum: string
  tech: string[]
  imp: string
  gh: string
  demo: string
}

export interface CorePlanet {
  id: string
  name: string
  col: string
  hex: number
  desc: string
  link: string | null
}

export interface Domain {
  name: string
  col: string
  hex: number
  p: [number, number, number]
  desc: string
}

export type ClickableType =
  | 'link'
  | 'tech_star'
  | 'planet'
  | 'project'
  | 'core_p'
  | 'domain'
  | 'nav'
  | 'about'

export interface Clickable {
  mesh: THREE.Mesh
  type: ClickableType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export interface CardPos { x: number; y: number }

export interface SceneContextType {
  currentScene: SceneID
  prevScene: SceneID | null
  isTransitioning: boolean
  navigateTo: (scene: SceneID) => void
  goBack: () => void
  setIsTransitioning: (v: boolean) => void
  // About overlay
  showAbout: boolean
  setShowAbout: (v: boolean) => void
  // Modal / panel state
  activeProject: Project | null
  activeTech: Tech | CorePlanet | null
  activeDomain: Domain | null
  showTechPanel: boolean
  cardPos: CardPos
  setActiveProject: (p: Project | null) => void
  setActiveTech: (t: Tech | CorePlanet | null) => void
  setActiveDomain: (d: Domain | null) => void
  setShowTechPanel: (v: boolean) => void
  setCardPos: (pos: CardPos) => void
}
