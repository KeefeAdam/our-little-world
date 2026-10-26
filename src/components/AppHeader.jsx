import { ChevronLeft } from 'lucide-react'

export default function AppHeader({ title, onBack, subtitle }) {
  return <div className="app-header">
    <button className="back-button" onClick={onBack}><ChevronLeft size={19} /> Home</button>
    <div><h2>{title}</h2>{subtitle && <small>{subtitle}</small>}</div>
    <span className="header-spacer" />
  </div>
}
