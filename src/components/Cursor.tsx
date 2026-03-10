'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
    }

    const animate = () => {
      const { mx, my } = pos.current
      pos.current.rx += (mx - pos.current.rx) * 0.11
      pos.current.ry += (my - pos.current.ry) * 0.11

      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
      ring.style.left = pos.current.rx + 'px'
      ring.style.top = pos.current.ry + 'px'

      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dot.classList.add('hovered')
      ring.classList.add('hovered')
    }
    const onLeave = () => {
      dot.classList.remove('hovered')
      ring.classList.remove('hovered')
    }

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    // Run after paint so dynamic elements are in DOM
    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
