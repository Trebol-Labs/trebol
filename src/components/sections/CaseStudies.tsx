'use client'

import { useRef, useEffect, ReactNode } from 'react'
import type anime from 'animejs'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import TrebolMark from '@/components/ui/TrebolMark'
import { caseStudies } from '@/lib/data/caseStudies'

function CaseRow({ children, delay }: { children: ReactNode; delay: number }) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return

    let anim: anime.AnimeInstance | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        import('animejs').then(({ default: anime }) => {
          anim = anime({
            targets: el,
            opacity: [0, 1],
            translateX: [-40, 0],
            rotateY: ['8deg', '0deg'],
            duration: 700,
            delay,
            easing: 'easeOutExpo',
          })
        })
      },
      { threshold: 0.15 }
    )

    el.style.opacity = '0'
    observer.observe(el)

    return () => {
      observer.disconnect()
      anim?.pause()
    }
  }, [delay])

  return (
    <div ref={rowRef} style={{ perspective: '600px', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="work" className="pb-32">
      {/* Header */}
      <div className="px-6 md:px-14 pb-[70px] max-w-[1400px] mx-auto">
        <Reveal>
          <SectionLabel className="mb-[14px]">Selected Work</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-bebas text-brand-white leading-none tracking-[.02em]"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
          >
            CASE{' '}
            <span style={{ WebkitTextStroke: '1px var(--border-strong)', color: 'transparent' }}>
              STUDIES
            </span>
          </h2>
        </Reveal>
      </div>

      {/* Case list */}
      <div className="border-t border-[var(--border-subtle)]">
        {caseStudies.map((cs, i) => (
          <CaseRow key={cs.num} delay={i * 120}>
            <div
              className="case-item grid items-center gap-[42px] px-6 md:px-14 border-b border-[var(--border-subtle)] cursor-pointer hover:bg-[var(--surface-hover)]"
              style={{ gridTemplateColumns: 'minmax(54px,70px) 1fr auto' }}
            >
              <div className="font-mono text-[11px] text-sage-muted tracking-[.1em] py-10">
                {cs.num}
              </div>

              <div className="py-10">
                <div className="flex gap-2 mb-[10px] flex-wrap">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[8px] tracking-[.2em] uppercase text-sage-dim border border-[var(--border-mid)] px-[9px] py-[3px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="font-syne font-extrabold text-brand-white tracking-[-0.01em] transition-colors duration-300"
                  style={{ fontSize: 'clamp(20px, 2.6vw, 32px)' }}
                >
                  {cs.name}
                </div>
                <div className="text-[12px] text-[var(--text-dim)] mt-[6px]">{cs.sub}</div>
              </div>

              {/* Visual — hidden on mobile */}
              <div
                className="hidden md:flex w-[175px] h-[105px] bg-olive-mid items-center justify-center flex-shrink-0 overflow-hidden"
                aria-hidden="true"
              >
                <TrebolMark size={46} className="opacity-[0.17] transition-opacity duration-300" />
              </div>
            </div>
          </CaseRow>
        ))}
      </div>
    </section>
  )
}
