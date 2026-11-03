import { useEffect, useState } from 'react'
import { BatteryFull, Signal } from 'lucide-react'

export default function StatusBar({ dark = false }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

  return <div className={`status-bar ${dark ? 'status-dark' : ''}`}>
    <span>{time}</span>
    <div className="status-icons"><Signal size={14} /><span className="wifi">⌁</span><BatteryFull size={17} /></div>
  </div>
}
