import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Trophy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import StatusBar from './StatusBar.jsx'

const GAME_TIME = 120
const TARGET_SCORE = 10
const MAX_MISSED = 10

export default function FallingGamePage({ onBack, onClue }) {
  const boardRef = useRef(null)
  const playerRef = useRef(50)
  const itemsRef = useRef([])
  const nextIdRef = useRef(0)
  const lastFrameRef = useRef(0)
  const spawnRef = useRef(0)
  const scoreRef = useRef(0)
  const missedRef = useRef(0)
  const finishedRef = useRef(false)
  const [player, setPlayer] = useState(50)
  const [items, setItems] = useState([])
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [result, setResult] = useState(null)

  const reset = () => {
    playerRef.current = 50
    itemsRef.current = []
    scoreRef.current = 0
    missedRef.current = 0
    finishedRef.current = false
    lastFrameRef.current = 0
    spawnRef.current = 0
    setPlayer(50)
    setItems([])
    setScore(0)
    setMissed(0)
    setTimeLeft(GAME_TIME)
    setResult(null)
  }

  const move = direction => {
    if (finishedRef.current) return
    const next = Math.max(8, Math.min(92, playerRef.current + direction * 9))
    playerRef.current = next
    setPlayer(next)
  }

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        move(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        move(1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  useEffect(() => {
    let frame
    const tick = timestamp => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp
      const delta = Math.min((timestamp - lastFrameRef.current) / 1000, .05)
      lastFrameRef.current = timestamp
      if (!finishedRef.current) {
        spawnRef.current += delta
        if (spawnRef.current >= .7) {
          spawnRef.current = 0
          itemsRef.current = [...itemsRef.current, { id: nextIdRef.current++, x: 8 + Math.random() * 84, y: -8 }]
        }
        const height = boardRef.current?.clientHeight || 280
        const playerY = height - 31
        const nextItems = []
        let nextScore = scoreRef.current
        let nextMissed = missedRef.current
        itemsRef.current.forEach(item => {
          const nextY = item.y + (120 + (item.id % 3) * 20) * delta / height * 100
          const caught = nextY >= 82 && nextY <= 94 && Math.abs(item.x - playerRef.current) < 10
          if (caught) nextScore += 1
          else if (nextY > 100) nextMissed += 1
          else nextItems.push({ ...item, y: nextY })
        })
        scoreRef.current = nextScore
        missedRef.current = nextMissed
        itemsRef.current = nextItems
        setItems(nextItems)
        if (nextScore !== score) setScore(nextScore)
        if (nextMissed !== missed) setMissed(nextMissed)
        if (nextScore >= TARGET_SCORE) {
          finishedRef.current = true
          setResult('won')
          onClue('memory')
        } else if (nextMissed >= MAX_MISSED) {
          finishedRef.current = true
          setResult('lost')
        }
        void playerY
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [missed, onClue, score])

  useEffect(() => {
    if (result) return undefined
    const timer = window.setInterval(() => setTimeLeft(value => {
      if (value > 1) return value - 1
      finishedRef.current = true
      setResult('lost')
      return 0
    }), 1000)
    return () => window.clearInterval(timer)
  }, [result])

  return <div className="app-screen notification-page screen">
    <StatusBar />
    <header className="maze-header"><button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back</button><div><h2>Catch the Little Things</h2><small>Move left and right</small></div><button className="maze-reset" onClick={reset} aria-label="Reset game"><RotateCcw size={15} /></button></header>
    <div className="maze-content falling-content">
      <p className="maze-hint">Catch {TARGET_SCORE} falling stars before time runs out. You can miss {MAX_MISSED}.</p>
      <div className="maze-stats">
        <span>TIME <b className={timeLeft <= 10 ? 'maze-warning' : ''}>{timeLeft}s</b></span>
        <span>MISSED <b>{missed}/{MAX_MISSED}</b></span>
        <span>CAUGHT <b>{score}/{TARGET_SCORE}</b></span>
      </div>
      <div className="falling-board" ref={boardRef} aria-label="Falling objects game">
        {items.map(item => <span className="falling-item" style={{ left: `${item.x}%`, top: `${item.y}%` }} key={item.id}>✦</span>)}
        <span className="catcher" style={{ left: `${player}%` }}>♡</span>
      </div>
      {result && <div className={`maze-result ${result === 'won' ? 'maze-success' : 'maze-failure'}`}><Trophy size={18} /><span>{result === 'won' ? 'You caught enough little things. The second key is yours.' : 'Some little things slipped away. Try again.'}</span><button onClick={reset}>{result === 'won' ? 'Play again' : 'Start again'}</button></div>}
      <div className="falling-controls"><button onClick={() => move(-1)} aria-label="Move left"><ChevronLeft size={21} /></button><span>Move the basket with ← →</span><button onClick={() => move(1)} aria-label="Move right"><ChevronRight size={21} /></button></div>
      
    </div>
  </div>
}
