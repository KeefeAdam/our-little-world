import { ArrowLeft, Check, RotateCcw, Trophy, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import StatusBar from './StatusBar.jsx'

const PAIRS = [
  { id: 'moon', question: 'The one that lights our quiet nights', answer: 'Moon' },
  { id: 'home', question: 'The place that feels like us', answer: 'Home' },
  { id: 'song', question: 'Something that keeps our memories moving', answer: 'Song' },
  { id: 'love', question: 'The little thing that started it all', answer: 'Love' },
]
const TIME_LIMIT = 60
const MAX_WRONG_ATTEMPTS = 2

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
  }
  return result
}

export default function MatchingGamePage({ onBack, onClue }) {
  const boardRef = useRef(null)
  const answerRefs = useRef({})
  const questionRefs = useRef({})
  const questions = useRef(shuffle(PAIRS)).current
  const answers = useRef(shuffle(PAIRS)).current
  const [connections, setConnections] = useState([])
  const [drag, setDrag] = useState(null)
  const [cursor, setCursor] = useState(null)
  const [message, setMessage] = useState('')
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [timedOut, setTimedOut] = useState(false)
  const [failed, setFailed] = useState(false)
  const complete = connections.length === PAIRS.length

  const pointFor = (element, side) => {
    const board = boardRef.current?.getBoundingClientRect()
    const box = element?.getBoundingClientRect()
    if (!board || !box) return null
    return {
      x: (side === 'question' ? box.right : box.left) - board.left,
      y: box.top + box.height / 2 - board.top,
    }
  }

  const startDrag = (event, id) => {
    if (complete || timedOut || failed || connections.some(connection => connection.questionId === id)) return
    event.preventDefault()
    const point = pointFor(questionRefs.current[id], 'question')
    setDrag({ id, start: point })
    setCursor(point)
    setMessage('')
  }

  const moveDrag = event => {
    if (!drag || !boardRef.current) return
    const board = boardRef.current.getBoundingClientRect()
    setCursor({ x: event.clientX - board.left, y: event.clientY - board.top })
  }

  const finishDrag = (event, answerId) => {
    if (!drag) return
    event.preventDefault()
    const isCorrect = drag.id === answerId
    if (isCorrect) {
      setConnections(current => [...current, { questionId: drag.id, answerId }])
      setMessage('That one fits perfectly.')
    } else {
      const nextWrongAttempts = wrongAttempts + 1
      setWrongAttempts(nextWrongAttempts)
      if (nextWrongAttempts > MAX_WRONG_ATTEMPTS) {
        setFailed(true)
        setTimedOut(true)
        setMessage('Too many wrong answers. Restart the matching game.')
      } else {
        setMessage(`Not quite — try another answer. ${MAX_WRONG_ATTEMPTS - nextWrongAttempts + 1} tries left.`)
      }
    }
    setDrag(null)
    setCursor(null)
  }

  const reset = () => {
    setConnections([])
    setDrag(null)
    setCursor(null)
    setMessage('')
    setWrongAttempts(0)
    setTimeLeft(TIME_LIMIT)
    setTimedOut(false)
    setFailed(false)
  }

  useEffect(() => {
    if (complete || timedOut || failed) return undefined
    const timer = window.setInterval(() => {
      setTimeLeft(value => {
        if (value > 1) return value - 1
        setTimedOut(true)
        setDrag(null)
        setCursor(null)
        setMessage('Time is up. Start the matching again.')
        return 0
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [complete, timedOut])

  useEffect(() => {
    if (complete) onClue('heart')
  }, [complete, onClue])

  useEffect(() => {
    const stopDrag = () => {
      if (drag) {
        setDrag(null)
        setCursor(null)
      }
    }
    window.addEventListener('pointerup', stopDrag)
    return () => window.removeEventListener('pointerup', stopDrag)
  }, [drag])

  return <div className="app-screen notification-page screen">
    <StatusBar />
    <header className="maze-header"><button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back</button><div><h2>Little Connections</h2><small>Match what belongs together</small></div><button className="maze-reset" onClick={reset} aria-label="Reset game"><RotateCcw size={15} /></button></header>
    <div className="maze-content matching-content">
      <div className="matching-intro"><span>Draw a line from each question to its answer.</span><b className={timeLeft <= 10 ? 'maze-warning' : ''}>{timeLeft}s · {connections.length}/{PAIRS.length}</b></div>
      <div className="matching-board" ref={boardRef} onPointerMove={moveDrag} onPointerUp={event => { if (drag && event.target === event.currentTarget) { setDrag(null); setCursor(null) } }}>
        <svg className="matching-lines" aria-hidden="true">
          {connections.map(connection => {
            const start = pointFor(questionRefs.current[connection.questionId], 'question')
            const end = pointFor(answerRefs.current[connection.answerId], 'answer')
            return start && end ? <line key={connection.questionId} x1={start.x} y1={start.y} x2={end.x} y2={end.y} /> : null
          })}
          {drag && cursor && <line className="matching-drag-line" x1={drag.start.x} y1={drag.start.y} x2={cursor.x} y2={cursor.y} />}
        </svg>
        <div className="matching-column matching-questions">{questions.map(pair => {
          const connected = connections.some(connection => connection.questionId === pair.id)
          return <button className={`matching-card ${connected ? 'connected' : ''}`} key={pair.id} ref={element => { questionRefs.current[pair.id] = element }} onPointerDown={event => startDrag(event, pair.id)}><span>{pair.question}</span><i>{connected ? <Check size={14} /> : <span className="matching-dot" />}</i></button>
        })}</div>
        <div className="matching-column matching-answers">{answers.map(pair => {
          const connected = connections.some(connection => connection.answerId === pair.id)
          return <button className={`matching-card ${connected ? 'connected' : ''}`} key={pair.id} ref={element => { answerRefs.current[pair.id] = element }} onPointerUp={event => finishDrag(event, pair.id)}><span className="matching-dot">{connected ? <Check size={14} /> : null}</span>{pair.answer}</button>
        })}</div>
      </div>
      {message && <p className={`matching-message ${message.startsWith('That') ? 'is-correct' : 'is-wrong'}`}>{message.startsWith('That') ? <Check size={14} /> : <X size={14} />}{message}</p>}
      {complete && <div className="maze-result maze-success"><Trophy size={18} /><span>Every connection is right. You found the final key.</span></div>}
      <p className="maze-hint">Connect all four pairs to open the last lock.</p>
    </div>
  </div>
}
