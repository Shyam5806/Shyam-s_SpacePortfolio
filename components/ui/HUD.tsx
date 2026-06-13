'use client'
// components/ui/HUD.tsx
// ─────────────────────────────────────────
// Always-visible heads-up display.
// Contains: scene ID label, navigation minimap,
// and the back button.
// ─────────────────────────────────────────

import { useScene } from '@/components/providers/SceneProvider'
import { SCENE_CONFIGS, NAV_SCENES } from '@/data/scene-configs'
import type { SceneID } from '@/types'

// Human-readable short labels for the minimap
const SCENE_SHORT: Record<string, string> = {
  asteroid_belt: 'ASTEROID BELT',
  solar_hub:     'SOLAR HUB',
  project_stars: 'PROJECTS',
  core_lang:     'CORE LANG',
  domains:       'DOMAINS',
}

export default function HUD() {
  const { currentScene, navigateTo, goBack } = useScene()
  const cfg = SCENE_CONFIGS[currentScene]

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">

      {/* ── Scene ID — top left ───────────────── */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <span className="w-[6px] h-[6px] rounded-full bg-[#8B7FFF] animate-pulse" />
        <span className="font-mono text-[10px] tracking-[3px] text-[#8B7FFF]">
          {cfg?.label ?? 'SCENE_01 :: ASTEROID_BELT'}
        </span>
      </div>

      {/* ── Minimap — bottom left ─────────────── */}
      <nav
        className="absolute bottom-7 left-6 bg-[rgba(8,8,20,0.9)] border border-[rgba(139,127,255,0.15)] p-4 pointer-events-auto min-w-[148px]"
        aria-label="Scene navigation"
      >
        <p className="font-mono text-[8px] tracking-[4px] text-[#1e1e30] mb-3">
          NAVIGATION
        </p>
        {NAV_SCENES.map((sceneId) => (
          <button
            key={sceneId}
            onClick={() => navigateTo(sceneId as SceneID)}
            className="flex items-center gap-3 mb-[9px] w-full group"
          >
            <span
              className="w-[7px] h-[7px] rounded-full border flex-shrink-0 transition-all duration-300"
              style={{
                background:   currentScene === sceneId ? '#8B7FFF' : '#1a1a28',
                borderColor:  currentScene === sceneId ? '#8B7FFF' : '#252535',
                boxShadow:    currentScene === sceneId ? '0 0 12px rgba(139,127,255,0.6)' : 'none',
              }}
            />
            <span
              className="font-mono text-[9px] tracking-[1px] transition-colors duration-200"
              style={{ color: currentScene === sceneId ? '#8B7FFF' : '#2a2a40' }}
            >
              {SCENE_SHORT[sceneId]}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Back button — bottom right ────────── */}
      {currentScene !== 'asteroid_belt' && (
        <button
          onClick={goBack}
          className="absolute bottom-7 right-6 pointer-events-auto font-mono text-[10px] tracking-[3px] text-[#8B7FFF] px-6 py-[11px] border border-[rgba(139,127,255,0.28)] bg-[rgba(8,8,20,0.75)] transition-all duration-300 hover:bg-[rgba(139,127,255,0.14)] hover:border-[#8B7FFF] hover:shadow-[0_0_28px_rgba(139,127,255,0.14)]"
        >
          ← BACK
        </button>
      )}

    </div>
  )
}
