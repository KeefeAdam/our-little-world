import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, BatteryFull, CalendarDays, Check, ChevronLeft, ChevronRight,
  Clock3, Heart, Image as ImageIcon, LockKeyhole, Music2, NotebookPen,
  Play, RotateCcw, Signal, Smartphone, Sparkles, UnlockKeyhole, X
} from 'lucide-react'
import { DEMO_PASSCODE, apps, albums, calendarEvents, tracks, notes, finalLetter } from './data.js'

const clueNames = ['Gallery', 'Calendar', 'Notes']
const todayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

function StatusBar({ dark = false }) {
  return <div className={`status-bar ${dark ? 'status-dark' : ''}`}>
    <span>9:41</span>
    <div className="status-icons"><Signal size={14} /><span className="wifi">⌁</span><BatteryFull size={17} /></div>
  </div>
}

function LockScreen({ onUnlock }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  return <div className="lock-screen screen">
    <StatusBar />
    <div className="lock-date">{todayLabel}</div>
    <div className="lock-time">{time}</div>
    <div className="lock-message"><span className="tiny-star">✦</span><br />a little place for us.</div>
    <button className="notification" onClick={onUnlock}>
      <span className="notification-icon"><Heart size={18} fill="currentColor" /></span>
      <span><b>Aleyna</b><small>I made something for us. ♡</small></span>
      <em>now</em>
    </button>
    <div className="lock-bottom">
      <button className="round-shortcut" aria-label="Flashlight"><span>⌁</span></button>
      <button className="swipe-hint" onClick={onUnlock}><span className="swipe-arrow">↑</span><small>Swipe up to unlock</small></button>
      <button className="round-shortcut" aria-label="Camera"><ImageIcon size={18} /></button>
    </div>
  </div>
}

function PasscodeScreen({ onSuccess, onBack }) {
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)
  const enter = (digit) => {
    setError(false)
    const next = digits + digit
    if (next.length < 4) return setDigits(next)
    if (next === DEMO_PASSCODE) {
      setDigits(next)
      setTimeout(onSuccess, 220)
    } else {
      setError(true)
      setTimeout(() => { setDigits(''); setError(false) }, 650)
    }
  }
  const erase = () => { setDigits(v => v.slice(0, -1)); setError(false) }
  return <div className="passcode-screen screen">
    <StatusBar />
    <button className="top-back" onClick={onBack}><ChevronLeft size={20} /> Back</button>
    <div className="passcode-heading"><LockKeyhole size={24} /><h2>Enter Passcode</h2><p>Only we know this little place.</p></div>
    <div className={`passcode-dots ${error ? 'shake' : ''}`} aria-label={`${digits.length} of 4 digits entered`}>
      {Array.from({ length: 4 }, (_, i) => <span key={i} className={i < digits.length ? 'filled' : ''} />)}
    </div>
    {error && <p className="error-text">Not quite. Try again, love.</p>}
    <div className="keypad">
      {['1','2','3','4','5','6','7','8','9','', '0', 'delete'].map((key, i) =>
        key === '' ? <span key={`empty-${i}`} /> :
        key === 'delete' ? <button className="key key-text" key={key} onClick={erase}><X size={20} /><small>Delete</small></button> :
        <button className="key" key={key} onClick={() => enter(key)}><span>{key}</span></button>
      )}
    </div>
    <p className="passcode-hint">A meaningful four-digit number ♡</p>
  </div>
}

