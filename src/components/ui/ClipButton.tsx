'use client'

import { cn } from '@/lib/utils'

interface ClipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

export default function ClipButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ClipButtonProps) {
  return (
    <button
      className={cn(
        'font-mono text-[11px] tracking-[.15em] uppercase transition-all duration-300',
        size === 'sm' ? 'px-[22px] py-[10px] clip-chamfer-sm' : 'px-[34px] py-[15px] clip-chamfer-md',
        variant === 'primary' && 'bg-sage text-brand-black hover:bg-sage-pale',
        variant === 'ghost' && 'text-sage border border-[rgba(172,200,162,0.22)] hover:border-sage hover:bg-[rgba(172,200,162,0.05)]',
        variant === 'outline' && 'text-sage border border-sage bg-transparent hover:bg-sage hover:text-brand-black clip-chamfer-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
