import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react'
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
  const [page, setPage] = useState(0)
  return <div className="app-screen screen final-gift">
    <StatusBar dark /><AppHeader title="For Orion" onBack={onBack} subtitle="With all my love" />
    <div className="app-content">
      <div className="gift-top"><h2>One month down,<br /><i>a lifetime to go.</i></h2></div>
      <div className="video-container" onContextMenu={event => event.preventDefault()}>
        <video
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          draggable="false"
          playsInline
          preload="metadata"
          src="/videos/fromaley.mp4"
          className="actual-video"
          onContextMenu={event => event.preventDefault()}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
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
