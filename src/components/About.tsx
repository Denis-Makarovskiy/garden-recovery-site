import { useReveal } from '../hooks/useReveal'

const BASE = import.meta.env.BASE_URL

interface Col {
  img: string
  cap: string
  paras?: string[]
  intro?: string
  list?: string[]
}

// Figma Desktop-59 «О нас»: 4 photo columns. Caption + content per the macet.
// NB: col 3 («Что мы делаем») holds placeholder duplicate text in the Figma —
// provisional copy written here; flag for the designer.
const COLS: Col[] = [
  {
    img: '01',
    cap: 'Кто мы',
    paras: [
      'Garden Recovery — частная медицинская резиденция, где восстановление рассматривается как комплексный процесс.',
      'Среда, в которой человек, утративший опоры, снова вспоминает, что такое внутренний порядок, ясность, достоинство и уважение к себе.',
    ],
  },
  {
    img: '02',
    cap: 'Для кого',
    list: [
      'Кто работает в режиме постоянной интенсивности',
      'Кто хочет сформировать здоровые привычки питания',
      'Кто сталкивается с эмоциональным истощением',
      'Кому нужно сопровождение после эстетических вмешательств',
      'Кто системно подходит к качеству своей жизни',
      'Кто ценит доверие, конфиденциальность и индивидуальный подход',
    ],
  },
  {
    img: '03',
    cap: 'Что мы делаем',
    paras: [
      'Сопровождаем восстановление как систему: медицинская диагностика, персональный протокол и ежедневное наблюдение врача.',
      'С гостем работает команда специалистов — от психотерапии и физиотерапии до нутрициологии.',
    ],
  },
  {
    img: '04',
    cap: 'Система',
    intro: 'Система — основа вашего пребывания в Garden Recovery:',
    list: [
      'Одноместный люкс с видом на море',
      'Трёхразовое питание от шеф-повара по индивидуальному плану',
      'Медицинская диагностика и персональный план восстановления',
      'Ежедневное сопровождение врача и консультации нутрициолога',
      'Инфузионная терапия, физиотерапия: массаж, ЛФК',
      'Психотерапевтические сессии и фармакологическая поддержка',
      'Итоговый отчёт и план пост-реабилитационного сопровождения',
    ],
  },
]

export default function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about-head" data-reveal>
          <p className="section-eyebrow">О нас</p>
          <h2 className="section-title">Мы — остановка на&nbsp;пути</h2>
          <p className="section-lead">Место, где восстановление становится частью жизни.</p>
        </div>
        <div className="about-grid">
          {COLS.map((c) => (
            <div className="about-col" data-reveal key={c.cap}>
              <div className="about-photo">
                <img src={`${BASE}assets/img/about/${c.img}.jpg`} alt={c.cap} loading="lazy" />
              </div>
              <h3 className="about-cap">{c.cap}</h3>
              <div className="about-desc">
                {c.intro && <p>{c.intro}</p>}
                {c.paras?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {c.list && (
                  <ul>
                    {c.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
