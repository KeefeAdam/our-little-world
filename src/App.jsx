import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, SkipForward } from 'lucide-react'
import FinalGift from './apps/FinalGift.jsx'
import CalendarApp from './apps/CalendarApp.jsx'
import GalleryApp from './apps/GalleryApp.jsx'
import MusicApp from './apps/MusicApp.jsx'
import MysteryApp from './apps/MysteryApp.jsx'
import NotesApp from './apps/NotesApp.jsx'
import { playlists } from './data.js'
import HomeScreen from './components/HomeScreen.jsx'
import LockScreen from './components/LockScreen.jsx'
import MessengerApp from './components/MessengerApp.jsx'
import PasscodeScreen from './components/PasscodeScreen.jsx'

const audioTracks = playlists.flatMap(playlist =>
  playlist.tracks
    .map((track, index) => ({
      ...track,
      id: `${playlist.id}:${index}`,
    }))
    .filter(track => track.src),
)

export default function App() {
  const [stage, setStage] = useState('lock')
  const [activeApp, setActiveApp] = useState(null)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [musicFocusTrackId, setMusicFocusTrackId] = useState(null)
  const [musicFocusRequest, setMusicFocusRequest] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackError, setPlaybackError] = useState('')
  const audioRef = useRef(null)
  const [found, setFound] = useState(() => {
    try { return JSON.parse(localStorage.getItem('owl-found-clues') || '[]') } catch { return [] }
  })
  const [finalOpen, setFinalOpen] = useState(false)
  const unlocked = found.length >= 3
  useEffect(() => { localStorage.setItem('owl-found-clues', JSON.stringify(found)) }, [found])
  const currentTrack = audioTracks.find(track => track.id === currentTrackId) || null
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
        setPlaybackError('Unable to play this audio file.')
      })
    } else {
      audio.pause()
    }
  }, [currentTrack, isPlaying])
  const toggleTrack = useCallback((trackId) => {
    if (!audioTracks.some(track => track.id === trackId)) return
    setPlaybackError('')
    if (trackId === currentTrackId) setIsPlaying(playing => !playing)
    else {
      setCurrentTrackId(trackId)
      setIsPlaying(true)
    }
  }, [currentTrackId])
  const playNextTrack = useCallback(() => {
    if (!audioTracks.length) return
    const currentIndex = audioTracks.findIndex(track => track.id === currentTrackId)
    const nextTrack = audioTracks[(currentIndex + 1) % audioTracks.length]
    setPlaybackError('')
    setCurrentTrackId(nextTrack.id)
    setIsPlaying(true)
  }, [currentTrackId])
  const openMusicTrack = useCallback(() => {
    if (!currentTrackId) return
    setActiveApp('music')
    setFinalOpen(false)
    setMusicFocusTrackId(currentTrackId)
    setMusicFocusRequest(request => request + 1)
  }, [currentTrackId])
  const addClue = (id) => setFound(prev => prev.includes(id) ? prev : [...prev, id])
  const openApp = (id) => { setActiveApp(id); setFinalOpen(false) }
  const backHome = () => { setActiveApp(null); setFinalOpen(false) }
  const appNode = useMemo(() => {
    const props = { onBack: backHome, onClue: addClue }
    if (finalOpen && unlocked) return <FinalGift onBack={() => setFinalOpen(false)} />
    switch (activeApp) {
      case 'gallery': return <GalleryApp {...props} onFullVideo={() => setFinalOpen(true)} />
      case 'calendar': return <CalendarApp {...props} />
      case 'music': return <MusicApp {...props} currentTrackId={currentTrackId} focusTrackId={musicFocusTrackId} focusRequest={musicFocusRequest} isPlaying={isPlaying} onToggleTrack={toggleTrack} />
      case 'notes': return <NotesApp {...props} />
      case 'messenger': return <MessengerApp onBack={backHome} />
      case 'mystery': return <MysteryApp {...props} found={found} unlocked={unlocked} onFinalGift={() => setFinalOpen(true)} />
      default: return null
    }
  }, [activeApp, finalOpen, unlocked, found, currentTrackId, musicFocusTrackId, musicFocusRequest, isPlaying, toggleTrack])
  return <main className="world">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="outside-copy"><span className="outside-mark">✦</span><p>A LITTLE PLACE<br />FOR <i>US.</i></p><small>Aleyna ♡ Orion</small></div>
    <div className="phone-wrap">
      <div className="phone-frame">
        <div className={`dynamic-island ${currentTrack ? 'dynamic-island-hidden' : ''}`} />
        <div className="phone-viewport">
          {stage === 'lock' && <LockScreen onUnlock={() => setStage('passcode')} />}
          {stage === 'passcode' && <PasscodeScreen onBack={() => setStage('lock')} onSuccess={() => setStage('home')} />}
          {stage === 'home' && !activeApp && <HomeScreen onOpen={openApp} found={found} unlocked={unlocked} />}
          {stage === 'home' && activeApp && appNode}
          {currentTrack && <div className="music-player">
            <button className="music-player-title" onClick={openMusicTrack} title={`Open ${currentTrack.title} in Music`} aria-label={`Open ${currentTrack.title} in Music`}>{currentTrack.title}</button>
            <button className="music-player-button" onClick={() => setIsPlaying(playing => !playing)} aria-label={isPlaying ? 'Pause music' : 'Play music'} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
            </button>
            <button className="music-player-button" onClick={playNextTrack} disabled={audioTracks.length < 2} aria-label="Play next song" title={audioTracks.length < 2 ? 'Add another audio file to enable next' : 'Next'}>
              <SkipForward size={17} fill="currentColor" />
            </button>
          </div>}
          {currentTrack && <audio
            ref={audioRef}
            className="global-audio"
            src={currentTrack.src}
            onEnded={playNextTrack}
            onError={() => {
              setIsPlaying(false)
              setPlaybackError('Unable to load this audio file.')
            }}
          />}
        </div>
      </div>
      <div className="phone-caption">OUR LITTLE WORLD <span>♡</span></div>
    </div>
    <div className="side-note"><span>01 / 05</span><p>Every little thing<br />has a story.</p><small>Made with love, by Aleyna.</small></div>
  </main>
}
