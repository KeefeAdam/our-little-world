import { Play, Sparkles } from 'lucide-react'
import { finalLetter } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function FinalGift({ onBack }) {
  return <div className="app-screen screen final-gift">
    <StatusBar dark /><AppHeader title="For Orion" onBack={onBack} subtitle="With all my love" />
    <div className="app-content">
      <div className="gift-top"><Sparkles size={26} /><p className="eyebrow">HAPPY FIRST MONTH</p><h2>One month down,<br /><i>a lifetime to go.</i></h2></div>
      <article className="letter-card"><p>{finalLetter}</p></article>
      <div className="full-video-card"><div className="video-placeholder"><Play size={34} /><p>Our full anniversary film</p><small>Add your full video at <code>/media/anniversary-full.mp4</code></small></div><video controls playsInline preload="metadata" src="/media/anniversary-full.mp4" className="actual-video" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div>
      <p className="muted center">Replace the sample letter and video with your own anniversary gift.</p>
    </div>
  </div>
}
