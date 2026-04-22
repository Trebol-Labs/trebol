# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Static export → out/
npm run type-check   # tsc --noEmit (no test suite; this is the quality gate)
npm start            # Serve the built output
```

CI runs `type-check` then `build` on every push to `main`. Both must pass before any deploy.

## Architecture

**Static Next.js 15 site** with `output: 'export'` — no SSR, no API routes at runtime. The `out/` directory is deployed to GitHub Pages at trebollab.com.

Page assembly: `src/app/page.tsx` imports section components in order: Hero → HumbleStrip → Manifesto → Services → CaseStudies → ProjectShowcase → Contact.

**Providers** (defined in `src/app/layout.tsx`):
- `LanguageProvider` wraps the body — supplies `useLanguage()` / `t()` translation hook
- Theme is stored in `localStorage` and applied as `data-theme` on `<html>` (anti-FOUC inline script in `<head>`)

**All section and interactive components are `'use client'`** — required because they consume context or use browser APIs.

## Key Patterns

**Theming** — colors are CSS custom properties (`--deep-olive`, `--sage`, etc.) defined in `globals.css` with a `[data-theme="light"]` override block. Tailwind classes use aliases (`text-sage`, `bg-deep-olive`) mapped to those vars in `tailwind.config.ts`.

**i18n** — `src/lib/i18n/translations.ts` holds `en`/`es` dictionaries as `as const`. Call `const { t } = useLanguage()` and index with `t('key')`. All user-facing strings must go through this.

**Anime.js import quirk** — the package uses `export =` syntax. Import types as:
```ts
import type anime from 'animejs'
// ref type: anime.AnimeInstance
```

**3D canvas** — `HeroCanvas.tsx` uses React Three Fiber + Drei + postprocessing. Keep heavy Three.js imports isolated to that file; it's already dynamically loaded.

**Fonts** — `next/font` loads Bebas Neue and Syne at build time. In `tailwind.config.ts` the aliases `font-bebas` / `font-syne` map to the CSS vars injected by Next.

## Data & Content

Static content lives in `src/lib/data/`:
- `services.ts` — 6 services (service 02 calls out the MultiStack approach)
- `caseStudies.ts` — 3 real studies: FOMAG (Gov-Tech PWA), OCTsense (AI HealthTech), Routyne (Fitness PWA)

Contact form (`ContactForm.tsx`) POSTs to `/api/contact` which currently only `console.log`s — swap for Resend when email is ready.

## Path Alias

`@/*` → `src/*` — always use this for imports.
