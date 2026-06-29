import '../styles/sec-about.css'
import { useReveal } from '../hooks/useReveal'

const BASE = import.meta.env.BASE_URL

interface Col {
  img: string
  cap: string
}

// Макет «О нас»: 4 портретных фото + короткая подпись по центру под каждым.
const COLS: Col[] = [
  { img: '01', cap: 'Кто мы' },
  { img: '02', cap: 'Для кого' },
  { img: '03', cap: 'Что мы делаем' },
  { img: '04', cap: 'Система' },
]

export default function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" className="sec-about" ref={ref}>
      <div className="container">
        <header className="sec-about__head" data-reveal>
          <h2 className="sec-about__title">О&nbsp;нас</h2>
          <p className="sec-about__lead">
            Мы&nbsp;— остановка на&nbsp;пути, место,
            <br />
            где восстановление становится частью жизни.
          </p>
        </header>

        <div className="sec-about__grid">
          {COLS.map((c) => (
            <figure className="sec-about__col" data-reveal key={c.cap}>
              <div className="sec-about__photo">
                <img
                  src={`${BASE}assets/img/about/${c.img}.jpg`}
                  alt={c.cap}
                  loading="lazy"
                />
              </div>
              <figcaption className="sec-about__cap">{c.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
