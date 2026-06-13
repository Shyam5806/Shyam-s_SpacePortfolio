'use client'
// components/canvas/SpaceUniverse.tsx
// ─────────────────────────────────────────
// The entire Three.js 3D engine.
// Scene builders are module-level functions for clarity.
// The React component handles:
//   - One-time Three.js initialisation
//   - Scene transitions (watching currentScene from context)
//   - Event listeners (click / mousemove / resize)
// ─────────────────────────────────────────

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

import { useScene } from '@/components/providers/SceneProvider'
import { makeSprite, makeGlow, makeOrbitRing, addNavStar } from '@/lib/three-utils'
import { PROFILE }       from '@/data/profile'
import { TECH }          from '@/data/tech-stack'
import { PROJECTS }      from '@/data/projects'
import { CORE }          from '@/data/core-lang'
import { DOMAINS }       from '@/data/domains'
import { SCENE_CONFIGS } from '@/data/scene-configs'
import type { Clickable, SceneID } from '@/types'

// ═══════════════════════════════════════════════
//  MODULE-LEVEL SCENE BUILDERS
//  Pure functions — no React, no hooks.
//  Each one adds objects to `scene` and `groups`,
//  and pushes clickable meshes into `clickables`.
// ═══════════════════════════════════════════════

function buildStarfield(scene: THREE.Scene) {
  const count = 4000
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 900
    positions[i * 3 + 1] = (Math.random() - 0.5) * 900
    positions[i * 3 + 2] = (Math.random() - 0.5) * 900
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  scene.add(
    new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.13, sizeAttenuation: true })),
  )
}

