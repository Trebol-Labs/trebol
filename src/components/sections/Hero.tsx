'use client'

import { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import TrebolLogo from '@/components/ui/TrebolLogo'
import Ticker from '@/components/Ticker'
import { useLanguage } from '@/contexts/LanguageContext'

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

export default function Hero() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 1000], [0, 270])

  useEffect(() => {
    let mounted = true
    let animMotion: any
    let animTilt: any

    import('animejs').then(({ default: anime }) => {
      if (!mounted) return

      // Smooth organic floating
      animMotion = anime({
        targets: '.hero-watermark-motion',
        translateY: ['-30px', '30px'],
        translateX: ['-15px', '15px'],
        duration: 8000,
        direction: 'alternate',
        easing: 'easeInOutSine',
        loop: true,
      })

      // 3D Tilt rotation
      animTilt = anime({
        targets: '.hero-watermark-tilt',
        rotateY: ['-25deg', '25deg'],
        rotateX: ['12deg', '-12deg'],
        rotateZ: ['-2deg', '2deg'],
        translateZ: [0, 80],
        duration: 9000,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        loop: true,
      })
    })

    return () => {
      mounted = false
      if (animMotion) animMotion.pause()
      if (animTilt) animTilt.pause()
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: '1fr auto' }}
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

      {/* Watermark logo — 3D rotating */}
      <div
        className="absolute right-12 top-1/2 -translate-y-[52%] z-[1] hidden md:block"
        style={{ perspective: '1800px', perspectiveOrigin: '60% 46%' }}
        aria-hidden="true"
      >
        <div className="hero-watermark-motion" style={{ transformStyle: 'preserve-3d' }}>
          <div className="hero-watermark-tilt" style={{ transformStyle: 'preserve-3d' }}>
            <TrebolLogo
              width="clamp(180px, 18vw, 260px)"
              height="clamp(230px, 24vw, 320px)"
              className="opacity-[0.075]"
            />
          </div>
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        className="flex flex-col justify-center relative z-[2]"
        style={{ padding: 'clamp(108px, 10vw, 148px) clamp(24px, 4vw, 56px) 60px', maxWidth: 1400 }}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariant}
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
          variants={itemVariant}
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
          variants={itemVariant}
          className="mt-[34px] max-w-[420px] text-[16px] leading-[1.8] text-[var(--text-dim)]"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Actions */}
        <motion.div variants={itemVariant} className="mt-[50px] flex gap-4 items-center">
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
      <Ticker />
    </section>
  )
}
