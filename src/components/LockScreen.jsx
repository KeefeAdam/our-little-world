import { useEffect, useState } from 'react'
import { Heart, Image as ImageIcon } from 'lucide-react'
import StatusBar from './StatusBar.jsx'

const todayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

export default function LockScreen({ onUnlock }) {
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
