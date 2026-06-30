import { useCallback, useEffect, useState } from 'react'
import { scrollToHash } from '../lib/scroll'

const SECTION_IDS = ['hero', 'about', 'process', 'programs', 'why', 'team', 'contacts']

// По брифу дизайнера: 5 пунктов меню (без «Путь гостя»)
const NAV = [
  { href: '#about', label: 'О нас' },
  { href: '#programs', label: 'Программы' },
  { href: '#team', label: 'Команда' },
  { href: '#why', label: 'Почему это работает' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const onNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href') || ''
    if (href.startsWith('#')) {
      e.preventDefault()
      if (href === '#') scrollToHash('#hero')
      else scrollToHash(href)
    }
  }, [])

  const onNavMobile = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onNav(e)
      closeMenu()
    },
    [onNav, closeMenu],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Active-section highlight as the user scrolls.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (!sections.length) return
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
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
  const isActive = (href: string) => activeId === href.replace(/^#/, '')

  return (
    <>
      {/* Верхний бар по брифу: язык + лого слева, навигация в центре, CTA справа */}
      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="topbar-inner">
          <div className="topbar-left">
            <button type="button" className="topbar-lang" aria-label="Сменить язык">RU</button>
            <a href="#" className="topbar-logo" aria-label="Garden Recovery — Medical Residence" onClick={onNav}>
              <svg role="img" aria-label="Garden Recovery">
                <use href="#gr-logo" />
              </svg>
            </a>
          </div>

          <nav className="topbar-nav" aria-label="Главное меню">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={isActive(n.href) ? 'active' : undefined}
                onClick={onNav}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a href="#contacts" className="topbar-cta" onClick={onNav}>
            Консультация
          </a>
        </div>
      </header>

      {/* Burger / mobile menu — без изменений в логике */}
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

      <nav className={`mobile-menu${menuOpen ? ' is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <a href="#" className="mobile-menu-brand" aria-label="Garden Recovery" onClick={onNavMobile}>
          <svg>
            <use href="#gr-glyph" />
          </svg>
        </a>
        <ul className="mobile-menu-list">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} data-menu-link onClick={onNavMobile}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contacts" className="mobile-menu-cta" data-menu-link onClick={onNavMobile}>
          Получить консультацию
        </a>
      </nav>
    </>
  )
}
