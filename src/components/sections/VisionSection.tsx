'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { VISION } from '@/lib/constants'

// scroll height allocated per vision panel (vh) — kept tall so each
// panel's frame sequence and copy have room to breathe on scroll
const SECTION_VH = 850
// fraction of each section used for crossfade transition
const TRANSITION_FRAC = 0.06

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

interface FrameStore {
  images: HTMLImageElement[]
  totalFrames: number
  loaded: boolean
}

export default function VisionSection() {
  const introRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null])
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  const stores = useRef<FrameStore[]>(
    VISION.map(() => ({
      images: [],
      totalFrames: 240,
      loaded: false,
    }))
  )

  const renderFrame = useCallback((vi: number, frameIndex: number) => {
    const canvas = canvasRefs.current[vi]
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const store = stores.current[vi]
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

  const loadVisionFrames = useCallback(
    (vi: number) => {
      const vision = VISION[vi]
      const store = stores.current[vi]
      let loadedCount = 0
      const images: HTMLImageElement[] = []

      for (let i = 0; i < store.totalFrames; i++) {
        const img = new Image()
        const num = String(i).padStart(4, '0')
        img.src = `${vision.framesPath}frame_${num}.webp`
        img.onload = () => {
          loadedCount++
          if (i === 0) {
            const canvas = canvasRefs.current[vi]
            if (canvas) {
              canvas.width = canvas.offsetWidth || window.innerWidth
              canvas.height = canvas.offsetHeight || window.innerHeight
            }
            renderFrame(vi, 0)
          }
          if (loadedCount === store.totalFrames) store.loaded = true
        }
        images.push(img)
      }
      store.images = images
    },
    [renderFrame]
  )

  useEffect(() => {
    VISION.forEach((vision, vi) => {
      fetch(`${vision.framesPath}meta.json`)
        .then((r) => r.json())
        .then((data: { totalFrames: number }) => {
          stores.current[vi].totalFrames = data.totalFrames
        })
        .catch(() => {})
        .finally(() => {
          loadVisionFrames(vi)
        })
    })
  }, [loadVisionFrames])

  useEffect(() => {
    const N = VISION.length

    VISION.forEach((_, vi) => {
      const headline = headlineRefs.current[vi]
      const canvas = canvasRefs.current[vi]

      const initOpacity = vi === 0 ? 1 : 0
      if (headline) headline.style.opacity = String(initOpacity)
      if (canvas) canvas.style.opacity = String(initOpacity)
    })

    dotRefs.current.forEach((dot, vi) => {
      if (!dot) return
      dot.style.width = vi === 0 ? '2rem' : '0.5rem'
      dot.style.background = vi === 0 ? 'var(--color-green)' : 'rgba(255,255,255,0.25)'
    })

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress

        VISION.forEach((_, vi) => {
          const sectionStart = vi / N
          const sectionEnd = (vi + 1) / N

          let canvasOpacity = 1

          if (vi > 0) {
            const fadeInEnd = sectionStart + TRANSITION_FRAC
            if (progress < sectionStart) {
              canvasOpacity = 0
            } else if (progress < fadeInEnd) {
              canvasOpacity = (progress - sectionStart) / TRANSITION_FRAC
            }
          }

          if (vi < N - 1) {
            const fadeOutStart = sectionEnd - TRANSITION_FRAC
            if (progress > sectionEnd) {
              canvasOpacity = 0
            } else if (progress > fadeOutStart) {
              const t = (progress - fadeOutStart) / TRANSITION_FRAC
              canvasOpacity = Math.min(canvasOpacity, 1 - t)
            }
          }

          canvasOpacity = clamp01(canvasOpacity)
          const canvas = canvasRefs.current[vi]
          if (canvas) canvas.style.opacity = String(canvasOpacity)

          const store = stores.current[vi]
          const localProgress = clamp01((progress - sectionStart) / (sectionEnd - sectionStart))
          const frameIndex = Math.floor(localProgress * (store.totalFrames - 1))

          if (progress >= sectionStart - TRANSITION_FRAC && progress <= sectionEnd + TRANSITION_FRAC) {
            renderFrame(vi, frameIndex)
          }

          const textFadeBuffer = TRANSITION_FRAC * 0.7
          const textStart = sectionStart + textFadeBuffer
          const textEnd = sectionEnd - textFadeBuffer

          let textOpacity = 0
          if (progress >= textStart && progress <= textEnd) {
            textOpacity = 1
            if (progress < textStart + TRANSITION_FRAC * 0.5) {
              textOpacity = (progress - textStart) / (TRANSITION_FRAC * 0.5)
            }
            if (progress > textEnd - TRANSITION_FRAC * 0.5) {
              textOpacity = 1 - (progress - (textEnd - TRANSITION_FRAC * 0.5)) / (TRANSITION_FRAC * 0.5)
            }
          }

          textOpacity = clamp01(textOpacity)

          const headline = headlineRefs.current[vi]
          if (headline) headline.style.opacity = String(textOpacity)

          const dot = dotRefs.current[vi]
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

  useEffect(() => {
    const tween = gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: introRef.current, start: 'top 85%' },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
    }
  }, [])

  return (
    <>
      {/* ── Intro statement bridging into the Vision section ── */}
      <div
        ref={introRef}
        className="relative flex flex-col items-center justify-center overflow-hidden px-8 py-32 text-center"
        style={{ backgroundColor: '#23271A' }}
      >
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

        <div className="relative z-10 mb-8 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#3F8F3F' }} />

        <h3
          className="relative z-10 font-body font-extrabold uppercase leading-[1.05] tracking-tight max-w-[24ch]"
          style={{
            color: '#E9ECDB',
            fontSize: 'clamp(28px, 4.6vw, 64px)',
          }}
        >
          THIS ISN&apos;T A{' '}
          <span className="font-serif font-semibold italic" style={{ color: '#A3C72E' }}>
            SCHOOL SOFTWARE
          </span>{' '}
          COMPANY.
          <br />
          IT&apos;S AN EDUCATION{' '}
          <span className="font-serif font-semibold italic" style={{ color: '#A3C72E' }}>
            INFRASTRUCTURE
          </span>{' '}
          COMPANY.
        </h3>
      </div>

      <div
        ref={wrapperRef}
        id="section-vision"
        style={{ height: `${VISION.length * SECTION_VH}vh`, position: 'relative' }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ background: '#101410' }}
        >
          {VISION.map((_, vi) => (
            <canvas
              key={vi}
              ref={(el) => { canvasRefs.current[vi] = el }}
              className="absolute inset-0"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                opacity: vi === 0 ? 1 : 0,
                transition: 'none',
              }}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(108deg, rgba(10,13,10,0.80) 0%, rgba(10,13,10,0.35) 42%, transparent 100%)',
            }}
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36"
            style={{ background: 'linear-gradient(to top, rgba(10,13,10,0.75) 0%, transparent 100%)' }}
          />

          {VISION.map((vision, vi) => (
            <div key={vi} className="pointer-events-none absolute inset-0 z-20">
              <div
                ref={(el) => { headlineRefs.current[vi] = el }}
                className="absolute inset-0 flex items-center justify-center px-6 md:justify-start md:px-16"
                style={{ opacity: vi === 0 ? 1 : 0, transition: 'none' }}
              >
                <div className="max-w-full text-center md:max-w-[50vw] md:text-left">
                  <div className="mb-6 flex flex-col items-center gap-3 md:mb-8 md:flex-row md:items-center md:gap-6">
                    <span className="font-body text-sm font-semibold tracking-[0.2em] text-[#F5F4F0]/50">
                      {vision.label}
                    </span>
                    <div className="hidden h-px w-20 bg-[#F5F4F0]/30 md:block" />
                    <span className="font-body text-sm font-semibold tracking-[0.3em] text-[#8DC63F] uppercase">
                      {vision.card.heading}
                    </span>
                  </div>

                  <h2 className="mb-8 hidden font-display text-[clamp(48px,5vw,80px)] leading-[0.9] text-[#F5F4F0] tracking-tight drop-shadow-2xl md:block">
                    {vision.headline.map((line, li) => (
                      <span key={li} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>

                  <div className="hidden border-l-[3px] border-[#8DC63F] pl-8 md:block">
                    <p className="font-body text-xl font-light leading-relaxed text-[#F5F4F0]/90 max-w-xl drop-shadow-md">
                      {vision.card.loss}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {VISION.map((_, vi) => (
              <div
                key={vi}
                ref={(el) => { dotRefs.current[vi] = el }}
                className="h-1 rounded-full"
                style={{
                  width: vi === 0 ? '2rem' : '0.5rem',
                  background: vi === 0 ? 'var(--color-green)' : 'rgba(255,255,255,0.25)',
                  transition: 'width 0.4s ease, background 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={bridgeRef}
        className="relative flex flex-col items-center justify-center overflow-hidden px-8 py-32 text-center"
        style={{ backgroundColor: '#23271A' }}
      >
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
          className="relative z-10 font-body font-extrabold uppercase leading-[1.05] tracking-tight max-w-[24ch]"
          style={{
            color: '#E9ECDB',
            fontSize: 'clamp(36px, 5.4vw, 84px)',
          }}
        >
          NOT SOFTWARE FOR SCHOOLS.
          <br />
          <span className="font-serif font-semibold italic" style={{ color: '#A3C72E' }}>
            INTELLIGENCE FOR EDUCATION.
          </span>
        </h3>
        <p className="relative z-10 mt-8 font-body text-base md:text-lg font-light tracking-wide text-[#E9ECDB]/60">
          One platform. Every learner. Every stage.
        </p>
      </div>

      <div className="section-divider w-full" />
    </>
  )
}
