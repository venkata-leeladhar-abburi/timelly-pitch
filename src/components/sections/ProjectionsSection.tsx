'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/* ── Light Theme (dark green accent, not lime) ────────────────────────────── */
const BG        = '#F5F4F0'
const BG_ALT    = '#EFEDE5'
const INK       = '#1E2A1A'
const INK_DIM   = 'rgba(30,42,26,0.65)'
const INK_SUB   = 'rgba(30,42,26,0.35)'
const BORDER    = 'rgba(30,42,26,0.10)'
const GREEN     = '#2F6B3A'
const GREEN_DIM = 'rgba(47,107,58,0.12)'
const GREEN_MID = 'rgba(47,107,58,0.22)'
const GREEN_BOR = 'rgba(47,107,58,0.35)'
const LIME      = '#2F6B3A'
/* Dark band (Block 2) needs lighter shades for contrast against a dark bg */
const DARK_BAND_BG = '#1E2A1A'
const DARK_BAND_TEXT = '#F5F4F0'
const DARK_BAND_ACCENT = '#6FAE76'

/* ── Phase Data ───────────────────────────────────────────────────────────── */
const PHASES = [
  {
    phase: 'PHASE 01',
    year: '2026',
    action: 'VALIDATE',
    points: ['Launch schools.', 'Perfect the product.', 'Build adoption among parents and teachers.'],
  },
  {
    phase: 'PHASE 02',
    year: '2027–2028',
    action: 'SCALE',
    points: ['Expand across Andhra Pradesh.', 'Grow through school partnerships.', 'Build a recurring SaaS revenue engine.'],
  },
  {
    phase: 'PHASE 03',
    year: '2029',
    action: 'AUTOMATE',
    points: ['Introduce AI-powered insights.', 'Automated reports and intelligent operations.'],
  },
  {
    phase: 'PHASE 04',
    year: '2030',
    action: 'EXPAND',
    points: ['Move beyond schools into Intermediate Colleges.', 'Degree Colleges and Universities.'],
  },
  {
    phase: 'PHASE 05',
    year: '2032+',
    action: 'REIMAGINE',
    points: ['Institutions run on AI.', 'Parents receive personalized guidance.', 'Students get the right support.'],
  },
]

/* ── AI Commands ─────────────────────────────────────────────────────────── */
const AI_COMMANDS = [
  { prompt: '> Generate attendance report for this week', response: '✓ Report generated and shared', delay: 0 },
  { prompt: '> Which students are at risk academically?', response: '✓ 18 students identified. Insights ready.', delay: 800 },
  { prompt: '> Send fee reminders to pending parents', response: '✓ Notifications delivered to 142 parents', delay: 1600 },
  { prompt: '> Create semester report cards', response: '✓ 842 report cards generated in 3 seconds', delay: 2400 },
]

