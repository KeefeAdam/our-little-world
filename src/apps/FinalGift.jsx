import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { finalLetter } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

function formatLetterPage(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**')
    return isBold
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <span key={index}>{part}</span>
  })
}

export default function FinalGift({ onBack }) {
  const letterPages = finalLetter.split(/\n{2,}/).filter(Boolean)
  const videos = [
    { src: '/videos/fromaley.mp4', title: 'From a little memory', orientation: 'landscape' },
    { src: '/videos/our-video.mp4', title: 'Another little surprise', orientation: 'portrait' },
  ]
  const [videoIndex, setVideoIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const activeVideo = videos[videoIndex]

  function changeVideo(nextIndex) {
    setVideoIndex((nextIndex + videos.length) % videos.length)
  }

  function handleTouchStart(event) {
    setTouchStart(event.touches[0].clientX)
  }

  function handleTouchEnd(event) {
    if (touchStart === null) return
    const distance = event.changedTouches[0].clientX - touchStart
    if (Math.abs(distance) > 40) changeVideo(videoIndex + (distance < 0 ? 1 : -1))
    setTouchStart(null)
  }

  return <div className="app-screen screen final-gift">
    <StatusBar dark /><AppHeader title="For Orion" onBack={onBack} subtitle="With all my love" />
    <div className="app-content">
      <div className="gift-top"><h2>One month down,<br /><i>a lifetime to go.</i></h2></div>
      <div
        className="video-container"
        onContextMenu={event => event.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <video
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          draggable="false"
          playsInline
          preload="metadata"
          key={activeVideo.src}
          src={activeVideo.src}
          className={`actual-video ${activeVideo.orientation === 'portrait' ? 'portrait-video' : ''}`}
          onContextMenu={event => event.preventDefault()}
          onError={(event) => { event.currentTarget.style.display = 'none' }}
        />
        <div className="video-carousel-controls">
          <button
            type="button"
            className="video-nav-button"
            onClick={() => changeVideo(videoIndex - 1)}
            aria-label="Previous video"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="video-carousel-meta">
            <span>{videoIndex + 1} / {videos.length}</span>
            <small>{activeVideo.title}</small>
          </div>
          <button
            type="button"
            className="video-nav-button"
            onClick={() => changeVideo(videoIndex + 1)}
            aria-label="Next video"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <article className="letter-card">
        <div className="letter-page">
          <span className="letter-page-number">PAGE {page + 1} / {letterPages.length}</span>
          <p>{formatLetterPage(letterPages[page])}</p>
        </div>
        <div className="letter-navigation">
          <button type="button" className="letter-nav-button" onClick={() => setPage(current => current - 1)} disabled={page === 0} aria-label="Previous letter page">
            <ChevronLeft size={16} /> Previous
          </button>
          <button type="button" className="letter-nav-button" onClick={() => setPage(current => current + 1)} disabled={page === letterPages.length - 1} aria-label="Next letter page">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </article>
    </div>
  </div>
}
