import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  const handleCtaClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const form = document.getElementById('consultation-form') || document.getElementById('contacts')
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.1,
      })
      // gentle parallax: the video drifts slower than the scroll
      gsap.to('.hero-video', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="hero fullscreen" id="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster={`${import.meta.env.BASE_URL}assets/img/hero-poster.jpg`}
      >
        <source src={`${import.meta.env.BASE_URL}assets/video/hero.mp4`} type="video/mp4" />
      </video>
      <svg className="hero-watermark" aria-hidden="true">
        <use href="#gr-glyph" />
      </svg>
      <div className="container">
        <p className="hero-eyebrow" data-reveal>Свети-Стефан · Черногория</p>
        <h1 data-reveal>Приватная медицинская <em>резиденция</em> на побережье Адриатики</h1>
        <p className="hero-lead" data-reveal>Профессиональное решение деликатных задач в&nbsp;психоэмоциональной сфере. Работаем с&nbsp;состояниями, которые сложно назвать, но&nbsp;невозможно игнорировать.</p>
        <div className="hero-cta-row" data-reveal>
          <a href="#contacts" className="btn" onClick={handleCtaClick}>Получить консультацию <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  )
}
