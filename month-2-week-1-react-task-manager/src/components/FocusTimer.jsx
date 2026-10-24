import { useEffect, useState } from 'react'

const PRESETS = [15, 25, 45]

function FocusTimer() {
  const [duration, setDuration] = useState(25 * 60)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    if (!running) return undefined
    const interval = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          setRunning(false)
          setSessions((count) => count + 1)
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [running])

  function selectDuration(minutes) {
    setRunning(false)
    setDuration(minutes * 60)
    setSecondsLeft(minutes * 60)
  }

  function reset() {
    setRunning(false)
    setSecondsLeft(duration)
  }

  function skip() {
  setRunning(false)
  setSecondsLeft(duration)
}

  const time = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`
  const status = secondsLeft === 0 ? 'COMPLETE' : running ? 'FOCUSING' : 'READY'

  return (
    <section className="panel timer-panel" id="timer">

      <div className="section-heading">
        <h2><span>04</span> · Focus Timer</h2>
        <span className="session-count">{sessions} {sessions === 1 ? 'SESSION' : 'SESSIONS'}</span>
      </div>

      <div className="timer-layout">

        <div className={`timer-display ${running ? 'is-running' : ''}`} aria-live="polite">
          <span className="timer-time">{time}</span>
          <span className="timer-status">{status}</span>
        </div>

        <div className="timer-controls">

          <div className="preset-row" aria-label="Timer duration">
            {PRESETS.map((minutes) => (
              <button className={duration === minutes * 60 ? 'selected' : ''} key={minutes} type="button" onClick={() => selectDuration(minutes)} aria-pressed={duration === minutes * 60}>{minutes} MIN</button>
            ))}
          </div>
          
          <div className="timer-actions">
            <button type="button" className="secondary-button" onClick={reset}>↺ Reset</button>
            <button type="button" className="start-button" onClick={() => setRunning((value) => !value)} disabled={secondsLeft === 0}>{running ? 'Ⅱ Pause' : '▶ Start'}</button>
            <button type="button" className="secondary-button" onClick={skip}>⏭ Skip</button>
          </div>

        </div>

      </div>
      
    </section>
  )
}

export default FocusTimer
