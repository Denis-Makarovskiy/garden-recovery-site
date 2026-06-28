import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let activeLenis: Lenis | null = null

/** Lenis smooth-scroll wired into GSAP's ticker + ScrollTrigger. Disabled for reduced-motion. */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.6 })
  activeLenis = lenis
  if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

/** Smooth-scroll to an in-page anchor (e.g. "#team"), via Lenis when active. */
export function scrollToHash(hash: string, offset = -8) {
  if (!hash || hash === '#') return
  const target = document.querySelector(hash)
  if (!target) return
  if (activeLenis) activeLenis.scrollTo(target as HTMLElement, { offset })
  else (target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export { gsap, ScrollTrigger }
