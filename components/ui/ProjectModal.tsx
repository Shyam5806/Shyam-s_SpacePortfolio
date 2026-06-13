'use client'
// components/ui/ProjectModal.tsx
// ─────────────────────────────────────────
// Full-screen modal shown when a project star is clicked.
// Displays: project ID, name, summary, tech pills,
// impact statement, GitHub link, and demo link.
// ─────────────────────────────────────────

import { useScene } from '@/components/providers/SceneProvider'

export default function ProjectModal() {
  const { activeProject, setActiveProject } = useScene()

  if (!activeProject) return null

  const p = activeProject

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.68)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.35s ease',
      }}
      onClick={(e) => e.target === e.currentTarget && setActiveProject(null)}
    >
      <div
        className="relative max-w-[580px] w-[92%] max-h-[88vh] overflow-y-auto p-9 scrollbar-thin"
        style={{
          background: '#0b0b1a',
          border: `1px solid ${p.col}44`,
          boxShadow: `0 0 80px ${p.col}0f`,
          animation: 'popIn 0.3s ease',
        }}
      >
        {/* Close */}
        <button
          onClick={() => setActiveProject(null)}
          className="absolute top-5 right-5 text-[#333] hover:text-white text-[22px] leading-none transition-colors font-sans"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Project ID badge */}
        <p
          className="font-mono text-[10px] tracking-[4px] font-bold mb-[10px]"
          style={{ color: p.col }}
        >
          {p.id}
        </p>

        {/* Project name */}
        <h2 className="font-mono font-bold text-[21px] text-white mb-5 leading-[1.35]">
          {p.name}
        </h2>

        {/* Summary */}
        <p className="font-mono text-[12px] text-[#555] leading-[2.0] mb-6">
          {p.sum}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] tracking-[1px] px-[14px] py-[5px] rounded-sm"
              style={{
                background:   `${p.col}18`,
                color:         p.col,
                border:       `1px solid ${p.col}44`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Impact */}
        <p
          className="font-mono text-[11px] text-[#777] italic leading-[1.9] mb-8 pl-[18px]"
          style={{ borderLeft: `2px solid ${p.col}` }}
        >
          ⟡ {p.imp}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={p.gh || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center font-mono text-[10px] tracking-[3px] py-[13px] border transition-opacity duration-200 hover:opacity-70 no-underline"
            style={{ borderColor: `${p.col}55`, color: p.col }}
          >
            ⌥ GITHUB
          </a>
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center font-mono text-[10px] tracking-[3px] py-[13px] border transition-opacity duration-200 hover:opacity-70 no-underline"
              style={{ borderColor: `${p.col}55`, color: p.col }}
            >
              ↗ LIVE DEMO
            </a>
          )}
        </div>

      </div>
    </div>
  )
}
