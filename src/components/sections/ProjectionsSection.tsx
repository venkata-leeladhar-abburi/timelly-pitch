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
/* Dark band (Block 2) needs to match the website's dark theme */
const DARK_BAND_BG = '#23271A'
const DARK_BAND_TEXT = '#F0EDE6'
const DARK_BAND_ACCENT = '#B4D429'

/* ── Replaced old PHASES with hardcoded card data in render ── */

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

      // 1.5 Cards
      const cards = phasesRef.current?.querySelectorAll('.proj-card')
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: phasesRef.current, start: 'top 80%' } }
        )
      }

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
          <h2 className="font-body font-bold text-[clamp(44px,6vw,80px)] tracking-tight uppercase leading-[1.05] mb-8" style={{ color: INK }}>
            FROM SCHOOL SOFTWARE<br />
            <span className="font-display font-bold" style={{ color: GREEN }}>TO EDUCATION</span> INFRASTRUCTURE<span style={{ color: GREEN }}>.</span>
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

        {/* The redesigned timeline cards: 2026 (1 col) and 2027-2029 (2 cols) */}
        <div ref={phasesRef} className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1: 2026 */}
            <div className="proj-card rounded-2xl p-8 flex flex-col shadow-sm transition-transform duration-300 hover:-translate-y-1 h-full lg:col-span-1" style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}>
              <div className="mb-4">
                <span className="font-body font-bold text-[clamp(44px,5vw,72px)] leading-[1.08]" style={{ color: GREEN }}>
                  2026
                </span>
              </div>
              <div className="mb-6">
                <div className="font-body text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: INK_SUB }}>
                  PHASE 01
                </div>
                <h3 className="font-body text-xl md:text-2xl font-bold uppercase tracking-tight" style={{ color: INK }}>
                  VALIDATE
                </h3>
              </div>
              <div className="space-y-3 mt-auto">
                {['Launch schools.', 'Perfect the product.', 'Build adoption among parents and teachers.'].map((pt, j) => (
                  <p key={j} className="font-body text-[14.5px] leading-relaxed" style={{ color: INK_DIM }}>
                    <span style={{ color: GREEN, marginRight: '6px' }}>•</span> {pt}
                  </p>
                ))}
              </div>
            </div>

            {/* Card 2: 2027-2029+ */}
            <div className="proj-card rounded-2xl p-8 flex flex-col shadow-sm transition-transform duration-300 hover:-translate-y-1 h-full lg:col-span-2" style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}>
              <div className="mb-4">
                <span className="font-body font-bold text-[clamp(44px,5vw,72px)] leading-[1.08]" style={{ color: GREEN }}>
                  2027–2029+
                </span>
              </div>
              <div className="mb-6">
                <div className="font-body text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: INK_SUB }}>
                  PHASE 02 & BEYOND
                </div>
                <h3 className="font-body text-xl md:text-2xl font-bold uppercase tracking-tight" style={{ color: INK }}>
                  SCALE, AUTOMATE & EXPAND
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-auto">
                <div className="space-y-3">
                  {[
                    'Expand across Andhra Pradesh.', 
                    'Grow through school partnerships.', 
                    'Build a recurring SaaS revenue engine.',
                    'Introduce AI-powered insights.',
                    'Automated reports and intelligent operations.'
                  ].map((pt, j) => (
                    <p key={`l-${j}`} className="font-body text-[14.5px] leading-relaxed" style={{ color: INK_DIM }}>
                      <span style={{ color: GREEN, marginRight: '6px' }}>•</span> {pt}
                    </p>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    'Move beyond schools into Intermediate Colleges.',
                    'Degree Colleges and Universities.',
                    'Institutions run on AI.', 
                    'Parents receive personalized guidance.', 
                    'Students get the right support.'
                  ].map((pt, j) => (
                    <p key={`r-${j}`} className="font-body text-[14.5px] leading-relaxed" style={{ color: INK_DIM }}>
                      <span style={{ color: GREEN, marginRight: '6px' }}>•</span> {pt}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          BLOCK 2 — COMPACT BIG REVEAL
      ══════════════════════════════════════════════════════════════════════ */}
      <div ref={revealRef} className="relative z-10 w-full overflow-hidden py-32 min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: DARK_BAND_BG }}>
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${DARK_BAND_ACCENT} 0%, transparent 70%)`, filter: 'blur(100px)' }} />

        <div className="relative max-w-[1400px] mx-auto px-[8vw] w-full flex flex-col items-center justify-center">
          
          <div className="flex flex-col items-center text-center w-full mb-24">
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-8 font-bold" style={{ color: DARK_BAND_ACCENT }}>THE BIG PICTURE</p>
            <h2 className="font-body font-bold text-[clamp(44px,7vw,100px)] leading-[1.05] tracking-tight uppercase flex flex-col items-center justify-center w-full max-w-[1200px]">
              <div className="text-center">
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>THE</span>{' '}
                <span className="reveal-word font-display font-bold" style={{ color: DARK_BAND_ACCENT }}>FUTURE</span>{' '}
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>SCHOOL</span>
              </div>
              <div className="text-center mt-1 md:mt-2">
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>WON&apos;T</span>{' '}
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>RUN</span>{' '}
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>ON</span>{' '}
                <span className="reveal-word font-display font-bold" style={{ color: DARK_BAND_ACCENT }}>SOFTWARE.</span>
              </div>
              <div className="text-center mt-6 md:mt-8">
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>IT</span>{' '}
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>WILL</span>{' '}
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>RUN</span>{' '}
                <span className="reveal-word" style={{ color: DARK_BAND_TEXT }}>ON</span>{' '}
                <span className="reveal-word font-display font-bold" style={{ color: DARK_BAND_ACCENT }}>AI.</span>
              </div>
            </h2>

            <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['Ask.', 'Approve.', 'Analyze.', 'Automate.'].map((word, i) => (
                <span key={i} className="reveal-word font-body font-bold text-2xl md:text-3xl uppercase tracking-tight" style={{ color: i % 2 === 0 ? DARK_BAND_TEXT : DARK_BAND_ACCENT }}>{word}</span>
              ))}
            </div>
            <p className="reveal-word font-body text-base md:text-xl mt-8 max-w-2xl" style={{ color: 'rgba(240,237,230,0.65)' }}>
              The next generation of school management will happen through <span style={{ color: DARK_BAND_TEXT, fontWeight: 600 }}>conversations.</span>
            </p>
          </div>

          {/* Sleek AI Terminal */}
          <div ref={terminalRef} className="reveal-word w-full max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative" style={{ border: `1px solid rgba(180,212,41,0.2)`, backgroundColor: '#1C1F1A', backdropFilter: 'blur(10px)' }}>
                {/* Glass reflection top */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(180,212,41,0.5)] to-transparent opacity-50" />
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(180,212,41,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
                  </div>
                  <span className="font-display font-bold text-[11px] uppercase tracking-[0.3em]" style={{ color: DARK_BAND_ACCENT }}>
                    TIMELLY_AI_OS v2.0
                  </span>
                </div>

                {/* Terminal Body */}
                <div className="p-8 space-y-6 min-h-[340px] font-mono text-[14px]">
                  {AI_COMMANDS.map((cmd, i) => (
                    <div key={i} className="transition-all duration-700" style={{ opacity: visibleCmds.includes(i) ? 1 : 0, transform: visibleCmds.includes(i) ? 'translateY(0)' : 'translateY(10px)' }}>
                      <div className="flex items-start gap-3">
                        <span style={{ color: DARK_BAND_ACCENT, marginTop: '2px' }}>❯</span>
                        <p style={{ color: DARK_BAND_TEXT }}>{cmd.prompt.replace('> ', '')}</p>
                      </div>
                      <div className="flex items-start gap-3 mt-2 pl-5">
                        <span style={{ color: 'rgba(180,212,41,0.5)', marginTop: '2px' }}>↳</span>
                        <p style={{ color: 'rgba(240,237,230,0.6)' }}>{cmd.response.replace('✓ ', '')}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 pl-5 transition-opacity duration-300" style={{ opacity: visibleCmds.length === AI_COMMANDS.length ? 0 : 1 }}>
                    <span style={{ color: DARK_BAND_ACCENT }}>❯</span>
                    <span className="w-2 h-4 animate-pulse" style={{ backgroundColor: DARK_BAND_ACCENT, display: 'inline-block' }} />
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
          <p className="closing-line font-body font-bold text-[clamp(28px,4vw,56px)] leading-[1.08] tracking-tight uppercase opacity-0" style={{ color: INK }}>
            STARTING WITH SCHOOLS.
          </p>
          <p className="closing-line font-body font-bold text-[clamp(28px,4vw,56px)] leading-[1.08] tracking-tight uppercase opacity-0" style={{ color: INK }}>
            EXPANDING TO EVERY <span className="font-display font-bold" style={{ color: GREEN }}>LEARNING INSTITUTION.</span>
          </p>
          <p className="closing-line font-body font-bold text-[clamp(28px,4vw,56px)] leading-[1.08] tracking-tight uppercase opacity-0" style={{ color: INK }}>
            POWERING THE FUTURE OF <span className="font-display font-bold" style={{ color: GREEN }}>EDUCATION.</span>
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

