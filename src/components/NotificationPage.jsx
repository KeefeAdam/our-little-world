import { ArrowLeft, Check, ChevronRight, LockKeyhole, Sparkles } from 'lucide-react'
import StatusBar from './StatusBar.jsx'

const keys = [
  { id: 'maze', title: 'The first key', description: 'Find your way through the little maze.' },
  { id: 'memory', title: 'The second key', description: 'A new little challenge is waiting.' },
  { id: 'heart', title: 'The third key', description: 'One last game before everything opens.' },
]

export default function NotificationPage({ onBack, onOpenGame, found }) {
  return <div className="app-screen notification-page screen">
    <StatusBar />
    <header className="app-header"><button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back</button><div><h2>Notifications</h2><small>Three little keys for us</small></div><span className="header-spacer" /></header>
    <div className="app-content">
      <section className="section-intro"><span className="eyebrow">A little surprise</span><h3>Unlock our<br /><i>little world.</i></h3><p>Collect all three keys first. Every key is hidden inside a small game made just for you.</p></section>
      <div className="key-progress"><Sparkles size={16} /><span><b>{keys.filter(key => found.includes(key.id)).length}/3 keys found</b><small>{keys.every(key => found.includes(key.id)) ? 'Everything is ready to open.' : 'Keep going, you are doing beautifully.'}</small></span></div>
      <div className="key-list">{keys.map((key, index) => {
        const complete = found.includes(key.id)
        const available = key.id === 'maze' || (key.id === 'memory' && found.includes('maze')) || (key.id === 'heart' && found.includes('memory'))
        return <button className={`key-item ${complete ? 'complete' : ''}`} key={key.id} disabled={!available} onClick={() => onOpenGame(key.id)}>
          <span className="key-number">{complete ? <Check size={15} /> : available ? index + 1 : <LockKeyhole size={14} />}</span>
          <span><b>{key.title}</b><small>{complete ? 'Completed' : key.description}</small></span>
          {available && <ChevronRight size={17} />}
        </button>
      })}</div>
    </div>
  </div>
}
