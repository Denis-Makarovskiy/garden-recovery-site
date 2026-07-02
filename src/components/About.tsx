import '../styles/sec-about.css'
import { useReveal } from '../hooks/useReveal'
import { useState, useCallback } from 'react'

const BASE = import.meta.env.BASE_URL

interface Col {
  img: string
  cap: string
  body: string
}

// Макет «О нас»: горизонтальный слайдер из 4 карточек (386×556).
// Клик по фото — снизу вверх выезжает плашка с описанием.
const COLS: Col[] = [
  {
    img: '01',
    cap: 'Кто мы',
    body:
      'Garden Recovery — это частная медицинская резиденция, где восстановление рассматривается как комплексный процесс. Среда, специалисты и распорядок работают вместе, чтобы каждый гость мог вернуть себе энергию, ясность и здоровый ритм жизни.',
  },
  {
    img: '02',
    cap: 'Для кого',
    body:
      'Для тех, кто работают в режиме постоянной интенсивности. Для тех, кто хотят сформировать здоровые привычки питания. Для тех, кто восстанавливается после болезни или ищет тишины и опоры на следующий шаг.',
  },
  {
    img: '03',
    cap: 'Что мы делаем',
    body:
      'Garden Recovery — это частная медицинская резиденция, где восстановление рассматривается как комплексный процесс. Мы работаем с телом, вниманием и повседневными привычками — мягко, но последовательно.',
  },
  {
    img: '04',
    cap: 'Система',
    body:
      'Система — основа вашего пребывания в Garden Recovery. Проживание в одноместном люксе с видом на море, трёхразовое питание, персональная программа восстановления и постоянное сопровождение специалистов.',
  },
]

export default function About() {
  const ref = useReveal<HTMLElement>()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = useCallback((idx: number) => {
    setOpenIdx((cur) => (cur === idx ? null : idx))
  }, [])

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
      </div>

      <div className="sec-about__scroller" data-reveal>
        <ul className="sec-about__track">
          {COLS.map((c, idx) => {
            const open = openIdx === idx
            return (
              <li className="sec-about__item" key={c.cap}>
                <figure
                  className={`sec-about__card${open ? ' is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="sec-about__photo"
                    onClick={() => toggle(idx)}
                    aria-expanded={open}
                    aria-controls={`about-panel-${idx}`}
                  >
                    <img
                      src={`${BASE}assets/img/about/${c.img}.jpg`}
                      alt={c.cap}
                      loading="lazy"
                    />
                    <div
                      className="sec-about__panel"
                      id={`about-panel-${idx}`}
                      aria-hidden={!open}
                    >
                      <p className="sec-about__body">{c.body}</p>
                    </div>
                  </button>
                  <figcaption className="sec-about__cap">{c.cap}</figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
