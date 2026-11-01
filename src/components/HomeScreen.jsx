import {
  Bell, CalendarDays, Image as ImageIcon, LockKeyhole, MessageCircle, Music2, NotebookPen, X,
  Sparkles
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { apps, MYSTERY_PASSWORD } from '../data.js'
import StatusBar from './StatusBar.jsx'

export default function HomeScreen({ onOpen, onOpenNotification, found, unlocked }) {
  const appsLocked = !unlocked
  const [notificationVisible, setNotificationVisible] = useState(true)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const passwordInputRef = useRef(null)
  useEffect(() => {
    if (passwordOpen) passwordInputRef.current?.focus()
  }, [passwordOpen])
  const closePassword = () => {
    setPasswordOpen(false)
    setPassword('')
    setPasswordError(false)
  }
  const submitPassword = (event) => {
    event.preventDefault()
    if (password === MYSTERY_PASSWORD) {
      closePassword()
      onOpen('mystery-gift')
      return
    }
    setPassword('')
    setPasswordError(true)
  }
  return <div className="home-screen screen">
    <StatusBar />
    {notificationVisible ? <div className="home-notification">
      <button className="home-notification-main" onClick={onOpenNotification}>
        <span className="home-notification-icon"><Bell size={16} /></span>
        <span><b>{unlocked ? 'Everything is unlocked' : 'A new message for you'}</b><small>{unlocked ? 'You found all three keys. Enjoy our little world.' : 'There is something waiting to be opened.'}</small></span>
        <em>now</em>
      </button>
      <button className="home-notification-close" onClick={() => setNotificationVisible(false)} aria-label="Hide notification"><X size={14} /></button>
    </div> : <button className="home-notification-fab" onClick={() => setNotificationVisible(true)} aria-label="Show notification"><Bell size={17} /></button>}
    <header className="home-greeting"><span>OUR LITTLE WORLD</span><h1>A little piece<br />of <i>us.</i></h1><p>Made with love, for us to keep.</p></header>
    <div className="app-grid">
      {apps.map(app => {
        const isMystery = app.id === 'mystery'
        return <button className="app-tile" key={app.id} disabled={isMystery ? !unlocked : appsLocked} onClick={() => isMystery ? setPasswordOpen(true) : onOpen(app.id)}>
          <span className={`app-icon ${app.tone} ${isMystery ? 'mystery-locked' : ''}`}>
            {app.id === 'gallery' ? <ImageIcon /> : app.id === 'calendar' ? <CalendarDays /> : app.id === 'music' ? <Music2 /> : app.id === 'notes' ? <NotebookPen /> : app.id === 'messenger' ? <MessageCircle /> : <LockKeyhole />}
            {app.id === 'calendar' && <b>31</b>}
          </span>
          <span className="app-label">{app.label}</span>
          {(!isMystery && appsLocked) && <span className="app-lock"><LockKeyhole size={10} /></span>}
        </button>
      })}
    </div>
    <div className="dock">
      <button disabled={appsLocked} onClick={() => onOpen('gallery')} aria-label="Gallery"><ImageIcon /></button>
      <button disabled={appsLocked} onClick={() => onOpen('music')} aria-label="Music"><Music2 /></button>
      <button disabled={appsLocked} onClick={() => onOpen('notes')} aria-label="Notes"><NotebookPen /></button>
    </div>
    {passwordOpen && <div className="mystery-password-backdrop" role="presentation" onMouseDown={closePassword}>
      <form className="mystery-password-modal" onSubmit={submitPassword} onMouseDown={event => event.stopPropagation()}>
        <button type="button" className="mystery-password-close" onClick={closePassword} aria-label="Close">×</button>
        <LockKeyhole size={25} />
        <span className="eyebrow">MYSTERY UNLOCKED</span>
        <h2>A little secret<br /><i>for you.</i></h2>
        <p>Enter the password to open your letter and video.</p>
        <input ref={passwordInputRef} type="password" value={password} onChange={event => { setPassword(event.target.value); setPasswordError(false) }} placeholder="Type the password" autoComplete="off" aria-label="Mystery password" />
        {passwordError && <small className="mystery-password-error">That password isn't quite right.</small>}
        <button className="primary-button" type="submit">Open Mystery <Sparkles size={15} /></button>
      </form>
    </div>}
  </div>
}
