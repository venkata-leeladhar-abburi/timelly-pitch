'use client'

import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onEnter = () => cursor.classList.add('hover')
    const onLeave = () => cursor.classList.remove('hover')

    window.addEventListener('mousemove', onMove)

    const interactive = document.querySelectorAll('a, button')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return <div id="cursor" />
}
