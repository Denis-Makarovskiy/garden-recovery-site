import { useCallback, useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Member {
  monogram: string
  name: string
  role: string
  value: string
}

const MEMBERS: Member[] = [
  {
    monogram: 'Л',
    name: 'Лена',
    role: 'Главврач',
    value: '«Точная диагностика — основа любого протокола. Лечим систему, а не симптом.»',
  },
  {
    monogram: 'Д',
    name: 'Денис',
    role: 'Психолог',
    value: '«Восстановление — работа на глубине. Поверхностные решения дают поверхностный результат.»',
  },
  {
    monogram: 'Р',
    name: 'Роман',
    role: 'Основатель',
    value: '«Garden — про то, что можно вернуться к себе, не выпадая из жизни.»',
  },
  {
    monogram: 'В',
    name: 'Влад',
    role: 'Физиотерапевт',
    value: '«Тело хранит то, что не успевает обработать голова. Без работы с телом восстановление неполное.»',
  },
  {
    monogram: 'Н',
    name: 'Нутрициолог',
    role: 'Питание и метаболизм',
    value: '«Питание — не диета, а инструмент стабилизации.»',
  },
  {
    monogram: 'Ш',
    name: 'Шеф-повар',
    role: 'Кухня резиденции',
    value: '«Полезно и вкусно — не противоречие, а навык.»',
  },
  {
    monogram: 'М',
    name: 'Массажист',
    role: 'Тело и тонус',
    value: '«Расслабление — управляемое состояние, а не случайность.»',
  },
  {
    monogram: 'Д',
    name: 'Дерматолог',
    role: 'Здоровье кожи',
    value: '«Кожа — маркер внутреннего здоровья.»',
  },
  {
    monogram: 'К',
    name: 'Косметолог',
    role: 'Эстетика',
    value: '«Эстетика — завершающий штрих, а не главная цель.»',
  },
]

export default function Team() {
  const ref = useReveal<HTMLElement>()
  const trackRef = useRef<HTMLDivElement>(null)

  const [pageCount, setPageCount] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)

  // Distance between two adjacent cards (card width + gap).
  const step = useCallback(() => {
    const track = trackRef.current
    if (!track) return 1
    const cards = track.querySelectorAll<HTMLElement>('.member')
    const first = cards[0]
    const second = cards[1]
    if (!first) return 1
    if (!second) return first.getBoundingClientRect().width
    return second.getBoundingClientRect().left - first.getBoundingClientRect().left
  }, [])

  const visibleCount = useCallback(() => {
    const track = trackRef.current
    if (!track) return 1
    return Math.max(1, Math.round(track.clientWidth / step()))
  }, [step])

  const computePageCount = useCallback(() => {
    return Math.max(1, MEMBERS.length - visibleCount() + 1)
  }, [visibleCount])

  const updateState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const x = track.scrollLeft
    const max = track.scrollWidth - track.clientWidth - 1
    setPrevDisabled(x <= 2)
    setNextDisabled(x >= max)
    setActiveIdx(Math.round(x / step()))
  }, [step])

  // Recompute dots + state on mount and on resize.
  useEffect(() => {
    const refresh = () => {
      setPageCount(computePageCount())
      updateState()
    }
    refresh()
    window.addEventListener('resize', refresh)
    return () => window.removeEventListener('resize', refresh)
  }, [computePageCount, updateState])

  const handlePrev = () => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: -step() * Math.max(1, visibleCount() - 1), behavior: 'smooth' })
  }

  const handleNext = () => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: step() * Math.max(1, visibleCount() - 1), behavior: 'smooth' })
  }

  const handleDot = (i: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: i * step(), behavior: 'smooth' })
  }

  const handleWatch = (_e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: open member video modal/player — placeholder, no-op for now.
  }

  return (
    <section id="team" className="bg-soft fullscreen" ref={ref}>
      <div className="container">
        <div className="section-header" data-reveal>
          <p className="section-eyebrow">Команда</p>
          <h2 className="section-title">С вами будут <em>работать</em></h2>
          <p className="section-lead">Команда, которой можно доверить своё восстановление. Один протокол, одна история, одно направление работы.</p>
        </div>

        <div className="team-carousel" data-reveal>
          <button
            className="team-arrow prev"
            id="team-prev"
            aria-label="Назад"
            onClick={handlePrev}
            disabled={prevDisabled}
          >
            ‹
          </button>
          <button
            className="team-arrow next"
            id="team-next"
            aria-label="Вперёд"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            ›
          </button>
          <div className="team-track" id="team-track" ref={trackRef} onScroll={updateState}>
            {MEMBERS.map((m, i) => (
              <article className="member" key={`${m.name}-${i}`} data-reveal={i < 3 ? '' : undefined}>
                <div className="member-photo">{m.monogram}</div>
                <h3 className="member-name">{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-value">{m.value}</p>
                <button className="member-watch" onClick={handleWatch}>Видео</button>
              </article>
            ))}
          </div>
          <div
            className="team-dots"
            id="team-dots"
            aria-hidden="true"
            style={{ display: pageCount <= 1 ? 'none' : 'flex' }}
          >
            {pageCount > 1 &&
              Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  className={`team-dot${i === activeIdx ? ' is-active' : ''}`}
                  aria-label={`Перейти к карточке ${i + 1}`}
                  onClick={() => handleDot(i)}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
