'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/* ── Theme (dark olive, matching the reference image) ────────────────────── */
const BG       = '#1E2A1A'
const CREAM    = '#E8E4D0'
const LIME     = '#B5D142'
const DIM      = 'rgba(232,228,208,0.60)'
const LIME_MID = 'rgba(181,209,66,0.25)'
const CARD_BG  = 'rgba(232,228,208,0.05)'
const CARD_BDR = 'rgba(232,228,208,0.10)'
const INK_ICON = '#E8E4D0'

/* ── Layout (Desktop) ────────────────────────────────────────────────────── */
const NODE_R  = 52     // icon circle radius (px, diameter is 104px)
const CARD_W  = 340    // card width (px, increased from 250px)

const NODES_DESKTOP: [number, number][] = [
  [420, 250],   // Node 1 - Left sway, card on right
  [680, 600],   // Node 2 - Right sway, card on left
  [420, 950],   // Node 3 - Left sway, card on right
  [680, 1300],  // Node 4 - Right sway, card on left
  [420, 1650],  // Node 5 - Left sway, card on right
  [680, 2000],  // Node 6 - Right sway, card on left
]

const DESKTOP_PATH = `
  M 550,50
  C 550,150 420,150 420,250
  C 420,425 680,425 680,600
  C 680,775 420,775 420,950
  C 420,1125 680,1125 680,1300
  C 680,1475 420,1475 420,1650
  C 420,1825 680,1825 680,2000
  C 680,2100 550,2100 550,2200
`

