import { useState } from 'react'
import { ChevronRight, Heart, Play, Sparkles } from 'lucide-react'
import { albums } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function GalleryApp({ onBack, onClue }) {
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
      <div className="photo-art large-art">
        {photo.src ? <img src={photo.src} alt={photo.title} /> : <Sparkles size={36} />}
        <span>{photo.symbol}</span>
      </div>
      <h3>{photo.title}</h3><p>{photo.caption}</p>
      <button className="secondary-button" onClick={() => { onClue('gallery'); setPhoto(null); }}>Keep this memory <Heart size={15} /></button>
    </div> : selected ? <div className="app-content">
      <p className="eyebrow">{selected.date}</p>
      <div className="photo-grid">{selected.photos.map((p, i) => <button key={p.title} className={`photo-card art-${i}`} onClick={() => setPhoto(p)}>
        {p.src && <img src={p.src} alt="" />}
        <span>{p.symbol}</span><small>{p.title}</small>
      </button>)}</div>
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
