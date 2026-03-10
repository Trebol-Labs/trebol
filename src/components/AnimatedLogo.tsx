'use client'

import Link from 'next/link'
import TrebolMark from '@/components/ui/TrebolMark'

export default function AnimatedLogo() {
  return (
    <Link
      href="/"
      aria-label="Trebol home"
      className="group inline-flex items-center gap-[10px] no-underline"
    >
      {/* Icon mark */}
      <span
        className="flex-shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-px"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(172,200,162,0.18))' }}
      >
        <TrebolMark size={32} />
      </span>

      {/* Wordmark */}
      <span
        className="font-mono text-[11px] tracking-[.22em] text-sage uppercase leading-none transition-colors duration-300 group-hover:text-sage-pale"
        aria-hidden="true"
      >
        Trebol
      </span>
    </Link>
  )
}
