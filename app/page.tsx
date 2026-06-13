// app/page.tsx — Main page, assembles all components

import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/ui/LoadingScreen'
import HUD           from '@/components/ui/HUD'
import EnterButton   from '@/components/ui/EnterButton'
import ProjectModal  from '@/components/ui/ProjectModal'
import TechPanel     from '@/components/ui/TechPanel'
import InfoCard      from '@/components/ui/InfoCard'
import AboutSection  from '@/components/ui/AboutSection'

// Three.js must run client-side only
const SpaceUniverse = dynamic(
  () => import('@/components/canvas/SpaceUniverse'),
  { ssr: false },
)

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0a0a0f]">
      {/* 3D Canvas */}
      <SpaceUniverse />

      {/* UI Overlays — stacked in z-index order */}
      <LoadingScreen />   {/* z-[9999] — top layer during load */}
      <AboutSection />    {/* z-[600]  — about overlay */}
      <ProjectModal />    {/* z-[500]  — project detail modal */}
      <TechPanel />       {/* z-[400]  — right slide-in panel */}
      <InfoCard />        {/* z-[300]  — floating info card */}
      <HUD />             {/* z-[100]  — always-visible nav */}
      <EnterButton />     {/* z-[200]  — enter CTA */}
    </main>
  )
}
