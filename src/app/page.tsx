'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useLenis } from '@/hooks/useLenis'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import FounderSection from '@/components/sections/FounderSection'
import StatementSection from '@/components/sections/StatementSection'
import StorySection from '@/components/sections/StorySection'
import JourneySection from '@/components/sections/JourneySection'
import LegacySection from '@/components/sections/LegacySection'
import ProblemSection from '@/components/sections/ProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import VisionSection from '@/components/sections/VisionSection'
import MarketSection from '@/components/sections/MarketSection'
import TractionSection from '@/components/sections/TractionSection'

import ProjectionsSection from '@/components/sections/ProjectionsSection'

export default function Home() {
  useLenis()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.refresh()
  }, [])

  return (
    <main>
      <Navbar />
      <HeroSection />
      <FounderSection />
      <StatementSection />
      <StorySection />
      <JourneySection />
      <LegacySection />
      <ProblemSection />
      <SolutionSection />
      <VisionSection />
      <MarketSection />
      <TractionSection />
      <ProjectionsSection />
    </main>
  )
}
