import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll'

interface Stage {
  num: string
  title: string
  body: string
}

const STAGES: Stage[] = [
  {
    num: '01',
    title: 'Консультация',
    body: 'Фиксируем исходное состояние и запрос, задаём направление восстановления.',
  },
  {
    num: '02',
    title: 'Диагностика',
    body: 'Исследуем работу организма как единой системы и определяем причины изменений состояния.',
  },
  {
    num: '03',
    title: 'Протокол',
    body: 'Формируем персональную программу восстановления на основе результатов диагностики и наблюдаем динамику состояния.',
  },
  {
    num: '04',
    title: 'Интенсив',
    body: 'Создаём условия для глубокой перезагрузки организма, восстановления физических сил и эмоционального ресурса под наблюдением специалистов.',
  },
  {
    num: '05',
    title: 'Стабилизация',
    body: 'Оцениваем, закрепляем результат и выстраиваем стратегию сохранения прогресса после программы.',
  },
]

// Figma Desktop-64 "Путь гостя": as the section scrolls through, the accordion
// steps open stage-by-stage (1→5). No pinning, so it stays robust on mobile;
// clicking a stage still works as a manual override.
export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number>(0)
  const lastRef = useRef(0)

  const toggle = (index: number) => {
    lastRef.current = index
    setOpenIndex(index)
  }

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.section-header', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      })
      gsap.from('.process-stages .stage', {
        y: 22,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.process-stages', start: 'top 82%', once: true },
      })
      ScrollTrigger.create({
        trigger: '.process-stages',
        start: 'top 65%',
        end: 'bottom 80%',
        onUpdate: (self) => {
          const i = Math.max(0, Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length)))
          if (i !== lastRef.current) {
            lastRef.current = i
            setOpenIndex(i)
          }
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="bg-soft" ref={ref}>
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Путь гостя</p>
          <h2 className="section-title">
            Путь <em>восстановления</em>
          </h2>
          <p className="section-lead">
            Каждый гость проходит через пять этапов — от первого разговора до стабилизации результата.
          </p>
        </div>

        <div className="process-stages">
          {STAGES.map((stage, index) => (
            <article
              key={stage.num}
              className={`stage${openIndex === index ? ' is-open' : ''}`}
              data-stage
            >
              <div className="stage-head" onClick={() => toggle(index)}>
                <div className="stage-num">{stage.num}</div>
                <h3 className="stage-title">{stage.title}</h3>
                <div className="stage-toggle"></div>
              </div>
              <div className="stage-body">
                <p>{stage.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
