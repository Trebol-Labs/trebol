'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
      className="font-mono text-[12px] tracking-[.18em] uppercase text-[var(--text-dim)] transition-colors duration-300 hover:text-sage flex items-center gap-[6px]"
    >
      <span
        className="inline-block w-[5px] h-[5px] rounded-full bg-sage-dim flex-shrink-0"
        aria-hidden="true"
      />
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
