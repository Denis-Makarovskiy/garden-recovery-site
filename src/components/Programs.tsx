import '../styles/sec-programs.css'
import '../styles/sec-continuum.css'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const BASE = import.meta.env.BASE_URL

interface Program {
  name: string
  tagline: string
  img: string
  description: string
}

const PROGRAMS: Program[] = [
  {
    name: 'Executive\nRecovery',
    tagline: 'Выгорание и перенапряжение',
    img: 'p1',
    description:
      'Программа для тех, кто живёт в режиме высоких нагрузок: восстановление нервной системы, глубокий сон, точечная работа с телом.',
  },
  {
    name: 'Body Balance\nReset',
    tagline: 'Обмен веществ и саморегуляция',
    img: 'p2',
    description:
      'Перезапуск обмена веществ и внутренних ритмов: питание, движение, дыхание и восстановление гормонального баланса.',
  },
  {
    name: 'Post-Surgery\nRecovery',
    tagline: 'Послеоперационная реабилитация',
    img: 'p3',
    description:
      'Мягкое, поэтапное восстановление после операций: реабилитация, физиотерапия и сопровождение медицинской команды.',
  },
  {
    name: 'Human\nReserve',
    tagline: 'Поддержание ресурса',
    img: 'p4',
    description:
      'Профилактическая программа для поддержания энергии и внутреннего ресурса: диагностика, восстановление, стабильность.',
  },
]

interface Duration {
  label: string
  title: string
  description: string
}

const DURATIONS: Duration[] = [
  {
    label: '3 дня',
    title: 'Fast Recovery',
    description:
      'Короткий формат для быстрой перезагрузки: восстановление сна, снятие напряжения, точечные процедуры.',
  },
  {
    label: '7 дней',
    title: 'Basic Recovery',
    description:
      'Базовая программа восстановления: диагностика, комплексный протокол, работа с телом и нервной системой.',
  },
  {
    label: '30 дней',
    title: 'Full Recovery',
    description:
      'Полный курс глубокого восстановления с индивидуальным сопровождением специалистов и контрольными точками.',
  },
  {
    label: 'Индивидуально',
    title: 'Индивидуальный формат',
    description:
      'Программа под задачу гостя: сроки, состав специалистов и интенсивность подбираются персонально.',
  },
]

