import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const POINTS = [
  { cls: 'p1', label: 'Кто мы' },
  { cls: 'p2', label: 'Что мы делаем' },
  { cls: 'p3', label: 'Для кого' },
  { cls: 'p4', label: 'Формат' },
]

export default function Compass() {
  const ref = useReveal<HTMLElement>()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="compass" className="fullscreen" ref={ref}>
      <div className="container">
        <div className="section-header" data-reveal>
          <p className="section-eyebrow">Компас</p>
          <h2 className="section-title">Кто мы и как работаем</h2>
          <p className="section-lead">Мы — остановка на пути, место, где восстановление становится частью жизни.</p>
        </div>

        <div className="compass-wrap">
          {/* Visual */}
          <div className="compass-visual" data-reveal>
            <svg className="compass-svg" viewBox="0 0 540 540" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                {/* 24 ticks around the dial: minor every 15°, major every 90° */}
                <g id="cmp-tick"><line className="tick" x1="270" y1="38" x2="270" y2="54"/></g>
                <g id="cmp-tick-major"><line className="tick-major" x1="270" y1="32" x2="270" y2="58"/></g>
              </defs>
              {/* disc + concentric rings */}
              <circle className="disc"       cx="270" cy="270" r="232"/>
              <circle className="ring-mid"   cx="270" cy="270" r="184"/>
              <circle className="ring-inner" cx="270" cy="270" r="118"/>
              {/* diagonal spokes (4 secondary, dashed) */}
              <line className="spoke" x1="270" y1="270" x2="425.6" y2="114.4"/>
              <line className="spoke" x1="270" y1="270" x2="425.6" y2="425.6"/>
              <line className="spoke" x1="270" y1="270" x2="114.4" y2="425.6"/>
              <line className="spoke" x1="270" y1="270" x2="114.4" y2="114.4"/>
              {/* ticks on the outer ring: minor every 15°, major at N/E/S/W */}
              <g transform="rotate(15 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(30 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(45 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(60 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(75 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(105 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(120 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(135 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(150 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(165 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(195 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(210 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(225 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(240 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(255 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(285 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(300 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(315 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(330 270 270)"><use href="#cmp-tick"/></g>
              <g transform="rotate(345 270 270)"><use href="#cmp-tick"/></g>
              {/* 4 major ticks at cardinal points */}
              <use href="#cmp-tick-major"/>
              <g transform="rotate(90 270 270)"><use href="#cmp-tick-major"/></g>
              <g transform="rotate(180 270 270)"><use href="#cmp-tick-major"/></g>
              <g transform="rotate(270 270 270)"><use href="#cmp-tick-major"/></g>
              {/* DNA-helix double arc through the disc */}
              <path className="needle"      d="M270,112 C336,196 204,344 270,428"/>
              <path className="needle-soft" d="M270,112 C204,196 336,344 270,428"/>
              {/* cairn (stones) — brand mark in the core */}
              <g className="stones" transform="translate(270,270) scale(1.15)">
                <ellipse cx="0" cy="-26" rx="11" ry="7"/>
                <ellipse cx="0" cy="-4"  rx="26" ry="8.5"/>
                <ellipse cx="0" cy="18"  rx="18" ry="6.5"/>
              </g>
            </svg>
            {POINTS.map((pt, i) => (
              <button
                key={pt.cls}
                className={`compass-pt ${pt.cls}${activeIndex === i ? ' is-active' : ''}`}
                data-tab={i}
                onClick={() => setActiveIndex(i)}
              >
                {pt.label}
              </button>
            ))}
          </div>

          {/* Content tabs */}
          <div className="compass-content">

            <div className={`compass-tab${activeIndex === 0 ? ' is-active' : ''}`} data-tab="0">
              <h3>Частная медицинская резиденция</h3>
              <p>Garden Recovery — это частная медицинская резиденция, где восстановление рассматривается как комплексный процесс. Среда, в которой человек, утративший опоры, снова вспоминает, что такое внутренний порядок, ясность, достоинство и вкус к жизни.</p>
            </div>

            <div className={`compass-tab${activeIndex === 1 ? ' is-active' : ''}`} data-tab="1">
              <h3>Персональные программы</h3>
              <p>Мы создаём персональные программы восстановления, которые помогают человеку заново научиться чувствовать, понимать и регулировать своё состояние. Вы выбираете программу и длительность пребывания — организацию всего процесса мы берём на себя.</p>
            </div>

            <div className={`compass-tab${activeIndex === 2 ? ' is-active' : ''}`} data-tab="2">
              <h3>Для тех, кто ищет перемен</h3>
              <ul>
                <li>Для тех, кто работают в режиме постоянной интенсивности</li>
                <li>Для тех, кто хотят сформировать здоровые привычки питания</li>
                <li>Для тех, кому необходимо реабилитационное сопровождение после эстетических вмешательств</li>
                <li>Для тех, кто системно подходят к качеству своей жизни</li>
                <li>Для тех, кто ценят доверие, конфиденциальность и индивидуальный подход</li>
              </ul>
            </div>

            <div className={`compass-tab${activeIndex === 3 ? ' is-active' : ''}`} data-tab="3">
              <h3>Формат резиденции</h3>
              <ul>
                <li>Проживание в одноместном люксе с видом на море</li>
                <li>Трёхразовое питание от шеф-повара по индивидуальному плану</li>
                <li>Медицинская диагностика</li>
                <li>Персональный план восстановления</li>
                <li>Ежедневное сопровождение врача</li>
                <li>Консультации нутрициолога</li>
                <li>Инфузионная терапия</li>
                <li>Физиотерапия: массаж, ЛФК</li>
                <li>Психотерапевтические сессии</li>
                <li>Фармакологическая поддержка</li>
                <li>Итоговый отчёт и план пост-реабилитационного сопровождения</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
