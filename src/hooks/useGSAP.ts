'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Registers GSAP plugins and runs a scoped animation setup callback.
 * The callback receives a GSAP context so all created animations/triggers
 * are reverted automatically on unmount.
 */
export function useGSAP(
  setup: (ctx: { gsap: typeof gsap }) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      setup({ gsap })
    })
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }
