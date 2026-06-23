'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Premium Dark Olive Theme (Inspired by Image 2)
const BG_COLOR = '#262A22'
const CREAM = '#EBE9DF'
const LIME = '#B4D429'
const CARD_BG = 'rgba(235, 233, 223, 0.03)'
const CARD_BORDER = 'rgba(235, 233, 223, 0.08)'

// ─── Icons Matching Journey Section Style (but themed) ─────────────────────────
const SVGI = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={CREAM}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

const Icons = {
  Unified: () => (
    <SVGI>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </SVGI>
  ),
  Parent: () => (
    <SVGI>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </SVGI>
  ),
  Comm: () => (
    <SVGI>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </SVGI>
  ),
  AI: () => (
    <SVGI>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </SVGI>
  ),
  Growth: () => (
    <SVGI>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </SVGI>
  ),
  Teacher: () => (
    <SVGI>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </SVGI>
  ),
  Finance: () => (
    <SVGI>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </SVGI>
  ),
  Data: () => (
    <SVGI>
      <rect x="18" y="3" width="4" height="18" />
      <rect x="10" y="8" width="4" height="13" />
      <rect x="2" y="13" width="4" height="8" />
    </SVGI>
  ),
  MultiApp: () => (
    <SVGI>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </SVGI>
  ),
  Infra: () => (
    <SVGI>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </SVGI>
  ),
}

// ─── Data Arrays ──────────────────────────────────────────────────────────────
const CHAOS_ITEMS = [
  { label: '💬 WhatsApp Groups', rotation: -8, x: '12%', y: '20%' },
  { label: '📋 Fee Slips', rotation: 5, x: '82%', y: '25%' },
  { label: '📓 Registers', rotation: -5, x: '18%', y: '75%' },
  { label: '📚 Homework', rotation: 8, x: '78%', y: '80%' },
  { label: '📢 Notices', rotation: -6, x: '85%', y: '50%' },
  { label: '📊 Reports', rotation: 6, x: '8%', y: '50%' },
]

const CARD_1_ITEMS = [
  { label: 'UNIFIED OPERATIONS', icon: Icons.Unified },
  { label: 'PARENT ENGAGEMENT', icon: Icons.Parent },
  { label: 'REAL-TIME COMMUNICATION', icon: Icons.Comm },
  { label: 'AI SCHOOL INTELLIGENCE', icon: Icons.AI },
  { label: 'STUDENT GROWTH TRACKING', icon: Icons.Growth },
]

const CARD_2_ITEMS = [
  { label: 'TEACHER PRODUCTIVITY', icon: Icons.Teacher },
  { label: 'SMART FINANCIALS', icon: Icons.Finance },
  { label: 'DATA & ANALYTICS', icon: Icons.Data },
  { label: 'MULTI-APP ECOSYSTEM', icon: Icons.MultiApp },
  { label: 'EDUCATION INFRASTRUCTURE', icon: Icons.Infra },
]

