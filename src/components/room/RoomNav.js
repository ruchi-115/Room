import { TABS } from './views'

export default function RoomNav({ view, onChange }) {
  return (
    <nav aria-label="Room sections" className="room-nav">
      <ul>
        {TABS.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              className="room-nav__tab"
              aria-current={view === tab.id ? 'page' : undefined}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
