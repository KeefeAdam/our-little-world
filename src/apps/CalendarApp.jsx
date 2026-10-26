import { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { calendarEvents } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function CalendarApp({ onBack, onClue }) {
  const [selected, setSelected] = useState(calendarEvents[0])
  const [monthOffset, setMonthOffset] = useState(0)
  const month = new Date(2026, 9 + monthOffset, 1)
  const label = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const eventDays = calendarEvents.filter(e => {
    const d = new Date(`${e.date}T12:00:00`)
    return d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth()
  }).map(e => Number(e.date.slice(-2)))
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const offset = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title="Calendar" onBack={onBack} subtitle="Our days" />
    <div className="app-content">
      <div className="month-row"><button onClick={() => setMonthOffset(v => v - 1)}><ChevronLeft /></button><h3>{label}</h3><button onClick={() => setMonthOffset(v => v + 1)}><ChevronRight /></button></div>
      <div className="calendar-grid">{['M','T','W','T','F','S','S'].map((d, i) => <span className="weekday" key={`${d}-${i}`}>{d}</span>)}{Array.from({ length: offset }, (_, i) => <span key={`blank-${i}`} />)}{Array.from({ length: days }, (_, i) => {
        const day = i + 1, active = eventDays.includes(day)
        return <button key={day} className={`calendar-day ${active ? 'has-event' : ''} ${selected && Number(selected.date.slice(-2)) === day && new Date(`${selected.date}T12:00:00`).getMonth() === month.getMonth() ? 'selected' : ''}`} onClick={() => {
          const e = calendarEvents.find(e => e.date === `${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`)
          if (e) setSelected(e)
        }}>{day}{active && <i />}</button>
      })}</div>
      <div className="event-card"><span className="event-date">{selected.date}</span><h3>{selected.title}</h3><p>{selected.note}</p><button className="text-link" onClick={() => onClue('calendar')}>Keep this day <Heart size={14} /></button></div>
    </div>
  </div>
}
