import { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, ListMusic, Play } from 'lucide-react'
import { playlists } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function MusicApp({ onBack }) {
  const [playing, setPlaying] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title="Music" onBack={onBack} subtitle="Our soundtrack" />
    <div className="app-content">
      <div className="music-hero"><div className="record"><Heart size={10} fill="currentColor" /></div><p className="eyebrow">A PLAYLIST FOR US</p><h3>Our little<br /><i>soundtrack.</i></h3><p>Every song keeps a little story.</p></div>
      {selectedPlaylist ? <>
        <button className="playlist-back" onClick={() => setSelectedPlaylist(null)}><ChevronLeft size={16} /> All playlists</button>
        <div className="playlist-heading"><h4>{selectedPlaylist.title}</h4><p>{selectedPlaylist.description}</p></div>
        <div className="track-list">{selectedPlaylist.tracks.map((track, i) => {
          const trackId = `${selectedPlaylist.id}:${i}`
          return <div className="track" key={trackId}>
            <button className="track-play" onClick={() => setPlaying(playing === trackId ? null : trackId)} aria-label={`${playing === trackId ? 'Pause' : 'Play'} ${track.title}`}>{playing === trackId ? 'Ⅱ' : <Play size={15} fill="currentColor" />}</button>
            <button className="track-info" onClick={() => setExpanded(expanded === trackId ? null : trackId)}><b>{track.title}</b><small>{track.artist}</small>{expanded === trackId && <em>{track.note}</em>}</button>
            {track.url && <a className="external-track" href={track.url} target="_blank" rel="noreferrer" aria-label={`Open ${track.title} link`}><ChevronRight size={18} /></a>}
            {playing === trackId && (track.src ? <audio controls autoPlay src={track.src} /> : <span className="muted audio-hint">Add audio file</span>)}
          </div>
        })}</div>
        <p className="muted small">Add your audio files and official song links in <code>src/data.js</code>.</p>
      </> : <>
        <div className="playlist-list">{playlists.map(playlist => <button className="playlist-card" key={playlist.id} onClick={() => setSelectedPlaylist(playlist)}>
          <span className="playlist-icon"><ListMusic size={20} /></span>
          <span className="playlist-info"><b>{playlist.title}</b><small>{playlist.description}</small><small>{playlist.tracks.length} {playlist.tracks.length === 1 ? 'song' : 'songs'}</small></span>
          <ChevronRight className="playlist-chevron" size={18} />
        </button>)}</div>
        <p className="muted small">Add or edit playlists and songs in <code>src/data.js</code>.</p>
      </>}
    </div>
  </div>
}
