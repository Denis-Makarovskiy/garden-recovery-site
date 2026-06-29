import '../styles/sec-team.css'
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

// Реальные фото у первых четырёх; остальные — монограммы (фото от клиента ещё нет).
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

  const step = useCallback(() => {
    const track = trackRef.current
    if (!track) return 1
    const cards = track.querySelectorAll<HTMLElement>('.team-card')
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
    setActiveIdx(Math.round(track.scrollLeft / step()))
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

  const handleDot = (i: number) => {
    trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })
  }
  const handleWatch = () => {
    // TODO: открыть видео-плеер участника — пока no-op.
  }

  return (
    <section id="team" className="team-sec" ref={ref}>
      <div className="container">
        <div className="team-head" data-reveal>
          <h2 className="team-title">С вами будут работать</h2>
          <p className="team-lead">Команда, которой можно доверить своё восстановление. Один протокол, одна история, одно направление работы.</p>
        </div>

        <div className="team-carousel">
          <div className="team-track" ref={trackRef} onScroll={updateState}>
            {MEMBERS.map((m, i) => (
              <article className="team-card" key={`${m.name}-${i}`}>
                <div className="team-avatar">
                  {m.photo ? (
                    <img src={`${BASE}assets/img/team/${m.photo}.jpg`} alt={m.name} loading="lazy" />
                  ) : (
                    <span className="team-mono">{m.monogram}</span>
                  )}
                </div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p className="team-quote">{m.value}</p>
                <button className="team-video" onClick={handleWatch}>
                  Видео <span className="play" aria-hidden="true">▶</span>
                </button>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="team-dots">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  className={`team-dot${i === activeIdx ? ' is-active' : ''}`}
                  aria-label={`Перейти к карточке ${i + 1}`}
                  onClick={() => handleDot(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
