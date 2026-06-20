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
  { title: 'Software Consultant', range: '2016 – 2018', variant: 'icon' },
  { title: 'Built & Sold Startup', range: '2018 – 2020', variant: 'icon' },
  { title: 'Built & Sold EdTech Platform', range: '2020 – 2023', variant: 'icon' },
  { title: 'Founded', highlight: 'Timelly', range: '2024 – Present', variant: 'logo' },
]

function BriefcaseIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

function GradCapIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
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
        className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full shadow-[0_12px_32px_rgba(60,181,90,0.3)] transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: GREEN }}
      >
        <TimellyMark />
      </div>
    )
  }
  return (
    <div
      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 hover:scale-110"
      style={{ border: `1.5px solid ${INK}1F`, boxShadow: '0 12px 32px rgba(28,31,26,0.04)' }}
    >
      {index === 0 && <BriefcaseIcon />}
      {index === 1 && <RocketIcon />}
      {index === 2 && <GradCapIcon />}
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

        {/* Timeline container */}
        <div className="relative flex items-start justify-between gap-6 h-[380px]">
          {/* Connecting Winding Roadmap Path */}
          <div 
            ref={lineRef}
            className="absolute inset-x-0 top-0 z-0 pointer-events-none" 
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

          {STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className={`relative z-10 flex w-[22%] flex-col items-center rounded-2xl border border-[#1C1F1A]/15 bg-white p-6 text-center shadow-[0_12px_32px_rgba(28,31,26,0.05)] transition-all duration-300 hover:scale-105 hover:bg-[#F9F8F5] hover:border-[#1C1F1A]/25 hover:shadow-[0_16px_48px_rgba(28,31,26,0.08)] ${
                i % 2 === 0 ? 'mt-20' : 'mt-0'
              }`}
            >
              <StepIcon variant={step.variant} index={i} />
              <h3
                className="mt-8 font-body text-lg font-bold leading-snug text-[#1C1F1A] md:text-xl"
              >
                {step.title}
                {step.highlight && (
                  <>
                    {' '}
                    <span className="font-extrabold" style={{ color: GREEN }}>{step.highlight}</span>
                  </>
                )}
              </h3>
              <p className="mt-3 font-mono text-sm tracking-widest text-[#1C1F1A]/50 font-medium">
                {step.range}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
