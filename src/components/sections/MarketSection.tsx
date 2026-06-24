'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── LIGHT THEME COLORS (dark green accent, not lime) ───────────────────────
const BG       = '#F5F4F0'
const BG_ALT   = '#EFEDE5'
const BG_WHITE = '#FFFFFF'
const INK      = '#1E2A1A'
const INK_DIM  = 'rgba(30,42,26,0.65)'
const SUBTLE   = 'rgba(30,42,26,0.06)'
const BORDER   = 'rgba(30,42,26,0.1)'
const GREEN    = '#2F6B3A'
const GREEN_DIM = 'rgba(47,107,58,0.1)'
const GREEN_MID = 'rgba(47,107,58,0.2)'

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
    body: 'Every student represents years of learning, engagement, communication, and growth that remains largely disconnected.',
  },
  {
    number: '500M+',
    heading: 'Parents & Guardians',
    body: 'The most important stakeholders in education are often the least informed.',
  },
  {
    number: '10B+',
    heading: 'Educational Interactions Every Year',
    body: 'Attendance, communication, homework, assessments, payments, and progress tracking all create opportunities for digital transformation.',
  },
]

const MARKET_SIZES = [
  {
    abbr: 'TAM',
    title: 'Total Addressable Market (TAM)',
    subValue: 'USD 20.18 Billion (2025), USD 42.58 Billion (2030) | CAGR 15.5%',
    desc: 'The global school management software market driven by rising digitisation of school operations, need for centralized student data, online communication, attendance tracking, fee management and cloud-based school administration systems.',
  },
  {
    abbr: 'SAM',
    title: 'Serviceable Available Market (SAM)',
    subValue: 'USD 403.3 Million (2025), USD 1.16 Billion (2034) | CAGR 12.17%',
    desc: 'India\'s student information system market is expanding due to increasing adoption of digital school platforms, student data management, parent-teacher communication tools, and analytics-based academic administration.',
  },
  {
    abbr: 'SOM',
    title: 'Serviceable Obtainable Market (SOM)',
    subValue: '₹1.0 Crore annually | Initial Phase (FY 2025-26)',
    desc: 'Based on 0.5% penetration of Andhra Pradesh\'s school-going student base through Timelly\'s ₹125 per student/month SaaS model, with an initial focus on schools seeking affordable digital operations, attendance, communication and fee-management solutions.',
  }
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

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const numberRef  = useRef<HTMLSpanElement>(null)

  useCounterAnim(numberRef as React.RefObject<HTMLElement>, stat.number)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-8 flex flex-col gap-4 shadow-sm"
      style={{ background: BG_WHITE, border: `1px solid ${BORDER}` }}
    >
      <span
        ref={numberRef}
        className="font-display text-[clamp(48px,7vw,96px)] leading-none"
        style={{ color: GREEN }}
      >
        {stat.number}
      </span>
      <h3 className="font-body text-lg md:text-xl font-bold" style={{ color: INK }}>
        {stat.heading}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: INK_DIM }}>
        {stat.body}
      </p>
    </div>
  )
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ label, lines }: { label: string; lines: { words: { text: string; lime?: boolean }[] }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, [])

  return (
    <div ref={ref}>
      <span className="inline-block mb-6 rounded-full px-4 py-1.5 font-body text-xs font-bold tracking-[0.3em] uppercase" style={{ backgroundColor: GREEN_DIM, color: GREEN, border: `1px solid ${GREEN_MID}` }}>
        {label}
      </span>
      <div>
        {lines.map((line, i) => (
          <div key={i} className="flex flex-wrap gap-x-[0.35em]">
            {line.words.map((w, j) => (
              <span key={j} className={`text-[clamp(36px,5vw,74px)] leading-[0.88] tracking-tight uppercase ${w.lime ? 'font-serif font-semibold italic' : 'font-display'}`} style={{ color: w.lime ? GREEN : INK }}>
                {w.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function MarketSection() {
  const introCopyRef  = useRef<HTMLDivElement>(null)
  const bigMomentRef  = useRef<HTMLDivElement>(null)
  const ladderRef     = useRef<HTMLDivElement>(null)
  const endingRef     = useRef<HTMLDivElement>(null)
  const finalLineRef  = useRef<HTMLDivElement>(null)
  
  const tamCircleRef = useRef<SVGCircleElement>(null)
  const samCircleRef = useRef<SVGCircleElement>(null)
  const somCircleRef = useRef<SVGCircleElement>(null)
  const tamSamSomCardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro copy lines stagger
      if (introCopyRef.current) {
        const lines = introCopyRef.current.querySelectorAll('.intro-line')
        gsap.fromTo(lines,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: introCopyRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        )
      }

      // Big Investor Moment
      if (bigMomentRef.current) {
        const top  = bigMomentRef.current.querySelector('.bim-top')
        const btm  = bigMomentRef.current.querySelector('.bim-btm')
        const sub  = bigMomentRef.current.querySelector('.bim-sub')
        gsap.set([top, btm, sub], { opacity: 0 })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: bigMomentRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
        tl.fromTo(top, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          .fromTo(btm, { y:  30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .fromTo(sub, { opacity: 0 },          { opacity: 1, duration: 0.6 }, '-=0.3')
      }

      // TAM SAM SOM Animation
      if (tamCircleRef.current && samCircleRef.current && somCircleRef.current && tamSamSomCardsRef.current) {
        gsap.set([tamCircleRef.current, samCircleRef.current, somCircleRef.current], { scale: 0, transformOrigin: '50% 90%' })
        
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '#market-size-section', start: 'top 70%', toggleActions: 'play none none reverse' }
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
        gsap.fromTo(items,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: ladderRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        )
      }

      // Ending reveal
      if (endingRef.current) {
        gsap.fromTo(endingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: endingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        )
      }

      // Final one-liner
      if (finalLineRef.current) {
        gsap.fromTo(finalLineRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: finalLineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Anchor Header (Like Story / Vision) ── */}
      <div className="w-full px-[8vw] pt-20 pb-4" style={{ backgroundColor: BG }}>
        <h2 className="font-display text-[clamp(44px,6vw,80px)] tracking-tight uppercase" style={{ color: INK }}>
          THE MARKET<span style={{ color: GREEN }}>.</span>
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 1 — OPENING HEADLINE + INTRO COPY
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-market"
        className="relative w-full px-[8vw] py-16 overflow-hidden"
        style={{ backgroundColor: BG }}
      >
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionHeading
              label="MARKET OPPORTUNITY"
              lines={[
                { words: [{ text: 'WE' }, { text: "AREN'T" }, { text: 'BUILDING' }] },
                { words: [{ text: 'FOR' }, { text: 'A' }, { text: 'FEW', lime: true }] },
                { words: [{ text: 'SCHOOLS.' }] },
                { words: [{ text: "WE'RE" }, { text: 'BUILDING' }] },
                { words: [{ text: 'FOR', lime: true }, { text: 'AN' }] },
                { words: [{ text: 'ENTIRE' }, { text: 'EDUCATION' }] },
                { words: [{ text: 'SYSTEM.', lime: true }] },
              ]}
            />
            <div ref={introCopyRef} className="pt-6 lg:pt-20 space-y-4">
              {[
                'Every student generates data.',
                'Every teacher creates workflows.',
                'Every parent needs visibility.',
                '',
                'Yet most educational institutions still operate on fragmented systems built decades ago.',
                '',
                'The opportunity isn\'t digitizing schools.',
                '',
                'It\'s rebuilding educational infrastructure.',
              ].map((line, i) =>
                line === '' ? (
                  <div key={i} className="h-2" />
                ) : (
                  <p key={i} className={`intro-line font-body leading-relaxed ${i < 3 ? 'text-base font-semibold' : 'text-sm'}`}
                    style={{ color: i >= 7 ? GREEN : i < 3 ? INK : INK_DIM }}>
                    {line}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 2 — 4 STAT CARDS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full px-[8vw] py-20" style={{ backgroundColor: BG_ALT }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {STATS.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 3 — BIG INVESTOR MOMENT
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full px-[8vw] py-32 overflow-hidden" style={{ backgroundColor: BG_WHITE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div ref={bigMomentRef} className="relative z-10 max-w-[1200px] mx-auto text-center">
          <div className="bim-top mb-6">
            {[
              [{ text: 'THIS' }, { text: "ISN'T" }, { text: 'A' }, { text: 'SCHOOL' }],
              [{ text: 'SOFTWARE', lime: true }, { text: 'MARKET.' }],
            ].map((line, i) => (
              <div key={i} className="flex flex-wrap justify-center gap-x-[0.35em]">
                {line.map((w: {text:string;lime?:boolean}, j) => (
                  <span key={j} className={`text-[clamp(36px,5.5vw,80px)] leading-[0.88] tracking-tight uppercase ${w.lime ? 'font-serif font-semibold italic' : 'font-display'}`} style={{ color: w.lime ? GREEN : INK }}>
                    {w.text}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="bim-btm">
            <div className="mx-auto mb-6 h-px w-24" style={{ background: GREEN_MID }} />
            {[
              [{ text: "IT'S" }, { text: 'AN' }, { text: 'EDUCATION' }],
              [{ text: 'INFRASTRUCTURE', lime: true }, { text: 'MARKET.' }],
            ].map((line, i) => (
              <div key={i} className="flex flex-wrap justify-center gap-x-[0.35em]">
                {line.map((w: {text:string;lime?:boolean}, j) => (
                  <span key={j} className={`text-[clamp(36px,5.5vw,80px)] leading-[0.88] tracking-tight uppercase ${w.lime ? 'font-serif font-semibold italic' : 'font-display'}`} style={{ color: w.lime ? GREEN : INK }}>
                    {w.text}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="bim-sub mt-10 space-y-1">
            <p className="font-body text-lg" style={{ color: INK_DIM }}>The institutions may change.</p>
            <p className="font-body text-lg font-semibold" style={{ color: INK }}>The infrastructure remains the same.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 4 — TAM / SAM / SOM (NEW BLOCK FROM IMAGE)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="market-size-section" className="relative w-full px-[8vw] py-28" style={{ backgroundColor: BG }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            label="MARKET SIZE"
            lines={[{ words: [{ text: 'THE', lime: false }, { text: 'OPPORTUNITY', lime: true }] }]}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-center mt-12">
            
            {/* LEFT - Overlapping Circles */}
            <div className="flex justify-center relative h-[400px] w-full">
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px]">
                {/* TAM */}
                <circle ref={tamCircleRef} cx="200" cy="180" r="160" fill="#1E2A1A" opacity="0.9" />
                <text x="200" y="70" textAnchor="middle" fill="#F5F4F0" className="font-display text-2xl tracking-widest">TAM</text>
                <text x="200" y="90" textAnchor="middle" fill="#F5F4F0" className="font-body text-sm font-semibold">42.58 B</text>

                {/* SAM */}
                <circle ref={samCircleRef} cx="200" cy="220" r="120" fill="#2F6B3A" opacity="0.9" />
                <text x="200" y="160" textAnchor="middle" fill="#F5F4F0" className="font-display text-2xl tracking-widest">SAM</text>
                <text x="200" y="180" textAnchor="middle" fill="#F5F4F0" className="font-body text-sm font-semibold">1.16 B</text>

                {/* SOM */}
                <circle ref={somCircleRef} cx="200" cy="270" r="70" fill="#2F6B3A" opacity="0.35" />
                <text x="200" y="260" textAnchor="middle" fill="#1E2A1A" className="font-display text-xl tracking-widest">SOM</text>
                <text x="200" y="280" textAnchor="middle" fill="#1E2A1A" className="font-body text-xs font-bold">1.0 CRORE</text>
              </svg>
            </div>

            {/* RIGHT - Content Cards */}
            <div ref={tamSamSomCardsRef} className="flex flex-col gap-8">
              {MARKET_SIZES.map((item, i) => (
                <div key={i} className="tss-card relative pl-6" style={{ borderLeft: `3px solid ${GREEN}` }}>
                  <h4 className="font-display text-2xl mb-1" style={{ color: INK }}>{item.title}</h4>
                  <p className="font-body text-sm font-semibold mb-2" style={{ color: INK_DIM }}>{item.subValue}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: INK_DIM }}>{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 5 — EXPANSION LADDER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full px-[8vw] py-28" style={{ backgroundColor: BG_ALT, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ladderRef} className="flex flex-col items-start gap-0">
            {LADDER.map((item, i) => (
              <div key={item} className="flex flex-col items-start ladder-item">
                <div
                  className="rounded-xl px-8 py-4 font-body text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    background: i === 0 ? GREEN_DIM : BG_WHITE,
                    border: `1px solid ${i === 0 ? GREEN_MID : BORDER}`,
                    color: i === 0 ? GREEN : INK,
                    minWidth: '260px',
                  }}
                >
                  {item}
                </div>
                {i < LADDER.length - 1 && (
                  <div className="flex flex-col items-start pl-8">
                    <div className="w-px h-5" style={{ background: GREEN_MID }} />
                    <span className="text-sm font-bold" style={{ color: GREEN }}>↓</span>
                    <div className="w-px h-5" style={{ background: GREEN_MID }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <SectionHeading
              label="EXPANSION VISION"
              lines={[
                { words: [{ text: 'ONE', lime: true }, { text: 'PLATFORM.' }] },
                { words: [{ text: 'MULTIPLE' }, { text: 'EDUCATION' }] },
                { words: [{ text: 'SEGMENTS.', lime: true }] },
              ]}
            />
            <p className="font-body text-base leading-relaxed max-w-md" style={{ color: INK_DIM }}>
              The same foundation that powers schools today can power lifelong learning tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 6 — ENDING STATEMENT
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full px-[8vw] py-28" style={{ backgroundColor: BG_WHITE, borderTop: `1px solid ${BORDER}` }}>
        <div ref={endingRef} className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {[
              [{ text: 'THE' }, { text: 'MARKET' }, { text: "ISN'T" }],
              [{ text: 'MEASURED', lime: true }, { text: 'IN' }],
              [{ text: 'INSTITUTIONS.' }],
              [],
              [{ text: "IT'S" }, { text: 'MEASURED' }],
              [{ text: 'IN', lime: true }, { text: 'LEARNERS.' }],
            ].map((line, i) =>
              line.length === 0 ? (
                <div key={i} className="h-4" />
              ) : (
                <div key={i} className="flex flex-wrap gap-x-[0.35em]">
                  {line.map((w: {text:string;lime?:boolean}, j) => (
                    <span key={j} className={`text-[clamp(32px,4.5vw,64px)] leading-[0.88] tracking-tight uppercase ${w.lime ? 'font-serif font-semibold italic' : 'font-display'}`} style={{ color: w.lime ? GREEN : INK }}>
                      {w.text}
                    </span>
                  ))}
                </div>
              )
            )}
          </div>

          <div className="space-y-3 pl-0 lg:pl-8" style={{ borderLeft: `2px solid ${GREEN_MID}` }}>
            {['Millions of students.', 'Millions of parents.', 'Millions of educational journeys.'].map((line, i) => (
              <p key={i} className="font-body text-lg font-semibold pl-6" style={{ color: INK }}>{line}</p>
            ))}
            <p className="font-body text-base pl-6 pt-4 font-bold" style={{ color: GREEN }}>One connected ecosystem.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOCK 7 — FINAL ONE-LINER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden flex items-center justify-center py-36" style={{ backgroundColor: BG }}>
        <div ref={finalLineRef} className="relative z-10 text-center px-[8vw]">
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-x-[0.35em]">
              {['FROM', '1', 'SCHOOL'].map((w, i) => (
                <span key={i} className="font-display text-[clamp(44px,7vw,110px)] leading-[0.88] tracking-tight uppercase" style={{ color: i === 1 ? GREEN : INK }}>{w}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.35em]">
              {[{ w: 'TO', lime: false }, { w: 'AN', lime: false }, { w: 'ENTIRE', lime: true }, { w: 'GENERATION.', lime: false }].map((obj, i) => (
                <span key={i} className={`text-[clamp(44px,7vw,110px)] leading-[0.88] tracking-tight uppercase ${obj.lime ? 'font-serif font-semibold italic' : 'font-display'}`} style={{ color: obj.lime ? GREEN : INK }}>{obj.w}</span>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-8 h-px w-24" style={{ background: GREEN_MID }} />
        </div>
      </section>
      <div className="section-divider w-full bg-border" />
    </>
  )
}
