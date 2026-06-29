import '../styles/sec-programs.css'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const BASE = import.meta.env.BASE_URL

interface Program {
  name: string
  tagline: string
  img: string
}

const PROGRAMS: Program[] = [
  { name: 'Executive Recovery', tagline: 'Выгорание и перенапряжение', img: 'p1' },
  { name: 'Body Balance Reset', tagline: 'Обмен веществ и саморегуляция', img: 'p2' },
  { name: 'Post-Surgery Recovery', tagline: 'Послеоперационная реабилитация', img: 'p3' },
  { name: 'Human Reserve', tagline: 'Поддержание ресурса', img: 'p4' },
]

interface Duration {
  label: string
  program: string
  price: string
}

const DURATIONS: Duration[] = [
  { label: '3 дня', program: 'Fast Recovery', price: '2 500 €' },
  { label: '7 дней', program: 'Basic Recovery', price: '5 500 €' },
  { label: '30 дней', program: 'Full Recovery', price: '15 000 €' },
  { label: 'Индивидуально', program: 'Свой формат', price: '900 €/день' },
]

export default function Programs() {
  const ref = useReveal<HTMLElement>()
  const [active, setActive] = useState(0)
  const d = DURATIONS[active]

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
                <img src={`${BASE}assets/img/programs-fig/${p.img}.jpg`} alt={p.name} />
              </div>
            </article>
          ))}
        </div>

        <div className="pf-duration" data-reveal>
          <p className="pf-duration-label">Длительность программы</p>
          <div className="pf-pills" role="tablist">
            {DURATIONS.map((dd, i) => (
              <button
                key={dd.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`pf-pill${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {dd.label}
              </button>
            ))}
          </div>
          <div className="pf-price" aria-live="polite">
            <span className="pf-price-prog">{d.program}</span>
            <span className="pf-price-val">{d.price}</span>
          </div>
        </div>

        {/* CONTINUUM — сопровождение после программы */}
        <div className="continuum" data-reveal>
          <p className="continuum-eyebrow">Garden Recovery Continuum</p>
          <h3 className="continuum-title">Сопровождение после программы</h3>
          <p className="continuum-lead">Поддерживающее сопровождение после завершения программы. Помогает сохранить достигнутые результаты, поддерживать связь со специалистами и удерживать положительную динамику.</p>
          <img
            src={`${BASE}assets/img/programs/post-continuum.jpg`}
            alt="Continuum"
            style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: 'var(--r-sm)', marginBottom: '30px' }}
          />
          <div className="continuum-grid">
            <div className="continuum-card tier-1">
              <span className="tier">Поддержание</span>
              <h4>Integration Support — 30 / 90 дней</h4>
              <p>Онлайн-сессии × 50 минут, тот же специалист, фиксированное время. 30-дневный формат включён в Foundations и Extended; 90-дневный — в Sabbatical. Для Pulse Reset и Standard — опционально.</p>
            </div>
            <div className="continuum-card tier-2">
              <span className="tier">Сопровождение</span>
              <h4>Ongoing Support — регулярное</h4>
              <p>Три трека на выбор: <em>Поддерживающий</em> — 2 сессии в месяц. <em>Терапевтический</em> — 4 сессии в месяц. <em>Интенсивный</em> — 6–8 сессий в месяц.</p>
            </div>
            <div className="continuum-card tier-3">
              <span className="tier">Глубина</span>
              <h4>Annual Retreat</h4>
              <p>Через 6–12 месяцев — возвращение в резиденцию. Повторное тестирование по тем же шкалам. Гость видит годовую динамику. Со скидкой по программе лояльности.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