// ── Scene 1: Asteroid Belt ─────────────────────
function buildBelt(
  scene: THREE.Scene,
  groups: Record<string, THREE.Group>,
  clickables: Clickable[],
) {
  const g = new THREE.Group()
  groups.asteroid_belt = g
  scene.add(g)

  // Lighting
  g.add(new THREE.AmbientLight(0x334466, 1.0))
  const dl = new THREE.DirectionalLight(0xffeedd, 1.5)
  dl.position.set(10, 20, 15)
  g.add(dl)
  const pl = new THREE.PointLight(0x8866ff, 1.8, 38)
  pl.position.set(0, 10, 10)
  g.add(pl)

  // 80 background asteroids (low-poly, individually animated)
  const aGeo = new THREE.IcosahedronGeometry(1, 0)
  const aMat = new THREE.MeshStandardMaterial({ color: 0x6b5b3e, roughness: 1.0, metalness: 0.02 })
  const bgAsteroids: THREE.Mesh[] = []
  for (let i = 0; i < 80; i++) {
    let x = 0, y = 0, z = 0
    do {
      x = (Math.random() - 0.5) * 72
      y = (Math.random() - 0.5) * 24
      z = (Math.random() - 0.5) * 52
    } while (x * x + y * y + z * z < 52)
    const m = new THREE.Mesh(aGeo, aMat)
    m.position.set(x, y, z)
    m.rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 3.14)
    m.scale.setScalar(0.25 + Math.random() * 1.1)
    ;(m.userData as Record<string, number>).ry = (Math.random() - 0.5) * 0.012
    ;(m.userData as Record<string, number>).rx = (Math.random() - 0.5) * 0.006
    g.add(m)
    bgAsteroids.push(m)
  }
  g.userData.bgAsteroids = bgAsteroids

  // Hero asteroid — large, center, carries the name
  const hero = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 2),
    new THREE.MeshStandardMaterial({ color: 0x3a2b1e, roughness: 0.95, metalness: 0.02 }),
  )
  hero.userData.ry = 0.002
  g.add(hero)
  g.userData.hero = hero
  // Clicking the hero asteroid opens the About section
  clickables.push({ mesh: hero, type: 'about', data: {} })

  // Name + tagline sprites above hero asteroid
  const nameSprite = makeSprite(PROFILE.name, { sz: 50, col: '#ffffff', bold: true })
  nameSprite.position.set(0, 5.5, 0)
  g.add(nameSprite)

  const tagSprite = makeSprite(PROFILE.tagline, { sz: 16, col: '#6666bb' })
  tagSprite.position.set(0, 3.8, 0)
  g.add(tagSprite)

  PROFILE.achievements.forEach((a, i) => {
    const s = makeSprite(a, { sz: 13, col: '#3a3a5a' })
    s.position.set(0, -4.5 - i * 1.3, 0)
    g.add(s)
  })

  // 8 info asteroids — each carries a label and optional link
  const infoItems = [
    { pos: [-16,  5, -12] as [number,number,number], label: PROFILE.degree,         col: '#88aaff', r: 1.1,  link: null },
    { pos: [ 13, -4, -14] as [number,number,number], label: PROFILE.university,     col: '#7788cc', r: 0.9,  link: null },
    { pos: [-11, -5,   6] as [number,number,number], label: '✉ Email',              col: '#ffaa88', r: 0.85, link: `mailto:${PROFILE.email}` },
    { pos: [ 12,  6,   4] as [number,number,number], label: '⬡ GitHub',             col: '#88ff88', r: 0.9,  link: PROFILE.github },
    { pos: [  0,  8, -12] as [number,number,number], label: 'in LinkedIn',          col: '#88ccff', r: 0.9,  link: PROFILE.linkedin },
    { pos: [-13,  3, -15] as [number,number,number], label: 'LeetCode ↗',           col: '#FFA116', r: 0.85, link: PROFILE.leetcode },
    { pos: [ 15,  2,  -8] as [number,number,number], label: PROFILE.achievements[0],col: '#ffdd44', r: 0.85, link: null },
    { pos: [ -6, -8,  -8] as [number,number,number], label: '📄 Resume ↓',         col: '#aaffaa', r: 0.9,  link: '#' },
  ]
  const infoMeshes: THREE.Mesh[] = []
  infoItems.forEach((info) => {
    const c = new THREE.Color(info.col)
    const im = new THREE.Mesh(
      new THREE.IcosahedronGeometry(info.r, 1),
      new THREE.MeshStandardMaterial({
        color: c.clone().multiplyScalar(0.25),
        emissive: c,
        emissiveIntensity: 0.32,
        roughness: 0.8,
      }),
    )
    im.position.set(...info.pos)
    im.rotation.set(Math.random() * 6.28, Math.random() * 6.28, 0)
    im.userData.ry   = (Math.random() - 0.5) * 0.009
    im.userData.link = info.link
    g.add(im)

    const ls = makeSprite(info.label, { sz: 14, col: info.col })
    ls.position.set(info.pos[0], info.pos[1] + info.r + 1.0, info.pos[2])
    g.add(ls)

    infoMeshes.push(im)
    if (info.link) {
      clickables.push({ mesh: im, type: 'link', data: { link: info.link } })
    }
  })
  g.userData.infoMeshes = infoMeshes

  // 9 meteors using CylinderGeometry (CapsuleGeometry not in Three.js r128)
  const meteors: Array<{
    g: THREE.Group; sx: number; sy: number; sz: number
    spd: number; off: number; per: number
  }> = []
  for (let i = 0; i < 9; i++) {
    const mg = new THREE.Group()
    mg.add(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.008, 3.5, 5),
        new THREE.MeshBasicMaterial({ color: 0xff6b00 }),
      ),
    )
    const trail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.005, 6, 5),
      new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.25 }),
    )
    trail.position.y = -2
    mg.add(trail)
    mg.rotation.z = Math.PI / 2
    mg.rotation.x = 0.18 + Math.random() * 0.12
    g.add(mg)
    meteors.push({
      g:   mg,
      sx:  -60 + (Math.random() - 0.5) * 6,
      sy:   8 + Math.random() * 16,
      sz:  -22 + Math.random() * 12,
      spd:  17 + Math.random() * 14,
      off:  i * 1.05,
      per:  4.5 + Math.random() * 2.5,
    })
  }
  g.userData.meteors = meteors
  g.visible = true  // only this scene starts visible
}

