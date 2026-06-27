import { useReveal } from '../hooks/useReveal'

export default function Footer() {
  const ref = useReveal<HTMLElement>()

  return (
    <footer ref={ref} className="footer bottom-safe">
      <div className="container">
        <div className="footer-grid">
          <div data-reveal>
            <a href="#" className="logo footer-logo" aria-label="Garden Recovery — Medical Residence">
              <svg className="footer-logo-img" role="img" aria-label="Garden Recovery — Medical Residence">
                <use href="#gr-logo" />
              </svg>
            </a>
            <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--bg-cream)', opacity: 0.7, lineHeight: 1.6, maxWidth: '380px' }}>
              Приватная медицинская резиденция на побережье Адриатики. Восстановление психоэмоционального состояния под медицинским контролем.
            </p>
          </div>
          <div data-reveal>
            <h5>Сайт</h5>
            <ul>
              <li><a href="#compass">Компас</a></li>
              <li><a href="#process">Подход</a></li>
              <li><a href="#programs">Программы</a></li>
              <li><a href="#team">Команда</a></li>
              <li><a href="#contacts">Контакты</a></li>
            </ul>
          </div>
          <div data-reveal>
            <h5>Юридическое</h5>
            <ul>
              <li><a href="#">Политика конфиденциальности</a></li>
              <li><a href="#">Согласие на обработку ПД</a></li>
              <li><a href="#">Cookie-политика</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-meta" data-reveal>
          <span>© 2026 Garden Recovery. Все права защищены.</span>
          <span>RU · EN</span>
        </div>
      </div>
    </footer>
  )
}
