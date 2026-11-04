import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, RotateCcw, Trophy } from 'lucide-react'
import { Application, Graphics } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import StatusBar from './StatusBar.jsx'

const MAZE_WIDTH = 31
const MAZE_HEIGHT = 21
const TIME_LIMIT = 640
const STEP_LIMIT = 180
const START = { x: -1, y: 1 }
const EXIT = { x: MAZE_WIDTH - 1, y: MAZE_HEIGHT - 2 }
const FINISH = { x: MAZE_WIDTH, y: MAZE_HEIGHT - 2 }
const MOVES = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function createMaze(width, height) {
  const maze = Array.from({ length: height }, () => Array(width).fill('#'))
  const stack = [{ x: 1, y: 1 }]
  maze[1][1] = '.'
  const directions = [{ x: 0, y: -2 }, { x: 2, y: 0 }, { x: 0, y: 2 }, { x: -2, y: 0 }]
  while (stack.length) {
    const current = stack[stack.length - 1]
    const options = shuffle(directions).filter(direction => {
      const nextX = current.x + direction.x
      const nextY = current.y + direction.y
      return nextX > 0 && nextX < width - 1 && nextY > 0 && nextY < height - 1 && maze[nextY][nextX] === '#'
    })
    if (!options.length) {
      stack.pop()
      continue
    }
    const direction = options[0]
    const nextX = current.x + direction.x
    const nextY = current.y + direction.y
    maze[current.y + direction.y / 2][current.x + direction.x / 2] = '.'
    maze[nextY][nextX] = '.'
    stack.push({ x: nextX, y: nextY })
  }
  const extraPaths = Math.floor(width * height * 0.035)
  for (let i = 0; i < extraPaths; i += 1) {
    const x = Math.floor(Math.random() * (width - 2)) + 1
    const y = Math.floor(Math.random() * (height - 2)) + 1
    const horizontal = maze[y]?.[x - 1] === '.' && maze[y]?.[x + 1] === '.'
    const vertical = maze[y - 1]?.[x] === '.' && maze[y + 1]?.[x] === '.'
    if (maze[y][x] === '#' && (horizontal || vertical)) maze[y][x] = '.'
  }
  maze[1][0] = '.'
  maze[height - 2][width - 1] = '.'
  return maze.map(row => row.join(''))
}

