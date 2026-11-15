import { useEffect, useRef } from 'react'

const SESSION = [
  { cmd: 'whoami', out: ['Ruchita Sonawale — Full Stack Developer'] },
  {
    cmd: 'cat about.txt',
    out: [
      'I build beautiful, functional web apps. A background in graphic design gives me a blend of technical and artistic skills, and I care about shipping designs that are both user-friendly and secure.',
    ],
  },
  {
    cmd: 'ls education/',
    out: ['MS Computer Science, NYU (Fall 2024 – present)', "Bachelor's, Computer Engineering"],
  },
  {
    cmd: 'cat skills.txt',
    out: [
      'languages  Python, C/C++, JavaScript',
      'frontend   React, Vue.js, Three.js, HTML5, CSS3',
      'backend    Next.js, Node.js, Express, Django, Flask',
      'data       PostgreSQL, MongoDB, Firebase, MySQL, Sanity',
      'security   Splunk, Wireshark, Metasploit, Nessus',
      'design     Figma, Blender',
    ],
  },
  {
    cmd: 'ls achievements/',
    out: ['1st place — Smart India Hackathon 2022', '1st place — PRISM 2022 (IKST)', '10+ hackathons, open source contributor'],
  },
  {
    cmd: 'ls experience/',
    out: ['CSI DMCE tech team (2021 – present)', 'GDSC web dev team (2021 – 2022)', 'Web dev intern — LetsGrowMore, TechnoHacks, Sparks Foundation'],
  },
]

export default function TerminalPanel({ open, registerAnchor, onNavigate }) {
  const headingRef = useRef(null)
  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])

  let line = 0
  return (
    <section className="room-panel room-panel--about" data-open={open} aria-labelledby="about-title">
      <div className="terminal" ref={registerAnchor('screen')}>
        <div className="terminal__bar">
          <span className="terminal__dot" aria-hidden="true" />
          <span className="terminal__dot" aria-hidden="true" />
          <span className="terminal__dot" aria-hidden="true" />
          <h2 id="about-title" className="terminal__title" tabIndex={-1} ref={headingRef}>
            ruchita@room: ~/about
          </h2>
        </div>
        <div className="terminal__body">
          {SESSION.map((entry) => (
            <div key={entry.cmd} className="terminal__block">
              <p className="terminal__line" style={{ '--i': line++ }}>
                <span className="terminal__prompt" aria-hidden="true">{'ruchita@room:~$ '}</span>
                <span className="terminal__cmd">{entry.cmd}</span>
              </p>
              {entry.out.map((text) => (
                <p key={text} className="terminal__line terminal__out" style={{ '--i': line++ }}>
                  {text}
                </p>
              ))}
            </div>
          ))}
          <p className="terminal__line terminal__actions" style={{ '--i': line++ }}>
            <span className="terminal__prompt" aria-hidden="true">{'ruchita@room:~$ '}</span>
            <button type="button" className="terminal__link" onClick={() => onNavigate('projects')}>
              ./projects
            </button>
            <button type="button" className="terminal__link" onClick={() => onNavigate('contact')}>
              ./contact
            </button>
            <span className="terminal__cursor" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  )
}
