import TrebolMark from '@/components/ui/TrebolMark'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(172,200,162,0.07)] px-14 py-[34px] flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0 text-center md:text-left">
      {/* Logo */}
      <div className="flex items-center gap-[10px]">
        <TrebolMark size={26} className="opacity-45" />
        <span className="font-bebas text-[13px] tracking-[.18em] text-sage-muted font-bold">
          TREBOL
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
