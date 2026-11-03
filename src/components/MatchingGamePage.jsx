import { ArrowLeft, Check, RotateCcw, Trophy, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import StatusBar from './StatusBar.jsx'

const PAIRS = [
  { id: 'home', question: 'What is the name of the house we built together?', answer: 'Terryanna' },
  { id: 'kiss', question: 'When was our first kiss?', answer: 'July 27, 2026' },
  { id: 'game', question: 'Which Roblox game do we often play together?', answer: 'Raft 101 Survival' },
  { id: 'song', question: 'What is our national anthem?', answer: 'butterflies (feat. TAEHYUN of TOMORROW X TOGETHER & Kim Chaewon of LE SSERAFIM)' },
  { id: 'love', question: 'Aleyna is.....', answer: "Orion's baby ♡" },
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
  const [selectedQuestion, setSelectedQuestion] = useState(null)
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

  const selectQuestion = id => {
    if (complete || timedOut || failed || connections.some(connection => connection.questionId === id)) return
    setSelectedQuestion(id)
    setMessage('')
  }

  const selectAnswer = answerId => {
    if (!selectedQuestion || connections.some(connection => connection.answerId === answerId)) return
    const isCorrect = selectedQuestion === answerId
    if (isCorrect) {
      setConnections(current => [...current, { questionId: selectedQuestion, answerId }])
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
    setSelectedQuestion(null)
  }

  const reset = () => {
    setConnections([])
    setSelectedQuestion(null)
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
        setSelectedQuestion(null)
        setMessage('Time is up. Start the matching again.')
        return 0
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [complete, timedOut])

  useEffect(() => {
    if (complete) onClue('heart')
  }, [complete, onClue])

  return <div className="app-screen notification-page screen">
    <StatusBar />
    <header className="maze-header"><button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back</button><div><h2>Little Connections</h2><small>Match what belongs together</small></div><button className="maze-reset" onClick={reset} aria-label="Reset game"><RotateCcw size={15} /></button></header>
    <div className="maze-content matching-content">
      <div className="matching-intro"><span>Tap a question, then tap its answer.</span><b className={timeLeft <= 10 ? 'maze-warning' : ''}>{timeLeft}s · {connections.length}/{PAIRS.length}</b></div>
      <div className="matching-board" ref={boardRef}>
        <svg className="matching-lines" aria-hidden="true">
          {connections.map(connection => {
            const start = pointFor(questionRefs.current[connection.questionId], 'question')
            const end = pointFor(answerRefs.current[connection.answerId], 'answer')
            return start && end ? <line key={connection.questionId} x1={start.x} y1={start.y} x2={end.x} y2={end.y} /> : null
          })}
        </svg>
        <div className="matching-column matching-questions">{questions.map(pair => {
          const connected = connections.some(connection => connection.questionId === pair.id)
          const selected = selectedQuestion === pair.id
          return <button className={`matching-card ${connected ? 'connected' : ''} ${selected ? 'selected' : ''}`} key={pair.id} ref={element => { questionRefs.current[pair.id] = element }} onClick={() => selectQuestion(pair.id)}><span>{pair.question}</span><i>{connected ? <Check size={14} /> : <span className="matching-dot" />}</i></button>
        })}</div>
        <div className="matching-column matching-answers">{answers.map(pair => {
          const connected = connections.some(connection => connection.answerId === pair.id)
          return <button className={`matching-card ${connected ? 'connected' : ''}`} key={pair.id} ref={element => { answerRefs.current[pair.id] = element }} onClick={() => selectAnswer(pair.id)}><span className="matching-dot">{connected ? <Check size={14} /> : null}</span>{pair.answer}</button>
        })}</div>
      </div>
      {message && <p className={`matching-message ${message.startsWith('That') ? 'is-correct' : 'is-wrong'}`}>{message.startsWith('That') ? <Check size={14} /> : <X size={14} />}{message}</p>}
      {complete && <div className="maze-result maze-success"><Trophy size={18} /><span>Every connection is right. You found the final key.</span></div>}
      <p className="maze-hint">Tap all four pairs to open the last lock.</p>
    </div>
  </div>
}
