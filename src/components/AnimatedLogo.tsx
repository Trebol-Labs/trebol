'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type anime from 'animejs'

const COLOR = 'var(--sage)'

export default function AnimatedLogo() {
  const svgRef = useRef<SVGSVGElement>(null)
  const idleAnim = useRef<anime.AnimeInstance | null>(null)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ default: anime }) => {
      if (!mounted || !svgRef.current) return
      const svg = svgRef.current
      const elements = Array.from(svg.querySelectorAll('path, line, rect, circle'))

      // Set up dash offsets for draw-on
      elements.forEach((el) => {
        const length = (el as SVGGeometryElement).getTotalLength?.() ?? 100
        ;(el as SVGElement).style.strokeDasharray = String(length)
        ;(el as SVGElement).style.strokeDashoffset = String(length)
      })

      // 1. Draw-on animation
      anime({
        targets: elements,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 500,
        delay: anime.stagger(60),
        easing: 'easeInOutSine',
        complete: () => {
          if (!mounted || !svgRef.current) return
          // 2. Idle breathing loop on petals
          const petals = Array.from(svg.querySelectorAll('[data-petal]'))
          idleAnim.current = anime({
            targets: petals,
            strokeWidth: [2.4, 3.2],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
          })
        },
      })
    })

    return () => {
      mounted = false
      idleAnim.current?.pause()
    }
  }, [])

  const handleMouseEnter = () => {
    import('animejs').then(({ default: anime }) => {
      if (!svgRef.current) return
      const petals = Array.from(svgRef.current.querySelectorAll('[data-petal]'))
      const eyes = Array.from(svgRef.current.querySelectorAll('[data-eye]'))
      anime({ targets: petals, strokeWidth: 3.8, duration: 200, easing: 'easeOutQuad' })
      anime({
        targets: eyes,
        fill: ['rgba(172,200,162,0.12)', 'rgba(172,200,162,0)'],
        duration: 400,
        easing: 'easeOutQuad',
      })
    })
  }

  const handleMouseLeave = () => {
    import('animejs').then(({ default: anime }) => {
      if (!svgRef.current) return
      const petals = Array.from(svgRef.current.querySelectorAll('[data-petal]'))
      anime({ targets: petals, strokeWidth: 2.4, duration: 300, easing: 'easeOutQuad' })
    })
  }

  return (
    <Link href="/" className="flex items-center gap-[11px] no-underline group">
      <svg
        ref={svgRef}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={34}
        height={34}
        aria-hidden="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ overflow: 'visible', cursor: 'none' }}
      >
        {/* stem */}
        <line x1="50" y1="68" x2="50" y2="49" stroke={COLOR} strokeWidth="2.6" strokeLinecap="round" />
        {/* top petal */}
        <path data-petal="" d="M50 48 C46 36 36 30 32 38 C28 47 38 54 50 48Z" fill="none" stroke={COLOR} strokeWidth="2.4" />
        {/* right petal */}
        <path data-petal="" d="M50 48 C62 44 70 34 64 28 C58 22 50 34 50 48Z" fill="none" stroke={COLOR} strokeWidth="2.4" />
        {/* bottom petal */}
        <path data-petal="" d="M50 48 C54 60 64 66 68 58 C72 50 62 43 50 48Z" fill="none" stroke={COLOR} strokeWidth="2.4" />
        {/* left petal */}
        <path data-petal="" d="M50 48 C38 52 30 62 36 68 C42 74 50 62 50 48Z" fill="none" stroke={COLOR} strokeWidth="2.4" />
        {/* center veins */}
        <line x1="50" y1="48" x2="36" y2="39" stroke={COLOR} strokeWidth="1.1" strokeLinecap="round" opacity=".55" />
        <line x1="50" y1="48" x2="62" y2="30" stroke={COLOR} strokeWidth="1.1" strokeLinecap="round" opacity=".55" />
        <line x1="50" y1="48" x2="64" y2="57" stroke={COLOR} strokeWidth="1.1" strokeLinecap="round" opacity=".55" />
        <line x1="50" y1="48" x2="37" y2="65" stroke={COLOR} strokeWidth="1.1" strokeLinecap="round" opacity=".55" />
        {/* robot head */}
        <rect x="24" y="67" width="52" height="44" rx="9" ry="9" fill="none" stroke={COLOR} strokeWidth="2.7" />
        {/* ears */}
        <rect x="13" y="78" width="11" height="15" rx="3" fill="none" stroke={COLOR} strokeWidth="2.3" />
        <rect x="76" y="78" width="11" height="15" rx="3" fill="none" stroke={COLOR} strokeWidth="2.3" />
        {/* eyes */}
        <circle data-eye="" cx="38" cy="83" r="6" fill="none" stroke={COLOR} strokeWidth="2.3" />
        <circle data-eye="" cx="62" cy="83" r="6" fill="none" stroke={COLOR} strokeWidth="2.3" />
        {/* mouth */}
        <rect x="39" y="97" width="22" height="6" rx="2" fill="none" stroke={COLOR} strokeWidth="2.1" />
      </svg>
      <span className="font-bebas text-[15px] tracking-[.18em] text-sage font-bold">TREBOL</span>
    </Link>
  )
}
