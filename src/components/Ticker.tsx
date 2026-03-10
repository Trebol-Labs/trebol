'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Ticker() {
  const { t } = useLanguage()
  const items = [...t.ticker, ...t.ticker]

  return (
    <div
      className="border-t border-[var(--border-subtle)] overflow-hidden py-[15px] relative z-[2]"
      style={{ background: 'var(--ticker-surface)' }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'ticker 28s linear infinite' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[12px] tracking-[.22em] uppercase text-sage-muted px-11 flex items-center gap-11"
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
