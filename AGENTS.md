# AGENTS.md — Developer & AI Agent Guide

This document provides essential guidance for developers and agentic coding systems working on the Trebol Agency codebase.

---

## 1. Build, Lint, and Test Commands

### Build Commands
```bash
npm run build         # Full Next.js production build
npm run dev          # Start local dev server (port 3000)
npm start            # Start production server
npm run type-check   # TypeScript type checking without emit
```

### Running Tests
Currently, there is **no automated test suite**. All verification is done via:
- **Manual testing**: `npm run dev` then navigate to `http://localhost:3003` (uses available port)
- **Type checking**: `npm run type-check` (required before commits)
- **Visual regression**: Use Playwright CLI or manual browser inspection

### Single Test or Specific Component Testing
```bash
# Type-check specific file
npx tsc --noEmit src/components/ui/TrebolMark.tsx

# Start dev server and navigate to specific route
npm run dev
# Then visit http://localhost:3000/
```

---

## 2. Code Style & Conventions

### Imports
- **Path aliases**: Use `@/*` for all imports. Example: `import Nav from '@/components/layout/Nav'`
- **Order**: Group by external → internal → relative paths
- **Client components**: Always include `'use client'` directive at the top for interactivity
```typescript
'use client'

import Link from 'next/link'
import TrebolMark from '@/components/ui/TrebolMark'
import { useTheme } from '@/hooks/useTheme'
```

### Formatting
- **Tabs/Spaces**: Use 2 spaces (enforced by Next.js defaults)
- **Line length**: Keep under 100 characters where practical
- **Semicolons**: Always included; enforced by TypeScript strict mode
- **Trailing commas**: Use trailing commas in multi-line objects/arrays

### TypeScript & Types
- **Strict mode enabled**: `"strict": true` in `tsconfig.json`
- **Type annotations**: Always annotate function params and return types
- **Interfaces for props**: Use `interface ComponentNameProps { ... }` pattern
- **No `any`**: Avoid type `any` — use `unknown` and narrow types
```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  // ...
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `TrebolMark`, `AnimatedLogo`)
- **Files**: Match component names exactly (e.g., `TrebolMark.tsx`)
- **Variables/functions**: camelCase (e.g., `handleMouseMove`, `isActive`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT = 5000`)
- **CSS classes**: kebab-case (e.g., `.clip-chamfer-sm`, `.service-card`)

### Component Structure
```typescript
interface ComponentProps { /* ... */ }

export default function ComponentName(props: ComponentProps) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

### Error Handling
- **API routes**: Use `NextResponse.json()` with explicit status codes
- **Form validation**: Use Zod schemas (see `src/lib/schemas/contact.ts`)
- **Client errors**: Log to console with context prefix (e.g., `[contact] New submission:`)
- **Graceful degradation**: Always provide fallbacks for optional features (animations, theme)

```typescript
// Example from contact API
const result = contactSchema.safeParse(body)

if (!result.success) {
  return NextResponse.json(
    { success: false, errors: result.error.flatten().fieldErrors },
    { status: 400 }
  )
}
```

---

## 3. Architecture & Key Patterns

### Project Structure
```
src/
  ├── app/                    # Next.js App Router (layout, pages, API)
  ├── components/
  │   ├── layout/            # Global layout components (Nav, Footer)
  │   ├── sections/          # Page sections (Hero, Services, Contact, etc.)
  │   └── ui/                # Reusable UI components (TrebolMark, Tilt3D, etc.)
  ├── hooks/                 # Custom React hooks (useTheme)
  ├── lib/
  │   ├── data/             # Static data (services, caseStudies)
  │   ├── schemas/          # Zod validation schemas
  │   └── utils.ts          # Utility functions (cn for class merging)
  └── types/                # TypeScript interfaces
```

### Animation Library
- **animejs**: Used for 3D transformations and smooth transitions
- **framer-motion**: Used for layout animations and scroll effects
- **dynamic imports**: Import anime dynamically to avoid hydration mismatches

### Styling
- **Tailwind CSS**: Primary styling approach
- **CSS Custom Properties (vars)**: Dark/light theme switching via `data-theme` attribute
- **Utilities**: Use `cn()` from `src/lib/utils.ts` to merge Tailwind classes

### Form Handling
- **react-hook-form**: Form state management
- **Zod**: Runtime schema validation
- Pattern: Define schema in `src/lib/schemas/`, infer TypeScript type with `z.infer<>`

---

## 4. Git Workflow & Commit Standards

### Branch Strategy
- Work on `main` branch (no protected branches configured yet)
- Push frequently; feature branches optional for experimental work

### Commit Messages
Use conventional commit format:
```
type(scope): brief description

Optional body with details.
```

Examples:
- `fix: update logo paths and improve 3D animation in hero`
- `feat: create TrebolLogo component for navbar and footer`
- `refactor: consolidate logo rendering logic`

### Before Committing
```bash
npm run type-check  # MANDATORY — must pass
npm run build       # Optional but recommended
git status          # Review all changes
```

### Staged Files
- **Include**: `.tsx`, `.ts`, `.css`, `.json` (configs), `.md`
- **Exclude**: `.env*`, `.local`, `.next/`, `node_modules/`, temporary files

---

## 5. Performance & Best Practices

### Image Optimization
- Use Next.js `Image` component where possible (unoptimized in static export mode)
- SVG assets: Embed directly or use as components

### Bundle Size
- Lazy-load heavy libraries (e.g., `import('animejs')` on demand)
- Use dynamic imports for large components: `dynamic(() => import('...'))`

### Hydration
- Client components: Always include `'use client'` directive
- SSR-safe: Avoid accessing `window` in non-client components
- Theme toggle: Initialized server-side with inline script to prevent flash

### Accessibility
- Use semantic HTML (`<button>`, `<nav>`, `<section>`, etc.)
- Include `aria-hidden="true"` for decorative elements
- Ensure color contrast meets WCAG standards

---

## 6. Deployment

### GitHub Pages (Static Export)
- Deploy via GitHub Actions (see `.github/workflows/deploy.yml`)
- Next.js configured with `output: 'export'` for static HTML generation
- Base path: `/trebol` in production, empty in dev
- Runs `type-check` → `build` → upload to Pages on push to `main`

### Local Testing of Production Build
```bash
npm run build
npm start
```

---

## 7. IDE/Tool Configuration

### TypeScript
- Target: `ES2017`
- JSX: `preserve` (Next.js handles it)
- Path alias: `@/* → ./src/*`

### Playwright (Testing)
- Config in `.playwright-mcp/` (auto-generated)
- Permissions whitelist in `.claude/settings.local.json`

---

## Summary

- **Always run `npm run type-check` before committing**
- Use `@/` path aliases in all imports
- Write TypeScript with strict types; no `any`
- Client components: mark with `'use client'`
- Form validation: Zod schemas in `src/lib/schemas/`
- Animations: Use animejs (dynamic import) or framer-motion
- CSS: Tailwind + CSS vars for theming
- Commits: Conventional format, meaningful messages
- Deployment: GitHub Pages via Actions (fully automated)

