import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 font-mono text-[10px] tracking-[.25em] text-sage-dim uppercase',
        className
      )}
      style={{ '--tw-content': '""' } as React.CSSProperties}
    >
      <span className="block w-5 h-px bg-sage-dim flex-shrink-0" aria-hidden="true" />
      {children}
    </div>
  )
}
