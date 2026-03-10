import TrebolMark from '@/components/ui/TrebolMark'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(172,200,162,0.07)] px-14 py-[26px] flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0 text-center md:text-left">
      {/* Logo — same wordmark style as nav */}
      <div className="inline-flex items-center gap-[10px] opacity-50">
        <TrebolMark size={24} color="var(--text-dim)" />
        <span className="font-mono text-[10px] tracking-[.22em] text-[var(--text-dim)] uppercase leading-none">
          Trebol
        </span>
      </div>

      {/* Copyright */}
      <div className="font-mono text-[9px] tracking-[.15em] text-[var(--text-faint)] uppercase">
        © 2025 Trebol Agency · Bogotá
      </div>

      {/* Social links */}
      <div className="flex gap-7">
        {[
          { href: '#', label: 'LinkedIn' },
          { href: '#', label: 'GitHub' },
          { href: '#', label: 'Instagram' },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            className="font-mono text-[9px] tracking-[.15em] uppercase text-[var(--text-dim)] no-underline transition-colors duration-300 hover:text-sage"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
