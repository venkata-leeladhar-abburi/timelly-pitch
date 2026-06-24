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
      const tractionEl = document.getElementById('section-traction')

      let hidden = false
      if (visionEl) {
        const rect = visionEl.getBoundingClientRect()
        if (rect.top <= 0 && rect.bottom >= 0) hidden = true
      }
      if (problemEl) {
        const rect = problemEl.getBoundingClientRect()
        if (rect.top <= 0 && rect.bottom >= 0) hidden = true
      }
      if (tractionEl) {
        const rect = tractionEl.getBoundingClientRect()
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
        backgroundColor: scrolled ? 'rgba(26,58,36,0.85)' : 'rgba(26,58,36,0.4)',
        borderBottomColor: scrolled ? 'rgba(180,212,41,0.2)' : 'rgba(180,212,41,0.05)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.25)' : '0 0px 0px rgba(0,0,0,0)',
        opacity: hideNav ? 0 : 1,
        pointerEvents: hideNav ? 'none' : 'auto',
        transition:
          'background-color 300ms var(--ease-out), border-color 300ms var(--ease-out), box-shadow 300ms var(--ease-out), opacity 300ms var(--ease-out)',
      }}
    >
      {/* Logo */}
      <div className="font-display font-bold text-2xl sm:text-3xl tracking-tight select-none" style={{ color: '#F5F4F0' }}>
        Timelly
      </div>

      {/* CTA */}
      <a
        href="mailto:timelly.tech@gmail.com"
        className="font-body text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-2.5 sm:px-7 sm:py-3 rounded-sm transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
        style={{ backgroundColor: '#B4D429', color: '#1A3A24', border: '1px solid rgba(180,212,41,0.5)' }}
      >
        Schedule a Call
      </a>
    </nav>
  )
}
