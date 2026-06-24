'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

// ─── LIGHT THEME — matches original light market section palette ───────────────
const BG       = '#F5F4F0'
const BG_ALT   = '#EFEDE5'
const INK      = '#1A3A24'   // dark forest green — clearly green, not black
const INK_DIM  = 'rgba(26,58,36,0.60)'
const LIME     = '#B4D429'
const LIME_DIM = 'rgba(180,212,41,0.15)'
const LIME_BRD = 'rgba(180,212,41,0.40)'
const BORDER   = 'rgba(26,58,36,0.12)'
const WHITE    = '#FFFFFF'

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    number: '1.5M+',
    heading: 'Schools Across India',
    body: 'A massive market still dominated by paperwork, spreadsheets, WhatsApp groups, and disconnected software.',
  },
  {
    number: '260M+',
    heading: 'Students',
    body: 'Every student represents years of learning, engagement, and growth that remains largely disconnected.',
  },
  {
    number: '500M+',
    heading: 'Parents & Guardians',
    body: 'The most important stakeholders in education are often the least informed.',
  },
  {
    number: '10B+',
    heading: 'Educational Interactions / Year',
    body: 'Attendance, communication, homework, assessments, payments, and progress tracking all create opportunities for transformation.',
  },
]

const MARKET_SIZES = [
  {
    abbr: 'TAM',
    title: 'Total Addressable Market',
    subValue: 'USD 42.58B by 2030 · CAGR 15.5%',
    desc: 'Global school management software market driven by rising digitisation, centralised student data, cloud-based administration and fee management systems.',
  },
  {
    abbr: 'SAM',
    title: 'Serviceable Available Market',
    subValue: 'USD 1.16B by 2034 · CAGR 12.17%',
    desc: "India's student information system market expanding through digital school platforms, parent-teacher communication tools, and analytics-based academic administration.",
  },
  {
    abbr: 'SOM',
    title: 'Serviceable Obtainable Market',
    subValue: '₹1.0 Crore annually · FY 2025–26',
    desc: "Based on 0.5% penetration of Andhra Pradesh's school-going student base at ₹125/student/month, targeting schools seeking affordable digital operations.",
  },
]

const LADDER = [
  'SCHOOLS',
  'INTERMEDIATE',
  'DEGREE COLLEGES',
  'UNIVERSITIES',
  'SKILL PLATFORMS',
]

// ─── Counter hook ─────────────────────────────────────────────────────────────
function useCounterAnim(ref: React.RefObject<HTMLElement | null>, target: string) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const match = target.match(/^([\d.]+)([A-Z+]+.*)$/)
    if (!match) return
    const num    = parseFloat(match[1])
    const suffix = match[2]
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: num,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
      onUpdate: () => {
        el.textContent = (Number.isInteger(num)
          ? Math.round(obj.val).toString()
          : obj.val.toFixed(1)
        ) + suffix
      },
    })
    return () => { tween.kill() }
  }, [ref, target])
}