export default function Programs() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="programs" className="pf-section" ref={ref}>
      <div className="container">
        <div className="pf-head" data-reveal>
          <h2 className="pf-title">Программы</h2>
          <p className="pf-lead">Каждая программа — это персональный протокол восстановления.</p>
        </div>
      </div>

      {/* Horizontal slider — cards overflow container to the right (Figma frame w=1610) */}
      <div className="pf-slider-wrap" data-reveal>
        <div className="pf-slider">
          {PROGRAMS.map((p) => (
            <article key={p.name} className="pf-card">
              <h3 className="pf-card-name">{p.name}</h3>
              <p className="pf-card-tag">{p.tagline}</p>
              <div className="pf-card-media">
                <img src={`${BASE}assets/img/programs-fig/${p.img}.jpg`} alt={p.name.replace(/\n/g, ' ')} />
                <div className="pf-card-overlay" aria-hidden="true">
                  <div className="pf-card-overlay-inner">
                    <p className="pf-card-desc">{p.description}</p>
                    <button type="button" className="pf-card-btn">
                      <span>Подробнее</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="pf-duration" data-reveal>
          <p className="pf-duration-label">Длительность программы</p>
          <div className="pf-durations" role="list">
            {DURATIONS.map((d) => (
              <div key={d.label} className="pf-dur" role="listitem">
                <button type="button" className="pf-dur-btn">
                  <span className="pf-dur-label">{d.label}</span>
                </button>
                <div className="pf-dur-panel" aria-hidden="true">
                  <div className="pf-dur-panel-inner">
                    <p className="pf-dur-title">{d.title}</p>
                    <p className="pf-dur-desc">{d.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pf-divider" role="presentation" />
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
  duration: string
  body: string
  bullets: string[]
  cta: string
}
const TIERS: Tier[] = [
  {
    eyebrow: 'Integration Support',
    title: 'Integration Support',
    duration: '30 дней',
    body: 'Поддерживающий формат для гостей программ Fast Recovery и Basic Recovery.',
    bullets: [
      '4 онлайн-сессии по 50 минут',
      '1 сессия в неделю',
      'сопровождение тем же специалистом, который работал с гостем в рамках основной программы',
    ],
    cta: 'Поддержание',
  },
  {
    eyebrow: 'Integration Support',
    title: 'Integration Support',
    duration: '90 дней',
    body: 'Долгосрочный формат сопровождения и интеграции изменений.',
    bullets: [
      '12 онлайн-сессий по 50 минут',
      'сопровождение в течение 3 месяцев',
      'постепенная интеграция новых привычек и устойчивых изменений в повседневную жизнь',
    ],
    cta: 'Поддержание',
  },
  {
    eyebrow: 'Поддерживающий трек',
    title: 'Поддерживающий трек',
    duration: '',
    body: 'Для сохранения стабильного состояния и профилактической поддержки.',
    bullets: [
      '2 сессии в месяц',
      'поддержание эмоционального и физического состояний',
      'регулярное сопровождение специалиста',
    ],
    cta: 'Поддержание',
  },
  {
    eyebrow: 'Терапевтический трек',
    title: 'Терапевтический трек',
    duration: '',
    body: 'Регулярная работа со специалистом для углублённой проработки запросов.',
    bullets: [
      '4 сессии в месяц',
      'работа с психологом или коучем',
      'персональный план сопровождения',
    ],
    cta: 'Поддержание',
  },
  {
    eyebrow: 'Интенсивный трек',
    title: 'Интенсивный трек',
    duration: '',
    body: 'Максимальная плотность сопровождения для сложных периодов.',
    bullets: [
      '6–8 сессий в месяц',
      'сопровождение командой специалистов',
      'высокая частота обратной связи',
    ],
    cta: 'Поддержание',
  },
  {
    eyebrow: 'Annual Retreat',
    title: 'Annual Retreat',
    duration: '',
    body: 'Через 6–12 месяцев — возвращение в резиденцию с повторным тестированием и оценкой динамики.',
    bullets: [
      'повторное тестирование по тем же шкалам',
      'годовая динамика восстановления',
      'скидка по программе лояльности',
    ],
    cta: 'Поддержание',
  },
]

const CARDS_PER_VIEW = 3

function ContinuumSlider() {
  const [i, setI] = useState(0)
  const maxIndex = Math.max(0, TIERS.length - CARDS_PER_VIEW)
  const clampedI = Math.min(i, maxIndex)
  return (
    <div id="continuum" className="cnt-section">
      <div className="cnt-head">
        <h2 className="cnt-title">Сопровождение после программы</h2>
        <p className="cnt-lead">Поддерживающий трек Garden Recovery Continuum помогает сохранить достигнутые результаты, поддерживать связь со специалистами и удерживать положительную динамику изменений после завершения основного курса восстановления.</p>
      </div>
      <div className="cnt-photo">
        <img src={`${BASE}assets/img/programs/post-continuum.jpg`} alt="Сопровождение после программы" />
      </div>
      <div className="cnt-viewport">
        <div
          className="cnt-track"
          style={{ transform: `translateX(calc(${-clampedI} * (100% / ${CARDS_PER_VIEW})))` }}
          aria-live="polite"
        >
          {TIERS.map((t, k) => (
            <article key={k} className="cnt-card">
              <h3 className="cnt-card-title">{t.title}</h3>
              {t.duration && <p className="cnt-card-duration">{t.duration}</p>}
              <p className="cnt-card-body">{t.body}</p>
              <ul className="cnt-card-list">
                {t.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <button type="button" className="cnt-card-cta">{t.cta}</button>
            </article>
          ))}
        </div>
      </div>
      <div className="cnt-dots" role="tablist" aria-label="Уровни сопровождения">
        {TIERS.map((_, k) => (
          <button key={k} type="button" role="tab"
            aria-selected={k === clampedI}
            className={`cnt-dot${k === clampedI ? ' is-active' : ''}`}
            aria-label={`Карточка ${k + 1}`}
            onClick={() => setI(Math.min(k, maxIndex))} />
        ))}
      </div>
    </div>
  )
}