// ── Scene 1.5: Galaxy Tunnel (transition effect) ─
function buildTunnel(scene: THREE.Scene, groups: Record<string, THREE.Group>) {
  const g = new THREE.Group()
  groups.galaxy_tunnel = g
  scene.add(g)

  const COUNT = 5000
  const p1 = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const t  = (i / COUNT) * Math.PI * 24
    const r  = 4.5 + Math.random() * 2.5
    const n  = (Math.random() - 0.5) * 1.2
    p1[i * 3]     = Math.cos(t) * r + n
    p1[i * 3 + 1] = Math.sin(t) * r + n
    p1[i * 3 + 2] = -(i / COUNT) * 130 + 10
  }
  const bg1 = new THREE.BufferGeometry()
  bg1.setAttribute('position', new THREE.BufferAttribute(p1, 3))
  const pts1 = new THREE.Points(bg1, new THREE.PointsMaterial({ color: 0x8b7fff, size: 0.07, sizeAttenuation: true, transparent: true, opacity: 0.9 }))

  const p2 = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    p2[i * 3]     = p1[i * 3]     * 0.55 + (Math.random() - 0.5) * 0.6
    p2[i * 3 + 1] = p1[i * 3 + 1] * 0.55 + (Math.random() - 0.5) * 0.6
    p2[i * 3 + 2] = p1[i * 3 + 2]
  }
  const bg2 = new THREE.BufferGeometry()
  bg2.setAttribute('position', new THREE.BufferAttribute(p2, 3))
  const pts2 = new THREE.Points(bg2, new THREE.PointsMaterial({ color: 0x4fc3f7, size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.5 }))

  g.add(pts1); g.add(pts2)
  g.userData.pts = [pts1, pts2]
  g.visible = false
}

// ── Scene 3: Solar Hub ─────────────────────────
function buildHub(
  scene: THREE.Scene,
  groups: Record<string, THREE.Group>,
  clickables: Clickable[],
) {
  const g = new THREE.Group()
  g.position.set(0, 0, -100)
  groups.solar_hub = g
  scene.add(g)

  g.add(new THREE.AmbientLight(0x112244, 0.8))
  g.add(new THREE.PointLight(0xffd54f, 5, 170))

  // Central star — click to open tech panel
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(2.3, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffd54f }),
  )
  star.add(makeGlow(0xffd54f, 2.3))
  g.add(star)
  g.userData.star = star
  clickables.push({ mesh: star, type: 'tech_star', data: {} })

  const starLabel = makeSprite('CLICK → TECH STACK', { sz: 15, col: '#FFD54F' })
  starLabel.position.set(0, 3.8, 0)
  g.add(starLabel)

  // 12 orbiting tech planets
  const planets: THREE.Mesh[] = []
  TECH.forEach((tech, i) => {
    const orbit = 6 + i * 2.9
    const c = new THREE.Color(tech.col)

    g.add(makeOrbitRing(orbit))

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 18, 18),
      new THREE.MeshStandardMaterial({
        color: c.clone().multiplyScalar(0.5),
        emissive: c,
        emissiveIntensity: 0.45,
        roughness: 0.4,
      }),
    )
    planet.userData = { tech, orb: orbit, spd: 0.32 - i * 0.02, ang: Math.random() * Math.PI * 2 }
    planet.add(makeGlow(c.getHex(), 0.52))

    const idSprite = makeSprite(tech.id, { sz: 12, col: tech.col })
    idSprite.position.set(0, 0.95, 0)
    planet.add(idSprite)

    g.add(planet)
    planets.push(planet)
    clickables.push({ mesh: planet, type: 'planet', data: tech })
  })
  g.userData.planets = planets

  // 3 navigation stars — lead to other systems
  const navItems = [
    { label: 'PROJECT STARS', sub: '4A ↗', pos: [-24, 2, 10] as [number,number,number], scene: 'project_stars', hex: 0xe8a838, col: '#E8A838' },
    { label: 'CORE LANG',     sub: '4B ↗', pos: [ 24, 2, 10] as [number,number,number], scene: 'core_lang',     hex: 0xed8b00, col: '#ED8B00' },
    { label: 'DOMAINS',       sub: '4C ↗', pos: [  0,12,  8] as [number,number,number], scene: 'domains',       hex: 0x9c27b0, col: '#9C27B0' },
  ]
  navItems.forEach((nav) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 18, 18),
      new THREE.MeshBasicMaterial({ color: nav.hex }),
    )
    m.position.set(...nav.pos)
    m.add(makeGlow(nav.hex, 1.05))
    g.add(m)

    const nl = makeSprite(nav.label, { sz: 15, col: nav.col, bold: true })
    nl.position.set(nav.pos[0], nav.pos[1] + 2.1, nav.pos[2])
    g.add(nl)

    const sl = makeSprite(nav.sub, { sz: 11, col: '#333' })
    sl.position.set(nav.pos[0], nav.pos[1] + 0.9, nav.pos[2])
    g.add(sl)

    clickables.push({ mesh: m, type: 'nav', data: { ts: nav.scene } })
  })

  g.visible = false
}

