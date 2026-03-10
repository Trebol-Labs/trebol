import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import TrebolMark from '@/components/ui/TrebolMark'

export default function Manifesto() {
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
        <TrebolMark
          size="clamp(280px, 32vw, 500px)"
          className="opacity-[0.04]"
        />
      </div>

      <div className="max-w-[840px] relative z-[1]">
        <Reveal>
          <SectionLabel className="mb-[42px]">Our belief</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="font-syne font-semibold leading-[1.3] text-brand-white tracking-[-0.02em]"
            style={{ fontSize: 'clamp(22px, 3.2vw, 42px)' }}
          >
            <span style={{ color: 'var(--manifesto-dim-text)' }}>The future doesn&apos;t wait for anyone.</span>
            <span className="text-sage"> We are the bridge</span> between where your idea lives today
            <span style={{ color: 'var(--manifesto-dim-text)' }}> and where it&apos;s meant to go.</span>
            <span className="text-sage"> Young, ambitious,</span>
            <span style={{ color: 'var(--manifesto-dim-text)' }}> with everything still to prove —</span>
            <span className="text-sage"> and that&apos;s our greatest asset.</span>
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-[58px] flex items-center gap-[34px]">
          <div className="flex items-center gap-[10px]">
            <TrebolMark size={30} className="opacity-65" />
            <span className="font-mono text-[10px] tracking-[.2em] text-sage-muted uppercase">
              Trebol · Bogotá
            </span>
          </div>
          <div className="flex-1 h-px bg-[var(--border-dim)]" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-[.2em] text-sage-muted uppercase">
            2025
          </span>
        </Reveal>
      </div>
    </section>
  )
}
