import { useCallback, useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'compass', 'process', 'programs', 'why', 'team', 'contacts']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')
  const [lang, setLang] = useState<'RU' | 'EN'>('RU')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // (b) Compact/scrolled topbar past a threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // (a) Lock body scroll + reflect open state on <body> while the menu is open.
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  // (a) Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // (c) Active-section highlight as the user scrolls.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (!sections.length) return
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio)
          } else {
            visible.delete(entry.target.id)
          }
        }
        let best: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (best) setActiveId(best)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => setMenuOpen((v) => !v)
  const toggleLang = () => setLang((v) => (v === 'RU' ? 'EN' : 'RU'))

  const isActive = (href: string) => activeId === href.replace(/^#/, '')

  return (
    <>
      {/* Top bar with official logo */}
      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo" aria-label="Garden Recovery — Medical Residence">
            <svg className="logo-mark-img" role="img" aria-label="Garden Recovery — Medical Residence">
              <use href="#gr-logo" />
            </svg>
          </a>
        </div>
      </header>

      {/* Burger (mobile only) */}
      <button
        className={`burger${menuOpen ? ' is-open' : ''}`}
        id="burger"
        aria-label="Открыть меню"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={toggleMenu}
      >
        <span className="burger-icon"></span>
      </button>

      {/* Mobile overlay menu */}
      <nav
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <a href="#" className="mobile-menu-brand" aria-label="Garden Recovery">
          <svg>
            <use href="#gr-glyph" />
          </svg>
        </a>
        <ul className="mobile-menu-list">
          <li>
            <a href="#compass" data-menu-link onClick={closeMenu}>
              Компас
            </a>
          </li>
          <li>
            <a href="#process" data-menu-link onClick={closeMenu}>
              Подход
            </a>
          </li>
          <li>
            <a href="#programs" data-menu-link onClick={closeMenu}>
              Программы
            </a>
          </li>
          <li>
            <a href="#why" data-menu-link onClick={closeMenu}>
              Почему мы
            </a>
          </li>
          <li>
            <a href="#team" data-menu-link onClick={closeMenu}>
              Команда
            </a>
          </li>
          <li>
            <a href="#contacts" data-menu-link onClick={closeMenu}>
              Контакты
            </a>
          </li>
        </ul>
        <a href="#contacts" className="mobile-menu-cta" data-menu-link onClick={closeMenu}>
          Получить консультацию
        </a>
        <div className="mobile-menu-foot">
          <button className="mobile-menu-lang" id="mobile-lang" onClick={toggleLang}>
            RU · EN
          </button>
        </div>
      </nav>

      {/* BOTTOM NAV */}
      <nav className="bottomnav" aria-label="Главное меню">
        <button
          className="bottomnav-lang"
          id="lang-toggle"
          aria-label="Переключить язык"
          onClick={toggleLang}
        >
          {lang}
        </button>
        <div className="bottomnav-menu">
          <a href="#compass" className={isActive('#compass') ? 'active' : undefined}>
            Подход
          </a>
          <a href="#programs" className={isActive('#programs') ? 'active' : undefined}>
            Программы
          </a>
          <a href="#team" className={isActive('#team') ? 'active' : undefined}>
            Команда
          </a>
          <a href="#why" className={isActive('#why') ? 'active' : undefined}>
            Почему мы
          </a>
          <a href="#contacts" className={isActive('#contacts') ? 'active' : undefined}>
            Контакты
          </a>
        </div>
        <a href="#contacts" className="bottomnav-cta">
          Консультация
        </a>
      </nav>
    </>
  )
}
