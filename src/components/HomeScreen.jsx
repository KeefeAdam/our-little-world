import {
  CalendarDays, Image as ImageIcon, LockKeyhole, MessageCircle, Music2, NotebookPen,
  Sparkles, UnlockKeyhole
} from 'lucide-react'
import { apps } from '../data.js'
import StatusBar from './StatusBar.jsx'

export default function HomeScreen({ onOpen, found, unlocked }) {
  return <div className="home-screen screen">
    <StatusBar />
    <header className="home-greeting"><span>OUR LITTLE WORLD</span><h1>A little piece<br />of <i>us.</i></h1><p>Made with love, for us to keep.</p></header>
    <div className="app-grid">
      {apps.map(app => {
        const isMystery = app.id === 'mystery'
        return <button className="app-tile" key={app.id} onClick={() => onOpen(app.id)}>
          <span className={`app-icon ${app.tone} ${isMystery && !unlocked ? 'mystery-locked' : ''}`}>
            {app.id === 'gallery' ? <ImageIcon /> : app.id === 'calendar' ? <CalendarDays /> : app.id === 'music' ? <Music2 /> : app.id === 'notes' ? <NotebookPen /> : app.id === 'messenger' ? <MessageCircle /> : isMystery && unlocked ? <UnlockKeyhole /> : <Sparkles />}
            {app.id === 'calendar' && <b>31</b>}
          </span>
          <span className="app-label">{isMystery && !unlocked ? '???' : app.label}</span>
          {isMystery && !unlocked && <span className="app-lock"><LockKeyhole size={10} /></span>}
        </button>
      })}
    </div>
    <div className="progress-card">
      <div className="progress-title"><Sparkles size={14} /><span>Our little mystery</span><b>{found.length}/3</b></div>
      <div className="progress-track"><span style={{ width: `${found.length / 3 * 100}%` }} /></div>
      <small>{unlocked ? 'A little surprise is waiting for you.' : 'Explore our apps to find the hidden clues.'}</small>
    </div>
    <div className="dock">
      <button onClick={() => onOpen('gallery')} aria-label="Gallery"><ImageIcon /></button>
      <button onClick={() => onOpen('music')} aria-label="Music"><Music2 /></button>
      <button onClick={() => onOpen('notes')} aria-label="Notes"><NotebookPen /></button>
    </div>
  </div>
}
