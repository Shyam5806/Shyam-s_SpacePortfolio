// data/scene-configs.ts
// ─────────────────────────────────────────
// Camera position and lookAt target for each scene.
// cam:  [x, y, z] — where camera flies to
// look: [x, y, z] — what camera looks at
// These values control the cinematic feel — tune them as needed.
// ─────────────────────────────────────────

import type { SceneID, SceneConfig } from '@/types'

export const SCENE_CONFIGS: Record<SceneID, SceneConfig> = {
  asteroid_belt: {
    label: 'SCENE_01 :: ASTEROID_BELT',
    cam: [0, 5, 26],
    look: [0, 0, 0],
  },
  galaxy_tunnel: {
    // Intermediate transition — not navigated to directly
    label: 'SCENE_02 :: GALAXY_TUNNEL',
    cam: [0, 5, -40],
    look: [0, 0, -100],
  },
  solar_hub: {
    label: 'SCENE_03 :: SOLAR_HUB',
    cam: [0, 22, -68],
    look: [0, 0, -100],
  },
  project_stars: {
    label: 'SCENE_04A :: PROJECT_STARS',
    cam: [-70, 22, -68],
    look: [-70, 0, -100],
  },
  core_lang: {
    label: 'SCENE_04B :: CORE_LANG',
    cam: [70, 22, -68],
    look: [70, 0, -100],
  },
  domains: {
    label: 'SCENE_04C :: DOMAINS',
    cam: [0, 60, -68],
    look: [0, 44, -100],
  },
}

// Navigation scenes shown in the minimap (excludes galaxy_tunnel)
export const NAV_SCENES: SceneID[] = [
  'asteroid_belt',
  'solar_hub',
  'project_stars',
  'core_lang',
  'domains',
]
