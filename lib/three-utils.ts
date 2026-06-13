// lib/three-utils.ts
// ─────────────────────────────────────────
// Reusable Three.js helper factories.
// Imported by SpaceUniverse and scene builders.
// ─────────────────────────────────────────

import * as THREE from 'three'
import type { Clickable } from '@/types'

// ── Text Sprite ───────────────────────────────
// Creates a billboard text label using CanvasTexture.
// Works without loading external font files.
interface SpriteOpts {
  sz?: number    // font size in px (default 22)
  col?: string   // CSS color string (default '#fff')
  bold?: boolean // bold font weight
}

export function makeSprite(text: string, opts: SpriteOpts = {}): THREE.Sprite {
  const { sz = 22, col = '#fff', bold = false } = opts

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const fontStr = `${bold ? 'bold ' : ''}${sz}px 'Space Mono', monospace`
  ctx.font = fontStr

  const textWidth = ctx.measureText(text).width
  const pad = sz * 0.55
  canvas.width  = Math.ceil(textWidth) + pad * 2
  canvas.height = Math.ceil(sz * 1.65)

  ctx.font = fontStr
  ctx.fillStyle = col
  ctx.fillText(text, pad, sz * 1.2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  })

  const sprite = new THREE.Sprite(material)
  const aspectRatio = canvas.width / canvas.height
  sprite.scale.set(aspectRatio * (sz / 9), sz / 9, 1)

  return sprite
}

// ── Glow Shell ────────────────────────────────
// Adds a soft outer glow around a sphere.
// Uses BackSide rendering so glow is visible from outside.
export function makeGlow(hexColor: number, radius: number): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(radius * 1.85, 16, 16)
  const material = new THREE.MeshBasicMaterial({
    color: hexColor,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    side: THREE.BackSide,
  })
  return new THREE.Mesh(geometry, material)
}

// ── Orbit Ring ────────────────────────────────
// Creates a faint circular orbit line around the origin.
export function makeOrbitRing(radius: number): THREE.LineLoop {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= 80; i++) {
    const angle = (i / 80) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.07,
  })
  return new THREE.LineLoop(geometry, material)
}

// ── Navigation Star ───────────────────────────
// Adds a purple glowing nav star + label to a group,
// and registers it in the clickables array.
export function addNavStar(
  group: THREE.Group,
  clickables: Clickable[],
  targetScene: string,
  position: [number, number, number],
  label: string,
): void {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 14, 14),
    new THREE.MeshBasicMaterial({ color: 0x8b7fff }),
  )
  mesh.position.set(...position)
  mesh.add(makeGlow(0x8b7fff, 0.8))
  group.add(mesh)

  const labelSprite = makeSprite(label, { sz: 14, col: '#8B7FFF' })
  labelSprite.position.set(position[0], position[1] + 1.7, position[2])
  group.add(labelSprite)

  clickables.push({ mesh, type: 'nav', data: { ts: targetScene } })
}
