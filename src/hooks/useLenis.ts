'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const animate = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

    return () => {
      lenis.destroy()
    }
  }, [])
}
