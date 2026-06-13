// app/layout.tsx
// ─────────────────────────────────────────
// Root layout — wraps every page.
// Sets up: metadata, viewport, Space Mono font,
// and the SceneProvider global context.
// ─────────────────────────────────────────

import type { Metadata, Viewport } from 'next'
import { Space_Mono } from 'next/font/google'
import { SceneProvider } from '@/components/providers/SceneProvider'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shyam Sunder Pandey — Space Portfolio',
  description:
    '3D interactive space portfolio — Full Stack Developer, AI/ML & Cybersecurity Engineer. B.Tech CSE Final Year, UEM Jaipur.',
  keywords: [
    'Shyam Sunder Pandey',
    'Portfolio',
    'Full Stack Developer',
    'AI ML Engineer',
    'Cybersecurity',
    'Three.js',
    'Next.js',
    'React',
    'UEM Jaipur',
  ],
  authors: [{ name: 'Shyam Sunder Pandey' }],
  openGraph: {
    title: 'Shyam Sunder Pandey — Space Portfolio',
    description: 'Interactive 3D portfolio built with Three.js + Next.js',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="bg-[#0a0a0f] overflow-hidden">
        <SceneProvider>
          {children}
        </SceneProvider>
      </body>
    </html>
  )
}
