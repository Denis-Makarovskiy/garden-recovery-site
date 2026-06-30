import '../styles/sec-contacts.css'
import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const CHANNELS = ['WhatsApp', 'Telegram', 'Звонок'] as const
type Channel = (typeof CHANNELS)[number]

export default function Contacts() {
  const ref = useReveal<HTMLElement>()

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [channel, setChannel] = useState<Channel>('WhatsApp')
  const [consent, setConsent] = useState(false)
  // Hidden "program" interest — set externally by program CTAs in the prototype.
  const [program] = useState('')

  const [toast, setToast] = useState('')
  const [toastShown, setToastShown] = useState(false)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const showToast = (message: string, duration: number) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast(message)
    setToastShown(true)
    toastTimer.current = window.setTimeout(() => setToastShown(false), duration)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedContact = contact.trim()
    if (!trimmedName || !trimmedContact) {
      showToast('Заполните имя и контакт.', 3000)
      return
    }

    // TODO: POST to CRM endpoint
    console.log('Submission:', {
      name: trimmedName,
      contact: trimmedContact,
      channel,
      program,
    })

    showToast('Получили. Свяжемся в течение рабочего дня.', 4000)
    setName('')
    setContact('')
    setConsent(false)
    setChannel('WhatsApp')
  }

  return (
    <>
      <section ref={ref} id="contacts" className="sec-contacts bottom-safe">
        <div className="container">
          <h2 className="sec-contacts__title" data-reveal>
            Консультация
          </h2>

          <div className="sec-contacts__card" data-reveal>
            <form
              className="sec-contacts__form"
              id="consultation-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <p className="sec-contacts__lead">
                Заполните форму, чтобы получить бесплатную консультацию
              </p>
              <p className="sec-contacts__note">
                Заявки обрабатываем лично. Ответим в течение рабочего дня.
              </p>

              <div className="sec-contacts__fields">
                <div className="sec-contacts__field">
                  <label className="sr-only" htmlFor="name">
                    Имя
                  </label>
                  <input
                    className="sec-contacts__input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Имя"
                    required
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                </div>

                <div className="sec-contacts__field">
                  <label className="sr-only" htmlFor="contact">
                    Телефон
                  </label>
                  <input
                    className="sec-contacts__input"
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Телефон"
                    required
                    value={contact}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact(e.target.value)}
                  />
                </div>

                <div className="sec-contacts__channels" role="radiogroup" aria-label="Удобный канал связи">
                <button
                  type="button"
                  className={`sec-contacts__chan${channel === 'WhatsApp' ? ' is-active' : ''}`}
                  aria-pressed={channel === 'WhatsApp'}
                  aria-label="WhatsApp"
                  onClick={() => setChannel('WhatsApp')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.1 8.1 0 0 1-1.24-4.3c0-4.46 3.63-8.09 8.1-8.09Zm-2.57 4.4c-.13 0-.34.05-.52.24-.18.2-.69.67-.69 1.64s.71 1.91.81 2.04c.1.13 1.4 2.14 3.39 3 .47.2.84.32 1.13.41.47.15.9.13 1.24.08.38-.06 1.16-.47 1.32-.93.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.11-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.44-1.07-.6-1.46-.16-.38-.32-.33-.44-.34l-.38-.01Z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`sec-contacts__chan${channel === 'Telegram' ? ' is-active' : ''}`}
                  aria-pressed={channel === 'Telegram'}
                  aria-label="Telegram"
                  onClick={() => setChannel('Telegram')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21.94 4.3 18.6 20.06c-.25 1.11-.91 1.39-1.85.86l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.02.5l.36-5.18 9.42-8.51c.41-.36-.09-.57-.64-.2L5.65 13.4l-5.01-1.57c-1.09-.34-1.11-1.09.23-1.61L20.53 2.7c.91-.34 1.7.21 1.41 1.6Z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`sec-contacts__chan sec-contacts__chan--call${channel === 'Звонок' ? ' is-active' : ''}`}
                  aria-pressed={channel === 'Звонок'}
                  onClick={() => setChannel('Звонок')}
                >
                  Звонок
                </button>
                </div>

                <input type="hidden" id="program-interest" name="program" value={program} readOnly />

                <button type="submit" className="sec-contacts__submit">
                  Отправить
                </button>
              </div>

              <label className="sec-contacts__consent">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)}
                />
                <span>
                  Согласен с <a href="#">политикой конфиденциальности</a> и обработкой персональных данных.
                </span>
              </label>
            </form>

            <div className="sec-contacts__photo">
              <img
                src={`${import.meta.env.BASE_URL}assets/img/contacts-photo.jpg`}
                alt="Консультация в Garden Recovery"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL — Figma Desktop-25: белый фон, чёрный текст, центрирование */}
      <section
        id="final"
        style={{
          background: '#FFFFFF',
          color: '#000000',
          textAlign: 'center',
          padding: '142px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              color: '#000000',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Garden Recovery
          </div>
          <div
            style={{
              width: '120px',
              height: '1px',
              background: '#000000',
              margin: '0 auto 39px',
            }}
            aria-hidden="true"
          />
          <h2
            style={{
              fontFamily: 'Lora, serif',
              fontSize: '52px',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: '56.16px',
              letterSpacing: 0,
              color: '#000000',
              margin: '0 auto 66px',
              maxWidth: '606px',
            }}
          >
            Иногда лучшее решение — остановиться
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '17px',
              fontWeight: 300,
              lineHeight: '18.26px',
              letterSpacing: '0.85px',
              color: '#000000',
              maxWidth: '470px',
              margin: '0 auto 61px',
            }}
          >
            Чтобы восстановить силы. Чтобы вернуть ясность.<br />
            Чтобы обрести внутреннюю опору.
          </p>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '17px',
              fontWeight: 300,
              lineHeight: '18.26px',
              letterSpacing: '0.85px',
              color: '#70715C',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Персонально · Системно · Конфиденциально
          </p>
        </div>
      </section>

      <div className={`toast${toastShown ? ' show' : ''}`} id="toast">
        {toast}
      </div>
    </>
  )
}
