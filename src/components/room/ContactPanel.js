import { useEffect, useRef, useState } from 'react'
import { RESUME_URL, SOCIALS } from './views'

const EMPTY = { name: '', email: '', message: '', company: '' }

export default function ContactPanel({ open, registerAnchor }) {
  const headingRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])

  const update = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setStatus('sent')
      setValues(EMPTY)
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <section className="room-panel room-panel--contact" data-open={open} aria-labelledby="contact-title">
      <div className="shelf-form" ref={registerAnchor('shelf')}>
        <div className="postit">
        <div className="shelf-form__head">
          <h2 id="contact-title" className="shelf-form__title" tabIndex={-1} ref={headingRef}>
            Leave a note on the shelf
          </h2>
          <p className="shelf-form__sub">{"I'll get back to you at the email you share."}</p>
          <ul className="shelf-socials" aria-label="Find me elsewhere">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a className="shelf-socials__link" href={s.href} target="_blank" rel="noopener noreferrer">
                  <img src={s.icon} alt="" width={20} height={20} />
                  <span className="sr-only">{`${s.label} (opens in a new tab)`}</span>
                </a>
              </li>
            ))}
            <li>
              <a className="shelf-socials__resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                {'Resume ↗'}
                <span className="sr-only"> (opens Google Drive in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        {status === 'sent' ? (
          <div className="shelf-form__done" role="status">
            <p className="shelf-form__done-title">Message sent. Thank you!</p>
            <button type="button" className="shelf-form__submit" onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form className="shelf-form__grid" onSubmit={handleSubmit}>
            <div className="shelf-form__row">
              <label className="field">
                <span className="field__label">Name</span>
                <input className="field__input" name="name" autoComplete="name" required maxLength={100} value={values.name} onChange={update} />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input className="field__input" type="email" name="email" autoComplete="email" required maxLength={200} value={values.email} onChange={update} />
              </label>
            </div>
            <label className="field field--hidden" aria-hidden="true">
              <span>Company</span>
              <input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
            </label>
            <label className="field">
              <span className="field__label">Message</span>
              <textarea
                className="field__input field__textarea"
                name="message"
                rows={4}
                required
                minLength={10}
                maxLength={5000}
                placeholder="Say hi, at least 10 characters…"
                value={values.message}
                onChange={update}
              />
            </label>
            <div className="shelf-form__footer">
              <p className="shelf-form__error" role="alert">
                {status === 'error' ? error : ''}
              </p>
              <button type="submit" className="shelf-form__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Stick it'}
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
