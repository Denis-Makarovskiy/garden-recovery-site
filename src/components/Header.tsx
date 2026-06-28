import { useCallback, useEffect, useState } from 'react'
import { scrollToHash } from '../lib/scroll'

const SECTION_IDS = ['hero', 'about', 'process', 'programs', 'why', 'team', 'contacts']

const NAV = [
  { href: '#about', label: 'О нас' },
  { href: '#process', label: 'Подход' },
  { href: '#programs', label: 'Программы' },
  { href: '#why', label: 'Почему мы' },
  { href: '#team', label: 'Команда' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Smooth-scroll in-page anchors via Lenis instead of the broken native hash jump.
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
      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo" aria-label="Garden Recovery — Medical Residence" onClick={onNav}>
            <svg className="logo-mark-img" role="img" aria-label="Garden Recovery — Medical Residence">
              <use href="#gr-logo" />
            </svg>
          </a>
        </div>
      </header>

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

      <nav className="bottomnav" aria-label="Главное меню">
        <div className="bottomnav-menu">
          {NAV.filter((n) => n.href !== '#contacts').map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={isActive(n.href) ? 'active' : undefined}
              onClick={onNav}
            >
              {n.label}
            </a>
          ))}
        </div>
        <a href="#contacts" className="bottomnav-cta" onClick={onNav}>
          Консультация
        </a>
      </nav>
    </>
  )
}
