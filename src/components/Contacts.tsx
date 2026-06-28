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
      <section ref={ref} id="contacts" className="contacts bottom-safe">
        <div className="container">
          <div className="section-header" data-reveal>
            <p className="section-eyebrow">Контакты</p>
            <h2 className="section-title">
              Чтобы начать — короткий разговор.
              <br />
              Без обязательств и без анкет.
            </h2>
          </div>

          <div className="contacts-grid">
            <form className="contact-form" id="consultation-form" noValidate onSubmit={handleSubmit} data-reveal>
              <div className="field">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Как к вам обращаться"
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="contact">Контакт</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Телефон или @username"
                  required
                  value={contact}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Удобный канал связи</label>
                <div className="field-channel" role="radiogroup">
                  {CHANNELS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`channel-opt${channel === opt ? ' is-active' : ''}`}
                      data-channel={opt}
                      onClick={() => setChannel(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field" style={{ display: 'none' }}>
                <input type="hidden" id="program-interest" name="program" value={program} readOnly />
              </div>
              <label className="checkbox-row">
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
              <button type="submit" className="btn">
                Получить консультацию <span className="arrow">→</span>
              </button>
              <p className="form-after">Заявки обрабатываем лично. Ответим в течение рабочего дня.</p>
            </form>

            <div className="contact-info" data-reveal>
              <h3>Прямой контакт</h3>
              <p>Если удобнее написать сразу — выберите канал. Отвечает команда, не бот.</p>
              <div className="contact-channels">
                <a href="#" target="_blank" rel="noopener">
                  WhatsApp →
                </a>
                <a href="#" target="_blank" rel="noopener">
                  Telegram →
                </a>
                <a href="mailto:hello@gardenrecovery.me">hello@gardenrecovery.me →</a>
              </div>
              <div className="contact-geo">
                <p>
                  <strong>Светосавски пут б/б</strong>
                  <br />
                  Свети-Стефан · Черногория
                </p>
                <p style={{ marginTop: '10px' }}>
                  Посёлок, расположенный на живописном холме над Адриатическим морем, всего в 20 минутах езды от
                  аэропорта Тиват.
                </p>
                <p style={{ marginTop: '8px', fontStyle: 'italic' }}>Инструкции по приезду — после консультации.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SLIDE */}
      <section
        id="final"
        style={{
          background: 'var(--text)',
          color: 'var(--bg-soft)',
          textAlign: 'center',
          padding: 'clamp(90px, 14vh, 150px) 0',
        }}
      >
        <div className="container">
          <p
            style={{
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--brand-sage)',
              fontWeight: 600,
              margin: '0 0 28px',
            }}
          >
            Garden Recovery
          </p>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(28px,3.6vw,48px)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-.4px',
              color: 'var(--bg-soft)',
              margin: '0 auto 32px',
              maxWidth: '640px',
            }}
          >
            Иногда лучшее решение —{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brand-sage)' }}>остановиться</em>
          </h2>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: 'rgba(248,245,240,.7)',
              maxWidth: '480px',
              margin: '0 auto 40px',
            }}
          >
            Чтобы восстановить силы. Чтобы вернуть ясность. Чтобы обрести внутреннюю опору.
          </p>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(248,245,240,.4)',
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
