'use client'
// components/ui/InfoCard.tsx
// ─────────────────────────────────────────
// Small floating card that appears near the cursor
// when a planet, core-lang planet, or domain is clicked.
// Auto-dismisses for domains after 3.5 seconds.
// ─────────────────────────────────────────

import { useEffect } from 'react'
import { useScene } from '@/components/providers/SceneProvider'

export default function InfoCard() {
  const {
    activeTech,
    activeDomain,
    cardPos,
    setActiveTech,
    setActiveDomain,
  } = useScene()

  const isVisible = !!activeTech || !!activeDomain

  // Auto-dismiss domain card
  useEffect(() => {
    if (!activeDomain) return
    const timer = setTimeout(() => setActiveDomain(null), 3500)
    return () => clearTimeout(timer)
  }, [activeDomain, setActiveDomain])

  if (!isVisible) return null

  // Clamp position so card stays on-screen
  const x = Math.min(cardPos.x + 16, window.innerWidth  - 290)
  const y = Math.min(cardPos.y - 12,  window.innerHeight - 150)

  // Resolve content from whichever is active
  const id    = activeTech?.id    ?? '// DOMAIN'
  const name  = activeTech?.name  ?? activeDomain?.name  ?? ''
  const desc  = activeTech?.desc  ?? activeDomain?.desc  ?? ''
  const color = activeTech?.col   ?? activeDomain?.col   ?? '#8B7FFF'
  const lvl   = (activeTech as { lvl?: number })?.lvl

  return (
    <div
      className="fixed z-[300] min-w-[200px] max-w-[265px] pointer-events-none"
      style={{
        left:       x,
        top:        y,
        background: 'rgba(7,7,20,0.95)',
        border:     '1px solid rgba(255,255,255,0.09)',
        padding:    '16px 20px',
        opacity:     isVisible ? 1 : 0,
        transform:   isVisible ? 'translateY(0)' : 'translateY(-8px)',
        transition:  'opacity 0.2s, transform 0.2s',
      }}
    >
      {/* ID badge */}
      <p className="font-mono text-[9px] tracking-[3px] mb-[7px]" style={{ color }}>
        {id}
      </p>

      {/* Name */}
      <p className="font-mono font-bold text-[13px] text-white mb-[10px]">
        {name}
      </p>

      {/* Description */}
      <p className="font-mono text-[10px] text-[#444] leading-[1.8]">
        {desc}
      </p>

      {/* Skill bar (only for tech planets with a level) */}
      {lvl != null && (
        <div
          className="mt-3 h-px rounded-sm"
          style={{ background: `linear-gradient(90deg, ${color}44, ${color})`, width: `${lvl}%` }}
        />
      )}

      {/* Domain accent bar */}
      {activeDomain && (
        <div className="mt-3 h-px w-full rounded-sm" style={{ background: color }} />
      )}
    </div>
  )
}