// ── Scene 4A: Project Stars ────────────────────
function buildProjects(
  scene: THREE.Scene,
  groups: Record<string, THREE.Group>,
  clickables: Clickable[],
) {
  const g = new THREE.Group()
  g.position.set(-70, 0, -100)
  groups.project_stars = g
  scene.add(g)

  g.add(new THREE.AmbientLight(0x111133, 0.6))

  const centralStar = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  )
  centralStar.add(makeGlow(0xffffff, 1.8))
  g.add(centralStar)
  g.userData.centralStar = centralStar

  const titleSprite = makeSprite('// MY PROJECTS', { sz: 19, col: '#ffffff', bold: true })
  titleSprite.position.set(0, 3.2, 0)
  g.add(titleSprite)

  const projMeshes: THREE.Mesh[] = []
  PROJECTS.forEach((proj, i) => {
    const orbit = 5.5 + i * 3.6
    g.add(makeOrbitRing(orbit))

    const pm = new THREE.Mesh(
      new THREE.SphereGeometry(0.82, 20, 20),
      new THREE.MeshBasicMaterial({ color: proj.hex }),
    )
    pm.userData = { proj, orb: orbit, spd: 0.2 - i * 0.022, ang: Math.random() * Math.PI * 2 }
    pm.add(makeGlow(proj.hex, 0.82))

    const idSprite = makeSprite(proj.id, { sz: 13, col: proj.col })
    idSprite.position.set(0, 1.25, 0)
    pm.add(idSprite)

    const nameSprite = makeSprite(proj.name.split(' ').slice(0, 2).join(' '), { sz: 11, col: '#444' })
    nameSprite.position.set(0, -1.45, 0)
    pm.add(nameSprite)

    g.add(pm)
    projMeshes.push(pm)
    clickables.push({ mesh: pm, type: 'project', data: proj })
  })
  g.userData.projMeshes = projMeshes

  addNavStar(g, clickables, 'solar_hub', [0, -9, 0], '← BACK TO HUB')
  g.visible = false
}

// ── Scene 4B: Core Language ────────────────────
function buildCoreLang(
  scene: THREE.Scene,
  groups: Record<string, THREE.Group>,
  clickables: Clickable[],
) {
  const g = new THREE.Group()
  g.position.set(70, 0, -100)
  groups.core_lang = g
  scene.add(g)

  g.add(new THREE.AmbientLight(0x221100, 0.7))
  g.add(new THREE.PointLight(0xed8b00, 3.5, 115))

  const javaStar = new THREE.Mesh(
    new THREE.SphereGeometry(2.1, 28, 28),
    new THREE.MeshBasicMaterial({ color: 0xed8b00 }),
  )
  javaStar.add(makeGlow(0xed8b00, 2.1))
  g.add(javaStar)
  g.userData.javaStar = javaStar

  const jLabel = makeSprite('JAVA', { sz: 30, col: '#ED8B00', bold: true })
  jLabel.position.set(0, 3.5, 0)
  g.add(jLabel)

  const jSub = makeSprite('Core Language', { sz: 15, col: '#444' })
  jSub.position.set(0, 2.2, 0)
  g.add(jSub)

  const coreMeshes: THREE.Mesh[] = []
  CORE.forEach((planet, i) => {
    const orbit = 5.5 + i * 3.1
    const c = new THREE.Color(planet.col)
    g.add(makeOrbitRing(orbit))

    const pm = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshStandardMaterial({
        color: c.clone().multiplyScalar(0.4),
        emissive: c,
        emissiveIntensity: 0.5,
        roughness: 0.4,
      }),
    )
    pm.userData = { cp: planet, orb: orbit, spd: 0.24 - i * 0.028, ang: Math.random() * Math.PI * 2 }
    pm.add(makeGlow(planet.hex, 0.55))

    const idSprite = makeSprite(planet.id, { sz: 12, col: planet.col })
    idSprite.position.set(0, 0.9, 0)
    pm.add(idSprite)

    g.add(pm)
    coreMeshes.push(pm)
    clickables.push({ mesh: pm, type: 'core_p', data: planet })
  })
  g.userData.coreMeshes = coreMeshes

  addNavStar(g, clickables, 'solar_hub', [0, -9, 0], '← BACK TO HUB')
  g.visible = false
}

