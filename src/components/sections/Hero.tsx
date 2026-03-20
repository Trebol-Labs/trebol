'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Ticker from '@/components/Ticker'
import { useLanguage } from '@/contexts/LanguageContext'

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false })

const textCol = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

export default function Hero() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 1000], [0, 270])

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', paddingBottom: '44px' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 55% at 65% 45%, var(--hero-rad-1) 0%, transparent 70%),
            radial-gradient(ellipse 35% 40% at 15% 75%, var(--hero-rad-2) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Parallax grid */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      {/* ── Hero content: two-column flex row ── */}
      <div
        className="flex items-center relative z-[2] min-h-[calc(100vh-44px)]"
        style={{ padding: 'clamp(80px, 8vw, 120px) clamp(24px, 4vw, 56px) 40px', maxWidth: 1400 }}
      >
        {/* Left: text */}
        <motion.div
          className="flex flex-col justify-center flex-1 min-w-0"
          variants={textCol}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div
            variants={item}
            className="flex items-center gap-[14px] font-mono text-[12px] tracking-[.22em] text-sage-muted uppercase mb-[34px]"
          >
            <span className="block w-[30px] h-px bg-sage-muted flex-shrink-0" aria-hidden="true" />
            <span
              className="inline-block w-1 h-1 rounded-full bg-sage-dim flex-shrink-0"
              style={{ animation: 'pulse 2.4s ease infinite' }}
              aria-hidden="true"
            />
            {t.hero.eyebrow}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="font-syne font-extrabold text-brand-white leading-[.95] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(44px, 7vw, 108px)' }}
          >
            BRIDGE<br />
            <span style={{ WebkitTextStroke: '1px var(--border-accent)', color: 'transparent' }}>
              BETWEEN
            </span><br />
            <span className="text-sage">IDEAS &amp;</span><br />
            FUTURE
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-[34px] max-w-[420px] text-[16px] leading-[1.8] text-[var(--text-dim)]"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Actions */}
          <motion.div variants={item} className="mt-[50px] flex gap-4 items-center">
            <Link
              href="#work"
              className="bg-sage text-brand-black font-mono text-[12px] tracking-[.15em] uppercase px-[34px] py-[15px] no-underline transition-all duration-300 hover:bg-sage-pale hover:-translate-y-0.5 clip-chamfer-md"
            >
              {t.hero.cta1}
            </Link>
            <Link
              href="#contact"
              className="text-sage font-mono text-[12px] tracking-[.15em] uppercase px-[34px] py-[15px] no-underline border border-[var(--border-bold)] transition-all duration-300 hover:border-sage hover:bg-[rgba(172,200,162,.05)]"
            >
              {t.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: WebGL canvas */}
        <div
          className="hidden md:block flex-shrink-0 self-stretch"
          style={{
            width: 'clamp(340px, 44vw, 620px)',
            minHeight: 'clamp(480px, 65vh, 720px)',
            pointerEvents: 'none',
            overflow: 'hidden',
            borderRadius: '12px',
          }}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      </div>

      {/* Location badge */}
      <div
        className="absolute right-14 bottom-24 hidden md:flex items-center gap-[10px] font-mono text-[11px] tracking-[.18em] uppercase text-sage-muted z-[3]"
        style={{ animation: 'fadeIn 1s ease 1.1s both' }}
      >
        <span
          className="inline-block w-[5px] h-[5px] rounded-full bg-sage-dim flex-shrink-0"
          style={{ animation: 'pulse 2.4s ease infinite' }}
          aria-hidden="true"
        />
        {t.hero.available}
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <Ticker />
      </div>
    </section>
  )
}
