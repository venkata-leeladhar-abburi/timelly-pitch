'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 80,
      onEnter: () =>
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(28,31,26,0.85)',
          backdropFilter: 'blur(20px)',
          duration: 0.4,
        }),
      onLeaveBack: () =>
        gsap.to(navRef.current, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          duration: 0.4,
        }),
    })

    return () => trigger.kill()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-400"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-green flex items-center justify-center">
          <span className="font-display text-black text-lg leading-none">T</span>
        </div>
        <span className="font-body text-text-warm font-medium text-lg tracking-wide">
          timelly
        </span>
      </div>

      {/* CTA */}
      <a
        href="mailto:timelly.tech@gmail.com"
        className="font-body text-sm font-medium text-text-warm border border-green px-5 py-2.5 rounded-sm transition-all duration-200 hover:bg-green hover:text-black"
      >
        Schedule a Call
      </a>
    </nav>
  )
}
