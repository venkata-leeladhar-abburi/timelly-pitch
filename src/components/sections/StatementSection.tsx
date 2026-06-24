'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const CREAM = '#E9ECDB'
const LIME = '#A3C72E'
const OLIVE_BG = '#23271A'

// Each token: text + whether it's a lime/serif accent word
const TOKENS: { text: string; accent?: boolean }[] = [
  { text: 'MOST' },
  { text: 'STARTUPS' },
  { text: 'BEGIN' },
  { text: 'WITH' },
  { text: 'AN' },
  { text: 'IDEA.', accent: true },
  { text: 'THIS' },
  { text: 'ONE' },
  { text: 'BEGAN' },
  { text: 'WITH' },
  { text: 'FRUSTRATION.', accent: true },
]

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean)
      gsap.set(words, { opacity: 0.16 })

      // Words light up sequentially as the section scrolls through the viewport
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      })
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-statement"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-28 md:px-16"
      style={{ backgroundColor: OLIVE_BG }}
    >
      {/* Faint topographic contour texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
        fill="none"
        stroke={CREAM}
        strokeWidth="1"
        style={{ opacity: 0.05 }}
        aria-hidden
      >
        <path d="M-50 120 C 250 40, 450 220, 750 120 S 1250 60, 1300 180" />
        <path d="M-50 220 C 250 140, 450 320, 750 220 S 1250 160, 1300 280" />
        <path d="M-50 360 C 300 280, 500 460, 800 360 S 1250 300, 1300 420" />
        <path d="M-50 480 C 300 400, 520 560, 820 480 S 1250 420, 1300 540" />
        <ellipse cx="180" cy="300" rx="160" ry="110" />
        <ellipse cx="1020" cy="260" rx="200" ry="140" />
      </svg>

      {/* Statement */}
      <p
        className="relative z-10 max-w-[14ch] text-center font-body font-bold uppercase leading-[0.95] tracking-tight md:max-w-[16ch]"
        style={{
          color: CREAM,
          fontSize: 'clamp(40px, 7vw, 112px)',
        }}
      >
        {TOKENS.map((t, i) => (
          <span key={i}>
            <span
              ref={(el) => {
                wordsRef.current[i] = el
              }}
              className={t.accent ? 'font-display font-bold' : undefined}
              style={t.accent ? { color: LIME } : undefined}
            >
              {t.text}
            </span>
            {i < TOKENS.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
