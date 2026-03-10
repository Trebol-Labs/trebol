'use client'

import Reveal from '@/components/ui/Reveal'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HumbleStrip() {
  const { t } = useLanguage()
  const { stats, label, aside } = t.humble

  return (
    <div className="border-b border-[var(--border-subtle)]">
      <Reveal
        className="flex items-center gap-[72px] flex-wrap px-14 py-[68px] max-w-[1400px] mx-auto"
      >
        <span className="font-mono text-[11px] tracking-[.25em] uppercase text-sage-muted whitespace-nowrap flex-shrink-0">
          {label}
        </span>

        <div className="hidden md:block w-px h-11 bg-[var(--border-dim)] flex-shrink-0" aria-hidden="true" />

        <div className="flex gap-14 flex-wrap">
          {stats.map(({ val, suffix, desc }) => (
            <div key={val + desc} className="flex flex-col gap-[5px]">
              <div className="font-bebas text-[34px] text-brand-white tracking-[.04em] leading-none">
                {val}
                <span className="text-sage text-[22px]">{suffix}</span>
              </div>
              <div className="font-mono text-[11px] tracking-[.18em] uppercase text-[var(--text-dim)]">
                {desc}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block ml-auto font-mono text-[11px] tracking-[.13em] text-[var(--text-faint)] italic text-right max-w-[210px] leading-[1.85]">
          {aside[0]}<br />{aside[1]}<br />{aside[2]}
        </div>
      </Reveal>
    </div>
  )
}
