import '../styles/sec-process.css'
import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/scroll'

const BASE = import.meta.env.BASE_URL

interface Stage {
  num: string
  title: string
  body: string
  photo: string
}

const STAGES: Stage[] = [
  { num: '01', title: 'Консультация', body: 'Фиксируем исходное состояние и запрос, задаём направление восстановления.', photo: '01-consult' },
  { num: '02', title: 'Диагностика', body: 'Исследуем работу организма как единой системы и определяем причины изменений состояния.', photo: '02-diagnostic' },
  { num: '03', title: 'Протокол', body: 'Формируем персональную программу восстановления на основе результатов диагностики и наблюдаем динамику состояния.', photo: '03-protocol' },
  { num: '04', title: 'Интенсив', body: 'Создаём условия для глубокой перезагрузки организма, восстановления физических сил и эмоционального ресурса под наблюдением специалистов.', photo: '04-intensive' },
  { num: '05', title: 'Стабилизация', body: 'Оцениваем, закрепляем результат и выстраиваем стратегию сохранения прогресса после программы.', photo: '05-stabilization' },
]

// Figma Desktop-64 "Путь гостя": each stage holds for 5s, then auto-advances; loops.
// Auto-play pauses when off-screen; clicking a stage jumps to it and restarts.
const HOLD = 5000

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const stop = () => {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = undefined
      }
    }
    const start = () => {
      if (prefersReducedMotion()) return
      stop()
      timer.current = window.setInterval(() => setActive((a) => (a + 1) % STAGES.length), HOLD)
    }
    ;(el as HTMLElement & { _start?: () => void })._start = start

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop()
    }
  }, [])

  const pick = (i: number) => {
    setActive(i)
    const el = ref.current as (HTMLElement & { _start?: () => void }) | null
    el?._start?.()
  }

  return (
    <section id="process" className="sp-section" ref={ref}>
      <div className="container">
        <div className="sp-head">
          <h2 className="sp-title">Путь гостя</h2>
          <p className="sp-lead">
            Путь восстановления начинается с понимания состояния и продолжается до тех пор, пока результат не станет устойчивым.
          </p>
        </div>

        <div className="sp-grid">
          <div className="sp-steps">
            {STAGES.map((stage, i) => (
              <button
                type="button"
                key={stage.num}
                className={`sp-step${active === i ? ' is-active' : ''}`}
                onClick={() => pick(i)}
                aria-pressed={active === i}
              >
                <span className="sp-step-head">
                  <span className="sp-step-num">{stage.num}</span>
                  <span className="sp-step-title">{stage.title}</span>
                </span>
                <span className="sp-step-body">
                  <span>
                    <span className="sp-step-p">{stage.body}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="sp-photo">
            {STAGES.map((stage, i) => (
              <img
                key={stage.photo}
                src={`${BASE}assets/img/process/${stage.photo}.jpg`}
                className={active === i ? 'is-active' : ''}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
