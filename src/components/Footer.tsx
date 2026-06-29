import '../styles/sec-footer.css'
import { useReveal } from '../hooks/useReveal'
import { scrollToHash } from '../lib/scroll'

const SITE_LINKS: { href: string; label: string }[] = [
  { href: '#about', label: 'О нас' },
  { href: '#process', label: 'Путь гостя' },
  { href: '#programs', label: 'Программы' },
  { href: '#why', label: 'Почему это работает' },
  { href: '#team', label: 'Команда' },
  { href: '#contacts', label: 'Консультация' },
]

export default function Footer() {
  const ref = useReveal<HTMLElement>()

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href') || ''
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault()
      scrollToHash(href)
    }
  }

  return (
    <footer ref={ref} className="ft bottom-safe">
      <div className="container">
        <div className="ft-grid">
          {/* Контакты */}
          <div data-reveal>
            <h3 className="ft-title">Контакты</h3>

            <div className="ft-contacts">
              <a className="ft-link" href="tel:+38269619999">+382 69 619 999</a>
              <a className="ft-link" href="mailto:reception@gardenrecovery.me">
                reception@gardenrecovery.me
              </a>
            </div>

            <div className="ft-socials">
              <a
                className="ft-soc"
                href="https://t.me/gardenrecovery"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.8 3.3 2.6 10.7c-1.1.5-1.1 1.6-.2 1.9l4.9 1.5 1.9 6c.2.7.5.9 1.2.6.3-.1.6-.4.9-.8l2.4-2.4 5 3.7c.9.5 1.6.2 1.8-.9l3.3-15.5c.3-1.3-.5-1.9-1.9-1.0Zm-3.9 4.1-7.8 7.1c-.3.3-.5.6-.6 1l-.3 2.5-1.3-4.2 9.4-6c.5-.3 1 .2.6.6Z" />
                </svg>
              </a>
              <a
                className="ft-soc"
                href="https://wa.me/38269619999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-.7-.3-1.4-.7-2-1.4-.4-.5-.8-1-.9-1.2-.1-.2 0-.3.1-.5l.4-.4c.1-.2.2-.3.2-.5 0-.2-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
                </svg>
              </a>
              <a
                className="ft-soc"
                href="https://instagram.com/gardenrecovery"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>

            <p className="ft-address">
              Черногория · Свети-Стефан · Светосавски пут б/б
            </p>
          </div>

          {/* САЙТ */}
          <nav data-reveal aria-label="Навигация по сайту">
            <p className="ft-col-title">Сайт</p>
            <ul className="ft-nav">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={onNav}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ЮРИДИЧЕСКОЕ */}
          <nav data-reveal aria-label="Юридическая информация">
            <p className="ft-col-title">Юридическое</p>
            <ul className="ft-nav">
              <li><a href="#">Политика конфиденциальности</a></li>
              <li><a href="#">Согласие на обработку ПД</a></li>
              <li><a href="#">Cookie-политика</a></li>
            </ul>
          </nav>
        </div>

        <div className="ft-bottom" data-reveal>
          <span className="ft-copy">© 2026 Garden Recovery. Все права защищены.</span>
        </div>
      </div>
    </footer>
  )
}
