import { useCallback, useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const BASE = import.meta.env.BASE_URL

interface Member {
  monogram: string
  photo?: string
  name: string
  role: string
  value: string
}

// Content per the Figma «Команда» (Desktop-33). The macet has real photos for the
// first four; the rest are placeholders (3 names + 5 photos still TODO from client).
const MEMBERS: Member[] = [
  { photo: 'lena', monogram: 'Л', name: 'Лена', role: 'Главврач', value: '«Точная диагностика — основа любого протокола. Мы работаем с причиной, а не только с симптомом».' },
  { photo: 'denis', monogram: 'Д', name: 'Денис', role: 'Психолог', value: '«Восстановление требует глубокой работы. Поверхностные решения дают поверхностный результат».' },
  { photo: 'roman', monogram: 'Р', name: 'Роман', role: 'Основатель', value: '«Garden появился из простой идеи: человеку иногда нужно место, где можно остановиться и снова услышать себя».' },
  { photo: 'vlad', monogram: 'В', name: 'Влад', role: 'Физиотерапевт', value: '«Тело хранит то, что не успевает обработать голова».' },
  { monogram: 'Н', name: 'Имя', role: 'Нутрициолог', value: '«Питание — часть восстановления, и оно может приносить удовольствие».' },
  { monogram: 'С', name: 'Саша', role: 'Шеф-повар', value: '«Полезно и вкусно — не компромисс, а правильный подход».' },
  { monogram: 'М', name: 'Имя', role: 'Массажист', value: '«Сначала расслабляется тело, затем восстанавливается мозг».' },
  { monogram: 'С', name: 'Софья', role: 'Дерматолог', value: '«Кожа — отражение внутреннего состояния организма».' },
  { monogram: 'К', name: 'Имя', role: 'Косметолог', value: '«Эстетика — завершающий штрих, а не главная цель».' },
]

export default function Team() {
  const ref = useReveal<HTMLElement>()
  const trackRef = useRef<HTMLDivElement>(null)

  const [pageCount, setPageCount] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)

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
    trackRef.current?.scrollBy({ left: -step() * Math.max(1, visibleCount() - 1), behavior: 'smooth' })
  }
  const handleNext = () => {
    trackRef.current?.scrollBy({ left: step() * Math.max(1, visibleCount() - 1), behavior: 'smooth' })
  }
  const handleDot = (i: number) => {
    trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })
  }
  const handleWatch = () => {
    // TODO: open member video modal/player — placeholder, no-op for now.
  }

  return (
    <section id="team" className="bg-soft" ref={ref}>
      <div className="container">
        <div className="section-header" data-reveal>
          <p className="section-eyebrow">Команда</p>
          <h2 className="section-title">С вами будут <em>работать</em></h2>
          <p className="section-lead">Команда, которой можно доверить своё восстановление. Один протокол, одна история, одно направление работы.</p>
        </div>

        <div className="team-carousel">
          <button className="team-arrow prev" aria-label="Назад" onClick={handlePrev} disabled={prevDisabled}>‹</button>
          <button className="team-arrow next" aria-label="Вперёд" onClick={handleNext} disabled={nextDisabled}>›</button>
          <div className="team-track" ref={trackRef} onScroll={updateState}>
            {MEMBERS.map((m, i) => (
              <article className="member" key={`${m.name}-${i}`}>
                <div className={`member-photo${m.photo ? ' has-photo' : ''}`}>
                  {m.photo ? (
                    <img src={`${BASE}assets/img/team/${m.photo}.jpg`} alt={m.name} loading="lazy" />
                  ) : (
                    m.monogram
                  )}
                </div>
                <h3 className="member-name">{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-value">{m.value}</p>
                <button className="member-watch" onClick={handleWatch}>Видео</button>
              </article>
            ))}
          </div>
          <div className="team-dots" aria-hidden="true" style={{ display: pageCount <= 1 ? 'none' : 'flex' }}>
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
