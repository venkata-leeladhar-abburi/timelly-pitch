'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PROBLEMS } from '@/lib/constants'

// ─── Per-problem config ───────────────────────────────────────────────────────
// startFrame: the frame index each problem's video should start playing from
const PROBLEM_CONFIG = [
  { startFrame: 0 },   // problem 1 — starts at frame 0000
  { startFrame: 0 },   // problem 2 — starts at frame 0000
  { startFrame: 8 },   // problem 3 — starts at frame 0008
  { startFrame: 104 }, // problem 4 — starts at frame 0104
]

// scroll height allocated per problem (vh)
const SECTION_VH = 500
// fraction of each section used for crossfade transition
const TRANSITION_FRAC = 0.06

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

// ─── Frame loader (self-contained, no hook dependency) ─────────────────────
interface FrameStore {
  images: HTMLImageElement[]
  totalFrames: number
  startFrame: number
  loaded: boolean
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ProblemSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)

  // Per-problem refs
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null, null])
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])

  const stores = useRef<FrameStore[]>(
    PROBLEMS.map((_, i) => ({
      images: [],
      totalFrames: 120,
      startFrame: PROBLEM_CONFIG[i].startFrame,
      loaded: false,
    }))
  )

  // ── Frame renderer ──────────────────────────────────────────────────────────
  const renderFrame = useCallback((pi: number, frameIndex: number) => {
    const canvas = canvasRefs.current[pi]
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const store = stores.current[pi]
    const img = store.images[Math.min(frameIndex, store.images.length - 1)]
    if (!img?.complete || !img.naturalWidth) return

    const dw = canvas.offsetWidth || window.innerWidth
    const dh = canvas.offsetHeight || window.innerHeight
    if (canvas.width !== dw || canvas.height !== dh) {
      canvas.width = dw
      canvas.height = dh
    }

    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const x = (canvas.width - img.naturalWidth * scale) / 2
    const y = (canvas.height - img.naturalHeight * scale) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
  }, [])

  // ── Load frames for one problem ─────────────────────────────────────────────
  const loadProblemFrames = useCallback(
    (pi: number) => {
      const problem = PROBLEMS[pi]
      const store = stores.current[pi]
      let loadedCount = 0
      const images: HTMLImageElement[] = []

      for (let i = 0; i < store.totalFrames; i++) {
        const img = new Image()
        const num = String(i).padStart(4, '0')
        img.src = `${problem.framesPath}frame_${num}.webp`
        img.onload = () => {
          loadedCount++
          // Paint the designated start-frame as soon as it loads (full-width)
          if (i === store.startFrame) {
            const canvas = canvasRefs.current[pi]
            if (canvas) {
              canvas.width = canvas.offsetWidth || window.innerWidth
              canvas.height = canvas.offsetHeight || window.innerHeight
            }
            renderFrame(pi, store.startFrame)
          }
          if (loadedCount === store.totalFrames) store.loaded = true
        }
        images.push(img)
      }
      store.images = images
    },
    [renderFrame]
  )

  // ── Boot: fetch meta → load frames ─────────────────────────────────────────
  useEffect(() => {
    PROBLEMS.forEach((problem, pi) => {
      fetch(`${problem.framesPath}meta.json`)
        .then((r) => r.json())
        .then((data: { totalFrames: number }) => {
          stores.current[pi].totalFrames = data.totalFrames
        })
        .catch(() => {})
        .finally(() => {
          loadProblemFrames(pi)
        })
    })
  }, [loadProblemFrames])

  // ── Master scroll controller ────────────────────────────────────────────────
  useEffect(() => {
    const N = PROBLEMS.length

    // Initialise text elements: set problem 1 fully visible, others hidden
    PROBLEMS.forEach((_, pi) => {
      const headline = headlineRefs.current[pi]
      const canvas = canvasRefs.current[pi]

      const initOpacity = pi === 0 ? 1 : 0
      if (headline) headline.style.opacity = String(initOpacity)
      if (canvas) canvas.style.opacity = String(initOpacity)
    })

    // Progress dots init
    dotRefs.current.forEach((dot, pi) => {
      if (!dot) return
      dot.style.width = pi === 0 ? '2rem' : '0.5rem'
      dot.style.background = pi === 0 ? 'var(--color-green)' : 'rgba(255,255,255,0.25)'
    })

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2, // buttery smooth
      onUpdate: (self) => {
        const progress = self.progress

        PROBLEMS.forEach((_, pi) => {
          const sectionStart = pi / N
          const sectionEnd = (pi + 1) / N

          // ── Canvas opacity (crossfade between sections) ────────────────────
          let canvasOpacity = 1

          // Fade in from previous section
          if (pi > 0) {
            const fadeInEnd = sectionStart + TRANSITION_FRAC
            if (progress < sectionStart) {
              canvasOpacity = 0
            } else if (progress < fadeInEnd) {
              canvasOpacity = (progress - sectionStart) / TRANSITION_FRAC
            }
          }

          // Fade out into next section
          if (pi < N - 1) {
            const fadeOutStart = sectionEnd - TRANSITION_FRAC
            if (progress > sectionEnd) {
              canvasOpacity = 0
            } else if (progress > fadeOutStart) {
              const t = (progress - fadeOutStart) / TRANSITION_FRAC
              canvasOpacity = Math.min(canvasOpacity, 1 - t)
            }
          }

          canvasOpacity = clamp01(canvasOpacity)
          const canvas = canvasRefs.current[pi]
          if (canvas) canvas.style.opacity = String(canvasOpacity)

          // ── Frame scrubbing ────────────────────────────────────────────────
          const store = stores.current[pi]
          const localProgress = clamp01((progress - sectionStart) / (sectionEnd - sectionStart))
          const effectiveFrames = store.totalFrames - store.startFrame
          const frameIndex = store.startFrame + Math.floor(localProgress * (effectiveFrames - 1))

          if (progress >= sectionStart - TRANSITION_FRAC && progress <= sectionEnd + TRANSITION_FRAC) {
            renderFrame(pi, frameIndex)
          }

          // ── Text opacity (slightly tighter than canvas) ────────────────────
          const textFadeBuffer = TRANSITION_FRAC * 0.7
          const textStart = sectionStart + textFadeBuffer
          const textEnd = sectionEnd - textFadeBuffer

          let textOpacity = 0
          if (progress >= textStart && progress <= textEnd) {
            textOpacity = 1
            // Smooth ramp in
            if (progress < textStart + TRANSITION_FRAC * 0.5) {
              textOpacity = (progress - textStart) / (TRANSITION_FRAC * 0.5)
            }
            // Smooth ramp out
            if (progress > textEnd - TRANSITION_FRAC * 0.5) {
              textOpacity = 1 - (progress - (textEnd - TRANSITION_FRAC * 0.5)) / (TRANSITION_FRAC * 0.5)
            }
          }

          textOpacity = clamp01(textOpacity)

          const headline = headlineRefs.current[pi]
          if (headline) headline.style.opacity = String(textOpacity)

          // ── Progress dot ──────────────────────────────────────────────────
          const dot = dotRefs.current[pi]
          if (dot) {
            const isActive = progress >= sectionStart && progress < sectionEnd
            dot.style.width = isActive ? '2rem' : '0.5rem'
            dot.style.background = isActive
              ? 'var(--color-green)'
              : 'rgba(255,255,255,0.25)'
          }
        })
      },
    })

    return () => trigger.kill()
  }, [renderFrame])

  // ── Bridge fade-in ───────────────────────────────────────────────────────────
  useEffect(() => {
    const tween = gsap.fromTo(
      bridgeRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: bridgeRef.current, start: 'top 85%' },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
    }
  }, [])

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── ONE unified scroll wrapper ── */}
      <div
        ref={wrapperRef}
        id="section-problem"
        style={{ height: `${PROBLEMS.length * SECTION_VH}vh`, position: 'relative' }}
      >
        {/* Sticky viewport — never scrolls away, all problems render inside here */}
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ background: '#101410' }}
        >
          {/* ── 4 stacked canvases — crossfaded by master ScrollTrigger ── */}
          {PROBLEMS.map((_, pi) => (
            <canvas
              key={pi}
              ref={(el) => { canvasRefs.current[pi] = el }}
              className="absolute inset-0"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                opacity: pi === 0 ? 1 : 0,
                transition: 'none', // JS controls opacity; CSS transition would lag
              }}
            />
          ))}

          {/* ── Cinematic gradient overlay ── */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(108deg, rgba(10,13,10,0.80) 0%, rgba(10,13,10,0.35) 42%, transparent 100%)',
            }}
          />

          {/* ── Bottom vignette ── */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36"
            style={{ background: 'linear-gradient(to top, rgba(10,13,10,0.75) 0%, transparent 100%)' }}
          />

          {/* ── Per-problem text overlays (two cards: top-left + bottom-right) ── */}
          {PROBLEMS.map((problem, pi) => (
            <div key={pi} className="pointer-events-none absolute inset-0 z-20">
              <div
                ref={(el) => { headlineRefs.current[pi] = el }}
                className="absolute inset-0"
                style={{ opacity: pi === 0 ? 1 : 0, transition: 'none' }}
              >

                {/* ── TOP-LEFT CARD: Label + Headline + Loss ── */}
                <div className="absolute top-4 left-6 md:top-6 md:left-8 lg:top-8 lg:left-10 w-full max-w-[580px]">
                  <div
                    className="rounded-2xl p-8 md:p-10"
                    style={{
                      background: 'rgba(16, 20, 16, 0.82)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(240, 237, 230, 0.13)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
                    }}
                  >
                    {/* Label row */}
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="font-body text-xs font-semibold tracking-[0.25em] uppercase"
                        style={{ color: 'rgba(240,237,230,0.45)' }}
                      >
                        {problem.label}
                      </span>
                      <div className="h-px flex-1" style={{ background: 'rgba(240,237,230,0.12)' }} />
                      {/* Category pill */}
                      <span
                        className="rounded-full px-3 py-1 font-body text-[11px] font-bold tracking-[0.18em] uppercase"
                        style={{
                          background: 'rgba(180, 212, 41, 0.14)',
                          border: '1px solid rgba(180, 212, 41, 0.40)',
                          color: '#B4D429',
                        }}
                      >
                        {problem.card.heading}
                      </span>
                    </div>

                    {/* Headline — Mona Sans line 1, Brier+lime line 2 */}
                    <h2
                      className="mb-5 font-body font-bold uppercase leading-[1.0] tracking-tight"
                      style={{
                        color: '#F0EDE6',
                        fontSize: 'clamp(28px, 3.5vw, 50px)',
                      }}
                    >
                      {problem.headline.map((line, li) => (
                        <span key={li} className="block">
                          {li === 0 ? (
                            line
                          ) : (
                            <span className="font-display" style={{ color: '#B4D429' }}>
                              {line}
                            </span>
                          )}
                        </span>
                      ))}
                    </h2>

                    {/* Lime divider */}
                    <div className="mb-5 h-px w-12" style={{ background: 'rgba(180,212,41,0.5)' }} />

                    {/* Body / loss text */}
                    <p
                      className="font-body text-base font-light leading-relaxed"
                      style={{ color: 'rgba(240,237,230,0.88)' }}
                    >
                      {problem.card.loss}
                    </p>
                  </div>
                </div>

                {/* ── BOTTOM-RIGHT CARD: Right cards list ── */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 w-full max-w-[420px]">
                  <div
                    className="rounded-2xl p-8 md:p-9"
                    style={{
                      background: 'rgba(16, 20, 16, 0.82)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(240, 237, 230, 0.13)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      {problem.rightCards.map((rc, rci) => (
                        <div key={rci} className="flex items-center gap-4">
                          {/* Number badge */}
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-body text-sm font-bold"
                            style={{
                              background: 'rgba(180, 212, 41, 0.12)',
                              border: '1px solid rgba(180, 212, 41, 0.35)',
                              color: '#B4D429',
                            }}
                          >
                            0{rci + 1}
                          </div>
                          <span
                            className="font-body text-base font-medium leading-tight"
                            style={{ color: 'rgba(240,237,230,0.92)' }}
                          >
                            {rc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* ── Progress dots ── */}
          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {PROBLEMS.map((_, pi) => (
              <div
                key={pi}
                ref={(el) => { dotRefs.current[pi] = el }}
                className="h-1 rounded-full"
                style={{
                  width: pi === 0 ? '2rem' : '0.5rem',
                  background: pi === 0 ? 'var(--color-green)' : 'rgba(255,255,255,0.25)',
                  transition: 'width 0.4s ease, background 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bridge to solution ── */}
      <div
        ref={bridgeRef}
        className="relative flex flex-col items-center justify-center overflow-hidden px-8 py-32 text-center"
        style={{ backgroundColor: '#23271A' }}
      >
        {/* Faint topographic contour texture */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 600"
          fill="none"
          stroke="#E9ECDB"
          strokeWidth="1"
          aria-hidden
        >
          <path d="M-50 120 C 250 40, 450 220, 750 120 S 1250 60, 1300 180" />
          <path d="M-50 220 C 250 140, 450 320, 750 220 S 1250 160, 1300 280" />
          <path d="M-50 360 C 300 280, 500 460, 800 360 S 1250 300, 1300 420" />
          <path d="M-50 480 C 300 400, 520 560, 820 480 S 1250 420, 1300 540" />
          <ellipse cx="180" cy="300" rx="160" ry="110" />
          <ellipse cx="1020" cy="260" rx="200" ry="140" />
        </svg>

        <h3
          className="relative z-10 font-body font-bold uppercase leading-[1.05] tracking-tight max-w-[20ch]"
          style={{
            color: '#E9ECDB',
            fontSize: 'clamp(36px, 5.4vw, 84px)',
          }}
        >
          THERE IS A
          <br />
          BETTER <span className="font-display font-bold" style={{ color: '#B4D429' }}>WAY.</span>
        </h3>
        <p className="relative z-10 mt-8 font-body text-base md:text-lg font-light tracking-wide text-[#E9ECDB]/60">
          One platform. For every school in India.
        </p>
      </div>

      <div className="section-divider w-full" />
    </>
  )
}
