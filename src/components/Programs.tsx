import '../styles/sec-programs.css'
import '../styles/sec-continuum.css'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const BASE = import.meta.env.BASE_URL

interface Program {
  name: string
  tagline: string
  img: string
}

const PROGRAMS: Program[] = [
  { name: 'Executive\nRecovery', tagline: 'Выгорание и перенапряжение', img: 'p1' },
  { name: 'Body Balance\nReset', tagline: 'Обмен веществ и саморегуляция', img: 'p2' },
  { name: 'Post-Surgery\nRecovery', tagline: 'Послеоперационная реабилитация', img: 'p3' },
  { name: 'Human\nReserve', tagline: 'Поддержание ресурса', img: 'p4' },
]

const DURATIONS: string[] = ['3 дня', '7 дней', '30 дней', 'Индивидуально']

export default function Programs() {
  const ref = useReveal<HTMLElement>()
  const [active, setActive] = useState(0)

  return (
    <section id="programs" className="pf-section" ref={ref}>
      <div className="container">
        <div className="pf-head" data-reveal>
          <h2 className="pf-title">Программы</h2>
          <p className="pf-lead">Каждая программа — это персональный протокол восстановления.</p>
        </div>

        <div className="pf-grid">
          {PROGRAMS.map((p) => (
            <article key={p.name} className="pf-card" data-reveal>
              <h3 className="pf-card-name">{p.name}</h3>
              <p className="pf-card-tag">{p.tagline}</p>
              <div className="pf-card-media">
                <img src={`${BASE}assets/img/programs-fig/${p.img}.jpg`} alt={p.name.replace(/\n/g, ' ')} />
              </div>
            </article>
          ))}
        </div>

        <div className="pf-duration" data-reveal>
          <p className="pf-duration-label">Длительность программы</p>
          <div className="pf-pills" role="tablist">
            {DURATIONS.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`pf-pill${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>
      {/* CONTINUUM — Desktop-16: серая плашка #CCCBCB, контент + точки-пагинация */}
      <ContinuumSlider />
    </section>
  )
}

interface Tier {
  eyebrow: string
  title: string
  body: string
}
const TIERS: Tier[] = [
  { eyebrow: 'Поддержание', title: 'Integration Support — 30 / 90 дней',
    body: 'Онлайн-сессии × 50 минут, тот же специалист, фиксированное время. 30-дневный формат включён в Foundations и Extended; 90-дневный — в Sabbatical. Для Pulse Reset и Standard — опционально.' },
  { eyebrow: 'Сопровождение', title: 'Ongoing Support — регулярное',
    body: 'Три трека на выбор: Поддерживающий — 2 сессии в месяц. Терапевтический — 4 сессии в месяц. Интенсивный — 6–8 сессий в месяц.' },
  { eyebrow: 'Глубина', title: 'Annual Retreat',
    body: 'Через 6–12 месяцев — возвращение в резиденцию. Повторное тестирование по тем же шкалам. Гость видит годовую динамику. Со скидкой по программе лояльности.' },
]

function ContinuumSlider() {
  const [i, setI] = useState(0)
  const t = TIERS[i]
  return (
    <div id="continuum" className="cnt-section">
      <div className="cnt-head">
        <h2 className="cnt-title">Сопровождение после программы</h2>
        <p className="cnt-lead">Поддерживающее сопровождение после завершения программы. Помогает сохранить достигнутые результаты, поддерживать связь со специалистами и удерживать положительную динамику.</p>
      </div>
      <div className="cnt-card" aria-live="polite">
        <p className="cnt-tier-eyebrow">{t.eyebrow}</p>
        <h3 className="cnt-tier-title">{t.title}</h3>
        <p className="cnt-tier-body">{t.body}</p>
      </div>
      <div className="cnt-dots" role="tablist" aria-label="Уровни сопровождения">
        {TIERS.map((_, k) => (
          <button key={k} type="button" role="tab"
            aria-selected={k === i}
            className={`cnt-dot${k === i ? ' is-active' : ''}`}
            aria-label={`Уровень ${k + 1}`}
            onClick={() => setI(k)} />
        ))}
      </div>
    </div>
  )
}
