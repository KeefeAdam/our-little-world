import { useState } from 'react'
import { ChevronLeft, LockKeyhole, X } from 'lucide-react'
import { DEMO_PASSCODE } from '../data.js'
import StatusBar from './StatusBar.jsx'

export default function PasscodeScreen({ onSuccess, onBack }) {
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)
  const enter = (digit) => {
    setError(false)
    const next = digits + digit
    if (next.length < 4) return setDigits(next)
    if (next === DEMO_PASSCODE) {
      setDigits(next)
      setTimeout(onSuccess, 220)
    } else {
      setError(true)
      setTimeout(() => { setDigits(''); setError(false) }, 650)
    }
  }
  const erase = () => { setDigits(v => v.slice(0, -1)); setError(false) }
  return <div className="passcode-screen screen">
    <StatusBar />
    <button className="top-back" onClick={onBack}><ChevronLeft size={20} /> Back</button>
    <div className="passcode-heading"><LockKeyhole size={24} /><h2>Enter Passcode</h2><p>Only we know this little place.</p></div>
    <div className={`passcode-dots ${error ? 'shake' : ''}`} aria-label={`${digits.length} of 4 digits entered`}>
      {Array.from({ length: 4 }, (_, i) => <span key={i} className={i < digits.length ? 'filled' : ''} />)}
    </div>
    {error && <p className="error-text">Not quite. Try again, love.</p>}
    <div className="keypad">
      {['1','2','3','4','5','6','7','8','9','', '0', 'delete'].map((key, i) =>
        key === '' ? <span key={`empty-${i}`} /> :
        key === 'delete' ? <button className="key key-text" key={key} onClick={erase}><X size={20} /><small>Delete</small></button> :
        <button className="key" key={key} onClick={() => enter(key)}><span>{key}</span></button>
      )}
    </div>
    <p className="passcode-hint">A meaningful four-digit number ♡</p>
  </div>
}
