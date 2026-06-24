'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { FOUNDER } from '@/lib/constants'
import { useParallax } from '@/hooks/useParallax'
import { useMagneticHover } from '@/hooks/useMagneticHover'

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([])
  const labelRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const signRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const continueBtnRef = useRef<HTMLButtonElement>(null)

  useParallax(sectionRef, imageWrapRef, 18)
  useMagneticHover(continueBtnRef, 0.4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          nameRefs.current,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.12,
          },
          '-=0.3'
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          signRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: 'power1.out' },
          '-=0.3'
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.9'
        )
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-founder"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: '#EFEDE5' }}
    >
      {/* Founder photo — full bleed, person stays centered, parallaxed */}
      <div ref={imageWrapRef} className="absolute inset-0 -top-[9%] -bottom-[9%]">
        <Image
          src="/assets/founder.jpg"
          alt={FOUNDER.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>

      {/* Readability washes for the text columns */}
      {/* Mobile: dark bottom-up wash so text sits in a legible band at the foot of the photo */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 pointer-events-none bg-gradient-to-t from-[#1C1F1A]/90 via-[#1C1F1A]/45 to-transparent md:hidden" />
      {/* Desktop: original light side wash */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#EFEDE5]/85 via-transparent to-[#EFEDE5]/70 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1750px] items-end justify-center gap-8 px-6 pb-16 md:items-center md:justify-between md:px-16 md:pb-0 lg:px-24 xl:px-32">
        {/* LEFT — identity */}
        <div className="max-w-2xl">
          {/* Label */}
          <div
            ref={labelRef}
            className="mb-6 flex items-center gap-4 font-body text-xs font-medium tracking-[0.35em] text-[#A9B97B] md:text-[#7E8B4F]"
          >
            <span>FOUNDER</span>
            <span className="h-px w-10 bg-[#A9B97B] md:bg-[#7E8B4F]" />
          </div>

          {/* Name */}
          <h2 className="font-body font-bold leading-[1.05] text-text-warm md:text-bg-primary">
            {['SREERAMA', 'KARTHEEK'].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  ref={(el) => {
                    nameRefs.current[i] = el
                  }}
                  className="block text-[clamp(32px,6.5vw,76px)] tracking-tight"
                >
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-4 -mb-4 pr-4 -mr-4">
              <span
                ref={(el) => {
                  nameRefs.current[2] = el
                }}
                className="block text-[clamp(32px,6.5vw,76px)] tracking-tight pb-4 pr-4"
              >
                RAJ<span className="text-[#A9B97B] md:text-[#7E8B4F]">.</span>
              </span>
            </span>
          </h2>

          {/* Subtitle */}
          <div ref={subRef} className="mt-7">
            <p className="font-body text-base md:text-lg font-medium tracking-wide text-text-warm/75 md:text-bg-primary/70">
              {FOUNDER.title}, Timelly
            </p>
          </div>

          {/* Signature */}
          <div
            ref={signRef}
            className="mt-4 font-script text-3xl md:text-4xl text-[#A9B97B] md:text-[#7E8B4F]"
          >
            {FOUNDER.name}
          </div>
        </div>

        {/* RIGHT — next chapter / mission card */}
        <div
          ref={cardRef}
          className="hidden w-[320px] shrink-0 rounded-2xl border border-[#1C1F1A]/12 bg-[#EFEDE5]/70 p-8 backdrop-blur-md shadow-[0_12px_40px_rgba(28,31,26,0.06)] lg:block"
        >
          <div className="font-body text-[11px] font-medium tracking-[0.3em] text-[#1C1F1A]/45">
            NEXT CHAPTER
          </div>

          {/* Line-art sketch - Paper Plane */}
          <div className="my-6 flex justify-center">
            <svg
              width="150"
              height="70"
              viewBox="0 0 150 70"
              fill="none"
              stroke="#1C1F1A"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 transition-transform duration-500 hover:scale-105"
            >
              <path d="M8 46 L142 14 L70 40 Z" />
              <path d="M70 40 L72 64 L88 46" />
              <path d="M70 40 L142 14" />
            </svg>
          </div>

          <div className="h-px w-full bg-[#1C1F1A]/10" />

          <div className="mt-6 font-body text-[11px] font-medium tracking-[0.3em] text-[#1C1F1A]/45">
            OUR MISSION
          </div>
          <div className="space-y-2.5 mt-4">
            {['Every school.', 'Every child.', 'Every day.'].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7E8B4F]" />
                <span className="font-body text-[15px] font-medium text-[#1C1F1A]/85">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            ref={continueBtnRef}
            type="button"
            aria-label="Continue"
            onClick={() =>
              document
                .getElementById('section-problem')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1F1A]/20 text-[#1C1F1A] shadow-sm transition-[transform,background-color,border-color,color] duration-200 ease-out hover:bg-[#1C1F1A] hover:text-[#EFEDE5] hover:border-[#1C1F1A] hover:scale-110 active:scale-95"
          >
            <span className="text-lg leading-[1.08]">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
