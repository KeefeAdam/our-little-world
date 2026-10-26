import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, ListMusic, Pause, Play } from 'lucide-react'
import { playlists } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function MusicApp({ onBack, currentTrackId, focusTrackId, focusRequest, isPlaying, onToggleTrack }) {
  const [expanded, setExpanded] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const focusedTrackRef = useRef(null)
  const trackListRef = useRef(null)
  useEffect(() => {
    if (!focusTrackId) return
    const playlist = playlists.find(item => item.tracks.some((_, i) => `${item.id}:${i}` === focusTrackId))
    if (playlist) setSelectedPlaylist(playlist)
  }, [focusTrackId, focusRequest])
  useEffect(() => {
    const trackList = trackListRef.current
    const focusedTrack = focusedTrackRef.current
    if (!trackList || !focusedTrack) return
    const trackTop = focusedTrack.getBoundingClientRect().top - trackList.getBoundingClientRect().top + trackList.scrollTop
    trackList.scrollTo({
      top: Math.max(0, trackTop - (trackList.clientHeight - focusedTrack.clientHeight) / 2),
      behavior: 'smooth',
    })
  }, [focusTrackId, focusRequest, selectedPlaylist])
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title="Music" onBack={onBack} subtitle="Our soundtrack" />
    <div className="app-content">
      <div className="music-hero"><div className="record"><Heart size={10} fill="currentColor" /></div><p className="eyebrow">A PLAYLIST FOR US</p><h3>Our little<br /><i>soundtrack.</i></h3><p>Every song keeps a little story.</p></div>
      {selectedPlaylist ? <>
        <button className="playlist-back" onClick={() => setSelectedPlaylist(null)}><ChevronLeft size={16} /> All playlists</button>
        <div className="playlist-heading"><h4>{selectedPlaylist.title}</h4><p>{selectedPlaylist.description}</p></div>
        <div className="track-list" ref={trackListRef}>{selectedPlaylist.tracks.map((track, i) => {
          const trackId = `${selectedPlaylist.id}:${i}`
          const isCurrentTrack = currentTrackId === trackId
          return <div className={`track ${trackId === focusTrackId ? 'track-focused' : ''}`} key={trackId} ref={trackId === focusTrackId ? focusedTrackRef : null}>
            <button className="track-play" onClick={() => onToggleTrack(trackId)} disabled={!track.src} aria-label={`${isCurrentTrack && isPlaying ? 'Pause' : 'Play'} ${track.title}`}>{isCurrentTrack && isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button>
            <button className="track-info" onClick={() => setExpanded(expanded === trackId ? null : trackId)}><b>{track.title}</b><small>{track.artist}</small>{expanded === trackId && <em>{track.note}</em>}</button>
            {track.url && <a className="external-track" href={track.url} target="_blank" rel="noreferrer" aria-label={`Open ${track.title} link`}><ChevronRight size={18} /></a>}
            {!track.src && <span className="muted audio-hint">Add audio file</span>}
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
