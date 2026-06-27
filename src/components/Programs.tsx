import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Program {
  name: string
  tagline: string
  depth: number
  img: string
  ext: string
  desc: string
}

const PROGRAMS: Program[] = [
  {
    name: 'Executive Recovery',
    tagline: 'Выгорание и перенапряжение',
    depth: 2,
    img: 'executive-recovery',
    ext: 'jpg',
    desc: 'Программа для восстановления после хронического стресса, эмоционального выгорания и высоких нагрузок. Направлена на стабилизацию нервной системы, восстановление энергии, концентрации, сна и общего ресурса организма.',
  },
  {
    name: 'Body Balance Reset',
    tagline: 'Обмен веществ и саморегуляция',
    depth: 2,
    img: 'body-balance',
    ext: 'png',
    desc: 'Программа мягкого восстановления метаболического баланса и пищевого поведения. Помогает снизить уровень стресса, восстановить энергетический обмен и поддержать работу нервной системы и внутренних процессов организма.',
  },
  {
    name: 'Post-Surgery Recovery',
    tagline: 'Послеоперационная реабилитация',
    depth: 3,
    img: 'post-surgery',
    ext: 'jpg',
    desc: 'Программа восстановления после хирургических вмешательств и медикаментозной нагрузки. Направлена на ускорение регенерации, снижение отёков, восстановление энергии и безопасное возвращение к привычному уровню активности.',
  },
  {
    name: 'Human Reserve',
    tagline: 'Поддержание ресурса',
    depth: 3,
    img: 'human-reserve',
    ext: 'jpg',
    desc: 'Профилактическая программа для поддержания энергии, иммунитета и устойчивости организма при высоких физических и интеллектуальных нагрузках. Помогает восполнить дефициты, улучшить восстановление и сохранить высокий уровень ресурса.',
  },
]

export default function Programs() {
  const ref = useReveal<HTMLElement>()
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = (name: string) =>
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }))

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>, interest: string) => {
    e.preventDefault()
    const field = document.getElementById('program-interest') as HTMLInputElement | null
    if (field) field.value = interest
    const scroll = (window as unknown as { __scrollFormIntoCenter?: () => void })
      .__scrollFormIntoCenter
    if (scroll) scroll()
    window.setTimeout(() => {
      const nameField = document.getElementById('name') as HTMLInputElement | null
      if (nameField) nameField.focus({ preventScroll: true })
    }, 700)
  }

  return (
    <section id="programs" ref={ref}>
      <div className="container">
        <div className="section-header" data-reveal>
          <p className="section-eyebrow">Программы</p>
          <h2 className="section-title">Форматы входа в систему</h2>
          <p className="section-lead">Каждая программа — это персональный протокол восстановления. Выберите направление, а мы подберём оптимальную длительность.</p>
        </div>

        <div className="programs-list">

          {PROGRAMS.map((p) => (
            <article
              key={p.name}
              className={`program${open[p.name] ? ' is-open' : ''}`}
              data-program
              data-depth={p.depth}
              data-reveal
            >
              <div
                className="program-head"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  if ((e.target as HTMLElement).closest('.btn')) return
                  toggle(p.name)
                }}
              >
                <div className="program-duration"><span className="num">&rarr;</span></div>
                <div className="program-info">
                  <h3 className="program-name">{p.name}</h3>
                  <p className="program-tagline">{p.tagline}</p>
                </div>
                <div className="program-toggle"></div>
              </div>
              <div className="program-body">
                <div className="program-body-inner">
                  <div style={{ gridColumn: '1/-1' }}>
                    <img
                      src={`${import.meta.env.BASE_URL}assets/img/programs/${p.img}.${p.ext}`}
                      alt={p.name}
                      style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: 'var(--r-sm)', marginBottom: '24px' }}
                    />
                    <p>{p.desc}</p>
                  </div>
                  <div className="program-cta-row">
                    <span className="note">Условия обсуждаем на консультации.</span>
                    <a
                      href="#contacts"
                      className="btn btn-ghost"
                      data-program-cta={p.name}
                      onClick={(e) => handleCta(e, p.name)}
                    >Обсудить формат &rarr;</a>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>

        {/* Duration options */}
        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '18px' }} data-reveal>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-sm)', padding: '30px 28px', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 500, fontStyle: 'italic', color: 'var(--brand-sage-dark)', marginBottom: '6px' }}>3</div>
            <div style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--brand-sage)', fontWeight: 600, marginBottom: '14px' }}>дня</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500, color: 'var(--text)' }}>Fast Recovery</div>
            <div style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text)', marginTop: '8px' }}>2 500 &euro;</div>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-sm)', padding: '30px 28px', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 500, fontStyle: 'italic', color: 'var(--brand-sage-dark)', marginBottom: '6px' }}>7</div>
            <div style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--brand-sage)', fontWeight: 600, marginBottom: '14px' }}>дней</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500, color: 'var(--text)' }}>Basic Recovery</div>
            <div style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text)', marginTop: '8px' }}>5 500 &euro;</div>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-sm)', padding: '30px 28px', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 500, fontStyle: 'italic', color: 'var(--brand-sage-dark)', marginBottom: '6px' }}>30</div>
            <div style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--brand-sage)', fontWeight: 600, marginBottom: '14px' }}>дней</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500, color: 'var(--text)' }}>Full Recovery</div>
            <div style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text)', marginTop: '8px' }}>15 000 &euro;</div>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-sm)', padding: '30px 28px', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, fontStyle: 'italic', color: 'var(--brand-sage-dark)', marginBottom: '6px' }}>&infin;</div>
            <div style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--brand-sage)', fontWeight: 600, marginBottom: '14px' }}>индивидуально</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500, color: 'var(--text)' }}>Свой формат</div>
            <div style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text)', marginTop: '8px' }}>900 &euro;<span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>/день</span></div>
          </div>
        </div>

        {/* CONTINUUM */}
        <div className="continuum" data-reveal>
          <p className="continuum-eyebrow">Garden Recovery Continuum</p>
          <h3 className="continuum-title">Сопровождение после программы</h3>
          <p className="continuum-lead">Поддерживающее сопровождение после завершения программы. Помогает сохранить достигнутые результаты, поддерживать связь со специалистами и удерживать положительную динамику.</p>
          <img
            src={`${import.meta.env.BASE_URL}assets/img/programs/post-continuum.jpg`}
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
