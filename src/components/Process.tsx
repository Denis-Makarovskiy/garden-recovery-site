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

// Figma Desktop-64 "Путь гостя": each stage is shown for 5s, then a 0.3s smart-animate
// to the next; loops. Auto-play pauses when off-screen; clicking a stage jumps to it.
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
    // expose start to the click handler via the element dataset-free closure
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
    <section id="process" className="guest-path" ref={ref}>
      <div className="container">
        <div className="gp-head">
          <h2 className="gp-title">Путь гостя</h2>
          <p className="gp-lead">
            Путь восстановления начинается с понимания состояния и продолжается до тех пор, пока результат не станет устойчивым.
          </p>
        </div>

        <div className="gp-grid">
          <div className="gp-steps">
            {STAGES.map((stage, i) => (
              <div
                key={stage.num}
                className={`gp-step${active === i ? ' is-active' : ''}`}
                onClick={() => pick(i)}
              >
                <div className="gp-step-head">
                  <span className="gp-step-num">{stage.num}</span>
                  <span className="gp-step-title">{stage.title}</span>
                </div>
                <div className="gp-step-body">
                  <div>
                    <p>{stage.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="gp-photo">
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
