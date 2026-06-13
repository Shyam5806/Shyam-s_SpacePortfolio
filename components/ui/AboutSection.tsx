'use client'
// components/ui/AboutSection.tsx
// ─────────────────────────────────────────
// Full-screen "About Me" overlay that opens when the
// hero asteroid is clicked. Animates with a cinematic
// zoom-in from the center (as if flying into the asteroid).
//
// Sections: Photo + Name, Bio, Links, Academics, Achievements
// ─────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useScene } from '@/components/providers/SceneProvider'
import { PROFILE } from '@/data/profile'

// ── Small star layer using CSS box-shadow trick ──
function StarCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(1px 1px at 15% 12%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 8%,  rgba(255,255,255,0.4)  0%, transparent 100%),
            radial-gradient(1px 1px at 70% 18%, rgba(255,255,255,0.5)  0%, transparent 100%),
            radial-gradient(1px 1px at 88% 5%,  rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 5%  35%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 28% 42%, rgba(255,255,255,0.5)  0%, transparent 100%),
            radial-gradient(1px 1px at 55% 38%, rgba(255,255,255,0.4)  0%, transparent 100%),
            radial-gradient(1px 1px at 78% 45%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 32%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 65%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 72%, rgba(255,255,255,0.5)  0%, transparent 100%),
            radial-gradient(1px 1px at 62% 58%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 68%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 22% 88%, rgba(255,255,255,0.4)  0%, transparent 100%),
            radial-gradient(1px 1px at 48% 82%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 90%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 78%, rgba(255,255,255,0.5)  0%, transparent 100%),
            radial-gradient(2px 2px at 30% 25%, rgba(139,127,255,0.3)  0%, transparent 100%),
            radial-gradient(2px 2px at 65% 75%, rgba(79,195,247,0.25)  0%, transparent 100%),
            radial-gradient(3px 3px at 8%  80%, rgba(139,127,255,0.2)  0%, transparent 100%)
          `,
        }}
      />
    </div>
  )
}

// ── Section header ────────────────────────────
function SectionHead({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[11px] tracking-[5px] text-[#8B7FFF]">
        // {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[rgba(139,127,255,0.4)] to-transparent" />
    </div>
  )
}

// ── Link badge ────────────────────────────────
interface BadgeProps {
  href: string
  icon: string
  label: string
  color: string
}
function LinkBadge({ href, icon, label, color }: BadgeProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-[10px] border font-mono text-[10px] tracking-[2px] transition-all duration-300 hover:opacity-80 no-underline"
      style={{ borderColor: `${color}55`, color, background: `${color}0e` }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  )
}

// ── Main Component ────────────────────────────
export default function AboutSection() {
  const { showAbout, setShowAbout } = useScene()
  const [active, setActive] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showAbout) { setActive(false); return }
    // Tiny delay so browser paints the initial scaled state first
    const t = setTimeout(() => setActive(true), 40)
    return () => clearTimeout(t)
  }, [showAbout])

  const handleClose = () => {
    setActive(false)
    // Wait for closing animation then unmount
    setTimeout(() => setShowAbout(false), 580)
  }

  // Keyboard: Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    if (showAbout) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAbout])

  if (!showAbout) return null

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-[600] overflow-y-auto"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0f0f2e 0%, #080810 50%, #0a0a0f 100%)',
        opacity:   active ? 1 : 0,
        transform: active ? 'scale(1)' : 'scale(0.05)',
        // Origin = center of screen ≈ where the hero asteroid sits
        transformOrigin: '50% 45%',
        transition: active
          ? 'opacity 0.55s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'opacity 0.4s ease,  transform 0.5s  cubic-bezier(0.4, 0, 1, 1)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#1a1a30 transparent',
      }}
    >
      <StarCanvas />

      {/* Nebula glow top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,127,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Close button ───────────────────── */}
      <button
        onClick={handleClose}
        className="fixed top-6 left-6 z-10 flex items-center gap-3 font-mono text-[10px] tracking-[3px] text-[#8B7FFF] border border-[rgba(139,127,255,0.3)] px-5 py-[10px] bg-[rgba(8,8,20,0.8)] hover:bg-[rgba(139,127,255,0.12)] hover:border-[#8B7FFF] transition-all duration-300"
      >
        ← BACK TO UNIVERSE
      </button>

      {/* ── Content ────────────────────────── */}
      <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-24">

        {/* ── HERO: Photo + Name ───────────── */}
        <div className="flex flex-col items-center text-center mb-20">

          {/* Glowing photo ring */}
          <div
            className="relative mb-7"
            style={{
              width: 160, height: 160,
              borderRadius: '50%',
              padding: 3,
              background: 'linear-gradient(135deg, #8B7FFF, #4FC3F7, #8B7FFF)',
              boxShadow: '0 0 40px rgba(139,127,255,0.35), 0 0 80px rgba(139,127,255,0.12)',
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f]">
              <Image
                src="/shyam.jpg"
                alt="Shyam Sunder Pandey"
                width={154}
                height={154}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>
            {/* Orbital ring decoration */}
            <div
              className="absolute inset-[-12px] rounded-full border border-[rgba(139,127,255,0.2)]"
              style={{ animation: 'spin 12s linear infinite' }}
            />
            <div
              className="absolute inset-[-24px] rounded-full border border-[rgba(79,195,247,0.12)]"
              style={{ animation: 'spin 20s linear infinite reverse' }}
            />
          </div>

          <h1 className="font-mono font-bold text-3xl sm:text-4xl text-white tracking-[4px] mb-3">
            {PROFILE.name}
          </h1>
          <p className="font-mono text-[12px] tracking-[3px] text-[#8B7FFF] mb-2">
            {PROFILE.degree}
          </p>
          <p className="font-mono text-[11px] tracking-[2px] text-[#444]">
            {PROFILE.university}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-8 w-full max-w-sm">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(139,127,255,0.4)]" />
            <span className="text-[#8B7FFF] text-sm">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(139,127,255,0.4)]" />
          </div>
        </div>

        {/* ── ABOUT ME ─────────────────────── */}
        <section className="mb-16">
          <SectionHead label="ABOUT ME" />
          <div
            className="font-mono text-[13px] text-[#666] leading-[2.2] p-6 border border-[rgba(139,127,255,0.12)] bg-[rgba(139,127,255,0.03)]"
            style={{ whiteSpace: 'pre-line' }}
          >
            {PROFILE.bio}
          </div>
        </section>

        {/* ── CONNECT ──────────────────────── */}
        <section className="mb-16">
          <SectionHead label="CONNECT" />
          <div className="flex flex-wrap gap-3">
            <LinkBadge href={PROFILE.github}   icon="⬡" label="GitHub"   color="#88ff88" />
            <LinkBadge href={PROFILE.linkedin} icon="in" label="LinkedIn" color="#88ccff" />
            <LinkBadge href={PROFILE.leetcode} icon="⚡" label="LeetCode" color="#FFA116" />
            <LinkBadge href={`mailto:${PROFILE.email}`} icon="✉" label="Email" color="#ffaa88" />
            {PROFILE.resume !== '#' && (
              <LinkBadge href={PROFILE.resume} icon="📄" label="Resume" color="#aaffaa" />
            )}
          </div>
        </section>

        {/* ── ACADEMICS ────────────────────── */}
        <section className="mb-16">
          <SectionHead label="ACADEMICS" />
          <div className="flex flex-col gap-3">
            {PROFILE.academics.map((ac, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-5 border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(139,127,255,0.25)] transition-all duration-300"
              >
                <span className="text-2xl mt-[2px] flex-shrink-0">{ac.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono font-bold text-[13px] text-white mb-1 leading-snug">
                    {ac.institution}
                  </p>
                  <p className="font-mono text-[11px] text-[#555] mb-2">{ac.degree}</p>
                  <div className="flex flex-wrap gap-4">
                    <span
                      className="font-mono text-[10px] tracking-[2px] px-3 py-1"
                      style={{ background: 'rgba(139,127,255,0.1)', color: '#8B7FFF', border: '1px solid rgba(139,127,255,0.25)' }}
                    >
                      {ac.year}
                    </span>
                    {ac.grade !== '— %' && (
                      <span
                        className="font-mono text-[10px] tracking-[2px] px-3 py-1"
                        style={{ background: 'rgba(79,195,247,0.08)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
                      >
                        {ac.grade}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTERNSHIPS ──────────────────────── */}
        <section className="mb-16">
          <SectionHead label="INTERNSHIPS & EXPERIENCE" />
          <div className="flex flex-col gap-3">
            {PROFILE.internships.map((int, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-5 border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(139,127,255,0.25)] transition-all duration-300"
              >
                <span className="text-2xl mt-[2px] flex-shrink-0">💼</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono font-bold text-[13px] text-white mb-1 leading-snug">
                    {int.company}
                  </p>
                  <p className="font-mono text-[11px] text-[#555] mb-2">{int.role}</p>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <span className="font-mono text-[10px] tracking-[2px] px-3 py-1" style={{ background: 'rgba(139,127,255,0.1)', color: '#8B7FFF', border: '1px solid rgba(139,127,255,0.25)' }}>
                      {int.startDate} → {int.endDate}
                    </span>
                  </div>
                  <p className="font-mono text-[12px] text-[#555] leading-[1.9] mb-3">{int.desc}</p>
                  <a href={int.certificateLink} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[2px] text-[#4FC3F7] hover:text-white transition-colors">
                    View Certificate →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ── ACHIEVEMENTS ─────────────────── */}
        <section className="mb-16">
          <SectionHead label="HACKATHON ACHIEVEMENTS" />
          <div className="flex flex-col gap-4">
            {PROFILE.hackathons.map((h, i) => {
              const colors = ['#8B7FFF', '#4FC3F7', '#1D9E75']
              const col = colors[i % colors.length]
              return (
                <div
                  key={i}
                  className="flex gap-5 p-6 border transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    borderColor:  `${col}25`,
                    background:   `${col}06`,
                    borderLeft:   `3px solid ${col}`,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-mono font-bold text-[15px] text-white">{h.name}</h3>
                      <span
                        className="font-mono text-[10px] tracking-[2px] px-3 py-1"
                        style={{ background: `${col}18`, color: col, border: `1px solid ${col}44` }}
                      >
                        {h.result}
                      </span>
                    </div>
                    <div className="flex gap-4 mb-3">
                      <span className="font-mono text-[10px] text-[#444]">{h.org}</span>
                      <span className="font-mono text-[10px] text-[#333]">·</span>
                      <span className="font-mono text-[10px] text-[#444]">{h.year}</span>
                    </div>
                    <p className="font-mono text-[12px] text-[#555] leading-[1.9]">{h.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Footer ───────────────────────── */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <p className="font-mono text-[9px] tracking-[5px] text-[#222]">
            CLICK THE HERO ASTEROID TO RETURN HERE ANYTIME
          </p>
          <button
            onClick={handleClose}
            className="font-mono text-[10px] tracking-[4px] text-[#8B7FFF] border border-[rgba(139,127,255,0.3)] px-8 py-3 hover:bg-[rgba(139,127,255,0.1)] hover:border-[#8B7FFF] transition-all duration-300"
          >
            ← BACK TO UNIVERSE
          </button>
        </div>

      </div>
    </div>
  )
}
