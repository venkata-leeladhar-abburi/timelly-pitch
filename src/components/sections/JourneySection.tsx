'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const OLIVE = '#7E8B4F'
const GREEN = '#B4D429'
const INK = '#1A3A24'

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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F5F4F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 2h6v4H9z" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F5F4F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F5F4F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  )
}

function TimellyMark() {
  return (
    <svg
      className="w-10 h-10"
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
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl shadow-[0_8px_24px_rgba(180,212,41,0.4)] transition-transform duration-300 hover:scale-110 md:h-20 md:w-20"
        style={{ backgroundColor: GREEN }}
      >
        <TimellyMark />
      </div>
    )
  }
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 hover:rotate-6 md:h-20 md:w-20"
      style={{ border: `1.5px solid rgba(245,244,240,0.15)`, backgroundColor: 'rgba(245,244,240,0.04)' }}
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
          <h2 className="font-bold text-[clamp(44px,6vw,80px)] tracking-tight uppercase" style={{ color: INK }}>
            <span className="font-body">THE</span>{' '}
            <span className="font-display" style={{ color: GREEN }}>JOURNEY.</span>
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
              className={`group relative z-10 flex w-full flex-row items-center gap-5 rounded-3xl bg-[#1A3A24] p-6 text-left shadow-[0_20px_40px_rgba(26,58,36,0.15)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_54px_rgba(180,212,41,0.2)] md:w-[22%] md:flex-col md:items-start md:p-8 md:text-left ${
                i % 2 === 0 ? 'md:mt-24' : 'md:-mt-4'
              }`}
            >
              {/* Card top glow line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#B4D429] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="shrink-0 mb-2 md:mb-6">
                <StepIcon variant={step.variant} index={i} />
              </div>
              <div className="flex-1 w-full flex flex-col justify-between">
                {step.range && (
                  <p className="mb-2 font-body text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: GREEN }}>
                    {step.range}
                  </p>
                )}
                <h3 className="font-body text-2xl font-bold leading-snug text-[#F5F4F0] lg:text-3xl">
                  {step.title}
                  {step.highlight && (
                    <>
                      {' '}
                      <span className="font-display font-bold" style={{ color: GREEN }}>{step.highlight}</span>
                    </>
                  )}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
