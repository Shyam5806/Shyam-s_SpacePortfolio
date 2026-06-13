'use client'
// components/ui/TechPanel.tsx
// ─────────────────────────────────────────
// Right-side slide-in panel shown when the
// central Solar Hub star is clicked.
// Lists all tech grouped by category with
// animated skill bars.
// ─────────────────────────────────────────

import { useEffect } from 'react'
import { useScene } from '@/components/providers/SceneProvider'
import { TECH } from '@/data/tech-stack'

// Build unique ordered category list
const CATEGORIES = Array.from(new Set(TECH.map((t) => t.cat)))

export default function TechPanel() {
  const { showTechPanel, setShowTechPanel } = useScene()

  // Animate bars after panel opens
  useEffect(() => {
    if (!showTechPanel) return
    const bars = document.querySelectorAll<HTMLElement>('[data-lvl]')
    // Small delay so the slide-in transition starts first
    const timer = setTimeout(() => {
      bars.forEach((el) => {
        el.style.width = el.dataset.lvl + '%'
      })
    }, 120)
    return () => clearTimeout(timer)
  }, [showTechPanel])

  return (
    <aside
      className="fixed top-0 right-0 h-full w-[340px] z-[400] overflow-y-auto
                 border-l border-[rgba(79,195,247,0.2)] bg-[rgba(7,7,20,0.97)]
                 px-6 pt-9 pb-20 transition-[right] duration-[400ms]"
      style={{
        right: showTechPanel ? '0px' : '-365px',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#1a1a30 transparent',
      }}
      aria-label="Tech stack"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-[11px] tracking-[5px] text-[#4FC3F7]">
          // TECH STACK
        </span>
        <button
          onClick={() => setShowTechPanel(false)}
          className="text-[#333] hover:text-white text-[18px] transition-colors font-sans"
          aria-label="Close tech panel"
        >
          ✕
        </button>
      </div>

      {/* Category groups */}
      {CATEGORIES.map((cat) => (
        <div key={cat}>
          <p className="font-mono text-[8px] tracking-[4px] text-[#1e1e30] mt-7 mb-4 pb-2 border-b border-[#0c0c1e]">
            {cat.toUpperCase()}
          </p>

          {TECH.filter((t) => t.cat === cat).map((t) => (
            <div key={t.id} className="mb-5">
              <div className="flex items-center justify-between mb-[7px]">
                <span
                  className="font-mono text-[9px] tracking-[2px]"
                  style={{ color: t.col }}
                >
                  {t.id}
                </span>
                <span className="font-mono text-[12px] text-[#bbb]">{t.name}</span>
              </div>

              {/* Skill bar */}
              <div className="h-[2px] bg-[#0f0f1e] rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm"
                  data-lvl={t.lvl}
                  style={{
                    width: '0%',
                    background: `linear-gradient(90deg, ${t.col}88, ${t.col})`,
                    transition: 'width 1.2s ease 0.1s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </aside>
  )
}
