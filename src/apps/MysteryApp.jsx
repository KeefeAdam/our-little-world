import { Check, Heart, LockKeyhole, Sparkles } from 'lucide-react'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

const clueNames = ['Gallery', 'Calendar', 'Notes']
const clueIds = ['gallery', 'calendar', 'notes']

export default function MysteryApp({ onBack, found, unlocked, onFinalGift }) {
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title={unlocked ? 'A little gift' : 'Mystery'} onBack={onBack} subtitle="Something just for you" />
    <div className="mystery-content">
      <div className={`mystery-emblem ${unlocked ? 'is-open' : ''}`}>{unlocked ? <Heart size={42} fill="currentColor" /> : <LockKeyhole size={38} />}</div>
      <p className="eyebrow">{unlocked ? 'UNLOCKED WITH LOVE' : 'A LITTLE MYSTERY'}</p>
      <h3>{unlocked ? 'For you,<br /><i>my love.</i>' : 'Something is<br /><i>waiting for us.</i>'}</h3>
      <p>{unlocked ? 'You found all the little pieces. Your final gift is ready.' : `Find the three clues hidden in our apps. You have found ${found.length} of 3.`}</p>
      <div className="clue-list">{clueNames.map((name, i) => <div key={name} className={`clue-item ${found.includes(clueIds[i]) ? 'complete' : ''}`}><span>{found.includes(clueIds[i]) ? <Check size={15} /> : i + 1}</span>{name}<small>{found.includes(clueIds[i]) ? 'Found' : 'Not found'}</small></div>)}</div>
      {unlocked && <button className="primary-button" onClick={onFinalGift}>Open your gift <Heart size={16} /></button>}
    </div>
  </div>
}
