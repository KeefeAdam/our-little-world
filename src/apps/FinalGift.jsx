import { Play, Sparkles } from 'lucide-react'
import { finalLetter } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function FinalGift({ onBack }) {
  return <div className="app-screen screen final-gift">
    <StatusBar dark /><AppHeader title="For Orion" onBack={onBack} subtitle="With all my love" />
    <div className="app-content">
      <div className="gift-top"><Sparkles size={26} /><p className="eyebrow">HAPPY FIRST MONTH</p><h2>One month down,<br /><i>a lifetime to go.</i></h2></div>
      <div onContextMenu={event => event.preventDefault()}>
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
      <article className="letter-card"><p>{finalLetter}</p></article>
    </div>
  </div>
}
