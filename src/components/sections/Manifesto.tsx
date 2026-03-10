'use client'

import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import TrebolLogo from '@/components/ui/TrebolLogo'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Manifesto() {
  const { t } = useLanguage()
  const m = t.manifesto

  return (
    <section
      id="manifesto"
      className="relative overflow-hidden px-6 md:px-14 py-[70px] md:py-32"
      style={{ background: 'var(--deep-olive)' }}
    >
      {/* Watermark */}
      <div
        className="absolute right-[-60px] top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <TrebolLogo
          width="clamp(180px, 22vw, 320px)"
          height="clamp(230px, 28vw, 400px)"
          className="opacity-[0.04]"
        />
      </div>

      <div className="max-w-[840px] relative z-[1]">
        <Reveal>
          <SectionLabel className="mb-[42px]">{m.label}</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="font-syne font-semibold leading-[1.3] text-brand-white tracking-[-0.02em]"
            style={{ fontSize: 'clamp(22px, 3.2vw, 42px)' }}
          >
            <span style={{ color: 'var(--manifesto-dim-text)' }}>{m.part1}</span>
            <span className="text-sage">{m.part2}</span>
            {m.part3}
            <span style={{ color: 'var(--manifesto-dim-text)' }}>{m.part4}</span>
            <span className="text-sage">{m.part5}</span>
            <span style={{ color: 'var(--manifesto-dim-text)' }}>{m.part6}</span>
            <span className="text-sage">{m.part7}</span>
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-[58px] flex items-center gap-[34px]">
          <div className="flex items-center gap-[10px]">
            <TrebolLogo width={34} height={42} className="opacity-65" />
            <span className="font-mono text-[12px] tracking-[.2em] text-sage-muted uppercase">
              Trebol · Bogotá
            </span>
          </div>
          <div className="flex-1 h-px bg-[var(--border-dim)]" aria-hidden="true" />
          <span className="font-mono text-[12px] tracking-[.2em] text-sage-muted uppercase">
            2025
          </span>
        </Reveal>
      </div>
    </section>
  )
}
