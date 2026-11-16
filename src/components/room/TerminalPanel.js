import { useEffect, useRef } from 'react'

const SESSION = [
  { cmd: 'whoami', out: ['Ruchita Sonawale — AI Engineer & Full Stack Developer, New York'] },
  {
    cmd: 'cat about.txt',
    out: [
      'I build AI-powered products and full stack web apps, from document-intelligence pipelines to interactive data viewers. A background in graphic design keeps my work both technical and user-friendly.',
    ],
  },
  {
    cmd: 'ls experience/',
    out: [
      'AI Engineer — ISS Group Inc. (Sept 2026 – present)',
      '  AI invoice pipeline on Azure Document Intelligence; messaging platform for 200+ users',
      'SWE Intern — NYU VIDA Lab (Jul – Aug 2026)',
      '  React + FastAPI microscopy viewer over 50+ TB of imaging data (Zarr, multi-level caching)',
      'Software Developer Intern — McKinsey & Company (May – Aug 2025)',
      '  SFTP file browser on AWS Lambda (saved 8 hrs/week); Bloomberg Terminal browser',
    ],
  },
  {
    cmd: 'ls education/',
    out: ['MS Computer Science, NYU (2024 – 2026) · GPA 3.7', 'BE Computer Engineering, University of Mumbai (2020 – 2024) · GPA 9.36'],
  },
  {
    cmd: 'cat skills.txt',
    out: [
      'languages  Python, Rust, JavaScript, TypeScript, C/C++, Go, Java, SQL',
      'frontend   React, Angular, Vue.js, Next.js, D3.js, Three.js, Tailwind CSS',
      'ai/ml      NumPy, Pandas, TensorFlow, PyTorch, GPT-4, Claude Code, agentic workflows',
      'backend    Node.js, Express, Flask, Django, Spring Boot, REST, GraphQL',
      'cloud      AWS (Lambda, EC2, S3), GCP, Azure, Docker, Kubernetes, Jenkins, CI/CD',
      'databases  MongoDB, PostgreSQL, SQLite, Redis, MySQL',
    ],
  },
  {
    cmd: 'ls achievements/',
    out: ['HackNYU 2025 — CodeMaven, AI coding mentor', '1st place — Smart India Hackathon 2022', '1st place — PRISM 2022 (IKST)'],
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
