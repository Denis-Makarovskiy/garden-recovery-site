import '../styles/sec-why.css'
import { useReveal } from '../hooks/useReveal'

// Figma Desktop-66: large serif title + intro lead (fade up), then a horizontal
// row of 4 sand pillar cards that slide in one after another.
type Pillar = { title: string; text: string }

const PILLARS: Pillar[] = [
  {
    title: 'Целостность',
    text: 'Тело, разум и душа. Garden Recovery предлагает программы, которые охватывают все аспекты жизни человека — тело, разум и душу. Благодаря комплексному подходу к оздоровлению человек может получить полное восстановление.',
  },
  {
    title: 'Индивидуальный подход',
    text: 'Программа подбирается с учётом особенностей и предпочтений гостя. Путь начинается с консультации со специалистом, который помогает подобрать программу.',
  },
  {
    title: 'Богатство природы',
    text: 'Расположение Черногории уникально: на одной территории объединены горы, море и лес. Адриатика — природная среда для восстановления.',
  },
  {
    title: 'Тишина и спокойствие',
    text: 'Уединённое место, где сочетание адриатического моря и горного массива обеспечивают тишину и покой для гостей.',
  },
]

export default function Why() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="secwhy" id="why" ref={ref}>
      <div className="container">
        <header className="secwhy-head" data-reveal>
          <h2 className="secwhy-title">Почему это работает</h2>
        </header>

        <div className="secwhy-grid">
          {PILLARS.map((p) => (
            <article className="secwhy-card" key={p.title} data-reveal="slide">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
