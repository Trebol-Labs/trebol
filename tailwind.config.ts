import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-olive': 'var(--deep-olive)',
        'olive-dark': 'var(--olive-dark)',
        'olive-mid': 'var(--olive-mid)',
        'olive-surface': 'var(--olive-surface)',
        'sage': 'var(--sage)',
        'sage-dim': 'var(--sage-dim)',
        'sage-muted': 'var(--sage-muted)',
        'sage-pale': 'var(--sage-pale)',
        'brand-black': 'var(--black)',
        'brand-white': 'var(--white)',
      },
      fontFamily: {
        // Space Mono — display headings + all mono labels
        bebas: ['var(--font-space)', 'monospace'],
        mono: ['var(--font-space)', 'monospace'],
        // Bricolage Grotesque — body, card titles, sub-headings
        syne: ['var(--font-bricolage)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
