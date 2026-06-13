'use client'
// components/ui/EnterButton.tsx
// ─────────────────────────────────────────
// Floating "Enter the Universe" button.
// Visible only on the asteroid belt scene.
// Triggers the galaxy tunnel transition.
// ─────────────────────────────────────────

import { useScene } from '@/components/providers/SceneProvider'

export default function EnterButton() {
  const { currentScene, navigateTo, isTransitioning } = useScene()

  if (currentScene !== 'asteroid_belt') return null

  return (
    <div className="fixed bottom-9 left-1/2 z-[200] -translate-x-1/2">
      <button
        onClick={() => !isTransitioning && navigateTo('solar_hub')}
        disabled={isTransitioning}
        className="
          font-mono text-[11px] tracking-[5px] text-[#8B7FFF]
          border border-[rgba(139,127,255,0.45)] bg-transparent
          px-10 py-[14px] cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-[rgba(139,127,255,0.1)]
          hover:border-[#8B7FFF]
          hover:shadow-[0_0_40px_rgba(139,127,255,0.18)]
          transition-all duration-300
        "
        style={{ animation: 'floatY 2.4s ease-in-out infinite' }}
      >
        ▼ ENTER THE UNIVERSE
      </button>
    </div>
  )
}
