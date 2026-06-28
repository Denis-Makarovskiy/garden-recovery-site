import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/scroll'

/**
 * Scroll-reveal via IntersectionObserver + CSS classes. Bulletproof: the hidden
 * state is applied by JS (`.reveal-init`), so if JS never runs the content stays
 * visible; the reveal fires through the native IO (independent of the Lenis/GSAP
 * ticker), so it can never get stuck hidden. Mark children with `data-reveal`;
 * if none are marked the section itself animates. No-op under reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const marked = el.querySelectorAll<HTMLElement>('[data-reveal]')
    const items: HTMLElement[] = marked.length ? Array.from(marked) : [el]
    items.forEach((it, i) => {
      it.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 90}ms`)
      // data-reveal="slide" → cards slide in from the right (Figma «Почему»)
      it.classList.add(it.getAttribute('data-reveal') === 'slide' ? 'reveal-init-slide' : 'reveal-init')
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((it) => io.observe(it))
    return () => io.disconnect()
  }, [])
  return ref
}
