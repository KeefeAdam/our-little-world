import { BatteryFull, Signal } from 'lucide-react'

export default function StatusBar({ dark = false }) {
  return <div className={`status-bar ${dark ? 'status-dark' : ''}`}>
    <span>9:41</span>
    <div className="status-icons"><Signal size={14} /><span className="wifi">⌁</span><BatteryFull size={17} /></div>
  </div>
}
