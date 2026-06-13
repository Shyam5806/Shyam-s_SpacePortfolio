'use client'
// components/ui/LoadingScreen.tsx
// ─────────────────────────────────────────
// Full-screen loading overlay shown on first visit.
// Simulates build progress, then fades out.
// ─────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress]   = useState(0)
  const [visible,  setVisible]    = useState(true)
  const [fading,   setFading]     = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current!)
          setTimeout(() => setFading(true), 300)
          setTimeout(() => setVisible(false), 1200)
          return 100
        }
        return p + 2
      })
    }, 36)
    return () => clearInterval(intervalRef.current!)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f]"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.9s ease' }}
    >
      <p className="font-mono text-[10px] tracking-[8px] text-[#8B7FFF] mb-9 animate-pulse">
        ✦ SPACE PORTFOLIO ✦
      </p>
      <h1 className="font-mono font-bold text-2xl tracking-[5px] text-white mb-2">
        SHYAM SUNDER PANDEY
      </h1>
      <p className="font-mono text-[9px] tracking-[5px] text-[#333] mb-12">
        INITIALIZING UNIVERSE
      </p>

      {/* Progress bar */}
      <div className="w-[220px] h-px bg-[#111] mb-4 overflow-hidden">
        <div
          className="h-full transition-[width] duration-[60ms] linear"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8B7FFF, #4FC3F7)',
          }}
        />
      </div>

      <p className="font-mono text-[10px] tracking-[3px] text-[#2a2a40]">
        {progress}%
      </p>
    </div>
  )
}
