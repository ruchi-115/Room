import { useEffect, useRef, useState } from 'react'

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
        <div className="shelf-form__head">
          <h2 id="contact-title" className="shelf-form__title" tabIndex={-1} ref={headingRef}>
            Leave a note on the shelf
          </h2>
          <p className="shelf-form__sub">{"I'll get back to you at the email you share."}</p>
        </div>

        {status === 'sent' ? (
          <div className="shelf-form__done" role="status">
            <p className="shelf-form__done-title">Message sent. Thank you!</p>
            <button type="button" className="shelf-form__submit" onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form className="shelf-form__grid" onSubmit={handleSubmit} noValidate={false}>
            <div className="shelf-form__col">
              <label className="field">
                <span className="field__label">Name</span>
                <input className="field__input" name="name" autoComplete="name" required maxLength={100} value={values.name} onChange={update} />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input className="field__input" type="email" name="email" autoComplete="email" required maxLength={200} value={values.email} onChange={update} />
              </label>
              <label className="field field--hidden" aria-hidden="true">
                <span>Company</span>
                <input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
              </label>
            </div>
            <div className="shelf-form__col shelf-form__col--wide">
              <label className="field field--grow">
                <span className="field__label">Message</span>
                <textarea className="field__input field__textarea" name="message" required minLength={10} maxLength={5000} value={values.message} onChange={update} />
              </label>
              <div className="shelf-form__footer">
                <p className="shelf-form__error" role="alert">
                  {status === 'error' ? error : ''}
                </p>
                <button type="submit" className="shelf-form__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
