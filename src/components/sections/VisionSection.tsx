'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const BG       = '#262A22'
const CREAM    = '#EBE9DF'
const LIME     = '#B4D429'
const DIM      = 'rgba(235,233,223,0.55)'
const SUBTLE   = 'rgba(235,233,223,0.08)'
const LIME_DIM = 'rgba(180,212,41,0.10)'
const LIME_MID = 'rgba(180,212,41,0.22)'
const CARD_GLASS_BG = 'rgba(18,20,15,0.55)'
const CARD_GLASS_BORDER = 'rgba(180,212,41,0.20)'

// ─── Terminal Data ────────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { input: 'Generate attendance report for this week', output: '✓ Report generated and shared' },
  { input: 'Which students are at risk academically?',  output: '✓ 18 students identified. Insights ready.' },
  { input: 'Send fee reminders to pending parents',     output: '✓ Notifications delivered' },
  { input: 'Create semester report cards',              output: '✓ 842 report cards generated' },
  { input: 'Schedule parent-teacher meetings',          output: '✓ Meetings planned automatically' },
]

const STRENGTHS  = ['Communication', 'Creativity']
const NEEDS      = ['Mathematics', 'Time Management']
const ACTIVITIES = ['Daily Math Challenge', 'Public Speaking Exercise', 'Science Exploration Project']
const LADDER     = ['SCHOOLS', 'INTERMEDIATE', 'DEGREE', 'UNIVERSITIES', 'SKILL PLATFORMS']
const STATS      = [
  { value: '12M+', label: 'Students' },
  { value: '50K+', label: 'Institutions' },
  { value: '1',    label: 'Platform' },
]

// ─── Terminal Component ───────────────────────────────────────────────────────
function Terminal({ active }: { active: boolean }) {
  const [lines, setLines] = useState<{ text: string; type: 'input' | 'output' }[]>([])
  const hasRun = useRef(false)

  useEffect(() => {
    if (!active || hasRun.current) return
    hasRun.current = true
    let idx = 0
    const run = () => {
      if (idx >= TERMINAL_LINES.length) return
      const { input, output } = TERMINAL_LINES[idx]
      setLines(prev => [...prev, { text: `> ${input}`, type: 'input' }])
      setTimeout(() => {
        setLines(prev => [...prev, { text: `  ${output}`, type: 'output' }])
        idx++
        setTimeout(run, 600)
      }, 1000)
    }
    setTimeout(run, 400)
  }, [active])

  return (
    <div className="rounded-2xl p-6 font-mono text-sm h-full" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${LIME_MID}`, backdropFilter: 'blur(12px)' }}>
      <div className="mb-5 flex items-center gap-2">
        {['#FF5F57', '#FFBD2E', '#28CA40'].map((c, i) => (
          <div key={i} className="h-3 w-3 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-3 text-xs" style={{ color: DIM }}>timelly-ai — bash</span>
      </div>
      <div className="space-y-2 min-h-[230px]">
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed" style={{ color: line.type === 'output' ? LIME : CREAM, opacity: line.type === 'input' ? 0.7 : 1 }}>
            {line.text}
          </div>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse" style={{ backgroundColor: LIME }} />
      </div>
    </div>
  )
}

// ─── Student Profile ──────────────────────────────────────────────────────────
function StudentProfile() {
  return (
    <div className="rounded-2xl p-6 w-full" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${LIME_MID}`, backdropFilter: 'blur(12px)' }}>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: LIME }}>STUDENT PROFILE</span>
        <span className="font-mono text-xs" style={{ color: DIM }}>Age: 12</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl p-4" style={{ background: LIME_DIM, border: `1px solid ${LIME_MID}` }}>
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest" style={{ color: LIME }}>Strengths</p>
          {STRENGTHS.map(s => <p key={s} className="flex items-center gap-2 font-body text-sm mb-1" style={{ color: CREAM }}><span style={{ color: LIME }}>✓</span>{s}</p>)}
        </div>
        <div className="rounded-xl p-4" style={{ background: SUBTLE, border: `1px solid ${SUBTLE}` }}>
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest" style={{ color: DIM }}>Needs Improvement</p>
          {NEEDS.map(n => <p key={n} className="flex items-center gap-2 font-body text-sm mb-1" style={{ color: CREAM }}><span style={{ color: DIM }}>•</span>{n}</p>)}
        </div>
      </div>
      <div className="mb-3 rounded-xl p-4" style={{ background: SUBTLE, border: `1px solid ${SUBTLE}` }}>
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest" style={{ color: DIM }}>Recommended Activities</p>
        {ACTIVITIES.map(a => <p key={a} className="flex items-center gap-2 font-body text-sm mb-1" style={{ color: CREAM }}><span style={{ color: LIME }}>✓</span>{a}</p>)}
      </div>
      <div className="rounded-xl p-4" style={{ background: LIME_DIM, border: `1px solid ${LIME_MID}` }}>
        <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: LIME }}>Next Growth Goal</p>
        <p className="font-body text-sm font-semibold" style={{ color: CREAM }}>Build problem-solving skills</p>
      </div>
    </div>
  )
}

