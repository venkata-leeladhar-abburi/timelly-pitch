'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface LoadingScreenProps {
  progress: number
  isComplete: boolean
}

const BOOT_TEXTS = [
  'LOADING TIMELLY',
  'CONNECTING SCHOOLS',
  'PREPARING AI MODELS',
  'BUILDING THE FUTURE OF EDUCATION',
]

export default function LoadingScreen({
  progress,
  isComplete,
}: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [bootText, setBootText] = useState(BOOT_TEXTS[0])

  useEffect(() => {
    // Cycle through boot texts as progress increases
    const idx = Math.min(
      Math.floor((progress / 100) * BOOT_TEXTS.length),
      BOOT_TEXTS.length - 1
    )
    setBootText(BOOT_TEXTS[idx])
  }, [progress])

  useEffect(() => {
    if (isComplete) {
      // Flash the bar full width before fading out
      gsap.to(barRef.current, {
        boxShadow: '0 0 30px #B4D429, 0 0 60px #B4D429',
        height: '4px',
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        delay: 0.6,
        onComplete: () => {
          if (screenRef.current) screenRef.current.style.display = 'none'
        },
      })
    }
  }, [isComplete])

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1A3A24' }}
    >
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-[0.15]"
        style={{ background: 'radial-gradient(circle, #B4D429 0%, transparent 60%)', filter: 'blur(80px)' }}
      />
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(240, 237, 230, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 237, 230, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-8">
        
        {/* Animated Brand */}
        <div className="mb-14 text-center">
          <div className="font-display font-bold text-6xl md:text-8xl tracking-tight uppercase" style={{ color: '#F5F4F0' }}>
            Timelly
          </div>
        </div>

        {/* Dynamic Boot Text */}
        <div className="w-full flex justify-between items-end mb-5">
          <div className="font-display text-sm md:text-base font-bold tracking-[0.2em] uppercase" style={{ color: '#B4D429' }}>
            {bootText}
          </div>
          <div className="font-display text-sm md:text-base font-bold tracking-widest" style={{ color: '#F5F4F0' }}>
            {progress}%
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-full h-1 relative overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(245, 244, 240, 0.1)' }}>
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%`, backgroundColor: '#B4D429', boxShadow: '0 0 12px rgba(180,212,41,0.8)' }}
          />
        </div>

      </div>
    </div>
  )
}
