'use client'

const ITEMS = [
  'IT Development',
  'Digital Innovation',
  'Tech Strategy',
  'Future-Forward',
  'Systems Architecture',
  'Product Design',
]

export default function Ticker() {
  // Duplicate items for seamless infinite scroll
  const all = [...ITEMS, ...ITEMS]

  return (
    <div
      className="border-t border-[var(--border-subtle)] overflow-hidden py-[15px] relative z-[2]"
      style={{ background: 'var(--ticker-surface)' }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'ticker 28s linear infinite' }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[.22em] uppercase text-sage-muted px-11 flex items-center gap-11"
            style={{ '--tw-content': '"◆"' } as React.CSSProperties}
          >
            {item}
            <span className="text-[7px]" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
