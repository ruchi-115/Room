import { useEffect, useRef, useState } from 'react'
import { PROJECTS, FRAMES_PER_PAGE } from './views'

const PAGE_COUNT = Math.ceil(PROJECTS.length / FRAMES_PER_PAGE)

export default function ProjectsPanel({ open, registerAnchor }) {
  const headingRef = useRef(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea')) return
      if (e.key === 'ArrowRight') setPage((p) => (p + 1) % PAGE_COUNT)
      if (e.key === 'ArrowLeft') setPage((p) => (p - 1 + PAGE_COUNT) % PAGE_COUNT)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const start = page * FRAMES_PER_PAGE
  const visible = PROJECTS.slice(start, start + FRAMES_PER_PAGE)
  const go = (delta) => setPage((p) => (p + delta + PAGE_COUNT) % PAGE_COUNT)

  return (
    <section className="room-panel room-panel--projects" data-open={open} aria-labelledby="projects-title">
      <div className="frame-pager">
        <h2 id="projects-title" className="room-panel__sheet-title" tabIndex={-1} ref={headingRef}>
          Projects
        </h2>
        <div className="frame-pager__controls">
          <button type="button" className="frame-pager__btn" onClick={() => go(-1)} aria-label="Previous 3 projects">
            <span aria-hidden="true">{'←'}</span>
          </button>
          <p className="frame-pager__count" aria-live="polite">
            <span className="sr-only">Page </span>
            {page + 1} / {PAGE_COUNT}
          </p>
          <button type="button" className="frame-pager__btn" onClick={() => go(1)} aria-label="Next 3 projects">
            <span aria-hidden="true">{'→'}</span>
          </button>
        </div>
      </div>
      <ul className="frame-list" key={page}>
        {visible.map((project, i) => (
          <li key={project.id} className="frame-card" ref={registerAnchor(`frame${i}`)} style={{ '--i': i }}>
            <img className="frame-card__thumb" src={project.image} alt={`${project.title} preview`} loading="lazy" />
            <div className="frame-card__body">
              <h3 className="frame-card__title">{project.title}</h3>
              <p className="frame-card__desc">{project.summary}</p>
              <p className="frame-card__tech">{project.tech.join(' · ')}</p>
              <a className="frame-card__link" href={project.href} target="_blank" rel="noopener noreferrer">
                View project<span className="sr-only"> {project.title} (opens in a new tab)</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
