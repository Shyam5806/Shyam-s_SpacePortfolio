# 🚀 Space Portfolio — Shyam Sunder Pandey

A fully interactive 3D space-themed portfolio built with **Next.js 14**, **Three.js**, and **GSAP**. Visitors fly through an asteroid belt, explore solar systems, and discover projects, tech stacks, and domains — all in a cinematic 3D experience.

---

## ✦ Scenes

| Scene | ID | Description |
|---|---|---|
| Asteroid Belt | `01` | Landing zone — your name, info, achievements on floating asteroids |
| Galaxy Tunnel | `02` | Cinematic particle wormhole transition |
| Solar Hub | `03` | Main hub — central star (tech stack) + 12 orbiting tech planets |
| Project Stars | `04A` | 6 project stars, each clickable with full project details |
| Core Language | `04B` | Java central star + DSA, LeetCode, OOP, CP, Spring Boot orbiting |
| Domain Nebulae | `04C` | 6 colored particle clouds for your core domains |

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **Three.js** r166 — 3D rendering engine
- **GSAP** 3.12 — cinematic camera animations
- **Tailwind CSS** — UI overlays
- **TypeScript** — full type safety

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 🚀 Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub + Vercel Dashboard
# Push to GitHub → Import project on vercel.com → Deploy
```

---

## 📁 Project Structure

```
space-portfolio/
├── app/                    ← Next.js App Router
│   ├── layout.tsx          ← Root layout + Space Mono font
│   ├── page.tsx            ← Main page (assembles everything)
│   └── globals.css         ← Global styles + keyframes
├── components/
│   ├── canvas/
│   │   └── SpaceUniverse.tsx   ← Three.js engine (all 3D scenes)
│   ├── providers/
│   │   └── SceneProvider.tsx   ← Global state (scenes, modals)
│   └── ui/
│       ├── LoadingScreen.tsx
│       ├── HUD.tsx
│       ├── EnterButton.tsx
│       ├── ProjectModal.tsx
│       ├── TechPanel.tsx
│       └── InfoCard.tsx
├── data/                   ← All your content (edit these!)
│   ├── profile.ts          ← Name, links, achievements
│   ├── tech-stack.ts       ← Planet IDs + tech details
│   ├── projects.ts         ← Project IDs + descriptions
│   ├── core-lang.ts        ← Java system planets
│   ├── domains.ts          ← Domain nebulae
│   └── scene-configs.ts    ← Camera positions per scene
├── lib/
│   └── three-utils.ts      ← makeSprite, makeGlow, makeOrbitRing
└── types/
    └── index.ts            ← TypeScript interfaces
```

---

## ✏️ Customization

All content lives in `/data/`. Edit these files to update your portfolio:

- `data/profile.ts` — your name, email, GitHub, LinkedIn, achievements
- `data/projects.ts` — project IDs, descriptions, tech, links
- `data/tech-stack.ts` — planet IDs and skill levels
- `data/domains.ts` — domain nebula names and colors

---

## 🎮 Controls

| Action | Result |
|---|---|
| Click `▼ ENTER THE UNIVERSE` | Fly from asteroid belt → solar hub |
| Click central star | Open tech stack panel |
| Click any planet | Show tech detail card |
| Click project star | Open project modal |
| Click nav star (labeled) | Jump to that solar system |
| Click minimap rows | Jump to any scene instantly |
| Click `← BACK` | Return to previous scene |

---

Built with ❤️ by **Shyam Sunder Pandey**