/* ── Main Component ───────────────────────────────────────────────────────── */
export default function ProjectionsSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const headerRef       = useRef<HTMLDivElement>(null)
  const phasesRef       = useRef<HTMLDivElement>(null)
  const revealRef       = useRef<HTMLDivElement>(null)
  const terminalRef     = useRef<HTMLDivElement>(null)
  const closingRef      = useRef<HTMLDivElement>(null)
  const [termVisible, setTermVisible]   = useState(false)
  const [visibleCmds, setVisibleCmds]   = useState<number[]>([])

  /* ── GSAP ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      )

      // 2. Big-reveal section
      const revealWords = revealRef.current?.querySelectorAll('.reveal-word')
      if (revealWords?.length) {
        gsap.fromTo(revealWords,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: revealRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        )
      }

      // 3. Terminal activate
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: 'top 75%',
        onEnter: () => setTermVisible(true),
        onLeaveBack: () => { setTermVisible(false); setVisibleCmds([]) },
      })

      // 4. Closing statement
      const closingLines = closingRef.current?.querySelectorAll('.closing-line')
      if (closingLines?.length) {
        gsap.fromTo(closingLines,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: closingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Terminal typewriter effect ────────────────────────────────────────── */
  useEffect(() => {
    if (!termVisible) return
    AI_COMMANDS.forEach((_, i) => {
      const timer = setTimeout(() => { setVisibleCmds(prev => [...prev, i]) }, i * 900 + 400)
      return () => clearTimeout(timer)
    })
  }, [termVisible])

  return (
    <section ref={sectionRef} id="section-projections" className="relative w-full overflow-hidden" style={{ backgroundColor: BG }}>
      {/* ═══════════════════════════════════════════════════════════════════
          BLOCK 1 — HEADER & SIMPLE TIMELINE CARDS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-[8vw] py-20">
        <div ref={headerRef} className="max-w-[1400px] mx-auto mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GREEN }}>FUTURE PROJECTIONS</p>
          <h2 className="font-display text-[clamp(44px,6vw,80px)] tracking-tight uppercase leading-[0.9] mb-8" style={{ color: INK }}>
            FROM SCHOOL SOFTWARE<br />
            <span style={{ color: GREEN }}>TO EDUCATION</span> INFRASTRUCTURE<span style={{ color: GREEN }}>.</span>
          </h2>
          <div className="flex items-center gap-6 mb-8 max-w-3xl">
            <div className="h-px flex-1" style={{ backgroundColor: BORDER }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GREEN }} />
            <div className="h-px w-16" style={{ backgroundColor: BORDER }} />
          </div>
          <div className="max-w-2xl">
            <p className="font-body text-lg leading-relaxed" style={{ color: INK_DIM }}>
              Timelly starts with school management. But the long-term vision is much bigger — a connected ecosystem that powers institutions, parents, students, and learning journeys across India.
            </p>
          </div>
        </div>

        {/* The simple timeline cards (styled like Market Section cards) */}
        <div ref={phasesRef} className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PHASES.map((phase, i) => (
              <PhaseCard key={i} phase={phase} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          BLOCK 2 — COMPACT BIG REVEAL
      ══════════════════════════════════════════════════════════════════════ */}
      <div ref={revealRef} className="relative z-10 w-full overflow-hidden py-24" style={{ backgroundColor: DARK_BAND_BG }}>
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${DARK_BAND_ACCENT} 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        <div className="relative max-w-[1400px] mx-auto px-[8vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Compact Headline */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: DARK_BAND_ACCENT }}>THE BIG PICTURE</p>
              <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[0.9] tracking-tight uppercase" style={{ color: DARK_BAND_TEXT }}>
                <span className="reveal-word inline-block">THE </span>
                <span className="reveal-word inline-block" style={{ color: DARK_BAND_ACCENT }}> FUTURE </span>
                <span className="reveal-word inline-block"> SCHOOL</span><br/>
                <span className="reveal-word inline-block">WON&apos;T RUN </span>
                <span className="reveal-word inline-block"> ON SOFTWARE.</span><br/>
                <span className="reveal-word inline-block">IT WILL </span>
                <span className="reveal-word inline-block"> RUN ON </span>
                <span className="reveal-word inline-block" style={{ color: DARK_BAND_ACCENT }}> AI.</span>
              </h2>

              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                {['Ask.', 'Approve.', 'Analyze.', 'Automate.'].map((word, i) => (
                  <span key={i} className="reveal-word font-display text-2xl md:text-3xl uppercase tracking-tight" style={{ color: i % 2 === 0 ? DARK_BAND_TEXT : DARK_BAND_ACCENT }}>{word}</span>
                ))}
              </div>
              <p className="reveal-word font-body text-base mt-6 max-w-md" style={{ color: 'rgba(245,244,240,0.65)' }}>
                The next generation of school management will happen through <span style={{ color: DARK_BAND_TEXT, fontWeight: 600 }}>conversations.</span>
              </p>
            </div>

            {/* Right: Compact AI Terminal */}
            <div ref={terminalRef} className="reveal-word">
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid rgba(245,244,240,0.08)`, backgroundColor: 'rgba(245,244,240,0.04)' }}>
                <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'rgba(245,244,240,0.06)', backgroundColor: 'rgba(245,244,240,0.03)' }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
                  <span className="ml-2 font-body text-[10px] uppercase tracking-widest" style={{ color: 'rgba(245,244,240,0.35)' }}>
                    timelly-ai
                  </span>
                </div>
                <div className="p-5 space-y-4 min-h-[220px]">
                  {AI_COMMANDS.map((cmd, i) => (
                    <div key={i} className="transition-all duration-500" style={{ opacity: visibleCmds.includes(i) ? 1 : 0, transform: visibleCmds.includes(i) ? 'translateY(0)' : 'translateY(4px)' }}>
                      <p className="font-body text-[13px]" style={{ color: DARK_BAND_ACCENT }}>{cmd.prompt}</p>
                      <p className="font-body text-[13px] mt-0.5" style={{ color: 'rgba(245,244,240,0.50)' }}>{cmd.response}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 font-body text-[13px]" style={{ color: DARK_BAND_ACCENT }}>
                    <span>&gt;</span>
                    <span className="w-2 h-3.5 ml-1 animate-pulse" style={{ backgroundColor: DARK_BAND_ACCENT, display: 'inline-block' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          BLOCK 3 — BEAUTIFUL CLOSING WITH LOGO
      ══════════════════════════════════════════════════════════════════════ */}
      <div ref={closingRef} className="relative z-10 w-full py-32 px-[8vw] flex flex-col items-center justify-center text-center overflow-hidden" style={{ backgroundColor: BG_ALT }}>
        {/* Subtle decorative grid/rings */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ border: `1px solid ${BORDER}`, opacity: 0.3 }} />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ border: `1px solid ${BORDER}`, opacity: 0.2 }} />

        {/* Timelly Logo */}
        <img src="/timelly-logo-full.png" alt="Timelly" className="closing-line h-12 md:h-16 mb-12 opacity-0" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <p className="closing-line font-display text-[clamp(28px,4vw,56px)] leading-[1.1] tracking-tight uppercase opacity-0" style={{ color: INK }}>
            STARTING WITH SCHOOLS.
          </p>
          <p className="closing-line font-display text-[clamp(28px,4vw,56px)] leading-[1.1] tracking-tight uppercase opacity-0" style={{ color: INK }}>
            EXPANDING TO EVERY <span style={{ color: GREEN }}>LEARNING INSTITUTION.</span>
          </p>
          <p className="closing-line font-display text-[clamp(28px,4vw,56px)] leading-[1.1] tracking-tight uppercase opacity-0" style={{ color: INK }}>
            POWERING THE FUTURE OF <span style={{ color: GREEN }}>EDUCATION.</span>
          </p>

          <div className="closing-line mt-12 opacity-0 flex justify-center">
            <div className="px-6 py-2 rounded-full" style={{ backgroundColor: GREEN_DIM, border: `1px solid ${GREEN_MID}` }}>
              <p className="font-body text-xs md:text-sm uppercase tracking-[0.2em]" style={{ color: INK }}>
                From 1 school to <span style={{ color: GREEN }}>an entire generation.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Simple Phase Card Sub-component ──────────────────────────────────────── */
function PhaseCard({ phase, index }: { phase: typeof PHASES[number], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: index * 0.1, scrollTrigger: { trigger: cardRef.current, start: 'top 85%' } }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-6 flex flex-col shadow-sm transition-transform duration-300 hover:-translate-y-1 h-full"
      style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}
    >
      <div className="mb-4">
        <span className="font-display text-[clamp(44px,5vw,64px)] leading-none" style={{ color: GREEN }}>
          {phase.year}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="font-body text-[10px] uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: INK_SUB }}>
          {phase.phase}
        </div>
        <h3 className="font-body text-xl font-bold uppercase tracking-tight" style={{ color: INK }}>
          {phase.action}
        </h3>
      </div>
      
      <div className="space-y-2 mt-auto">
        {phase.points.map((pt, j) => (
          <p key={j} className="font-body text-[13.5px] leading-relaxed" style={{ color: INK_DIM }}>
            <span style={{ color: GREEN, marginRight: '4px' }}>•</span> {pt}
          </p>
        ))}
      </div>
    </div>
  )
}
