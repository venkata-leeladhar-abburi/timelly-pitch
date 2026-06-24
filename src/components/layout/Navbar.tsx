'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Navbar() {
  // Backdrop-filter itself never changes — it's always glassmorphic, on every
  // viewport. Only the tint/border/shadow intensify once the user scrolls,
  // and those are cheap, paint-only properties safe to transition directly.
  const [scrolled, setScrolled] = useState(false)
  const [hideNav, setHideNav] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)

      const visionEl = document.getElementById('section-vision')
      const problemEl = document.getElementById('section-problem')

      let hidden = false
      if (visionEl) {
        const rect = visionEl.getBoundingClientRect()
        if (rect.top <= 0 && rect.bottom >= 0) hidden = true
      }
      if (problemEl) {
        const rect = problemEl.getBoundingClientRect()
        if (rect.top <= 0 && rect.bottom >= 0) hidden = true
      }
      setHideNav(hidden)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b px-5 py-4 sm:px-8 sm:py-5"
      style={{
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        backgroundColor: scrolled ? 'rgba(28,31,26,0.55)' : 'rgba(28,31,26,0.22)',
        borderBottomColor: scrolled ? 'rgba(240,237,230,0.12)' : 'rgba(240,237,230,0.08)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.25)' : '0 0px 0px rgba(0,0,0,0)',
        opacity: hideNav ? 0 : 1,
        pointerEvents: hideNav ? 'none' : 'auto',
        transition:
          'background-color 300ms var(--ease-out), border-color 300ms var(--ease-out), box-shadow 300ms var(--ease-out), opacity 300ms var(--ease-out)',
      }}
    >
      {/* Logo */}
      <Image
        src="/timelly-logo-full.png"
        alt="timelly"
        width={100}
        height={36}
        priority
        className="h-8 w-auto sm:h-9 select-none"
      />

      {/* CTA */}
      <a
        href="mailto:timelly.tech@gmail.com"
        className="press font-body text-xs sm:text-sm font-medium text-text-warm border border-green px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-sm hover:bg-green hover:text-black"
        style={{ transitionProperty: 'transform, background-color, color', transitionDuration: '160ms, 200ms, 200ms', transitionTimingFunction: 'var(--ease-out)' }}
      >
        Schedule a Call
      </a>
    </nav>
  )
}