// ── Scene 4C: Domain Nebulae ───────────────────
function buildDomains(
  scene: THREE.Scene,
  groups: Record<string, THREE.Group>,
  clickables: Clickable[],
) {
  const g = new THREE.Group()
  groups.domains = g
  scene.add(g)
  g.add(new THREE.AmbientLight(0x110011, 0.5))

  DOMAINS.forEach((d) => {
    const dg = new THREE.Group()
    dg.position.set(...d.p)

    // Particle cloud
    const COUNT = 380
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r  = Math.random() * 5.5
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.55
      pos[i * 3 + 2] = r * Math.cos(ph)
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    dg.add(
      new THREE.Points(pg, new THREE.PointsMaterial({ color: d.hex, size: 0.18, transparent: true, opacity: 0.65, sizeAttenuation: true })),
    )

    // Invisible clickable core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 12, 12),
      new THREE.MeshBasicMaterial({ color: d.hex, transparent: true, opacity: 0.09, depthWrite: false }),
    )
    dg.add(core)
    clickables.push({ mesh: core, type: 'domain', data: d })

    const nameSprite = makeSprite(d.name, { sz: 20, col: d.col, bold: true })
    nameSprite.position.set(0, 3.4, 0)
    dg.add(nameSprite)

    const descSprite = makeSprite(d.desc, { sz: 10, col: '#444' })
    descSprite.position.set(0, -3.2, 0)
    dg.add(descSprite)

    g.add(dg)
  })

  // Back nav star
  const bm = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 14, 14),
    new THREE.MeshBasicMaterial({ color: 0x8b7fff }),
  )
  bm.position.set(0, 35, -108)
  bm.add(makeGlow(0x8b7fff, 1.0))
  g.add(bm)
  const bl = makeSprite('← BACK TO HUB', { sz: 14, col: '#8B7FFF' })
  bl.position.set(0, 37.2, -108)
  g.add(bl)
  clickables.push({ mesh: bm, type: 'nav', data: { ts: 'solar_hub' } })

  g.visible = false
}

// ═══════════════════════════════════════════════
//  PER-FRAME ANIMATION
//  Called every frame from the rAF loop.
// ═══════════════════════════════════════════════

function animateScenes(t: number, dt: number, groups: Record<string, THREE.Group>) {
  // Galaxy tunnel spin
  const tunnel = groups.galaxy_tunnel
  if (tunnel?.visible) {
    const pts = tunnel.userData.pts as THREE.Points[]
    if (pts) { pts[0].rotation.z = t * 0.28; pts[1].rotation.z = -t * 0.18 }
  }

  // Asteroid belt
  const ab = groups.asteroid_belt
  if (ab?.visible) {
    ;(ab.userData.bgAsteroids as THREE.Mesh[])?.forEach((m) => {
      m.rotation.y += (m.userData as Record<string, number>).ry
      m.rotation.x += (m.userData as Record<string, number>).rx
    })
    const hero = ab.userData.hero as THREE.Mesh
    if (hero) hero.rotation.y += 0.002

    ;(ab.userData.infoMeshes as THREE.Mesh[])?.forEach((m) => {
      m.rotation.y += (m.userData as Record<string, number>).ry || 0.005
    })
    ;(ab.userData.meteors as Array<{ g: THREE.Group; sx: number; sy: number; sz: number; spd: number; off: number; per: number }>)
      ?.forEach((m) => {
        const progress = ((t + m.off) % m.per) / m.per
        m.g.position.x = m.sx + progress * m.spd * m.per
        m.g.position.y = m.sy - progress * m.spd * m.per * 0.3
        m.g.position.z = m.sz
      })
  }

  // Solar hub — pulse star + orbit planets
  const sh = groups.solar_hub
  if (sh?.visible) {
    const star = sh.userData.star as THREE.Mesh
    if (star) { const sc = 1 + Math.sin(t * 1.8) * 0.04; star.scale.setScalar(sc) }
    ;(sh.userData.planets as THREE.Mesh[])?.forEach((p) => {
      const d = p.userData as { ang: number; spd: number; orb: number }
      d.ang += d.spd * dt
      p.position.x = Math.cos(d.ang) * d.orb
      p.position.z = Math.sin(d.ang) * d.orb
      p.rotation.y += 0.012
    })
  }

  // Project stars — orbit
  const ps = groups.project_stars
  if (ps?.visible) {
    const cs = ps.userData.centralStar as THREE.Mesh
    if (cs) cs.rotation.y += 0.005
    ;(ps.userData.projMeshes as THREE.Mesh[])?.forEach((p) => {
      const d = p.userData as { ang: number; spd: number; orb: number }
      d.ang += d.spd * dt
      p.position.x = Math.cos(d.ang) * d.orb
      p.position.z = Math.sin(d.ang) * d.orb
    })
  }

  // Core lang — pulse java star + orbit planets
  const cl = groups.core_lang
  if (cl?.visible) {
    const js = cl.userData.javaStar as THREE.Mesh
    if (js) { const sc = 1 + Math.sin(t * 2.0) * 0.04; js.scale.setScalar(sc) }
    ;(cl.userData.coreMeshes as THREE.Mesh[])?.forEach((p) => {
      const d = p.userData as { ang: number; spd: number; orb: number }
      d.ang += d.spd * dt
      p.position.x = Math.cos(d.ang) * d.orb
      p.position.z = Math.sin(d.ang) * d.orb
      p.rotation.y += 0.009
    })
  }

  // Domain nebulae — slow rotation per cluster
  const dm = groups.domains
  if (dm?.visible) {
    dm.children.forEach((child, i) => {
      if (child instanceof THREE.Group) {
        child.rotation.y = t * 0.04 * (i % 2 === 0 ? 1 : -1)
      }
    })
  }
}

