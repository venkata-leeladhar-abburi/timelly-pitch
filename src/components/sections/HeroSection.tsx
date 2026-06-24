'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useFramePlayer } from '@/hooks/useFramePlayer'
import LoadingScreen from '@/components/ui/LoadingScreen'

// Text overlay data — synced to scroll progress
const TEXT_BEATS = [
  {
    range: [0, 0.25],
    label: 'TIMELLY · 2025',
    headline: ['BUILDING', 'THE FUTURE', 'OF EDUCATION.'],
    body: 'India. Schools. Families.',
    align: 'center',
  },
  {
    range: [0.25, 0.55],
    label: 'THE PROBLEM',
    headline: ['24 CRORE', 'STUDENTS.'],
    body: 'Running on WhatsApp\nand paper registers.',
    align: 'left',
  },
  {
    range: [0.55, 0.82],
    label: 'THE MISSION',
    headline: ['ONE PLATFORM.', 'ONE SCHOOL.'],
    body: 'Attendance. Homework. Fees. Communication.\nAll in one place. For every school in India.',
    align: 'right',
  },
  {
    range: [0.82, 1.0],
    label: null,
    headline: ['THIS IS', 'TIMELLY.'],
    body: '↓ scroll to continue',
    align: 'center',
  },
] as const

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const [totalFrames, setTotalFrames] = useState(0)

  // Load frame count from meta.json
  useEffect(() => {
    fetch('/frames/hero/meta.json')
      .then((r) => r.json())
      .then((data) => setTotalFrames(data.totalFrames))
      .catch(() => setTotalFrames(192)) // fallback
  }, [])

  const { loadProgress, isLoaded } = useFramePlayer({
    framesPath: '/frames/hero/',
    totalFrames,
    sectionRef,
    canvasRef,
  })

  // Text beat animations — exactly one beat visible, driven by scroll progress.
  // Using a single onUpdate driver guarantees the correct beat shows at any
  // scroll position (including 0 on first paint) and prevents overlap.
  useEffect(() => {
    if (!isLoaded) return

    const els = textRefs.current
    els.forEach((el) => el && gsap.set(el, { opacity: 0, y: 30 }))

    let activeIndex = -1
    const apply = (progress: number) => {
      let idx = TEXT_BEATS.findIndex(
        (b) => progress >= b.range[0] && progress < b.range[1]
      )
      if (idx === -1) idx = progress >= 1 ? TEXT_BEATS.length - 1 : 0
      if (idx === activeIndex) return
      activeIndex = idx

      els.forEach((el, i) => {
        if (!el) return
        if (i === idx) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
          })
        } else {
          gsap.to(el, {
            opacity: 0,
            y: i < idx ? -20 : 20,
            duration: 0.4,
            overwrite: true,
          })
        }
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => apply(self.progress),
    })

    apply(0) // initialize first beat visible on load

    return () => trigger.kill()
  }, [isLoaded])

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      {/* Sticky scroll container — 600vh drives the scrub */}
      <section
        ref={sectionRef}
        id="section-hero"
        className="relative"
        style={{ height: '600vh' }}
      >
        {/* Sticky canvas wrapper */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg-primary">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'transform' }}
          />

          {/* Contrast scrim — frames have a light background, so darken the
              bottom where text sits to keep headlines readable */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 z-[5] pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(28,31,26,0.94) 0%, rgba(28,31,26,0.7) 35%, rgba(28,31,26,0) 100%)',
            }}
          />

          {/* Text overlays */}
          {TEXT_BEATS.map((beat, i) => (
            <div
              key={i}
              ref={(el) => {
                textRefs.current[i] = el
              }}
              className={`absolute bottom-[14%] sm:bottom-[12%] px-6 sm:px-8 md:px-12 z-10 w-full flex flex-col ${
                beat.align === 'center'
                  ? 'left-1/2 -translate-x-1/2 text-center items-center'
                  : beat.align === 'left'
                    ? 'left-0 text-center sm:text-left items-center sm:items-start max-w-full sm:max-w-xl md:max-w-2xl'
                    : 'right-0 text-center sm:text-right items-center sm:items-end max-w-full sm:max-w-xl md:max-w-2xl ml-auto'
              }`}
            >
              {beat.label && (
                <div className="font-body font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-5" style={{ color: '#B4D429' }}>
                  {beat.label}
                </div>
              )}
              <h1 className="font-display font-bold text-[clamp(48px,9vw,120px)] uppercase leading-[1.05] tracking-tight text-[#F5F4F0] mb-3 sm:mb-5">
                {beat.headline.map((line, j) => (
                  <span key={j} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h1>
              {beat.body && (
                <p className="font-body text-base md:text-xl font-medium whitespace-pre-line" style={{ color: 'rgba(245,244,240,0.85)' }}>
                  {beat.body}
                </p>
              )}
            </div>
          ))}

          {/* Scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <div className="w-px h-12 animate-pulse" style={{ backgroundColor: '#B4D429' }} />
          </div>
        </div>
      </section>

      {/* Bridge to founder section */}
      <div className="section-divider w-full" />
    </>
  )
}