export default function SolutionSection() {
  const containerRef = useRef<HTMLElement>(null)
  const chaosContainerRef = useRef<HTMLDivElement>(null)
  const transitionTextRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Pinned scrub animation only runs on tablet/desktop — on mobile the
    // section flows normally (see mobile-only markup below) since a
    // pinned 400vh scrub with this much content doesn't fit a small viewport.
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        // 1. Initial idle float for chaos items
        gsap.set('.chaos-item', { xPercent: -50, yPercent: -50 })
        const chaosItems = document.querySelectorAll('.chaos-item')
        chaosItems.forEach((item, i) => {
          gsap.to(item, {
            y: `+=${Math.random() * 20 - 10}`,
            rotation: `+=${Math.random() * 6 - 3}`,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
          })
        })

        // 2. Scrub timeline for backwards/forwards scrolling animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%', // 400vh scroll for smooth pacing
            scrub: 1, // smooth scrubbing effect
            pin: true,
          },
        })

        // Frame 0-2: Suck chaos into center and fade out
        tl.to(
          chaosContainerRef.current,
          {
            scale: 0.2,
            opacity: 0,
            duration: 2,
            ease: 'power2.in',
          },
          0
        )

        // Frame 2-3.5: Transition text appears (Huge Typography like Image 2)
        tl.fromTo(
          transitionTextRef.current,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: 'back.out(1.2)' },
          2
        )

        // Frame 4.5-6: Transition text disappears
        tl.to(
          transitionTextRef.current,
          { scale: 1.2, opacity: 0, duration: 1.5, ease: 'power2.in' },
          4.5
        )

        // Make cards container visible
        tl.set(cardsContainerRef.current, { opacity: 1 }, 4.5)

        // Frame 5.5-7.5: Cards slide in from bottom
        tl.fromTo(
          [card1Ref.current, card2Ref.current],
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            stagger: 0.2,
            ease: 'power3.out',
          },
          5.5
        )

        // Frame 7.5-10: Hold cards
        tl.to({}, { duration: 2.5 })
      }, containerRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      {/* ───────────────── Mobile — static, normal-flow layout ───────────────── */}
      <section
        className="relative block w-full overflow-hidden px-6 py-20 md:hidden"
        style={{ backgroundColor: BG_COLOR }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 600"
          fill="none"
          stroke={CREAM}
          strokeWidth="0.5"
          aria-hidden
        >
          <path d="M-50 120 C 250 40, 450 220, 750 120 S 1250 60, 1300 180" />
          <path d="M-50 480 C 300 400, 520 560, 820 480 S 1250 420, 1300 540" />
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            className="font-display text-[clamp(36px,9vw,48px)] tracking-tight uppercase"
            style={{ color: CREAM }}
          >
            THE SOLUTION<span style={{ color: LIME }}>.</span>
          </h2>

          <h3 className="mt-6 font-display text-[clamp(30px,8vw,40px)] leading-[1.05] tracking-tight uppercase" style={{ color: CREAM }}>
            SCHOOLS DON&apos;T NEED <span style={{ color: LIME }}>MORE</span> SOFTWARE.
            <br />
            THEY NEED ONE <span style={{ color: LIME }}>SYSTEM</span> THAT ACTUALLY WORKS.
          </h3>

          <p className="font-body text-base mt-6 leading-relaxed" style={{ color: CREAM, opacity: 0.75 }}>
            Timelly unifies administration, communication, academics, finance, and parent engagement into a single operating system designed for modern schools.
          </p>

          {/* Chaos tags — static flex-wrap, no absolute positioning */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {CHAOS_ITEMS.map((item, i) => (
              <span
                key={i}
                className="rounded-full border px-4 py-2 font-body text-xs font-semibold"
                style={{
                  transform: `rotate(${item.rotation / 2}deg)`,
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: CREAM,
                }}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Transition statement — condensed */}
          <h2 className="mt-16 font-display text-[clamp(28px,7vw,36px)] leading-[1.15] tracking-tight uppercase" style={{ color: CREAM }}>
            BUILT FOR <span style={{ color: LIME }}>PRINCIPALS.</span> LOVED BY{' '}
            <span style={{ color: LIME }}>TEACHERS.</span> TRUSTED BY{' '}
            <span style={{ color: LIME }}>PARENTS.</span>
          </h2>

          {/* Feature cards — stacked, normal flow, fully scrollable */}
          <div className="mt-12 flex w-full flex-col gap-6">
            {[CARD_1_ITEMS, CARD_2_ITEMS].map((cardItems, cardIdx) => (
              <div
                key={cardIdx}
                className="rounded-[24px] p-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
                style={{ backgroundColor: 'rgba(235,233,223,0.05)', border: `1px solid ${CARD_BORDER}` }}
              >
                <ul className="flex flex-col gap-5">
                  {cardItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'rgba(235, 233, 223, 0.05)', border: `1px solid ${CARD_BORDER}` }}
                      >
                        <item.icon />
                      </div>
                      <span
                        className="font-body text-xs font-bold tracking-widest uppercase"
                        style={{ color: CREAM }}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Desktop/tablet — pinned scrub animation ───────────────── */}
      <section
        ref={containerRef}
        className="relative hidden h-screen w-full overflow-hidden md:block"
        style={{ backgroundColor: BG_COLOR }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 600"
          fill="none"
          stroke={CREAM}
          strokeWidth="0.5"
          aria-hidden
        >
          <path d="M-50 120 C 250 40, 450 220, 750 120 S 1250 60, 1300 180" />
          <path d="M-50 480 C 300 400, 520 560, 820 480 S 1250 420, 1300 540" />
          <path d="M200 -50 C 150 200, 400 400, 300 700" />
          <path d="M900 -50 C 1000 250, 700 450, 850 700" />
        </svg>

        {/* 1. Chaos & Heading Container (Image 1 Style) */}
        <div
          ref={chaosContainerRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
        >
          {/* Section Heading */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full">
            <h2 
              className="font-display text-[clamp(44px,6vw,80px)] tracking-tight uppercase"
              style={{ color: CREAM }}
            >
              THE SOLUTION<span style={{ color: LIME }}>.</span>
            </h2>
          </div>

          {/* Main Headline */}
          <h3 className="mt-12 font-display text-[clamp(44px,7vw,100px)] leading-[0.85] tracking-tight uppercase flex flex-col items-center justify-center w-full z-10">
            <div className="flex flex-wrap justify-center gap-x-[0.25em]">
              <span style={{ color: CREAM }}>SCHOOLS</span>
              <span style={{ color: CREAM }}>DON'T</span>
              <span style={{ color: CREAM }}>NEED</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
              <span style={{ color: LIME }}>MORE</span>
              <span style={{ color: CREAM }}>SOFTWARE.</span>
              <span style={{ color: CREAM }}>THEY</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
              <span style={{ color: CREAM }}>NEED</span>
              <span style={{ color: CREAM }}>ONE</span>
              <span style={{ color: LIME }}>SYSTEM</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
              <span style={{ color: CREAM }}>THAT</span>
              <span style={{ color: CREAM }}>ACTUALLY</span>
              <span style={{ color: CREAM }}>WORKS.</span>
            </div>
          </h3>
          <p 
            className="font-body text-lg md:text-xl max-w-2xl mt-8 z-10"
            style={{ color: CREAM, opacity: 0.8 }}
          >
            Timelly unifies administration, communication, academics, finance, and parent engagement into a single operating system designed for modern schools.
          </p>

          {/* Floating Chaos Objects */}
          {CHAOS_ITEMS.map((item, i) => (
            <div
              key={i}
              className="chaos-item absolute rounded-full border px-6 py-3 font-body text-sm md:text-base font-semibold backdrop-blur-md shadow-2xl flex items-center justify-center"
              style={{
                left: item.x,
                top: item.y,
                transform: `rotate(${item.rotation}deg)`,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: CREAM,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* 2. Transition Statement (Image 2 Typography Style) */}
        <div
          ref={transitionTextRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <h2 className="font-display text-[clamp(50px,8vw,120px)] leading-[0.85] tracking-tight uppercase flex flex-col items-center justify-center w-full">
            <div className="flex flex-wrap justify-center gap-x-[0.25em]">
              <span style={{ color: CREAM }}>BUILT</span>
              <span style={{ color: CREAM }}>FOR</span>
              <span style={{ color: LIME }}>PRINCIPALS.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
              <span style={{ color: CREAM }}>LOVED</span>
              <span style={{ color: CREAM }}>BY</span>
              <span style={{ color: LIME }}>TEACHERS.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
              <span style={{ color: CREAM }}>TRUSTED</span>
              <span style={{ color: CREAM }}>BY</span>
              <span style={{ color: LIME }}>PARENTS.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
              <span style={{ color: CREAM }}>DESIGNED</span>
              <span style={{ color: CREAM }}>FOR</span>
              <span style={{ color: LIME }}>STUDENTS.</span>
            </div>
          </h2>
        </div>

        {/* 3. The Two Feature Cards (Dark Mode Glassmorphic) */}
        <div
          ref={cardsContainerRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 pt-16"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto">
            {/* Card 1 */}
            <div
              ref={card1Ref}
              className="rounded-[32px] p-10 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
              style={{ backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
            >
              <ul className="space-y-7">
                {CARD_1_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-5">
                    <div 
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-sm"
                      style={{ backgroundColor: 'rgba(235, 233, 223, 0.05)', border: `1px solid ${CARD_BORDER}` }}
                    >
                      <item.icon />
                    </div>
                    <span 
                      className="font-body text-sm md:text-base font-bold tracking-widest uppercase"
                      style={{ color: CREAM }}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 */}
            <div
              ref={card2Ref}
              className="rounded-[32px] p-10 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
              style={{ backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
            >
              <ul className="space-y-7">
                {CARD_2_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-5">
                    <div 
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-sm"
                      style={{ backgroundColor: 'rgba(235, 233, 223, 0.05)', border: `1px solid ${CARD_BORDER}` }}
                    >
                      <item.icon />
                    </div>
                    <span 
                      className="font-body text-sm md:text-base font-bold tracking-widest uppercase"
                      style={{ color: CREAM }}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ending Section (Static, flows naturally with the Dark Olive theme) */}
      <div 
        className="relative z-40 w-full py-32 px-8 md:px-16 flex flex-col items-center text-center border-t border-white/5"
        style={{ backgroundColor: BG_COLOR }}
      >
        <h2 className="font-display text-[clamp(44px,7vw,110px)] leading-[0.85] tracking-tight uppercase flex flex-col items-center justify-center w-full mb-10">
          <div className="flex flex-wrap justify-center gap-x-[0.25em]">
            <span style={{ color: CREAM }}>THE</span>
            <span style={{ color: CREAM }}>COST</span>
            <span style={{ color: CREAM }}>OF</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
            <span style={{ color: LIME }}>TIMELLY</span>
            <span style={{ color: CREAM }}>IS</span>
            <span style={{ color: CREAM }}>LESS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
            <span style={{ color: CREAM }}>THAN</span>
            <span style={{ color: CREAM }}>THE</span>
            <span style={{ color: CREAM }}>COST</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.25em] mt-1 md:mt-2">
            <span style={{ color: CREAM }}>OF</span>
            <span style={{ color: LIME }}>CHAOS.</span>
          </div>
        </h2>
        <p 
          className="font-body text-lg md:text-xl max-w-3xl mb-20 leading-relaxed"
          style={{ color: CREAM, opacity: 0.8 }}
        >
          For just <strong style={{ color: LIME }}>₹199 per student per year</strong>, schools replace paperwork, disconnected communication, and operational inefficiencies with a unified digital ecosystem.
        </p>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-4xl">
          {/* Highlight Box */}
          <div 
            className="rounded-[32px] p-10 md:p-14 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col items-center transition-transform duration-500 hover:scale-105"
            style={{ backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <span 
              className="font-display text-[clamp(64px,10vw,100px)] leading-none mb-4"
              style={{ color: LIME }}
            >
              ₹199
            </span>
            <span
              className="font-body text-sm md:text-base font-bold tracking-[0.3em]"
              style={{ color: CREAM, opacity: 0.6 }}
            >
              / STUDENT / YEAR
            </span>
          </div>

          {/* Benefits List */}
          <div className="flex flex-col items-start gap-6 text-left ml-0 md:ml-8">
            {['Transform Operations.', 'Improve Engagement.', 'Scale Smarter.'].map((text) => (
              <div key={text} className="flex items-center gap-4">
                <span 
                  className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg"
                  style={{ backgroundColor: 'rgba(180, 212, 41, 0.15)', color: LIME }}
                >
                  ✓
                </span>
                <span 
                  className="font-body text-xl md:text-2xl font-medium tracking-tight"
                  style={{ color: CREAM }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
