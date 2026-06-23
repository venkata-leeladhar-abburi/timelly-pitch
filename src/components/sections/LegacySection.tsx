'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const CREAM = '#E9ECDB'
const LIME = '#A3C72E'
const OLIVE_BG = '#23271A'

type Token = { text: string; accent?: boolean; breakAfter?: boolean }

const TOKENS: Token[] = [
  { text: 'THIS' },
  { text: "ISN'T" },
  { text: 'A' },
  { text: 'SCHOOL', accent: true },
  { text: 'SOFTWARE', accent: true },
  { text: 'COMPANY.', breakAfter: true },
  { text: "IT'S" },
  { text: 'AN' },
  { text: 'EDUCATION' },
  { text: 'INFRASTRUCTURE', accent: true },
  { text: 'COMPANY.' },
]

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean)
      gsap.set(words, { opacity: 0.16 })

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
      id="section-legacy"
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

      <p
        className="relative z-10 max-w-[22ch] text-center font-display uppercase leading-[1.05] tracking-tight md:max-w-[26ch]"
        style={{
          color: CREAM,
          fontSize: 'clamp(36px, 5.4vw, 84px)',
        }}
      >
        {TOKENS.map((t, i) => (
          <span key={i}>
            <span
              ref={(el) => {
                wordsRef.current[i] = el
              }}
              className={t.accent ? 'font-serif font-semibold' : undefined}
              style={t.accent ? { color: LIME } : undefined}
            >
              {t.text}
            </span>
            {i < TOKENS.length - 1 ? (t.breakAfter ? <br /> : ' ') : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
