import Reveal from '@/components/ui/Reveal'

const stats = [
  { val: 'Early', suffix: ' stage', desc: 'Building our story' },
  { val: 'BOG', suffix: ' based', desc: 'Latin America' },
  { val: '100', suffix: '%', desc: 'Skin in the game' },
  { val: '∞', suffix: '', desc: 'Runway of ambition' },
]

export default function HumbleStrip() {
  return (
    <div className="border-b border-[var(--border-subtle)]">
      <Reveal
        className="flex items-center gap-[72px] flex-wrap px-14 py-[68px] max-w-[1400px] mx-auto"
      >
        <span className="font-mono text-[9px] tracking-[.25em] uppercase text-sage-muted whitespace-nowrap flex-shrink-0">
          Where we stand
        </span>

        <div className="hidden md:block w-px h-11 bg-[var(--border-dim)] flex-shrink-0" aria-hidden="true" />

        <div className="flex gap-14 flex-wrap">
          {stats.map(({ val, suffix, desc }) => (
            <div key={val + desc} className="flex flex-col gap-[5px]">
              <div className="font-bebas text-[34px] text-brand-white tracking-[.04em] leading-none">
                {val}
                <span className="text-sage text-[22px]">{suffix}</span>
              </div>
              <div className="font-mono text-[9px] tracking-[.18em] uppercase text-[var(--text-dim)]">
                {desc}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block ml-auto font-mono text-[9px] tracking-[.13em] text-[var(--text-faint)] italic text-right max-w-[210px] leading-[1.85]">
          We don&apos;t sell a track record.<br />We sell talent, time,<br />and full commitment.
        </div>
      </Reveal>
    </div>
  )
}
