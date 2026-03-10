'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}

export default function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 34 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </MotionComponent>
  )
}
