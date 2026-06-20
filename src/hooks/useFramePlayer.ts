'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface UseFramePlayerProps {
  framesPath: string // e.g. '/frames/hero/'
  totalFrames: number
  sectionRef: React.RefObject<HTMLElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

export function useFramePlayer({
  framesPath,
  totalFrames,
  sectionRef,
  canvasRef,
}: UseFramePlayerProps) {
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    const renderFrame = (index: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const img = images[Math.min(index, images.length - 1)]
      if (!img?.complete) return

      // Always sync canvas dimensions to its actual rendered size
      const displayWidth = canvas.offsetWidth || window.innerWidth
      const displayHeight = canvas.offsetHeight || window.innerHeight

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
      }

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      )
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
    }

    // Handle window resize — redraw current frame
    let currentFrameIndex = 0
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = 0 // force reset so next render recalculates
      renderFrame(currentFrameIndex)
    }
    window.addEventListener('resize', handleResize)

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      const num = String(i).padStart(4, '0')
      img.src = `${framesPath}frame_${num}.webp`
      img.onload = () => {
        loadedCount++
        const progress = Math.floor((loadedCount / totalFrames) * 100)
        setLoadProgress(progress)

        // Render first frame immediately at full size
        if (loadedCount === 1) {
          // Force canvas to take full dimensions before rendering
          const canvas = canvasRef.current
          if (canvas) {
            canvas.width = canvas.offsetWidth || window.innerWidth
            canvas.height = canvas.offsetHeight || window.innerHeight
          }
          renderFrame(0)
        }
        if (loadedCount === totalFrames) setIsLoaded(true)
      }
      images.push(img)
    }

    imagesRef.current = images

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        currentFrameIndex = Math.floor(self.progress * (totalFrames - 1))
        renderFrame(currentFrameIndex)
      },
    })

    return () => {
      trigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [framesPath, totalFrames, sectionRef, canvasRef])

  return { loadProgress, isLoaded }
}
