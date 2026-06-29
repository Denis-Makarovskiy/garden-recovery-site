import '../styles/sec-programs.css'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Program {
  name: string
  tagline: string
  img: string
}

const PROGRAMS: Program[] = [
  {
    name: 'Executive Recovery',
    tagline: 'Выгорание и перенапряжение',
    img: 'p1',
  },
  {
    name: 'Body Balance Reset',
    tagline: 'Обмен веществ и саморегуляция',
    img: 'p2',
  },
  {
    name: 'Post-Surgery Recovery',
    tagline: 'Послеоперационная реабилитация',
    img: 'p3',
  },
  {
    name: 'Human Reserve',
    tagline: 'Поддержание ресурса',
    img: 'p4',
  },
]

const DURATIONS = ['3 дня', '7 дней', '30 дней', '90 дней']

export default function Programs() {
  const ref = useReveal<HTMLElement>()
  const [activeDuration, setActiveDuration] = useState(0)

  return (
    <section id="programs" className="pf-section" ref={ref}>
      <div className="container">
        <div className="pf-head" data-reveal>
          <h2 className="pf-title">Программы</h2>
          <p className="pf-lead">
            Каждая программа — это персональный протокол восстановления.
          </p>
        </div>

        <div className="pf-grid">
          {PROGRAMS.map((p) => (
            <article key={p.name} className="pf-card" data-reveal>
              <h3 className="pf-card-name">{p.name}</h3>
              <p className="pf-card-tag">{p.tagline}</p>
              <div className="pf-card-media">
                <img
                  src={`${import.meta.env.BASE_URL}assets/img/programs-fig/${p.img}.jpg`}
                  alt={p.name}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="pf-duration" data-reveal>
          <p className="pf-duration-label">Длительность программы</p>
          <div className="pf-pills" role="tablist">
            {DURATIONS.map((d, i) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={activeDuration === i}
                className={`pf-pill${activeDuration === i ? ' is-active' : ''}`}
                onClick={() => setActiveDuration(i)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
