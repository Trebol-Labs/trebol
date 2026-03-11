'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { caseStudies } from '@/lib/data/caseStudies'
import { useLanguage } from '@/contexts/LanguageContext'

// ── Browser frame wrapper ─────────────────────────────────────────────────────
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col rounded-lg overflow-hidden"
      style={{ border: '1px solid rgba(172,200,162,0.14)', background: '#080c07' }}>
      <div className="flex items-center gap-1.5 px-3 py-2.5 flex-shrink-0"
        style={{ background: '#0c1009', borderBottom: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(172,200,162,0.5)' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(172,200,162,0.3)' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(172,200,162,0.15)' }} />
        <div className="flex-1 mx-3 h-4 rounded-sm flex items-center px-2"
          style={{ background: 'rgba(172,200,162,0.05)' }}>
          <span className="font-mono text-[8px] tracking-widest" style={{ color: 'rgba(172,200,162,0.25)' }}>
            app.trebol.co
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

// ── Mock UI: FOMAG (Gov-Tech PWA) ─────────────────────────────────────────────
function FOMAGUi() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden font-mono" style={{ background: '#080c07' }}>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="text-[8px] tracking-[.2em] uppercase" style={{ color: 'rgba(172,200,162,0.4)' }}>
          FOMAG · Portal Docente
        </div>
        <div className="flex gap-4 text-[7px] tracking-wider uppercase">
          {['Inicio', 'Historia', 'Documentos'].map((item, i) => (
            <span key={item} style={{ color: i === 2 ? '#acc8a2' : 'rgba(172,200,162,0.25)' }}>{item}</span>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(172,200,162,0.06)' }}>
        <div className="text-[7px] tracking-[.2em] uppercase mb-1" style={{ color: 'rgba(172,200,162,0.3)' }}>Afiliados activos</div>
        <div className="font-bold leading-none" style={{ color: '#acc8a2', fontSize: '26px', letterSpacing: '-0.02em' }}>
          890<span style={{ color: 'rgba(172,200,162,0.4)', fontSize: '13px' }}>,000 docentes</span>
        </div>
        <div className="text-[7px] mt-1" style={{ color: 'rgba(172,200,162,0.3)' }}>↑ Cobertura nacional · Colombia</div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col px-4 py-2 gap-1.5">
        <div className="text-[7px] tracking-[.2em] uppercase mb-1" style={{ color: 'rgba(172,200,162,0.25)' }}>Carga de documentos</div>
        {[
          ['Certificado médico', 'PDF', 'CARGADO', true],
          ['Historia clínica', 'PDF', 'PENDIENTE', false],
          ['Autorización EPS', 'IMG', 'CARGADO', true],
          ['Orden de laboratorio', 'PDF', 'REVISIÓN', false],
        ].map(([name, type, status, done]) => (
          <div key={String(name)} className="flex items-center justify-between py-1.5"
            style={{ borderBottom: '1px solid rgba(172,200,162,0.04)' }}>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[6px] tracking-wider px-1 py-0.5 flex-shrink-0"
                style={{ border: '1px solid rgba(172,200,162,0.15)', color: 'rgba(172,200,162,0.4)' }}>{type}</span>
              <span className="text-[7px] truncate" style={{ color: 'rgba(172,200,162,0.55)' }}>{name}</span>
            </div>
            <span className="text-[6px] tracking-[.15em] uppercase px-1.5 py-0.5 flex-shrink-0"
              style={{ color: done ? '#acc8a2' : 'rgba(172,200,162,0.35)', border: `1px solid rgba(172,200,162,${done ? '0.22' : '0.08'})` }}>
              {status}
            </span>
          </div>
        ))}
        <div className="mt-auto pt-2 flex gap-2">
          <div className="flex-1 py-1.5 text-center text-[7px] tracking-wider uppercase"
            style={{ border: '1px solid rgba(172,200,162,0.2)', color: '#acc8a2' }}>
            + Subir archivo
          </div>
          <div className="flex-1 py-1.5 text-center text-[7px] tracking-wider uppercase"
            style={{ background: 'rgba(172,200,162,0.08)', border: '1px solid rgba(172,200,162,0.07)', color: 'rgba(172,200,162,0.4)' }}>
            Enviar solicitud
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Mock UI: OCTsense (HealthTech AI) ─────────────────────────────────────────
function OCTsenseUI() {
  return (
    <div className="w-full h-full flex overflow-hidden font-mono" style={{ background: '#080c07' }}>
      {/* Left: scan panel */}
      <div className="flex-1 flex flex-col p-3 gap-2 overflow-hidden"
        style={{ borderRight: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="text-[7px] tracking-[.22em] uppercase" style={{ color: 'rgba(172,200,162,0.3)' }}>
          OCT Scan · Retina Cross-section
        </div>
        <div className="flex-1 relative overflow-hidden"
          style={{ border: '1px solid rgba(172,200,162,0.1)', background: '#050805' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
            {[20,35,50,65,80].map((y, i) => (
              <path key={i}
                d={`M0 ${y} C40 ${y + (i%2===0?-6:6)} 80 ${y + (i%2===0?8:-4)} 120 ${y + (i%2===0?-3:7)} C160 ${y + (i%2===0?10:-8)} 200 ${y + (i%2===0?-5:5)} 200 ${y}`}
                fill="none" stroke={`rgba(172,200,162,${0.08 + i*0.06})`} strokeWidth={i === 2 ? '1.5' : '0.7'} />
            ))}
            <rect x="72" y="28" width="28" height="18" rx="1"
              fill="none" stroke="rgba(172,200,162,0.5)" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <text x="102" y="38" fontSize="5" fill="rgba(172,200,162,0.55)" fontFamily="monospace">ROI</text>
          </svg>
        </div>
        <div className="text-[6px] tracking-wider text-center uppercase" style={{ color: 'rgba(172,200,162,0.2)' }}>
          Scan ID: OCT-2024-0847 · OD
        </div>
      </div>
      {/* Right: AI result */}
      <div className="w-[45%] flex-shrink-0 flex flex-col p-3 gap-2 overflow-hidden">
        <div className="text-[7px] tracking-[.22em] uppercase" style={{ color: 'rgba(172,200,162,0.3)' }}>
          AI Diagnosis
        </div>
        <div className="p-2" style={{ border: '1px solid rgba(172,200,162,0.2)', background: 'rgba(172,200,162,0.03)' }}>
          <div className="text-[11px] font-bold leading-tight" style={{ color: '#acc8a2' }}>DME Detected</div>
          <div className="text-[6px] mt-0.5 tracking-wider uppercase" style={{ color: 'rgba(172,200,162,0.4)' }}>
            Diabetic Macular Edema
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="text-[6px] tracking-wider uppercase" style={{ color: 'rgba(172,200,162,0.25)' }}>Confidence</div>
          {[['DME', 94], ['Normal', 4], ['AMD', 2]].map(([label, pct]) => (
            <div key={String(label)}>
              <div className="flex justify-between text-[6px] mb-0.5">
                <span style={{ color: 'rgba(172,200,162,0.5)' }}>{label}</span>
                <span style={{ color: '#acc8a2' }}>{pct}%</span>
              </div>
              <div className="h-[3px]" style={{ background: 'rgba(172,200,162,0.08)' }}>
                <div className="h-full" style={{ width: `${pct}%`, background: '#acc8a2', opacity: label === 'DME' ? 0.8 : 0.3 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mt-auto">
          <div className="text-[6px] tracking-wider uppercase mb-0.5" style={{ color: 'rgba(172,200,162,0.25)' }}>Recommended</div>
          {['Retinal thickness map', 'Ophthalmology referral'].map(rec => (
            <div key={rec} className="text-[6px] px-2 py-1 flex items-center gap-1.5"
              style={{ border: '1px solid rgba(172,200,162,0.1)', color: 'rgba(172,200,162,0.55)' }}>
              <span style={{ color: '#acc8a2' }}>→</span>{rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Mock UI: Routyne (Fitness PWA) ────────────────────────────────────────────
function RoutyneUI() {
  const exercises = [
    { name: 'Squat', sets: '4×8', done: true },
    { name: 'Romanian Deadlift', sets: '3×10', done: true },
    { name: 'Leg Press', sets: '3×12', done: false },
    { name: 'Calf Raise', sets: '4×15', done: false },
  ]
  return (
    <div className="w-full h-full flex flex-col overflow-hidden font-mono" style={{ background: '#080c07' }}>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="text-[8px] tracking-[.2em] uppercase" style={{ color: 'rgba(172,200,162,0.4)' }}>
          Routyne · Today
        </div>
        <div className="text-[7px] tracking-wider" style={{ color: 'rgba(172,200,162,0.35)' }}>Lower Body A</div>
      </div>
      {/* Progress bar */}
      <div className="px-4 py-2 flex-shrink-0" style={{ borderBottom: '1px solid rgba(172,200,162,0.06)' }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[6px] tracking-wider uppercase" style={{ color: 'rgba(172,200,162,0.3)' }}>Progress</span>
          <span className="text-[6px]" style={{ color: 'rgba(172,200,162,0.5)' }}>2 / 4 exercises</span>
        </div>
        <div className="h-[3px] w-full" style={{ background: 'rgba(172,200,162,0.08)' }}>
          <div className="h-full" style={{ width: '50%', background: '#acc8a2' }} />
        </div>
      </div>
      {/* Exercise list */}
      <div className="flex-1 overflow-hidden flex flex-col px-4 py-2 gap-1.5">
        {exercises.map((ex, i) => (
          <div key={ex.name} className="flex items-center gap-3 py-1.5"
            style={{ borderBottom: '1px solid rgba(172,200,162,0.04)', opacity: ex.done ? 1 : 0.55 }}>
            <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-[9px]"
              style={{ border: `1px solid rgba(172,200,162,${ex.done ? '0.4' : '0.15'})`, color: ex.done ? '#acc8a2' : 'transparent' }}>
              {ex.done ? '✓' : ''}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-bold" style={{ color: ex.done ? '#acc8a2' : 'rgba(172,200,162,0.6)' }}>{ex.name}</div>
            </div>
            <div className="text-[7px] tracking-wider" style={{ color: 'rgba(172,200,162,0.35)' }}>{ex.sets}</div>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className="w-full py-2 text-center text-[7px] tracking-[.2em] uppercase"
          style={{ border: '1px solid rgba(172,200,162,0.25)', color: '#acc8a2' }}>
          Start Next Exercise →
        </div>
      </div>
    </div>
  )
}

const PREVIEWS = [FOMAGUi, OCTsenseUI, RoutyneUI]

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const { t } = useLanguage()
  const w = t.work
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(caseStudies.length - 1, Math.floor(v * caseStudies.length)))
  })

  const ActivePreview = PREVIEWS[activeIndex]

  return (
    <section ref={sectionRef} id="work" style={{ height: `${(caseStudies.length + 1) * 100}vh` }}>
      {/* ── Sticky panel ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-6 md:px-14 pt-[70px] pb-8 max-w-[1400px] mx-auto w-full flex items-end justify-between">
          <div>
            <SectionLabel className="mb-[14px]">{w.label}</SectionLabel>
            <h2
              className="font-bebas text-brand-white leading-none tracking-[-0.02em]"
              style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
            >
              {w.heading1}{' '}
              <span style={{ WebkitTextStroke: '1px var(--border-strong)', color: 'transparent' }}>
                {w.heading2}
              </span>
            </h2>
          </div>
          {/* Active counter */}
          <div className="hidden md:flex items-center gap-3 font-mono text-[12px] tracking-[.2em] text-[var(--text-dim)]">
            <span className="text-sage">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(caseStudies.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Body: list + preview */}
        <div className="flex-1 flex px-6 md:px-14 pb-8 max-w-[1400px] mx-auto w-full gap-8 md:gap-14 overflow-hidden">

          {/* Left: project list */}
          <div className="flex flex-col justify-center gap-0 w-full md:w-[40%] flex-shrink-0">
            {/* Scroll progress bar */}
            <div className="relative h-px w-full mb-8" style={{ background: 'var(--border-subtle)' }}>
              <motion.div
                className="absolute left-0 top-0 h-full bg-sage"
                style={{ width: `${((activeIndex + 1) / caseStudies.length) * 100}%`, transition: 'width 0.4s ease' }}
              />
            </div>

            {caseStudies.map((cs, i) => {
              const isActive = i === activeIndex
              const translated = w.cases[i]
              return (
                <motion.div
                  key={cs.num}
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  className="py-5 cursor-default"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <div className="flex items-start gap-5">
                    {/* Number */}
                    <span
                      className="font-mono text-[12px] tracking-[.1em] pt-1 flex-shrink-0 transition-colors duration-300"
                      style={{ color: isActive ? 'var(--sage)' : 'var(--text-dim)' }}
                    >
                      {cs.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      {/* Tags */}
                      <div className="flex gap-1.5 flex-wrap mb-2">
                        {cs.tags.map(tag => (
                          <span
                            key={tag}
                            className="font-mono text-[7px] tracking-[.18em] uppercase px-2 py-0.5 transition-colors duration-300"
                            style={{
                              border: `1px solid ${isActive ? 'var(--border-mid)' : 'var(--border-subtle)'}`,
                              color: isActive ? 'var(--sage-dim)' : 'var(--text-dim)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Name */}
                      <div
                        className="font-syne font-extrabold tracking-[-0.01em] transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(18px, 2.2vw, 28px)',
                          color: isActive ? 'var(--white)' : 'var(--text-dim)',
                        }}
                      >
                        {translated?.name ?? cs.name}
                      </div>
                      {/* Description — only shown for active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="font-mono text-[13px] leading-[1.7] overflow-hidden"
                            style={{ color: 'var(--text-dim)', marginTop: '8px' }}
                          >
                            {translated?.sub ?? cs.sub}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Arrow indicator */}
                    <motion.span
                      animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-[12px] pt-1 flex-shrink-0"
                      style={{ color: 'var(--sage)' }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              )
            })}

            {/* Scroll hint */}
            <div className="mt-8 flex items-center gap-2 font-mono text-[11px] tracking-[.2em] uppercase"
              style={{ color: 'var(--text-dim)', opacity: activeIndex === caseStudies.length - 1 ? 0 : 0.6, transition: 'opacity 0.3s' }}>
              <span>{w.scrollHint}</span>
              <span>↓</span>
            </div>
          </div>

          {/* Right: preview — desktop only */}
          <div className="hidden md:flex flex-1 items-center justify-center min-w-0">
            <div className="w-full max-w-[620px]" style={{ height: 'clamp(320px, 42vh, 500px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <BrowserFrame>
                    <ActivePreview />
                  </BrowserFrame>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
