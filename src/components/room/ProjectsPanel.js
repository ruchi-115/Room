import { useEffect, useRef } from 'react'
import { PROJECTS } from './views'

export default function ProjectsPanel({ open, registerAnchor }) {
  const headingRef = useRef(null)
  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])

  return (
    <section className="room-panel room-panel--projects" data-open={open} aria-labelledby="projects-title">
      <h2 id="projects-title" className="room-panel__sheet-title" tabIndex={-1} ref={headingRef}>
        Projects
      </h2>
      <ul className="frame-list">
        {PROJECTS.map((project, i) => (
          <li key={project.id} className="frame-card" ref={registerAnchor(project.id)} style={{ '--i': i }}>
            <img className="frame-card__thumb" src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
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
