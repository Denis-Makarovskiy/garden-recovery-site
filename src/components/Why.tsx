import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

// Figma Desktop-66: heading + lead fade up, then the 4 pillars slide in from the
// right with a slight scale-up, one after another (EASE_OUT). Scroll-triggered.
export default function Why() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.why-grid .section-eyebrow, .why-grid .why-lead', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      })
      // Figma Desktop-66: cards slide in from the right, 0.1s apart, 0.5s EASE_OUT.
      gsap.from('.why-pillars .pillar', {
        xPercent: 70,
        scale: 0.92,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.why-pillars', start: 'top 82%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="why" id="why" ref={ref}>
      <div className="container">
        <div className="why-grid">
          <div>
            <p className="section-eyebrow">Почему это работает</p>
            <p className="why-lead">Это не отдых, не разовая помощь и не временное решение. Это система. Восстановление становится управляемым процессом, а не надеждой на лучшее.</p>
          </div>
          <div className="why-pillars">
            <div className="pillar">
              <h4>Целостность</h4>
              <p>Тело, разум и душа. Программы охватывают все аспекты жизни человека. Благодаря комплексному подходу к оздоровлению — полное восстановление.</p>
            </div>
            <div className="pillar">
              <h4>Индивидуальный подход</h4>
              <p>Программа подбирается с учётом особенностей и предпочтений гостя. Путь начинается с консультации со специалистом, который помогает подобрать программу.</p>
            </div>
            <div className="pillar">
              <h4>Богатство природы</h4>
              <p>Расположение Черногории уникально: на одной территории объединены горы, море и лес. Адриатика — природная среда для восстановления.</p>
            </div>
            <div className="pillar">
              <h4>Тишина и спокойствие</h4>
              <p>Уединённое место, где сочетание адриатического моря и горного массива обеспечивают тишину и покой для гостей.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
