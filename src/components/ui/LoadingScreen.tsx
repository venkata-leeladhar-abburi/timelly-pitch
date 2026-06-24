'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface LoadingScreenProps {
  progress: number
  isComplete: boolean
}

export default function LoadingScreen({
  progress,
  isComplete,
}: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isComplete) {
      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        onComplete: () => {
          if (screenRef.current) screenRef.current.style.display = 'none'
        },
      })
    }
  }, [isComplete])

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9998] bg-bg-primary flex flex-col items-center justify-center"
    >
      <div className="font-body text-4xl text-text-warm mb-8 tracking-widest">
        TIMELLY
      </div>
      <div className="w-64 h-px bg-bg-card relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-green transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="font-body text-xs text-text-muted mt-4 tracking-widest">
        LOADING EXPERIENCE — {progress}%
      </div>
    </div>
  )
}
