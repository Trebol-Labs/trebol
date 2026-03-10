'use client'

import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/ContactForm'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section
      id="contact"
      className="px-6 md:px-14 py-[70px] md:py-32 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[108px] items-center"
    >
      {/* Left col */}
      <Reveal>
        <SectionLabel className="mb-[26px]">{c.label}</SectionLabel>
        <div
          className="font-bebas text-brand-white leading-[.95]"
          style={{ fontSize: 'clamp(34px, 4.8vw, 72px)' }}
        >
          {c.line1}<br />
          <span
            className="block"
            style={{ WebkitTextStroke: '1px var(--border-accent)', color: 'transparent' }}
          >
            {c.line2}
          </span>
          {c.line3 && c.line3}
        </div>
        <div className="mt-[34px] flex flex-col gap-2">
          {['Bogotá, Colombia', 'hello@trebol.agency'].map((item) => (
            <div
              key={item}
              className="font-mono text-[12px] tracking-[.18em] text-[var(--text-dim)] uppercase flex items-center gap-[10px]"
            >
              <span className="block w-[14px] h-px bg-sage-muted flex-shrink-0" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Right col — form */}
      <Reveal delay={0.15}>
        <ContactForm />
      </Reveal>
    </section>
  )
}
