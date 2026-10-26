import { useState } from 'react'
import { ChevronRight, NotebookPen, Sparkles } from 'lucide-react'
import { notes } from '../data.js'
import AppHeader from '../components/AppHeader.jsx'
import StatusBar from '../components/StatusBar.jsx'

export default function NotesApp({ onBack, onClue }) {
  const [active, setActive] = useState(null)
  const note = notes.find(n => n.id === active)
  return <div className="app-screen screen">
    <StatusBar dark /><AppHeader title={note ? 'Note' : 'Notes'} onBack={() => note ? setActive(null) : onBack()} subtitle="Things we keep" />
    <div className="app-content">
      {note ? <article className="note-detail"><span className="eyebrow">{note.date}</span><h3>{note.title}</h3><p>{note.body}</p>{note.clue && <button className="secondary-button" onClick={() => { onClue('notes'); setActive(null); }}>I found the clue <Sparkles size={15} /></button>}</article> :
        <><div className="section-intro"><h3>Little words,<br /><i>big feelings.</i></h3><p>Things I want us to keep.</p></div>{notes.map(n => <button className="note-row" key={n.id} onClick={() => setActive(n.id)}><span className="note-icon"><NotebookPen size={17} /></span><span><b>{n.title}</b><small>{n.date}</small></span><ChevronRight size={17} /></button>)}</>}
    </div>
  </div>
}
