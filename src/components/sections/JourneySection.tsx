'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const OLIVE = '#7E8B4F'
const GREEN = '#3CB55A'
const INK = '#1C1F1A'

type Step = {
  title: string
  highlight?: string
  range: string
  variant: 'icon' | 'logo'
}

const STEPS: Step[] = [
  { title: 'Incorporated', range: 'Nov 2025', variant: 'icon' },
  { title: '1st Version Developed', range: 'Apr 2025', variant: 'icon' },
  { title: 'Launched', range: 'May 2025', variant: 'icon' },
  { title: 'Onboarded 2 Schools', highlight: '& Generating Revenue', range: '', variant: 'logo' },
]

function IncorporatedIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 2h6v4H9z" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  )
}

function TimellyMark() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M30.5 44H68.5V31H42.5L30.5 44Z" fill="white" />
      <path d="M30.5 69H42.5V46L30.5 58V69Z" fill="white" />
    </svg>
  )
}

function StepIcon({ variant, index }: { variant: Step['variant']; index: number }) {
  if (variant === 'logo') {
    return (
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-[0_12px_32px_rgba(60,181,90,0.3)] transition-transform duration-300 hover:scale-110 md:h-28 md:w-28"
        style={{ backgroundColor: GREEN }}
      >
        <TimellyMark />
      </div>
    )
  }
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 hover:scale-110 md:h-28 md:w-28"
      style={{ border: `1.5px solid ${INK}1F`, boxShadow: '0 12px 32px rgba(28,31,26,0.04)' }}
    >
      {index === 0 && <IncorporatedIcon />}
      {index === 1 && <CodeIcon />}
      {index === 2 && <RocketIcon />}
    </div>
  )
}

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power2.inOut' },
          '-=0.2'
        )
        .fromTo(
          itemRefs.current.filter(Boolean),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
          '-=0.7'
        )
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-journey"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-8 py-28 md:px-16"
      style={{ backgroundColor: '#EFEDE5' }}
    >
      {/* Faint texture, matches founder section tone */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
        fill="none"
        stroke={INK}
        strokeWidth="1"
        aria-hidden
      >
        <path d="M-50 120 C 250 40, 450 220, 750 120 S 1250 60, 1300 180" />
        <path d="M-50 480 C 300 400, 520 560, 820 480 S 1250 420, 1300 540" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1450px]">
        {/* Section Title */}
        <div ref={labelRef} className="mb-24">
          <h2 className="font-display text-[clamp(44px,6vw,80px)] tracking-tight text-[#1C1F1A] uppercase">
            THE JOURNEY<span style={{ color: GREEN }}>.</span>
          </h2>
        </div>

        {/* Timeline container — vertical stack on mobile, winding road on desktop */}
        <div className="relative flex flex-col items-stretch gap-8 md:h-[380px] md:flex-row md:items-start md:justify-between md:gap-6">
          {/* Connecting Winding Roadmap Path — desktop only */}
          <div
            ref={lineRef}
            className="absolute inset-x-0 top-0 z-0 hidden pointer-events-none md:block"
            style={{ transformOrigin: 'left center' }}
          >
            <svg
              className="w-full h-[300px]"
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Winding road - Soft glow layer */}
              <path
                d="M 125 170 C 250 170, 250 90, 375 90 S 500 170, 625 170 S 750 90, 875 90"
                stroke={GREEN}
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.18"
              />
              {/* Winding road - Core green path */}
              <path
                d="M 125 170 C 250 170, 250 90, 375 90 S 500 170, 625 170 S 750 90, 875 90"
                stroke={GREEN}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Winding road - Center dashed lanes */}
              <path
                d="M 125 170 C 250 170, 250 90, 375 90 S 500 170, 625 170 S 750 90, 875 90"
                stroke="#EFEDE5"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Connecting vertical line — mobile only, runs through icon centers */}
          <div
            className="absolute left-[52px] top-12 bottom-12 z-0 w-[3px] rounded-full md:hidden"
            style={{ backgroundColor: `${GREEN}30` }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className={`relative z-10 flex w-full flex-row items-center gap-5 rounded-2xl border border-[#1C1F1A]/15 bg-white p-5 text-left shadow-[0_12px_32px_rgba(28,31,26,0.05)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#F9F8F5] hover:border-[#1C1F1A]/25 hover:shadow-[0_16px_48px_rgba(28,31,26,0.08)] md:w-[22%] md:flex-col md:items-center md:p-6 md:text-center ${
                i % 2 === 0 ? 'md:mt-20' : 'md:mt-0'
              }`}
            >
              <div className="shrink-0">
                <StepIcon variant={step.variant} index={i} />
              </div>
              <div>
                <h3 className="font-body text-base font-bold leading-snug text-[#1C1F1A] md:mt-8 md:text-lg lg:text-xl">
                  {step.title}
                  {step.highlight && (
                    <>
                      {' '}
                      <span className="font-serif font-semibold italic" style={{ color: GREEN }}>{step.highlight}</span>
                    </>
                  )}
                </h3>
                {step.range && (
                  <p className="mt-2 font-body text-xs tracking-widest text-[#1C1F1A]/50 font-medium md:mt-3 md:text-sm">
                    {step.range}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
