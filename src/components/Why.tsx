import { useReveal } from '../hooks/useReveal'

// Figma Desktop-66: heading + lead fade up, then the 4 pillars slide in from the
// right with a slight scale-up, one after another (EASE_OUT). Reveal on scroll.
export default function Why() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="why" id="why" ref={ref}>
      <div className="container">
        <div className="why-grid">
          <div data-reveal>
            <p className="section-eyebrow">Почему это работает</p>
            <p className="why-lead">Это не отдых, не разовая помощь и не временное решение. Это система. Восстановление становится управляемым процессом, а не надеждой на лучшее.</p>
          </div>
          <div className="why-pillars">
            <div className="pillar" data-reveal="slide">
              <h4>Целостность</h4>
              <p>Тело, разум и душа. Программы охватывают все аспекты жизни человека. Благодаря комплексному подходу к оздоровлению — полное восстановление.</p>
            </div>
            <div className="pillar" data-reveal="slide">
              <h4>Индивидуальный подход</h4>
              <p>Программа подбирается с учётом особенностей и предпочтений гостя. Путь начинается с консультации со специалистом, который помогает подобрать программу.</p>
            </div>
            <div className="pillar" data-reveal="slide">
              <h4>Богатство природы</h4>
              <p>Расположение Черногории уникально: на одной территории объединены горы, море и лес. Адриатика — природная среда для восстановления.</p>
            </div>
            <div className="pillar" data-reveal="slide">
              <h4>Тишина и спокойствие</h4>
              <p>Уединённое место, где сочетание адриатического моря и горного массива обеспечивают тишину и покой для гостей.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
