'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Tilt3D from '@/components/ui/Tilt3D'
import { services } from '@/lib/data/services'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section
      id="services"
      className="px-6 md:px-14 py-[70px] md:py-32 max-w-[1400px] mx-auto"
    >
      {/* Header */}
      <Reveal className="flex flex-col md:flex-row justify-between md:items-end mb-[70px] gap-[18px] md:gap-0">
        <div>
          <SectionLabel className="mb-[14px]">{s.label}</SectionLabel>
          <h2
            className="font-bebas text-brand-white leading-none tracking-[.02em]"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
          >
            {s.heading1}<br />
            <span style={{ WebkitTextStroke: '1px var(--border-strong)', color: 'transparent' }}>
              {s.heading2}
            </span>
          </h2>
        </div>
        <p className="text-[15px] text-[var(--text-dim)] leading-[1.8] md:text-right max-w-full md:max-w-[290px]">
          {s.subtext}
        </p>
      </Reveal>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: 'var(--border-subtle)' }}
      >
        {services.map((svc, i) => {
          const delays = [0, 0.1, 0.2, 0.1, 0.2, 0.3]
          const item = s.items[i]
          return (
            <Reveal key={svc.num} delay={delays[i]}>
              <Tilt3D className="h-full">
                <div className="service-card bg-brand-black px-[42px] py-[50px] h-full hover:bg-[var(--surface-hover-strong)]">
                  <div className="font-mono text-[12px] tracking-[.22em] text-sage-muted mb-[34px]">
                    {svc.num}
                  </div>
                  <div
                    className="w-[42px] h-[42px] border border-[var(--border-mid)] flex items-center justify-center mb-[26px] text-[18px] transition-all duration-300"
                    aria-hidden="true"
                  >
                    {svc.icon}
                  </div>
                  <div className="font-syne text-[18px] font-bold text-brand-white mb-3 tracking-[.01em]">
                    {item?.name ?? svc.name}
                  </div>
                  <p className="text-[15px] text-[var(--text-dim)] leading-[1.8]">
                    {item?.desc ?? svc.desc}
                  </p>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-[26px] font-mono text-[12px] tracking-[.2em] uppercase text-sage-dim no-underline transition-all duration-300 hover:text-sage hover:gap-4"
                  >
                    {s.explore} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Tilt3D>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
