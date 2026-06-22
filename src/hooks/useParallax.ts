'use client'

import { useEffect, RefObject } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Moves `targetRef` vertically at a slower/faster rate than scroll while
 * `containerRef` is in view, for a depth-of-field parallax effect on
 * full-bleed background imagery.
 */
export function useParallax(
  containerRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  amount = 80
) {
  useEffect(() => {
    if (!containerRef.current || !targetRef.current) return

    const tween = gsap.fromTo(
      targetRef.current,
      { yPercent: -amount / 2 },
      {
        yPercent: amount / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])
}

export { gsap, ScrollTrigger }
