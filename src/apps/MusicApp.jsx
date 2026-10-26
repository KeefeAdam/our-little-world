import { useState } from 'react'
import { ChevronRight, Heart, Play } from 'lucide-react'
import { tracks } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function MusicApp({ onBack }) {
  const [playing, setPlaying] = useState(null)
  const [expanded, setExpanded] = useState(null)
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title="Music" onBack={onBack} subtitle="Our soundtrack" />
    <div className="app-content">
      <div className="music-hero"><div className="record"><Heart size={10} fill="currentColor" /></div><p className="eyebrow">A PLAYLIST FOR US</p><h3>Our little<br /><i>soundtrack.</i></h3><p>Every song keeps a little story.</p></div>
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