export default function GamePage({ onBack, onClue }) {
  const maze = useRef(createMaze(MAZE_WIDTH, MAZE_HEIGHT)).current
  const mazeRef = useRef(null)
  const redrawRef = useRef(() => {})
  const playerRef = useRef({ ...START })
  const movesRef = useRef(0)
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)

  useEffect(() => {
    let app
    let disposed = false
    const drawMaze = () => {
      if (!app || disposed || !mazeRef.current || !app.renderer) return
      const { width, height } = mazeRef.current.getBoundingClientRect()
      if (!width || !height) return
      app.renderer.resize(width, height)
      const cell = Math.min((width - 28) / (MAZE_WIDTH + 2), (height - 28) / MAZE_HEIGHT)
      const originX = (width - cell * (MAZE_WIDTH + 2)) / 2 + cell
      const originY = (height - cell * MAZE_HEIGHT) / 2
      const scene = new Graphics()
      scene.roundRect(0, 0, width, height, 18).fill(0xf8f7f2)
      scene.setStrokeStyle({ width: Math.max(1.5, cell * .08), color: 0x18202d, cap: 'square' })
      const isWall = (x, y) => maze[y]?.[x] === '#'
      for (let y = 0; y < MAZE_HEIGHT; y += 1) for (let x = 0; x < MAZE_WIDTH; x += 1) {
        if (!isWall(x, y)) continue
        const px = originX + x * cell
        const py = originY + y * cell
        if (!isWall(x, y - 1)) scene.moveTo(px, py).lineTo(px + cell, py)
        if (!isWall(x, y + 1)) scene.moveTo(px, py + cell).lineTo(px + cell, py + cell)
        if (!isWall(x - 1, y)) scene.moveTo(px, py).lineTo(px, py + cell)
        if (!isWall(x + 1, y)) scene.moveTo(px + cell, py).lineTo(px + cell, py + cell)
      }
      scene.stroke()
      scene.rect(originX - cell * .09, originY + START.y * cell + cell * .2, cell * .09, cell * .6).fill(0xd4af68)
      scene.rect(originX + MAZE_WIDTH * cell, originY + EXIT.y * cell + cell * .2, cell * .09, cell * .6).fill(0xd4af68)
      scene.rect(originX + EXIT.x * cell, originY + EXIT.y * cell + cell * .18, cell * .7, cell * .64).fill(0xd4af68)
      const keyX = originX + (FINISH.x + .5) * cell
      const keyY = originY + (FINISH.y + .5) * cell
      scene.circle(keyX - cell * .14, keyY, cell * .18).fill(0xd4af68)
      scene.circle(keyX - cell * .14, keyY, cell * .08).fill(0xf8f7f2)
      scene.setStrokeStyle({ width: Math.max(2, cell * .1), color: 0xd4af68, cap: 'round' })
      scene.moveTo(keyX, keyY).lineTo(keyX + cell * .27, keyY).stroke()
      scene.circle(originX + (playerRef.current.x + .5) * cell, originY + (playerRef.current.y + .5) * cell, cell * .24).fill(0xb38a48)
      scene.circle(originX + (playerRef.current.x + .5) * cell, originY + (playerRef.current.y + .5) * cell, cell * .1).fill(0xf8f7f2)
      app.stage.removeChildren().forEach(child => child.destroy())
      app.stage.addChild(scene)
    }
    redrawRef.current = drawMaze
    const setup = async () => {
      const nextApp = new Application()
      await nextApp.init({ antialias: true, backgroundAlpha: 0 })
      if (disposed) { nextApp.destroy(true); return }
      app = nextApp
      mazeRef.current.appendChild(app.canvas)
      drawMaze()
    }
    setup()
    const observer = new ResizeObserver(drawMaze)
    if (mazeRef.current) observer.observe(mazeRef.current)
    return () => {
      disposed = true
      observer.disconnect()
      if (app) app.destroy(true, { children: true })
      redrawRef.current = () => {}
    }
  }, [maze])

  useEffect(() => {
    if (won || lost) return undefined
    const timer = window.setInterval(() => setTimeLeft(value => {
      if (value > 1) return value - 1
      setLost(true)
      return 0
    }), 1000)
    return () => window.clearInterval(timer)
  }, [won, lost])

  const move = direction => {
    if (won || lost) return
    const delta = MOVES[direction]
    const next = { x: playerRef.current.x + delta.x, y: playerRef.current.y + delta.y }
    const outside = next.x === START.x && next.y === START.y
    const finish = next.x === FINISH.x && next.y === FINISH.y
    const inMaze = next.x >= 0 && next.x < MAZE_WIDTH && next.y >= 0 && next.y < MAZE_HEIGHT
    if (!outside && !finish && (!inMaze || maze[next.y][next.x] === '#')) return
    playerRef.current = next
    const nextMoves = movesRef.current + 1
    movesRef.current = nextMoves
    setMoves(nextMoves)
    if (finish) { setWon(true); onClue('maze') }
    else if (nextMoves >= STEP_LIMIT) setLost(true)
    redrawRef.current()
  }

  useEffect(() => {
    const onKeyDown = event => {
      if (!MOVES[event.key]) return
      event.preventDefault()
      move(event.key)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const reset = () => {
    playerRef.current = { ...START }
    movesRef.current = 0
    setMoves(0)
    setTimeLeft(TIME_LIMIT)
    setWon(false)
    setLost(false)
    redrawRef.current()
  }

  return <div className="app-screen notification-page screen">
    <StatusBar />
    <header className="maze-header"><button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back</button><div><h2>Little Maze</h2><small>Find the golden key</small></div><button className="maze-reset" onClick={reset} aria-label="Reset maze"><RotateCcw size={15} /></button></header>
    <div className="maze-content">
      <p className="maze-hint">Find the key before the {TIME_LIMIT}-second timer or {STEP_LIMIT}-step limit runs out.</p>
      <div className="maze-stats"><span>TIME <b className={timeLeft <= 10 ? 'maze-warning' : ''}>{timeLeft}s</b></span><span>STEPS <b>{moves}/{STEP_LIMIT}</b></span></div>
      <div className="maze-board" ref={mazeRef} aria-label="PixiJS maze game" />
      {(won || lost) && <div className={`maze-result ${won ? 'maze-success' : 'maze-failure'}`}><Trophy size={18} /><span>{won ? 'You found the first key. One little lock is open.' : 'You lost your way. Start again from the entrance.'}</span><button onClick={reset}>{won ? 'Play again' : 'Start again'}</button></div>}
      <div className="maze-controls" aria-label="Maze controls"><button onClick={() => move('ArrowUp')} aria-label="Move up"><ChevronUp size={19} /></button><div><button onClick={() => move('ArrowLeft')} aria-label="Move left"><ChevronLeft size={19} /></button><button onClick={() => move('ArrowDown')} aria-label="Move down"><ChevronDown size={19} /></button><button onClick={() => move('ArrowRight')} aria-label="Move right"><ChevronRight size={19} /></button></div></div>
      
    </div>
  </div>
}
