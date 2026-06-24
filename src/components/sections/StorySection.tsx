'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useParallax } from '@/hooks/useParallax'

const GREEN = '#86B25C'

type IconKind = 'whatsapp' | 'doc' | 'people' | 'timelly'

interface StoryItem {
  icon: IconKind
  pre: string
  highlight: string
  line2?: string
}

const ITEMS: StoryItem[] = [
  { icon: 'whatsapp', pre: 'I watched ', highlight: 'schools', line2: 'run on WhatsApp.' },
  { icon: 'doc', pre: 'I watched ', highlight: 'teachers', line2: 'waste hours on paperwork.' },
  { icon: 'people', pre: 'I watched ', highlight: 'parents', line2: 'miss what mattered.' },
  { icon: 'timelly', pre: 'So I built ', highlight: 'Timelly.' },
]

function Glyph({ kind }: { kind: IconKind }) {
  const common = {
    width: 24,
    height: 24,
    fill: 'none',
    stroke: GREEN,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (kind) {
    case 'whatsapp':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 3a8.5 8.5 0 0 0-7.4 12.7L3.5 21l5.5-1.4A8.5 8.5 0 1 0 12 3Z" />
          <path d="M8.6 8.4c-.3 0-.6.1-.8.4-.3.4-.9 1-.9 2.3s.9 2.6 1.1 2.8c.2.2 1.9 3 4.6 4 .7.3 1.3.4 1.7.3.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.6.9-.8 1.1-.1.2-.3.2-.5.1-.3-.1-1.2-.5-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5-.1-.2-.6-1.5-.9-2-.2-.4-.4-.4-.6-.4Z" fill={GREEN} stroke="none" />
        </svg>
      )
    case 'doc':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M7 3h7l4 4v14H7Z" />
          <path d="M14 3v4h4" />
          <path d="M9.5 12h5M9.5 15h5M9.5 9h2" />
        </svg>
      )
    case 'people':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="2.6" />
          <path d="M4.5 19c0-2.5 2-4.3 4.5-4.3s4.5 1.8 4.5 4.3" />
          <path d="M16 7.2a2.4 2.4 0 0 1 0 4.4M16.5 14.8c2 .4 3.5 2 3.5 4.2" />
        </svg>
      )
    case 'timelly':
      return (
        <span className="font-body text-2xl leading-none" style={{ color: GREEN }}>
          T
        </span>
      )
  }
}

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const imageWrapRef = useRef<HTMLDivElement>(null)

  useParallax(sectionRef, imageWrapRef, 18)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      ).fromTo(
        itemRefs.current.filter(Boolean),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.18,
        },
        '-=0.2'
      )
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-story"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Dark dramatic portrait — full bleed, parallaxed */}
      <div ref={imageWrapRef} className="absolute inset-0 -top-[9%] -bottom-[9%]">
        <Image
          src="/assets/founder-dark.jpg"
          alt="Sreerama Kartheek Raj"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>

      {/* Left darkening wash so the list reads over the portrait */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-8 py-24 md:px-16 md:py-32">
        {/* Section Title */}
        <div ref={labelRef} className="mb-12">
          <h2 className="font-body font-bold text-[clamp(44px,6vw,80px)] tracking-tight text-[#F5F4F0] uppercase">
            THE STORY<span style={{ color: GREEN }}>.</span>
          </h2>
        </div>

        {/* Story list */}
        <ul className="max-w-[480px] w-full space-y-4">
          {ITEMS.map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className="flex items-center gap-5 rounded-2xl border border-white/[0.15] bg-white/[0.07] p-5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]"
            >
              {/* Icon */}
              <span 
                className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]"
                style={{ boxShadow: `0 0 15px ${GREEN}08`, width: '52px', height: '52px' }}
              >
                <Glyph kind={item.icon} />
              </span>

              {/* Text */}
              <p className="font-body leading-snug text-[clamp(16px,1.6vw,20px)]">
                <span className="text-[#F5F4F0] font-light">{item.pre}</span>
                <span className="font-display font-bold" style={{ color: GREEN }}>{item.highlight}</span>
                {item.line2 && (
                  <>
                    <br />
                    <span className="text-[#F5F4F0]/50 font-light">{item.line2}</span>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
