import { useState } from 'react'

function TaskForm({ onAddTask, defaultDate }) {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [priority, setPriority] = useState('normal')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const taskText = text.trim()
    if (!taskText) {
      setError('Please enter a task.')
      return
    }
    if (taskText.length > 120) {
      setError('Tasks must be 120 characters or fewer.')
      return
    }

    onAddTask({ text: taskText, dueDate: dueDate || defaultDate, dueTime, priority })
    setText('')
    setDueDate('')
    setDueTime('')
    setPriority('normal')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="task-input">New task</label>
      <input id="task-input" type="text" placeholder="New task…" value={text}
          onChange={(event) => {
          setText(event.target.value)
          if (error) setError('')
        }}
        aria-describedby={error ? 'task-error' : undefined}
      />

      <label className="visually-hidden" htmlFor="task-date">Due date</label>
      <input id="task-date" type="date" value={dueDate || defaultDate} onChange={(event) => setDueDate(event.target.value)} />

      <label className="visually-hidden" htmlFor="task-time">Due time</label>
      <input id="task-time" type="time" value={dueTime} onChange={(event) => setDueTime(event.target.value)} />

      <label className="visually-hidden" htmlFor="task-priority">Priority</label>
      <select id="task-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

      <button className="add-button" type="submit">Add</button>
      
      {error && <p className="form-error" id="task-error" role="alert">{error}</p>}
    </form>
  )
}

export default TaskForm
