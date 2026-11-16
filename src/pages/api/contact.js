const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const DEFAULT_RECIPIENT = 'ruchitasonawale115@gmail.com'

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()

  // Honeypot: bots fill hidden fields; pretend success so they move on.
  if (body.company) return res.status(200).json({ ok: true })

  if (!name || name.length > 100) return res.status(400).json({ error: 'Please enter your name.' })
  if (!EMAIL_RE.test(email) || email.length > 200) return res.status(400).json({ error: 'Please enter a valid email.' })
  if (message.length < 10 || message.length > 5000)
    return res.status(400).json({ error: 'Message should be between 10 and 5000 characters.' })

  const apiKey = process.env.RESEND_API_KEY
  const domain = process.env.RESEND_EMAIL_DOMAIN
  if (!apiKey || !domain) return res.status(500).json({ error: 'Email is not configured yet.' })

  const send = (from) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT],
        reply_to: email,
        subject: `New message from ${name.replace(/[\r\n]/g, ' ')}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    })

  let response = await send(`Portfolio Contact <contact@${domain}>`)

  // Until the custom domain is verified in Resend, fall back to Resend's shared
  // sender, which can deliver to the Resend account owner's inbox.
  if (response.status === 403) {
    const detail = await response.text()
    if (/not verified/i.test(detail)) {
      response = await send('Portfolio Contact <onboarding@resend.dev>')
    } else {
      console.error('Resend error', 403, detail)
      return res.status(502).json({ error: 'Could not send your message. Please try again later.' })
    }
  }

  if (!response.ok) {
    console.error('Resend error', response.status, await response.text())
    return res.status(502).json({ error: 'Could not send your message. Please try again later.' })
  }
  return res.status(200).json({ ok: true })
}
