import { useEffect, useMemo, useState } from 'react'
import FinalGift from './apps/FinalGift.jsx'
import CalendarApp from './apps/CalendarApp.jsx'
import GalleryApp from './apps/GalleryApp.jsx'
import MusicApp from './apps/MusicApp.jsx'
import MysteryApp from './apps/MysteryApp.jsx'
import NotesApp from './apps/NotesApp.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import LockScreen from './components/LockScreen.jsx'
import MessengerApp from './components/MessengerApp.jsx'
import PasscodeScreen from './components/PasscodeScreen.jsx'

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
      case 'messenger': return <MessengerApp onBack={backHome} />
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
