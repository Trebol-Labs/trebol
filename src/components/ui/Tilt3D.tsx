'use client'

import { useRef, ReactNode } from 'react'
import type anime from 'animejs'

interface Tilt3DProps {
  children: ReactNode
  className?: string
}

export default function Tilt3D({ children, className }: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<anime.AnimeInstance | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    const rotX = -dy * 8
    const rotY = dx * 10

    animRef.current?.pause()
    import('animejs').then(({ default: anime }) => {
      animRef.current = anime({
        targets: el,
        rotateX: rotX,
        rotateY: rotY,
        duration: 150,
        easing: 'easeOutQuad',
      })
    })
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    animRef.current?.pause()
    import('animejs').then(({ default: anime }) => {
      animRef.current = anime({
        targets: el,
        rotateX: 0,
        rotateY: 0,
        duration: 400,
        easing: 'easeOutElastic(1, .6)',
      })
    })
  }

  return (
    <div style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        className={className}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  )
}
