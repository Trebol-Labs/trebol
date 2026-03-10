'use client'

import Link from 'next/link'
import AnimatedLogo from '@/components/AnimatedLogo'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Nav() {
  const { t } = useLanguage()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-14 py-[18px]"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: 'linear-gradient(to bottom, var(--nav-overlay) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Logo */}
      <AnimatedLogo />

      {/* Nav links — hidden below 768px */}
      <ul className="hidden md:flex gap-10 list-none">
        {[
          { href: '#services', label: t.nav.services },
          { href: '#work', label: t.nav.work },
          { href: '#contact', label: t.nav.contact },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-mono text-[12px] tracking-[.18em] text-[var(--text-dim)] uppercase no-underline transition-colors duration-300 hover:text-sage"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side: language toggle + theme toggle + CTA */}
      <div className="hidden md:flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
        <Link
          href="#contact"
          className="font-mono text-[12px] tracking-[.15em] text-brand-black bg-sage px-[22px] py-[10px] uppercase no-underline transition-colors duration-300 hover:bg-sage-pale clip-chamfer-sm"
        >
          {t.nav.startProject}
        </Link>
      </div>
    </nav>
  )
}