// ═══════════════════════════════════════════════
//  REACT COMPONENT
// ═══════════════════════════════════════════════

export default function SpaceUniverse() {
  const {
    currentScene,
    navigateTo,
    setIsTransitioning,
    setActiveProject,
    setActiveTech,
    setActiveDomain,
    setShowTechPanel,
    setShowAbout,
    setCardPos,
  } = useScene()

  // ── Three.js refs ──────────────────────────────
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rendererRef  = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef     = useRef<THREE.Scene | null>(null)
  const cameraRef    = useRef<THREE.PerspectiveCamera | null>(null)
  const clockRef     = useRef<THREE.Clock | null>(null)
  const lookAtRef    = useRef({ x: 0, y: 0, z: 0 })
  const groupsRef    = useRef<Record<string, THREE.Group>>({})
  const clickablesRef = useRef<Clickable[]>([])
  const rafRef       = useRef<number>(0)
  const rcRef        = useRef(new THREE.Raycaster())
  const mvRef        = useRef(new THREE.Vector2())

  // ── Sync refs ──────────────────────────────────
  const isReadyRef       = useRef(false)
  const prevSceneRef     = useRef<SceneID | null>(null)
  const navigateToRef    = useRef(navigateTo)
  const setActiveProjRef = useRef(setActiveProject)
  const setActiveTechRef = useRef(setActiveTech)
  const setActiveDomRef  = useRef(setActiveDomain)
  const setTechPanelRef  = useRef(setShowTechPanel)
  const setShowAboutRef  = useRef(setShowAbout)
  const setCardPosRef    = useRef(setCardPos)

  // Keep callback refs fresh every render
  navigateToRef.current    = navigateTo
  setActiveProjRef.current = setActiveProject
  setActiveTechRef.current = setActiveTech
  setActiveDomRef.current  = setActiveDomain
  setTechPanelRef.current  = setShowTechPanel
  setShowAboutRef.current  = setShowAbout
  setCardPosRef.current    = setCardPos

  // ── One-time Three.js initialisation ──────────
  useEffect(() => {
    if (!canvasRef.current) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0a0a0f, 1)
    rendererRef.current = renderer

    // Scene + camera
    const threeScene = new THREE.Scene()
    sceneRef.current = threeScene
    const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    cam.position.set(0, 5, 26)
    cameraRef.current = cam
    clockRef.current  = new THREE.Clock()

    const groups    = groupsRef.current
    const clickables = clickablesRef.current

    // Build all scenes
    buildStarfield(threeScene)
    buildBelt(threeScene,     groups, clickables)
    buildTunnel(threeScene,   groups)
    buildHub(threeScene,      groups, clickables)
    buildProjects(threeScene, groups, clickables)
    buildCoreLang(threeScene, groups, clickables)
    buildDomains(threeScene,  groups, clickables)

    isReadyRef.current = true

    // Animation loop
    let lastT = 0
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const t  = clockRef.current!.getElapsedTime()
      const dt = t - lastT; lastT = t
      animateScenes(t, dt, groups)
      cam.lookAt(lookAtRef.current.x, lookAtRef.current.y, lookAtRef.current.z)
      renderer.render(threeScene, cam)
    }
    animate()

    // Event: resize
    const onResize = () => {
      cam.aspect = window.innerWidth / window.innerHeight
      cam.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Event: click (uses refs to avoid stale closures)
    const onClick = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect()
      mvRef.current.set(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        -((e.clientY - rect.top)  / rect.height) *  2 + 1,
      )
      rcRef.current.setFromCamera(mvRef.current, cam)
      const hits = rcRef.current.intersectObjects(threeScene.children, true)

      const hit = hits.find(
        (h) => h.object.isMesh && clickables.some((c) => c.mesh === h.object),
      )
      if (!hit) {
        setActiveTechRef.current(null)
        setActiveDomRef.current(null)
        return
      }
      const cl = clickables.find((c) => c.mesh === hit.object)!

      switch (cl.type) {
        case 'link':
          if (cl.data.link && cl.data.link !== '#') window.open(cl.data.link as string, '_blank')
          break
        case 'tech_star':
          setTechPanelRef.current(true)
          break
        case 'planet':
          setActiveTechRef.current(cl.data)
          setCardPosRef.current({ x: e.clientX, y: e.clientY })
          break
        case 'project':
          setActiveProjRef.current(cl.data)
          break
        case 'core_p':
          if (cl.data.link) {
            window.open(cl.data.link as string, '_blank')
          } else {
            setActiveTechRef.current(cl.data)
            setCardPosRef.current({ x: e.clientX, y: e.clientY })
          }
          break
        case 'domain':
          setActiveDomRef.current(cl.data)
          setCardPosRef.current({ x: e.clientX, y: e.clientY })
          break
        case 'nav':
          navigateToRef.current(cl.data.ts as SceneID)
          break
        case 'about':
          setShowAboutRef.current(true)
          break
      }
    }

    // Event: hover — change cursor
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect()
      mvRef.current.set(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        -((e.clientY - rect.top)  / rect.height) *  2 + 1,
      )
      rcRef.current.setFromCamera(mvRef.current, cam)
      const hits = rcRef.current.intersectObjects(threeScene.children, true)
      const isHit = hits.some((h) => h.object.isMesh && clickables.some((c) => c.mesh === h.object))
      document.body.style.cursor = isHit ? 'pointer' : 'default'
    }

    const cv = canvasRef.current
    cv.addEventListener('click', onClick)
    cv.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      cv.removeEventListener('click', onClick)
      cv.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scene transition (watches currentScene) ───
  useEffect(() => {
    // Skip the very first render — Three.js may not be ready yet
    if (!isReadyRef.current) {
      prevSceneRef.current = currentScene
      return
    }
    if (prevSceneRef.current === currentScene) return

    const from = prevSceneRef.current
    prevSceneRef.current = currentScene

    const cam     = cameraRef.current!
    const lookAt  = lookAtRef.current
    const groups  = groupsRef.current
    const cfg     = SCENE_CONFIGS[currentScene]
    const [cx, cy, cz] = cfg.cam
    const [lx, ly, lz] = cfg.look

    // Show tunnel particles when crossing to/from asteroid belt
    const useTunnel = from === 'asteroid_belt' || currentScene === 'asteroid_belt'
    if (useTunnel && groups.galaxy_tunnel) groups.galaxy_tunnel.visible = true

    // Show destination scene immediately (fades in as camera arrives)
    if (groups[currentScene]) groups[currentScene].visible = true

    // Animate camera position
    gsap.to(cam.position, {
      x: cx, y: cy, z: cz,
      duration: 2.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Hide all non-active scenes
        Object.keys(groups).forEach((key) => {
          if (key !== currentScene && key !== 'galaxy_tunnel' && groups[key]) {
            groups[key].visible = false
          }
        })
        if (useTunnel && groups.galaxy_tunnel) groups.galaxy_tunnel.visible = false
        setIsTransitioning(false)
      },
    })

    // Animate look-at target in parallel
    gsap.to(lookAt, { x: lx, y: ly, z: lz, duration: 2.8, ease: 'power2.inOut' })
  }, [currentScene, setIsTransitioning])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 block w-full h-full"
      style={{ background: '#0a0a0f' }}
    />
  )
}