function HomeScreen({ onOpen, found, unlocked }) {
  return <div className="home-screen screen">
    <StatusBar />
    <header className="home-greeting"><span>OUR LITTLE WORLD</span><h1>A little piece<br />of <i>us.</i></h1><p>Made with love, for us to keep.</p></header>
    <div className="app-grid">
      {apps.map(app => {
        const isMystery = app.id === 'mystery'
        return <button className="app-tile" key={app.id} onClick={() => onOpen(app.id)}>
          <span className={`app-icon ${app.tone} ${isMystery && !unlocked ? 'mystery-locked' : ''}`}>
            {app.id === 'gallery' ? <ImageIcon /> : app.id === 'calendar' ? <CalendarDays /> : app.id === 'music' ? <Music2 /> : app.id === 'notes' ? <NotebookPen /> : isMystery && unlocked ? <UnlockKeyhole /> : <Sparkles />}
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

function AppHeader({ title, onBack, subtitle }) {
  return <div className="app-header">
    <button className="back-button" onClick={onBack}><ChevronLeft size={19} /> Home</button>
    <div><h2>{title}</h2>{subtitle && <small>{subtitle}</small>}</div>
    <span className="header-spacer" />
  </div>
}

function GalleryApp({ onBack, onClue, onFullVideo }) {
  const [albumId, setAlbumId] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [showClip, setShowClip] = useState(false)
  const selected = albums.find(a => a.id === albumId)
  return <div className="app-screen screen">
    <StatusBar dark />
    <AppHeader title={photo ? 'Memory' : selected ? selected.title : 'Gallery'} onBack={() => {
      if (showClip) setShowClip(false)
      else if (photo) setPhoto(null)
      else if (selected) setAlbumId(null)
      else onBack()
    }} subtitle="Our memories" />
    {showClip ? <div className="media-view">
      <div className="video-placeholder"><Play size={34} /><p>Our little preview</p><small>Add your preview video at <code>/media/anniversary-preview.mp4</code></small></div>
      <video controls playsInline className="actual-video" src="/media/anniversary-preview.mp4" onError={(e) => { e.currentTarget.style.display = 'none' }} />
      <p className="muted center">This is a placeholder until you add your own video file.</p>
    </div> : photo ? <div className="photo-detail">
      <div className="photo-art large-art"><Sparkles size={36} /><span>{photo.symbol}</span></div>
      <h3>{photo.title}</h3><p>{photo.caption}</p>
      <button className="secondary-button" onClick={() => { onClue('gallery'); setPhoto(null); }}>Keep this memory <Heart size={15} /></button>
    </div> : selected ? <div className="app-content">
      <p className="eyebrow">{selected.date}</p>
      <div className="photo-grid">{selected.photos.map((p, i) => <button key={p.title} className={`photo-card art-${i}`} onClick={() => setPhoto(p)}><span>{p.symbol}</span><small>{p.title}</small></button>)}</div>
      {selected.id === 'firsts' && <button className="text-link" onClick={() => { onClue('gallery'); }}>I found a little clue <ChevronRight size={15} /></button>}
    </div> : <div className="app-content">
      <div className="section-intro"><h3>Little moments,<br /><i>kept forever.</i></h3><p>Every picture holds a piece of us.</p></div>
      {albums.map((album, i) => <button className="album-row" key={album.id} onClick={() => setAlbumId(album.id)}>
        <div className={`album-cover art-${i}`}><span>{i === 0 ? '♡' : '✦'}</span></div>
        <span className="album-meta"><b>{album.title}</b><small>{album.photos.length} memories · {album.date}</small></span><ChevronRight size={18} />
      </button>)}
      <button className="feature-video" onClick={() => setShowClip(true)}><span className="play-circle"><Play size={16} fill="currentColor" /></span><span><b>A little video for you</b><small>Watch our anniversary preview</small></span><ChevronRight size={17} /></button>
    </div>}
  </div>
}

function CalendarApp({ onBack, onClue }) {
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

function MusicApp({ onBack }) {
  const [playing, setPlaying] = useState(null)
  const [expanded, setExpanded] = useState(null)
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title="Music" onBack={onBack} subtitle="Our soundtrack" />
    <div className="app-content">
      <div className="music-hero"><div className="record"><Heart size={30} fill="currentColor" /></div><p className="eyebrow">A PLAYLIST FOR US</p><h3>Our little<br /><i>soundtrack.</i></h3><p>Every song keeps a little story.</p></div>
      <div className="track-list">{tracks.map((track, i) => <div className="track" key={track.title}>
        <button className="track-play" onClick={() => setPlaying(playing === i ? null : i)}>{playing === i ? 'Ⅱ' : <Play size={15} fill="currentColor" />}</button>
        <button className="track-info" onClick={() => setExpanded(expanded === i ? null : i)}><b>{track.title}</b><small>{track.artist}</small>{expanded === i && <em>{track.note}</em>}</button>
        <a className="external-track" href={track.url} target="_blank" rel="noreferrer" aria-label={`Open ${track.title} link`}><ChevronRight size={18} /></a>
        {playing === i && (track.src ? <audio controls autoPlay src={track.src} /> : <span className="muted audio-hint">Add audio file</span>)}
      </div>)}</div>
      <p className="muted small">Add your audio files and official song links in <code>src/data.js</code>.</p>
    </div>
  </div>
}

function NotesApp({ onBack, onClue }) {
  const [active, setActive] = useState(null)
  const note = notes.find(n => n.id === active)
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title={note ? 'Note' : 'Notes'} onBack={() => note ? setActive(null) : onBack()} subtitle="Things we keep" />
    <div className="app-content">
      {note ? <article className="note-detail"><span className="eyebrow">{note.date}</span><h3>{note.title}</h3><p>{note.body}</p>{note.clue && <button className="secondary-button" onClick={() => { onClue('notes'); setActive(null); }}>I found the clue <Sparkles size={15} /></button>}</article> :
        <><div className="section-intro"><h3>Little words,<br /><i>big feelings.</i></h3><p>Things I want us to keep.</p></div>{notes.map(n => <button className="note-row" key={n.id} onClick={() => setActive(n.id)}><span className="note-icon"><NotebookPen size={17} /></span><span><b>{n.title}</b><small>{n.date}</small></span><ChevronRight size={17} /></button>)}</>}
    </div>
  </div>
}

function MysteryApp({ onBack, found, unlocked, onFinalGift }) {
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title={unlocked ? 'A little gift' : 'Mystery'} onBack={onBack} subtitle="Something just for you" />
    <div className="mystery-content">
      <div className={`mystery-emblem ${unlocked ? 'is-open' : ''}`}>{unlocked ? <Heart size={42} fill="currentColor" /> : <LockKeyhole size={38} />}</div>
      <p className="eyebrow">{unlocked ? 'UNLOCKED WITH LOVE' : 'A LITTLE MYSTERY'}</p>
      <h3>{unlocked ? 'For you,<br /><i>my love.</i>' : 'Something is<br /><i>waiting for us.</i>'}</h3>
      <p>{unlocked ? 'You found all the little pieces. Your final gift is ready.' : `Find the three clues hidden in our apps. You have found ${found.length} of 3.`}</p>
      <div className="clue-list">{clueNames.map((name, i) => <div key={name} className={`clue-item ${found.includes(['gallery','calendar','notes'][i]) ? 'complete' : ''}`}><span>{found.includes(['gallery','calendar','notes'][i]) ? <Check size={15} /> : i + 1}</span>{name}<small>{found.includes(['gallery','calendar','notes'][i]) ? 'Found' : 'Not found'}</small></div>)}</div>
      {unlocked && <button className="primary-button" onClick={onFinalGift}>Open your gift <Heart size={16} /></button>}
    </div>
  </div>
}

function FinalGift({ onBack }) {
  return <div className="app-screen screen final-gift">
    <StatusBar dark /><AppHeader title="For Orion" onBack={onBack} subtitle="With all my love" />
    <div className="app-content">
      <div className="gift-top"><Sparkles size={26} /><p className="eyebrow">HAPPY FIRST MONTH</p><h2>One month down,<br /><i>a lifetime to go.</i></h2></div>
      <article className="letter-card"><p>{finalLetter}</p></article>
      <div className="full-video-card"><div className="video-placeholder"><Play size={34} /><p>Our full anniversary film</p><small>Add your full video at <code>/media/anniversary-full.mp4</code></small></div><video controls playsInline preload="metadata" src="/media/anniversary-full.mp4" className="actual-video" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div>
      <p className="muted center">Replace the sample letter and video with your own anniversary gift.</p>
    </div>
  </div>
}

export default function App() {
  const [stage, setStage] = useState('lock')
  const [activeApp, setActiveApp] = useState(null)
  const [found, setFound] = useState(() => {
    try { return JSON.parse(localStorage.getItem('owl-found-clues') || '[]') } catch { return [] }
  })
  const [finalOpen, setFinalOpen] = useState(false)
  const unlocked = found.length >= 3
  useEffect(() => { localStorage.setItem('owl-found-clues', JSON.stringify(found)) }, [found])
  const addClue = (id) => setFound(prev => prev.includes(id) ? prev : [...prev, id])
  const openApp = (id) => { setActiveApp(id); setFinalOpen(false) }
  const backHome = () => { setActiveApp(null); setFinalOpen(false) }
  const appNode = useMemo(() => {
    const props = { onBack: backHome, onClue: addClue }
    if (finalOpen && unlocked) return <FinalGift onBack={() => setFinalOpen(false)} />
    switch (activeApp) {
      case 'gallery': return <GalleryApp {...props} onFullVideo={() => setFinalOpen(true)} />
      case 'calendar': return <CalendarApp {...props} />
      case 'music': return <MusicApp {...props} />
      case 'notes': return <NotesApp {...props} />
      case 'mystery': return <MysteryApp {...props} found={found} unlocked={unlocked} onFinalGift={() => setFinalOpen(true)} />
      default: return null
    }
  }, [activeApp, finalOpen, unlocked, found])
  return <main className="world">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="outside-copy"><span className="outside-mark">✦</span><p>A LITTLE PLACE<br />FOR <i>US.</i></p><small>Aleyna ♡ Orion</small></div>
    <div className="phone-wrap">
      <div className="phone-frame">
        <div className="dynamic-island" />
        <div className="phone-viewport">
          {stage === 'lock' && <LockScreen onUnlock={() => setStage('passcode')} />}
          {stage === 'passcode' && <PasscodeScreen onBack={() => setStage('lock')} onSuccess={() => setStage('home')} />}
          {stage === 'home' && !activeApp && <HomeScreen onOpen={openApp} found={found} unlocked={unlocked} />}
          {stage === 'home' && activeApp && appNode}
        </div>
      </div>
      <div className="phone-caption">OUR LITTLE WORLD <span>♡</span></div>
    </div>
    <div className="side-note"><span>01 / 05</span><p>Every little thing<br />has a story.</p><small>Made with love, by Aleyna.</small></div>
  </main>
}