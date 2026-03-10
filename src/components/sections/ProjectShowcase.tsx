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

// ── Mock UI: NeuralOps (AI Platform) ─────────────────────────────────────────
function NeuralOpsUI() {
  return (
    <div className="w-full h-full flex overflow-hidden font-mono" style={{ background: '#080c07' }}>
      <div className="w-12 h-full flex-shrink-0 flex flex-col items-center py-4 gap-3"
        style={{ background: '#0a0f09', borderRight: '1px solid rgba(172,200,162,0.06)' }}>
        {['⬡', '◈', '▣', '◉', '◬'].map((icon, i) => (
          <div key={i} className="w-7 h-7 flex items-center justify-center text-[11px]"
            style={{ color: i === 0 ? '#acc8a2' : 'rgba(172,200,162,0.2)' }}>{icon}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col p-3 gap-2 overflow-hidden">
        <div className="text-[7px] tracking-[.22em] uppercase" style={{ color: 'rgba(172,200,162,0.3)' }}>
          Neural Activity — Live
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[['94.2%', 'Accuracy', true], ['2.3M', 'Ops/min', false], ['−70%', 'Workload', false]].map(([v, l, hi]) => (
            <div key={String(l)} className="p-2"
              style={{ border: `1px solid rgba(172,200,162,${hi ? '0.2' : '0.07'})`, background: hi ? 'rgba(172,200,162,0.03)' : 'transparent' }}>
              <div className="text-[14px] font-bold leading-none" style={{ color: '#acc8a2' }}>{v}</div>
              <div className="text-[7px] mt-1 tracking-widest uppercase" style={{ color: 'rgba(172,200,162,0.3)' }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 relative overflow-hidden"
          style={{ border: '1px solid rgba(172,200,162,0.07)' }}>
          <div className="absolute top-2 left-2 text-[7px] tracking-[.2em] uppercase" style={{ color: 'rgba(172,200,162,0.25)' }}>
            Processing pipeline
          </div>
          <svg className="absolute bottom-0 left-0 w-full" height="65%" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ng" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#acc8a2" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#acc8a2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 55 C30 50 60 62 90 38 C120 14 150 30 180 22 C210 14 240 44 270 28 L300 28 L300 80 L0 80Z" fill="url(#ng)" />
            <path d="M0 55 C30 50 60 62 90 38 C120 14 150 30 180 22 C210 14 240 44 270 28 L300 28" fill="none" stroke="#acc8a2" strokeWidth="1.5" />
            <path d="M0 62 C50 60 100 65 150 58 C200 52 250 58 300 55" fill="none" stroke="rgba(172,200,162,0.15)" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          {[['Ingestion', '100%', 1], ['Processing', '87%', 0.87], ['Inference', '71%', 0.71]].map(([label, pct, val]) => (
            <div key={String(label)} className="flex items-center gap-2">
              <div className="text-[7px] tracking-wider uppercase w-14 flex-shrink-0" style={{ color: 'rgba(172,200,162,0.35)' }}>{label}</div>
              <div className="flex-1 h-[2px]" style={{ background: 'rgba(172,200,162,0.08)' }}>
                <div className="h-full" style={{ width: String(pct), background: '#acc8a2', opacity: 0.65 }} />
              </div>
              <div className="text-[7px] w-6 text-right" style={{ color: 'rgba(172,200,162,0.35)' }}>{pct}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Mock UI: Vaultex (Fintech) ────────────────────────────────────────────────
function VaultexUI() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden font-mono" style={{ background: '#080c07' }}>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="text-[8px] tracking-[.2em] uppercase" style={{ color: 'rgba(172,200,162,0.4)' }}>
          Vaultex · Treasury
        </div>
        <div className="flex gap-4 text-[7px] tracking-wider uppercase">
          {['Dashboard', 'Ledger', 'Risk'].map((item, i) => (
            <span key={item} style={{ color: i === 1 ? '#acc8a2' : 'rgba(172,200,162,0.25)' }}>{item}</span>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(172,200,162,0.06)' }}>
        <div className="text-[7px] tracking-[.2em] uppercase mb-1" style={{ color: 'rgba(172,200,162,0.3)' }}>Total reserves</div>
        <div className="font-bold leading-none" style={{ color: '#acc8a2', fontSize: '26px', letterSpacing: '-0.02em' }}>
          $4,821,304<span style={{ color: 'rgba(172,200,162,0.4)', fontSize: '13px' }}>.92</span>
        </div>
        <div className="text-[7px] mt-1" style={{ color: 'rgba(172,200,162,0.3)' }}>↑ 12.4% from last settlement</div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col px-4 py-2">
        <div className="text-[7px] tracking-[.2em] uppercase mb-2" style={{ color: 'rgba(172,200,162,0.25)' }}>Recent transactions</div>
        {[
          ['TXN-9412', '+$234,000', 'SETTLED', true],
          ['TXN-9411', '-$88,500', 'CLEARED', true],
          ['TXN-9410', '+$1,200,000', 'PENDING', false],
          ['TXN-9409', '-$45,000', 'SETTLED', true],
          ['TXN-9408', '+$670,000', 'SETTLED', true],
        ].map(([id, amt, status, settled]) => (
          <div key={String(id)} className="flex items-center justify-between py-1.5"
            style={{ borderBottom: '1px solid rgba(172,200,162,0.04)' }}>
            <span className="text-[7px]" style={{ color: 'rgba(172,200,162,0.4)' }}>{id}</span>
            <span className="text-[8px] font-bold" style={{ color: String(amt).startsWith('+') ? '#acc8a2' : 'rgba(172,200,162,0.55)' }}>{amt}</span>
            <span className="text-[6px] tracking-[.15em] uppercase px-1.5 py-0.5"
              style={{ color: settled ? '#acc8a2' : 'rgba(172,200,162,0.35)', border: `1px solid rgba(172,200,162,${settled ? '0.22' : '0.08'})` }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Mock UI: GridSense (IoT) ──────────────────────────────────────────────────
function GridSenseUI() {
  const nodeData = [
    { id: 0, x: 22, y: 22, active: true, pulse: false },
    { id: 1, x: 52, y: 18, active: true, pulse: true },
    { id: 2, x: 80, y: 25, active: false, pulse: false },
    { id: 3, x: 15, y: 50, active: true, pulse: false },
    { id: 4, x: 48, y: 48, active: true, pulse: true },
    { id: 5, x: 78, y: 52, active: true, pulse: false },
    { id: 6, x: 22, y: 75, active: true, pulse: false },
    { id: 7, x: 52, y: 80, active: false, pulse: false },
    { id: 8, x: 82, y: 78, active: true, pulse: true },
  ]
  const edges = [[0,1],[1,4],[4,3],[4,5],[4,6],[1,2],[5,8],[6,7],[7,8],[0,3]]
  return (
    <div className="w-full h-full flex overflow-hidden" style={{ background: '#080c07' }}>
      <div className="w-20 flex-shrink-0 flex flex-col gap-3 p-3 font-mono"
        style={{ borderRight: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="text-[7px] tracking-[.2em] uppercase" style={{ color: 'rgba(172,200,162,0.3)' }}>Network</div>
        {[['Nodes', '14/16'], ['Online', '87.5%'], ['Alerts', '2'], ['Latency', '4ms']].map(([k, v]) => (
          <div key={String(k)}>
            <div className="text-[6px] tracking-wider uppercase" style={{ color: 'rgba(172,200,162,0.25)' }}>{k}</div>
            <div className="text-[11px] font-bold mt-0.5" style={{ color: '#acc8a2' }}>{v}</div>
          </div>
        ))}
        <div className="mt-auto">
          <div className="text-[6px] tracking-wider uppercase mb-1.5" style={{ color: 'rgba(172,200,162,0.25)' }}>Throughput</div>
          <div className="flex items-end gap-0.5 h-6">
            {[0.8, 0.5, 0.9, 0.65, 0.85, 0.45, 0.75].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 100}%`, background: `rgba(172,200,162,${0.3 + h * 0.3})` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-3">
        <div className="text-[7px] tracking-[.2em] uppercase font-mono mb-2" style={{ color: 'rgba(172,200,162,0.3)' }}>
          Sensor topology · Zone A-7
        </div>
        <svg className="w-full h-[85%]" viewBox="0 0 100 100" fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <line x1={i*20} y1="0" x2={i*20} y2="100" stroke="rgba(172,200,162,0.04)" strokeWidth="0.5" />
              <line x1="0" y1={i*20} x2="100" y2={i*20} stroke="rgba(172,200,162,0.04)" strokeWidth="0.5" />
            </g>
          ))}
          {edges.map(([a, b], i) => {
            const na = nodeData[a], nb = nodeData[b]
            return na && nb ? (
              <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="rgba(172,200,162,0.2)" strokeWidth="0.6" strokeDasharray="2 2" />
            ) : null
          })}
          {nodeData.map(n => (
            <g key={n.id}>
              {n.pulse && <circle cx={n.x} cy={n.y} r="6" stroke="rgba(172,200,162,0.2)" strokeWidth="0.5" />}
              <circle cx={n.x} cy={n.y} r="2.8"
                fill={n.active ? '#acc8a2' : 'rgba(172,200,162,0.12)'}
                stroke={n.active ? 'none' : 'rgba(172,200,162,0.25)'}
                strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

// ── Mock UI: Meridian (SaaS Kanban) ──────────────────────────────────────────
function MeridianUI() {
  const cols = [
    { label: 'Backlog', cards: ['User auth flow', 'API rate limiting', 'SSO integration'] },
    { label: 'In Progress', cards: ['Dashboard v2', 'Webhook system'], active: true },
    { label: 'Review', cards: ['Billing module'] },
    { label: 'Done', cards: ['Data export', 'Team roles'] },
  ]
  return (
    <div className="w-full h-full flex flex-col overflow-hidden font-mono" style={{ background: '#080c07' }}>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(172,200,162,0.07)' }}>
        <div className="text-[8px] tracking-[.2em] uppercase" style={{ color: 'rgba(172,200,162,0.4)' }}>
          Meridian · Sprint 14
        </div>
        <div className="flex gap-1">
          {['◈', '▣', '◉'].map((icon, i) => (
            <div key={i} className="w-5 h-5 flex items-center justify-center text-[9px]"
              style={{ color: 'rgba(172,200,162,0.25)' }}>{icon}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex gap-2 p-3 overflow-hidden">
        {cols.map(col => (
          <div key={col.label} className="flex-1 flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[7px] tracking-[.15em] uppercase" style={{ color: 'rgba(172,200,162,0.35)' }}>{col.label}</span>
              <span className="text-[7px]" style={{ color: 'rgba(172,200,162,0.2)' }}>{col.cards.length}</span>
            </div>
            {col.cards.map(card => (
              <div key={card} className="p-2 text-[7px] leading-tight"
                style={{
                  border: `1px solid rgba(172,200,162,${col.active ? '0.18' : '0.07'})`,
                  background: col.active ? 'rgba(172,200,162,0.04)' : 'transparent',
                  color: col.active ? 'rgba(172,200,162,0.8)' : 'rgba(172,200,162,0.4)',
                }}>
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const PREVIEWS = [NeuralOpsUI, VaultexUI, GridSenseUI, MeridianUI]

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