// ─── Ecosystem Diagram ────────────────────────────────────────────────────────
function EcosystemDiagram() {
  return (
    <div className="flex flex-col gap-6 items-stretch w-full sm:flex-row sm:gap-8 sm:items-start">
      <div className="flex flex-col items-center gap-0 shrink-0">
        {LADDER.map((item, i) => (
          <div key={item} className="flex flex-col items-center w-full">
            <div
              className="w-full rounded-xl px-4 py-3 text-center font-mono text-xs font-bold tracking-widest uppercase sm:min-w-[190px] sm:px-6 sm:text-sm"
              style={{ background: i === 0 ? LIME_DIM : SUBTLE, border: `1px solid ${i === 0 ? LIME_MID : SUBTLE}`, color: i === 0 ? LIME : CREAM }}
            >
              {item}
            </div>
            {i < LADDER.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="w-px h-4" style={{ background: LIME_MID }} />
                <span className="text-xs" style={{ color: LIME }}>↓</span>
                <div className="w-px h-4" style={{ background: LIME_MID }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {STATS.map(stat => (
          <div key={stat.label} className="rounded-xl p-5 flex items-center gap-5" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${SUBTLE}` }}>
            <span className="font-display text-[clamp(26px,3.5vw,48px)] leading-none" style={{ color: LIME }}>{stat.value}</span>
            <span className="font-body text-base font-medium" style={{ color: DIM }}>{stat.label}</span>
          </div>
        ))}
        <div className="rounded-xl p-5" style={{ background: LIME_DIM, border: `1px solid ${LIME_MID}` }}>
          <span className="font-display text-[clamp(26px,3.5vw,42px)] leading-none" style={{ color: LIME }}>∞</span>
          <p className="font-body text-sm mt-1" style={{ color: CREAM }}>Infinite Possibilities</p>
        </div>
      </div>
    </div>
  )
}

// ─── Glass Card Wrapper ────────────────────────────────────────────────────────
function VisionCard({ num, className = '', children }: { num: string; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[32px] backdrop-blur-2xl ${className}`}
      style={{
        background: CARD_GLASS_BG,
        border: `1px solid ${CARD_GLASS_BORDER}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(235,233,223,0.06)',
      }}
    >
      {/* Corner glow accent */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${LIME_DIM} 0%, transparent 70%)`, filter: 'blur(20px)' }}
      />
      {/* Watermark number */}
      <span
        className="pointer-events-none absolute top-5 right-7 font-display leading-none select-none"
        style={{ color: LIME, opacity: 0.12, fontSize: 'clamp(64px,9vw,140px)' }}
      >
        {num}
      </span>
      {/* Corner brackets */}
      <span className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l-2 border-t-2 rounded-tl-md" style={{ borderColor: LIME_MID }} />
      <span className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-r-2 border-b-2 rounded-br-md" style={{ borderColor: LIME_MID }} />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef  = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const [terminalActive, setTerminalActive] = useState(false)

  // Panel content refs for stagger animations
  const p1LeftRef  = useRef<HTMLDivElement>(null)
  const p1RightRef = useRef<HTMLDivElement>(null)
  const p2LeftRef  = useRef<HTMLDivElement>(null)
  const p2RightRef = useRef<HTMLDivElement>(null)
  const p3LeftRef  = useRef<HTMLDivElement>(null)
  const p3RightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // The horizontal-scroll pinned track only makes sense on tablet/desktop —
    // on mobile the section renders as a normal static stack instead (below).
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    const ctx = gsap.context(() => {
      const track  = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      // Set initial state for all panel contents
      const allPanelEls = [
        p1LeftRef.current, p1RightRef.current,
        p2LeftRef.current, p2RightRef.current,
        p3LeftRef.current, p3RightRef.current,
      ]
      gsap.set(allPanelEls, { opacity: 0, y: 40 })

      const scrollDist = track.scrollWidth - window.innerWidth
      section.style.height = `${window.innerHeight + scrollDist}px`

      // Horizontal scroll driver
      const hScroll = gsap.to(track, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          // Panel 1 enters immediately — activate terminal
          onUpdate: (self) => {
            if (self.progress > 0.03 && !terminalActive) {
              setTerminalActive(true)
            }
          },
        },
      })

      // Panel 1 — animates in as soon as section is pinned
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to([p1LeftRef.current, p1RightRef.current], {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          })
          setTerminalActive(true)
        },
        onLeaveBack: () => {
          gsap.to([p1LeftRef.current, p1RightRef.current], { opacity: 0, y: 40, duration: 0.4 })
        },
      })

      // Panel 2 — animates in when ~33% of horizontal scroll done
      ScrollTrigger.create({
        containerAnimation: hScroll,
        trigger: '.panel-2',
        start: 'left 75%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to([p2LeftRef.current, p2RightRef.current], {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          })
        },
        onLeaveBack: () => {
          gsap.to([p2LeftRef.current, p2RightRef.current], { opacity: 0, y: 40, duration: 0.4 })
        },
      })

      // Panel 3 — animates in when ~66% of horizontal scroll done
      ScrollTrigger.create({
        containerAnimation: hScroll,
        trigger: '.panel-3',
        start: 'left 75%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to([p3LeftRef.current, p3RightRef.current], {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          })
        },
        onLeaveBack: () => {
          gsap.to([p3LeftRef.current, p3RightRef.current], { opacity: 0, y: 40, duration: 0.4 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [terminalActive])

  return (
    <>
      {/* ───────────────── Mobile — static vertical stack ───────────────── */}
      <div className="relative block w-full px-6 py-20 md:hidden" style={{ backgroundColor: BG }}>
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 700" fill="none" stroke={CREAM} strokeWidth="0.6" aria-hidden>
          <path d="M-50 200 C 350 80, 600 380, 900 200 S 1350 80, 1400 300" />
          <path d="M-50 500 C 300 380, 580 600, 900 500 S 1350 380, 1400 600" />
        </svg>

        <div className="relative z-10">
          <h2 className="mb-10 font-display text-[clamp(36px,9vw,48px)] tracking-tight uppercase text-center" style={{ color: CREAM }}>
            THE VISION<span style={{ color: LIME }}>.</span>
          </h2>

          {[
            {
              num: '01',
              eyebrow: 'AI-NATIVE SCHOOLS',
              heading: [['THE', 'SCHOOL'], ['THAT', 'RUNS', 'ON'], ['COMMANDS.']],
              limeWords: new Set(['COMMANDS.']),
              body: (
                <>
                  <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>What if managing a school felt as simple as having a conversation?</p>
                  <div className="space-y-1 pl-3 border-l-2 mt-3" style={{ borderColor: LIME_MID }}>
                    {['No dashboards.', 'No complex workflows.', 'No searching through menus.'].map(t => (
                      <p key={t} className="font-body text-xs" style={{ color: DIM }}>{t}</p>
                    ))}
                  </div>
                  <p className="font-body text-sm font-semibold mt-3" style={{ color: CREAM }}>Just ask.</p>
                </>
              ),
              visual: <Terminal active={terminalActive} />,
              footer: <>From <span style={{ color: CREAM }}>software that schools use</span> to <span style={{ color: LIME }}>intelligence that schools rely on.</span></>,
            },
            {
              num: '02',
              eyebrow: 'AI AFTER SCHOOL',
              heading: [['THE', 'LEARNING'], ['CONTINUES'], ['AT', 'HOME.']],
              limeWords: new Set(['CONTINUES']),
              body: (
                <>
                  <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>Every child learns differently.</p>
                  <p className="font-body text-sm leading-relaxed mt-3" style={{ color: DIM }}>
                    Timelly becomes an AI companion that guides students beyond the classroom and helps parents support the right skills at the right age.
                  </p>
                  <p className="font-body text-sm font-semibold mt-3" style={{ color: CREAM }}>Learning no longer ends when school ends.</p>
                </>
              ),
              visual: <StudentProfile />,
              footer: <><span style={{ color: LIME }}>An AI mentor for every student.</span> A trusted guide for every parent.</>,
            },
            {
              num: '03',
              eyebrow: 'EDUCATION INFRASTRUCTURE',
              heading: [['ONE', 'PLATFORM.'], ['EVERY', 'INSTITUTION.'], ['EVERY', 'LEARNER.']],
              limeWords: new Set(['ONE']),
              body: (
                <>
                  <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>Timelly starts with schools.</p>
                  <p className="font-body text-sm leading-relaxed mt-3" style={{ color: DIM }}>
                    But the future extends beyond K-12 education — the same infrastructure can power intermediate colleges, degree colleges, universities, and skill development institutions.
                  </p>
                  <p className="font-body text-sm font-semibold mt-3" style={{ color: CREAM }}>One connected ecosystem for lifelong learning.</p>
                </>
              ),
              visual: <EcosystemDiagram />,
              footer: <>Building the <span style={{ color: LIME }}>operating system for education.</span> Not just for schools. For <span style={{ color: CREAM }}>an entire generation.</span></>,
            },
          ].map((panel, pi) => (
            <VisionCard key={pi} num={panel.num} className={`p-6 ${pi > 0 ? 'mt-8' : ''}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-[0.25em] uppercase" style={{ backgroundColor: LIME_DIM, color: LIME, border: `1px solid ${LIME_MID}` }}>VISION {panel.num}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: DIM }}>{panel.eyebrow}</span>
              </div>

              <div className="mb-5">
                {panel.heading.map((line, i) => (
                  <div key={i} className="flex flex-wrap gap-x-[0.22em]">
                    {line.map((w, j) => (
                      <span key={j} className="font-display text-[clamp(28px,9vw,40px)] leading-[0.95] tracking-tight uppercase" style={{ color: panel.limeWords.has(w) ? LIME : CREAM }}>
                        {w}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mb-6">{panel.body}</div>

              <div className="mb-6">{panel.visual}</div>

              <div className="pt-5" style={{ borderTop: `1px solid ${SUBTLE}` }}>
                <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>{panel.footer}</p>
              </div>
            </VisionCard>
          ))}
        </div>
      </div>

      {/* ───────────────── Desktop/tablet — pinned horizontal scroll ───────────────── */}
      <section
        ref={sectionRef}
        id="section-vision"
        className="relative hidden md:block"
        style={{ height: '350vh', backgroundColor: BG }}
      >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">

        {/* Subtle texture overlay */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 700" fill="none" stroke={CREAM} strokeWidth="0.6" aria-hidden>
          <path d="M-50 200 C 350 80, 600 380, 900 200 S 1350 80, 1400 300" />
          <path d="M-50 500 C 300 380, 580 600, 900 500 S 1350 380, 1400 600" />
          <ellipse cx="600" cy="350" rx="500" ry="280" />
        </svg>

        {/* ── Section title (floats top-left on ALL panels, always visible) ── */}
        <div className="absolute top-12 left-[8vw] z-50">
          <h2 className="font-display text-[clamp(44px,6vw,80px)] tracking-tight uppercase" style={{ color: CREAM }}>
            THE VISION<span style={{ color: LIME }}>.</span>
          </h2>
        </div>

        {/* ── Horizontal track ── */}
        <div ref={trackRef} className="flex h-full" style={{ width: '300vw' }}>

          {/* ═══ PANEL 1: AI-NATIVE SCHOOLS ═══════════════════════════════════ */}
          <div className="panel-1 flex h-screen w-screen shrink-0 items-center justify-center px-[6vw] pt-24 pb-10">
            <VisionCard num="01" className="flex h-[76vh] max-h-[760px] max-w-[1480px] flex-col justify-between p-10 md:p-14">
            <div className="flex flex-1 gap-14 items-center min-h-0">

              {/* LEFT */}
              <div ref={p1LeftRef} className="flex flex-col w-1/2 pr-6 min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-[0.3em] uppercase" style={{ backgroundColor: LIME_DIM, color: LIME, border: `1px solid ${LIME_MID}` }}>VISION 01</span>
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: DIM }}>AI-NATIVE SCHOOLS</span>
                </div>

                <div className="mb-6">
                  {[
                    [{ w: 'THE' }, { w: 'SCHOOL' }],
                    [{ w: 'THAT' }, { w: 'RUNS' }, { w: 'ON' }],
                    [{ w: 'COMMANDS.', lime: true }],
                  ].map((line, i) => (
                    <div key={i} className="flex flex-wrap gap-x-[0.22em]">
                      {line.map((wObj, j) => (
                        <span key={j} className="font-display text-[clamp(36px,4.8vw,70px)] leading-[0.88] tracking-tight uppercase" style={{ color: (wObj as {w:string;lime?:boolean}).lime ? LIME : CREAM }}>
                          {(wObj as {w:string;lime?:boolean}).w}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 max-w-[400px]">
                  <p className="font-body text-base leading-relaxed" style={{ color: DIM }}>What if managing a school felt as simple as having a conversation?</p>
                  <div className="space-y-1 pl-3 border-l-2" style={{ borderColor: LIME_MID }}>
                    {['No dashboards.', 'No complex workflows.', 'No searching through menus.'].map(t => (
                      <p key={t} className="font-body text-sm" style={{ color: DIM }}>{t}</p>
                    ))}
                  </div>
                  <p className="font-body text-sm font-semibold" style={{ color: CREAM }}>Just ask.</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>
                    Timelly becomes the AI operating system that understands, manages, and automates every school operation.
                  </p>
                </div>
              </div>

              {/* RIGHT — Terminal */}
              <div ref={p1RightRef} className="w-1/2 min-w-0">
                <Terminal active={terminalActive} />
              </div>
            </div>

            <div className="pt-5" style={{ borderTop: `1px solid ${SUBTLE}` }}>
              <p className="font-body text-base md:text-lg" style={{ color: DIM }}>
                From <span style={{ color: CREAM }}>software that schools use</span> to{' '}
                <span style={{ color: LIME }}>intelligence that schools rely on.</span>
              </p>
            </div>
            </VisionCard>
          </div>

          {/* ═══ PANEL 2: AI AFTER SCHOOL ══════════════════════════════════════ */}
          <div className="panel-2 flex h-screen w-screen shrink-0 items-center justify-center px-[6vw] pt-24 pb-10">
            <VisionCard num="02" className="flex h-[76vh] max-h-[760px] max-w-[1480px] flex-col justify-between p-10 md:p-14">
            <div className="flex flex-1 gap-14 items-center min-h-0">

              {/* LEFT */}
              <div ref={p2LeftRef} className="flex flex-col w-1/2 pr-6 min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-[0.3em] uppercase" style={{ backgroundColor: LIME_DIM, color: LIME, border: `1px solid ${LIME_MID}` }}>VISION 02</span>
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: DIM }}>AI AFTER SCHOOL</span>
                </div>

                <div className="mb-6">
                  {[
                    [{ w: 'THE' }, { w: 'LEARNING' }],
                    [{ w: 'CONTINUES', lime: true }],
                    [{ w: 'AT' }, { w: 'HOME.' }],
                  ].map((line, i) => (
                    <div key={i} className="flex flex-wrap gap-x-[0.22em]">
                      {line.map((wObj, j) => (
                        <span key={j} className="font-display text-[clamp(36px,4.8vw,70px)] leading-[0.88] tracking-tight uppercase" style={{ color: (wObj as {w:string;lime?:boolean}).lime ? LIME : CREAM }}>
                          {(wObj as {w:string;lime?:boolean}).w}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 max-w-[400px]">
                  <p className="font-body text-base leading-relaxed" style={{ color: DIM }}>Every child learns differently.</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>
                    Timelly becomes an AI companion that guides students beyond the classroom and helps parents support the right skills at the right age.
                  </p>
                  <p className="font-body text-sm font-semibold" style={{ color: CREAM }}>Learning no longer ends when school ends.</p>
                </div>
              </div>

              {/* RIGHT — Student Profile */}
              <div ref={p2RightRef} className="w-1/2 min-w-0">
                <StudentProfile />
              </div>
            </div>

            <div className="pt-5" style={{ borderTop: `1px solid ${SUBTLE}` }}>
              <p className="font-body text-base md:text-lg" style={{ color: DIM }}>
                <span style={{ color: LIME }}>An AI mentor for every student.</span>{' '}
                A trusted guide for every parent.
              </p>
            </div>
            </VisionCard>
          </div>

          {/* ═══ PANEL 3: EDUCATION INFRASTRUCTURE ════════════════════════════ */}
          <div className="panel-3 flex h-screen w-screen shrink-0 items-center justify-center px-[6vw] pt-24 pb-10">
            <VisionCard num="03" className="flex h-[76vh] max-h-[760px] max-w-[1480px] flex-col justify-between p-10 md:p-14">
            <div className="flex flex-1 gap-14 items-center min-h-0">

              {/* LEFT */}
              <div ref={p3LeftRef} className="flex flex-col w-1/2 pr-6 min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-[0.3em] uppercase" style={{ backgroundColor: LIME_DIM, color: LIME, border: `1px solid ${LIME_MID}` }}>VISION 03</span>
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: DIM }}>EDUCATION INFRASTRUCTURE</span>
                </div>

                <div className="mb-6">
                  {[
                    [{ w: 'ONE', lime: true }, { w: 'PLATFORM.' }],
                    [{ w: 'EVERY' }, { w: 'INSTITUTION.' }],
                    [{ w: 'EVERY' }, { w: 'LEARNER.' }],
                  ].map((line, i) => (
                    <div key={i} className="flex flex-wrap gap-x-[0.22em]">
                      {line.map((wObj, j) => (
                        <span key={j} className="font-display text-[clamp(32px,4.5vw,64px)] leading-[0.88] tracking-tight uppercase" style={{ color: (wObj as {w:string;lime?:boolean}).lime ? LIME : CREAM }}>
                          {(wObj as {w:string;lime?:boolean}).w}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 max-w-[400px]">
                  <p className="font-body text-base leading-relaxed" style={{ color: DIM }}>Timelly starts with schools.</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: DIM }}>
                    But the future extends beyond K-12 education. The same infrastructure can power intermediate colleges, degree colleges, universities, and skill development institutions.
                  </p>
                  <p className="font-body text-sm font-semibold" style={{ color: CREAM }}>One connected ecosystem for lifelong learning.</p>
                </div>
              </div>

              {/* RIGHT — Ecosystem */}
              <div ref={p3RightRef} className="w-1/2 min-w-0">
                <EcosystemDiagram />
              </div>
            </div>

            <div className="pt-5" style={{ borderTop: `1px solid ${SUBTLE}` }}>
              <p className="font-body text-base md:text-lg" style={{ color: DIM }}>
                Building the <span style={{ color: LIME }}>operating system for education.</span>{' '}
                Not just for schools. For <span style={{ color: CREAM }}>an entire generation.</span>
              </p>
            </div>
            </VisionCard>
          </div>

        </div>
        {/* ── END track ── */}

        {/* Progress pills */}
        <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 flex gap-2">
          {['VISION 01', 'VISION 02', 'VISION 03'].map((label) => (
            <div
              key={label}
              className="h-1 w-16 rounded-full"
              style={{ backgroundColor: LIME_MID }}
            />
          ))}
        </div>
      </div>
      </section>
    </>
  )
}
