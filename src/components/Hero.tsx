import '../styles/sec-hero.css'
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

const BASE = import.meta.env.BASE_URL

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 26,
        autoAlpha: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.14,
        delay: 0.12,
      })
      // gentle parallax: the background drifts slower than the scroll
      gsap.to('.secHero__media', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="secHero" id="hero">
      <video
        className="secHero__media"
        autoPlay
        muted
        loop
        playsInline
        poster={`${BASE}assets/img/hero/hero-bg.jpg`}
      >
        <source src={`${BASE}assets/video/hero.mp4`} type="video/mp4" />
      </video>
      <div className="secHero__overlay" aria-hidden="true" />

      <div className="secHero__inner container">
        <span className="secHero__logo" data-reveal>
          <svg role="img" aria-label="Garden Recovery — Medical Residence">
            <use href="#gr-logo" />
          </svg>
        </span>
        <h1 className="secHero__title" data-reveal>
          Частная медицинская резиденция на&nbsp;побережье Адриатического&nbsp;моря
        </h1>
        <p className="secHero__lead" data-reveal>
          Профессиональное решение деликатных задач в&nbsp;психоэмоциональной сфере. Работаем
          с&nbsp;состояниями, которые сложно назвать, но&nbsp;невозможно игнорировать.
        </p>
      </div>
    </section>
  )
}