// ─── Stat Card — light theme ──────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  useCounterAnim(numberRef as React.RefObject<HTMLElement>, stat.number)

  useEffect(() => {
    const el = cardRef.current; if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    })
  }, [index])

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-8 flex flex-col gap-4 shadow-sm"
      style={{ background: WHITE, border: `1px solid ${BORDER}` }}
    >
      <span
        ref={numberRef}
        className="font-body font-bold leading-[1.08]"
        style={{ color: INK, fontSize: 'clamp(32px,4vw,56px)' }}
      >
        {stat.number}
      </span>
      <h3 className="font-body text-lg font-bold" style={{ color: INK }}>
        {stat.heading}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: INK_DIM }}>
        {stat.body}
      </p>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function MarketSection() {
  const headingRef       = useRef<HTMLDivElement>(null)
  const bigMomentRef     = useRef<HTMLDivElement>(null)
  const ladderRef        = useRef<HTMLDivElement>(null)
  const endingRef        = useRef<HTMLDivElement>(null)
  const finalLineRef     = useRef<HTMLDivElement>(null)
  const tamCircleRef     = useRef<SVGCircleElement>(null)
  const samCircleRef     = useRef<SVGCircleElement>(null)
  const somCircleRef     = useRef<SVGCircleElement>(null)
  const tamSamSomCardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      }

      // Big Investor Moment
      if (bigMomentRef.current) {
        const top = bigMomentRef.current.querySelector('.bim-top')
        const btm = bigMomentRef.current.querySelector('.bim-btm')
        const sub = bigMomentRef.current.querySelector('.bim-sub')
        gsap.set([top, btm, sub], { opacity: 0 })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: bigMomentRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
        tl.fromTo(top, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          .fromTo(btm, { y:  30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .fromTo(sub, { opacity: 0 },          { opacity: 1, duration: 0.6 }, '-=0.3')
      }

      // TAM SAM SOM
      if (tamCircleRef.current && samCircleRef.current && somCircleRef.current && tamSamSomCardsRef.current) {
        gsap.set([tamCircleRef.current, samCircleRef.current, somCircleRef.current], { scale: 0, transformOrigin: '50% 90%' })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '#market-size-section', start: 'top 70%', toggleActions: 'play none none reverse' },
        })
        tl.to(tamCircleRef.current, { scale: 1, duration: 0.8, ease: 'back.out(1.2)' })
          .to(samCircleRef.current, { scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.5')
          .to(somCircleRef.current, { scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.5')
        const cards = tamSamSomCardsRef.current.querySelectorAll('.tss-card')
        tl.fromTo(cards, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=1.0')
      }

      // Expansion ladder
      if (ladderRef.current) {
        const items = ladderRef.current.querySelectorAll('.ladder-item')
        gsap.fromTo(items, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ladderRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      }

      // Ending
      if (endingRef.current) {
        gsap.fromTo(endingRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: endingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      }

      // Final one-liner
      if (finalLineRef.current) {
        gsap.fromTo(finalLineRef.current, { opacity: 0, scale: 0.9 }, {
          opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: finalLineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ══ BLOCK 1 — HEADER + BIG HORIZONTAL HEADLINE ══ */}
      <section
        id="section-market"
        className="relative w-full overflow-hidden px-[8vw] pt-20 pb-20"
        style={{ backgroundColor: BG }}
      >
        {/* "THE MARKET." — small, centred, mixed fonts */}
        <div className="mb-10 flex flex-col items-center text-center">
          {/* Badge */}
          <span
            className="inline-block mb-5 rounded-full px-4 py-1.5 font-body text-xs font-bold tracking-[0.3em] uppercase"
            style={{ background: LIME_DIM, border: `1px solid ${LIME_BRD}`, color: INK }}
          >
            MARKET OPPORTUNITY
          </span>

          {/* THE MARKET. — moderate size, both fonts */}
          <h2
            className="uppercase tracking-tight leading-[1.05]"
            style={{ color: INK }}
          >
            <span
              className="font-body font-bold"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              THE{' '}
            </span>
            <span
              className="font-display font-bold"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: INK }}
            >
              MARKET
            </span>
            <span
              className="font-display font-bold"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: LIME }}
            >
              .
            </span>
          </h2>
        </div>

        {/* Big horizontal headline */}
        <div ref={headingRef} className="text-center">
          {/* Line 1 */}
          <div
            className="font-body font-bold uppercase tracking-tight leading-[1.05] text-center"
            style={{ fontSize: 'clamp(36px, 6.2vw, 96px)', color: INK }}
          >
            <span>WE</span>{' '}
            <span>AREN&apos;T</span>{' '}
            <span>BUILDING</span>{' '}
            <span>FOR</span>{' '}
            <span>A</span>{' '}
            <span className="font-display" style={{ color: LIME }}>FEW</span>{' '}
            <span>SCHOOLS.</span>
          </div>
          {/* Line 2 */}
          <div
            className="font-body font-bold uppercase tracking-tight leading-[1.05] text-center mt-2"
            style={{ fontSize: 'clamp(36px, 6.2vw, 96px)', color: INK }}
          >
            <span>WE&apos;RE</span>{' '}
            <span>BUILDING</span>{' '}
            <span>FOR</span>{' '}
            <span className="font-display" style={{ color: LIME }}>AN</span>{' '}
            <span>ENTIRE</span>{' '}
            <span className="font-display" style={{ color: LIME }}>EDUCATION</span>{' '}
            <span>SYSTEM.</span>
          </div>
        </div>
      </section>

      {/* ══ BLOCK 2 — 4 STAT CARDS (light theme) ══ */}
      <section className="relative w-full px-[8vw] py-20" style={{ backgroundColor: BG_ALT }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {STATS.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
        </div>
      </section>

      {/* ══ BLOCK 3 — BIG INVESTOR MOMENT (dark theme) ══ */}
      <section
        ref={bigMomentRef}
        className="relative w-full px-[8vw] py-32 overflow-hidden"
        style={{ backgroundColor: '#23271A' }}
      >
        {/* Contour lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1400 600" fill="none" stroke="#E9ECDB" strokeWidth="1" aria-hidden>
          <path d="M-100 150 C 300 60, 600 280, 1000 150 S 1500 80, 1600 220" />
          <path d="M-100 300 C 300 210, 600 430, 1000 300 S 1500 230, 1600 370" />
          <path d="M-100 450 C 300 360, 600 560, 1000 450 S 1500 380, 1600 520" />
          <ellipse cx="220" cy="300" rx="200" ry="140" />
          <ellipse cx="1180" cy="280" rx="260" ry="180" />
        </svg>

        <div className="relative z-10 max-w-[1200px] mx-auto text-center">
          <div className="bim-top mb-4">
            {[
              [{ text: 'THIS' }, { text: "ISN'T" }, { text: 'A' }, { text: 'SCHOOL' }],
              [{ text: 'SOFTWARE', lime: true }, { text: 'MARKET.' }],
            ].map((line, i) => (
              <div key={i} className="text-center">
                {line.map((w: {text:string;lime?:boolean}, j) => (
                  <span key={j}>
                    <span
                      className={`leading-[1.05] tracking-tight uppercase ${w.lime ? 'font-display font-bold' : 'font-body font-bold'}`}
                      style={{ color: w.lime ? '#B4D429' : '#F0EDE6', fontSize: 'clamp(38px,5.8vw,86px)' }}
                    >
                      {w.text}
                    </span>
                    {j < line.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="bim-btm">
            <div className="mx-auto my-7 h-px w-24" style={{ background: 'rgba(180,212,41,0.4)' }} />
            {[
              [{ text: "IT'S" }, { text: 'AN' }, { text: 'EDUCATION' }],
              [{ text: 'INFRASTRUCTURE', lime: true }, { text: 'MARKET.' }],
            ].map((line, i) => (
              <div key={i} className="text-center">
                {line.map((w: {text:string;lime?:boolean}, j) => (
                  <span key={j}>
                    <span
                      className={`leading-[1.05] tracking-tight uppercase ${w.lime ? 'font-display font-bold' : 'font-body font-bold'}`}
                      style={{ color: w.lime ? '#B4D429' : '#F0EDE6', fontSize: 'clamp(38px,5.8vw,86px)' }}
                    >
                      {w.text}
                    </span>
                    {j < line.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="bim-sub mt-10 space-y-1">
            <p className="font-body text-lg" style={{ color: 'rgba(240,237,230,0.55)' }}>The institutions may change.</p>
            <p className="font-body text-lg font-semibold" style={{ color: '#F0EDE6' }}>The infrastructure remains the same.</p>
          </div>
        </div>
      </section>

      {/* ══ BLOCK 4 — TAM / SAM / SOM — redesigned ══ */}
      <section id="market-size-section" className="relative w-full px-[8vw] py-24" style={{ backgroundColor: BG_ALT }}>
        <div className="max-w-[1400px] mx-auto">

          {/* Section label + heading */}
          <div className="mb-14">
            <span
              className="inline-block mb-5 rounded-full px-4 py-1.5 font-body text-xs font-bold tracking-[0.3em] uppercase"
              style={{ background: 'rgba(30,42,26,0.08)', border: `1px solid ${BORDER}`, color: INK }}
            >
              MARKET SIZE
            </span>
            <div>
              <span className="font-body font-bold uppercase leading-[1.05] tracking-tight" style={{ color: INK, fontSize: 'clamp(38px,5.5vw,80px)' }}>THE</span>{' '}
              <span className="font-display font-bold uppercase leading-[1.05] tracking-tight" style={{ color: LIME, fontSize: 'clamp(38px,5.5vw,80px)' }}>OPPORTUNITY</span><span className="font-display font-bold uppercase leading-[1.05] tracking-tight" style={{ color: LIME, fontSize: 'clamp(38px,5.5vw,80px)' }}>.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
            {/* Circles */}
            <div className="flex justify-center relative h-[400px] w-full">
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px]">
                <circle ref={tamCircleRef} cx="200" cy="180" r="160" fill={INK} opacity="0.95" />
                <text x="200" y="70" textAnchor="middle" fill={LIME} fontSize="14" fontWeight="bold" letterSpacing="4" className="font-body">TAM</text>
                <text x="200" y="90" textAnchor="middle" fill="#F5F4F0" fontSize="13" fontWeight="600" className="font-body">42.58 B</text>

                <circle ref={samCircleRef} cx="200" cy="220" r="120" fill="#2A5C34" opacity="0.95" />
                <text x="200" y="160" textAnchor="middle" fill={LIME} fontSize="13" fontWeight="bold" letterSpacing="4" className="font-body">SAM</text>
                <text x="200" y="178" textAnchor="middle" fill="#F5F4F0" fontSize="12" fontWeight="600" className="font-body">1.16 B</text>

                <circle ref={somCircleRef} cx="200" cy="270" r="70" fill={LIME} opacity="0.25" />
                <text x="200" y="262" textAnchor="middle" fill={INK} fontSize="12" fontWeight="bold" letterSpacing="3" className="font-body">SOM</text>
                <text x="200" y="280" textAnchor="middle" fill={INK} fontSize="11" fontWeight="600" className="font-body">₹1 CR</text>
              </svg>
            </div>

            {/* Vertical metric cards */}
            <div ref={tamSamSomCardsRef} className="flex flex-col gap-6">
              {MARKET_SIZES.map((item, i) => (
                <div
                  key={i}
                  className="tss-card rounded-2xl p-7 shadow-sm"
                  style={{ background: WHITE, border: `1px solid ${BORDER}` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="rounded-full px-3 py-1 font-body text-xs font-bold tracking-widest uppercase"
                      style={{ background: 'rgba(30,42,26,0.08)', border: `1px solid ${BORDER}`, color: INK }}
                    >
                      {item.abbr}
                    </span>
                    <h4 className="font-body font-bold text-base" style={{ color: INK }}>{item.title}</h4>
                  </div>
                  <p className="font-body text-sm font-semibold mb-2" style={{ color: INK }}>{item.subValue}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: INK_DIM }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BLOCK 5 — EXPANSION VISION — redesigned ══ */}
      <section
        className="relative w-full px-[8vw] py-24 overflow-hidden"
        style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label + heading */}
          <div className="mb-14 flex flex-col items-center text-center">
            <span
              className="inline-block mb-5 rounded-full px-4 py-1.5 font-body text-xs font-bold tracking-[0.3em] uppercase"
              style={{ background: 'rgba(30,42,26,0.08)', border: `1px solid ${BORDER}`, color: INK }}
            >
              EXPANSION VISION
            </span>
            <h3 className="font-body font-bold uppercase text-[clamp(44px,7vw,100px)] leading-[1.05] tracking-tight flex flex-col items-center justify-center w-full max-w-[1200px]">
              <div className="text-center">
                <span className="font-display font-bold" style={{ color: LIME }}>ONE</span>{' '}
                <span style={{ color: INK }}>PLATFORM.</span>
              </div>
              <div className="text-center mt-1 md:mt-2">
                <span style={{ color: INK }}>MULTIPLE</span>{' '}
                <span className="font-display font-bold" style={{ color: LIME }}>SEGMENTS.</span>
              </div>
            </h3>
            <p className="mt-8 font-body text-base md:text-xl leading-relaxed max-w-2xl text-center" style={{ color: INK_DIM }}>
              The same foundation that powers schools today can power lifelong learning tomorrow.
            </p>
          </div>

          {/* Ladder — horizontal chips */}
          <div ref={ladderRef} className="flex flex-wrap items-center justify-center gap-3">
            {LADDER.map((item, i) => (
              <div key={item} className="flex items-center gap-3 ladder-item">
                <div
                  className="rounded-full px-6 py-3 font-body text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    background: i === 0 ? INK : WHITE,
                    border: `1px solid ${i === 0 ? INK : BORDER}`,
                    color: i === 0 ? '#F0EDE6' : INK,
                  }}
                >
                  {item}
                </div>
                {i < LADDER.length - 1 && (
                  <span className="font-body text-sm font-bold" style={{ color: INK_DIM }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOCK 6 — ENDING STATEMENT — redesigned ══ */}
      <section
        className="relative w-full px-[8vw] py-24"
        style={{ backgroundColor: BG_ALT, borderTop: `1px solid ${BORDER}` }}
      >
        <div ref={endingRef} className="max-w-[1400px] mx-auto">
          {/* Full-width headline */}
          <div className="mb-14 flex flex-col items-center text-center">
            <h3 className="font-body font-bold uppercase text-[clamp(44px,7vw,100px)] leading-[1.05] tracking-tight flex flex-col items-center justify-center w-full max-w-[1200px]">
              <div className="text-center">
                <span style={{ color: INK }}>THE</span>{' '}
                <span className="font-display font-bold" style={{ color: LIME }}>MARKET</span>{' '}
                <span style={{ color: INK }}>ISN'T</span>
              </div>
              <div className="text-center mt-1 md:mt-2">
                <span style={{ color: INK }}>MEASURED</span>{' '}
                <span style={{ color: INK }}>IN</span>{' '}
                <span className="font-display font-bold" style={{ color: LIME }}>INSTITUTIONS.</span>
              </div>
              <div className="text-center mt-6 md:mt-8">
                <span style={{ color: INK }}>IT'S</span>{' '}
                <span style={{ color: INK }}>MEASURED</span>
              </div>
              <div className="text-center mt-1 md:mt-2">
                <span className="font-display font-bold" style={{ color: LIME }}>IN</span>{' '}
                <span style={{ color: INK }}>LEARNERS.</span>
              </div>
            </h3>
          </div>

          {/* Three stat cards below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Millions of students.', 'Millions of parents.', 'Millions of educational journeys.'].map((line, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 shadow-sm"
                style={{ background: WHITE, border: `1px solid ${BORDER}` }}
              >
                <div className="mb-3 h-1 w-8 rounded-full" style={{ background: INK }} />
                <p className="font-body text-lg font-semibold" style={{ color: INK }}>{line}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-body text-base font-bold" style={{ color: INK }}>One connected ecosystem.</p>
        </div>
      </section>

      {/* ══ BLOCK 7 — FINAL ONE-LINER ══ */}
      <section
        className="relative w-full overflow-hidden flex items-center justify-center py-36"
        style={{ backgroundColor: BG }}
      >
        <div ref={finalLineRef} className="relative z-10 text-center px-[8vw]">
          <div className="mb-4">
            <div>
              {['FROM', '1', 'SCHOOL'].map((w, i) => (
                <span key={i}>
                  <span
                    className="font-body font-bold leading-[1.05] tracking-tight uppercase"
                    style={{ color: i === 1 ? LIME : INK, fontSize: 'clamp(44px,7vw,110px)' }}
                  >
                    {w}
                  </span>
                  {i < 2 ? ' ' : ''}
                </span>
              ))}
            </div>
            <div>
              {[{ w: 'TO', lime: false }, { w: 'AN', lime: false }, { w: 'ENTIRE', lime: true }, { w: 'GENERATION.', lime: false }].map((obj, i) => (
                <span key={i}>
                  <span
                    className={`leading-[1.05] tracking-tight uppercase ${obj.lime ? 'font-display font-bold' : 'font-body font-bold'}`}
                    style={{ color: obj.lime ? LIME : INK, fontSize: 'clamp(44px,7vw,110px)' }}
                  >
                    {obj.w}
                  </span>
                  {i < 3 ? ' ' : ''}
                </span>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-8 h-px w-24" style={{ background: LIME_BRD }} />
        </div>
      </section>

      <div className="section-divider w-full bg-border" />
    </>
  )
}
