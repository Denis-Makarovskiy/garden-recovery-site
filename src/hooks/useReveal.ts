import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

/**
 * Scroll-triggered reveal. Attach the returned ref to a section; mark the
 * elements to animate with `data-reveal`. If none are marked, the section
 * itself animates. No-op under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  y?: number
  stagger?: number
  start?: string
}) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const marked = el.querySelectorAll<HTMLElement>('[data-reveal]')
    const items: Element[] = marked.length ? Array.from(marked) : [el]
    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: opts?.y ?? 28,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: opts?.stagger ?? 0.08,
        scrollTrigger: { trigger: el, start: opts?.start ?? 'top 82%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [opts?.start, opts?.stagger, opts?.y])
  return ref
}