/* ── Journey-style Icons (stroke 1.8, cream on darkBg) ───────────────────── */
const Ico = ({ children }: { children: React.ReactNode }) => (
  <svg className="w-9 h-9 md:w-11 md:h-11" viewBox="0 0 24 24" fill="none"
    stroke={INK_ICON} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const Icons = {
  Cloud:   () => <Ico><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></Ico>,
  Team:    () => <Ico><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Ico>,
  Card:    () => <Ico><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></Ico>,
  Target:  () => <Ico><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Ico>,
  Link:    () => <Ico><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Ico>,
  Revenue: () => <Ico><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Ico>,
}

/* ── Step data ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01', label: 'Cloud SaaS Platform',
    body: 'The platform has been ·successfully developed· as a working cloud-based SaaS product with all core school management features.',
    Icon: Icons.Cloud,
  },
  {
    num: '02', label: 'Core Team In Place',
    body: 'A dedicated ·team of 4 members· is already in place, covering technology and sales functions.',
    Icon: Icons.Team,
  },
  {
    num: '03', label: 'Revenue Model Defined',
    body: 'The business model (·subscription + transaction fee·) is clearly defined and ready for market execution.',
    Icon: Icons.Card,
  },
  {
    num: '04', label: 'GTM Strategy Finalized',
    body: 'Initial go-to-market strategy is finalized with focus on ·direct school onboarding· and pilot deployments.',
    Icon: Icons.Target,
  },
  {
    num: '05', label: 'School Partnerships',
    body: 'The startup is ready to begin ·school partnerships·, starting with Andhra Pradesh for early adoption and validation.',
    Icon: Icons.Link,
  },
  {
    num: '06', label: 'Active Revenue',
    body: 'Timelly has already ·onboarded 2 schools· and is set to go live from June, marking the start of ·active revenue generation·.',
    Icon: Icons.Revenue,
  },
]

/* ── Highlight helper ────────────────────────────────────────────────────── */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/·/).map((part, i) =>
        i % 2 === 1
          ? <strong key={i} style={{ color: CREAM, fontWeight: 700 }}>{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function TractionSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const wavePathRef = useRef<SVGPathElement>(null)
  const mobileLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── 1. Desktop Winding Path Animation ───
      const desktopWavePath = wavePathRef.current
      if (desktopWavePath) {
        const len = desktopWavePath.getTotalLength()
        gsap.set(desktopWavePath, { strokeDasharray: len, strokeDashoffset: len })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom 80%',
          scrub: 1,
          onUpdate: (self) => {
            desktopWavePath.style.strokeDashoffset = String(len * (1 - self.progress))
          }
        })
      }

      // ─── 2. Mobile Straight Line Animation ───
      const mobileLine = mobileLineRef.current
      if (mobileLine) {
        gsap.fromTo(mobileLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 30%',
              end: 'bottom 80%',
              scrub: true
            }
          }
        )
      }

      // ─── 3. Node Group Pop-in Animations ───
      document.querySelectorAll('.traction-node-group').forEach((group) => {
        const circle = group.querySelector('.node-circle')
        const card   = group.querySelector('.traction-card')
        const num    = group.querySelector('.node-num')
        const conn   = group.querySelector('.node-conn')

        gsap.set([circle, card, num, conn].filter(Boolean), { opacity: 0, scale: 0.85 })

        ScrollTrigger.create({
          trigger: group,
          start: 'top 95%', // Trigger just inside the viewport so reverse animations are visible when scrolling back up
          toggleActions: 'play none none reverse',
          onEnter: () => {
            const tl = gsap.timeline()
            if (conn) {
              tl.to(conn, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' })
            }
            tl.to(circle, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, conn ? '<' : '0')
            if (num) {
              tl.to(num, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }, '<')
            }
            if (card) {
              tl.to(card, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, '<0.1')
            }
          },
          onLeaveBack: () => {
            gsap.to([circle, card, num, conn].filter(Boolean), {
              opacity: 0,
              scale: 0.85,
              duration: 0.15,
            })
          }
        })
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-traction"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: BG }}
    >
      {/* ── Background texture ──────────────────────────────────────────── */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04]"
        preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 700" fill="none"
        stroke={CREAM} strokeWidth="0.5" aria-hidden>
        <path d="M-100 200 C 300 60, 600 420, 900 200 S 1400 60, 1500 300"/>
        <path d="M-100 500 C 280 360, 580 640, 900 500 S 1400 360, 1500 600"/>
        <circle cx="600" cy="350" r="320" fill="none"/>
      </svg>

      {/* ── Title Header ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-[6vw] md:px-[8vw] mb-24 text-center">
        <h2 className="flex flex-wrap justify-center gap-x-[0.3em] font-bold text-[clamp(54px,7vw,96px)] tracking-tight uppercase">
          <span className="font-body" style={{ color: CREAM }}>CURRENT</span>
          <span className="font-display" style={{ color: LIME }}>TRACTION.</span>
        </h2>
      </div>

      {/* ── Desktop Timeline (Winding Path) ────────────────────────────── */}
      <div className="relative w-[1100px] mx-auto h-[2300px] hidden md:block">
        <svg
          className="absolute top-0 left-0 w-full h-[2250px] pointer-events-none"
          viewBox="0 0 1100 2250"
          fill="none"
        >
          {/* Ghost dashed path */}
          <path
            d={DESKTOP_PATH}
            fill="none"
            stroke="rgba(232,228,208,0.06)"
            strokeWidth="2.5"
            strokeDasharray="14 10"
          />
          {/* Animated draw path */}
          <path
            ref={wavePathRef}
            d={DESKTOP_PATH}
            fill="none"
            stroke={LIME}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {STEPS.map((step, i) => {
          const [nx, ny] = NODES_DESKTOP[i]
          const isLeft = i % 2 === 0

          return (
            <div
              key={i}
              className="traction-node-group absolute"
              style={{ left: `${nx}px`, top: `${ny}px` }}
            >
              {/* Circle */}
              <div
                className="node-circle absolute flex items-center justify-center rounded-full"
                style={{
                  width: `${NODE_R * 2}px`,
                  height: `${NODE_R * 2}px`,
                  background: 'rgba(232,228,208,0.06)',
                  border: `1.5px solid ${LIME}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 28px rgba(181,209,66,0.18), inset 0 0 14px rgba(181,209,66,0.08)`,
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <step.Icon />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: '-10px',
                    border: `1px solid rgba(181,209,66,0.15)`,
                  }}
                />
              </div>

              {/* Step Number Above Circle */}
              <div
                className="node-num absolute font-body font-bold tracking-[0.35em]"
                style={{
                  fontSize: '16px',
                  color: LIME,
                  bottom: '66px',
                  left: 0,
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.num}
              </div>

              {/* Connector Line */}
              <div
                className="node-conn absolute"
                style={{
                  width: '108px',
                  height: '2px',
                  background: `linear-gradient(${isLeft ? 'to right' : 'to left'}, ${LIME_MID}, rgba(181,209,66,0.02))`,
                  left: isLeft ? `${NODE_R}px` : 'auto',
                  right: isLeft ? 'auto' : `${NODE_R}px`,
                  top: 0,
                  transform: 'translateY(-50%)',
                }}
              />

              {/* Card */}
              <div
                className="traction-card absolute rounded-2xl transition-all duration-300 hover:border-[#B5D142] hover:shadow-[0_0_30px_rgba(181,209,66,0.12)]"
                style={{
                  width: `${CARD_W}px`,
                  padding: '24px 28px',
                  background: CARD_BG,
                  border: `1px solid ${CARD_BDR}`,
                  backdropFilter: 'blur(14px)',
                  left: isLeft ? '160px' : 'auto',
                  right: isLeft ? 'auto' : '160px',
                  top: 0,
                  transform: 'translateY(-50%)',
                }}
              >
                <p
                  className="font-body font-semibold uppercase tracking-widest mb-3"
                  style={{ fontSize: '13px', color: LIME }}
                >
                  {step.label}
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '17px', color: DIM }}>
                  <Rich text={step.body} />
                </p>
              </div>
            </div>
          )
        })}

        {/* End indicator dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: LIME,
            left: '550px',
            top: '2200px',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 12px ${LIME}`,
          }}
        />
      </div>

      {/* ── Mobile Timeline (icon + line spine, cards centered below each icon) ── */}
      <div className="relative md:hidden px-[6vw] pb-12">
        {/* Dynamic height line that draws itself, running down the center spine */}
        <div
          ref={mobileLineRef}
          className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, ${LIME}, ${LIME_MID}, transparent)`,
            transformOrigin: 'top center',
          }}
        />

        <div className="relative flex flex-col items-center gap-14">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="traction-node-group relative flex w-full max-w-sm flex-col items-center"
            >
              {/* Circle centered on the timeline spine */}
              <div
                className="node-circle relative z-10 mb-5 flex items-center justify-center rounded-full"
                style={{
                  width: '52px',
                  height: '52px',
                  background: BG,
                  border: `1.5px solid ${LIME}`,
                  boxShadow: `0 0 16px rgba(181,209,66,0.15)`,
                }}
              >
                <step.Icon />
              </div>

              {/* Content card — centered, full width up to max-w-sm */}
              <div className="traction-card relative z-10 w-full">
                <div
                  className="rounded-2xl p-6 text-center transition-all duration-300 hover:border-[#B5D142] hover:shadow-[0_0_20px_rgba(181,209,66,0.1)]"
                  style={{
                    background: CARD_BG,
                    border: `1px solid ${CARD_BDR}`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex flex-col items-center gap-2 mb-3">
                    <span className="font-body text-[15px] text-[#B5D142] font-bold">
                      {step.num}
                    </span>
                    <span className="font-body text-[12px] uppercase tracking-widest text-[#B5D142]">
                      {step.label}
                    </span>
                  </div>
                  <p className="font-body text-[16px] leading-relaxed" style={{ color: DIM }}>
                    <Rich text={step.body} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
