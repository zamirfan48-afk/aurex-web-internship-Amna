import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import Calendar from './components/Calendar.jsx'
import FocusTimer from './components/FocusTimer.jsx'
import './App.css'

const STORAGE_KEY = 'deck-task-manager-v1'
const FILTERS = ['All', 'Today', 'Upcoming', 'Done']

function dateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function shiftDate(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return dateKey(date)
}

function createStarterTasks() {
  return [
    { id: crypto.randomUUID(), text: 'Review physics notes', dueDate: shiftDate(0), dueTime: '11:00', priority: 'normal', completed: false },
    { id: crypto.randomUUID(), text: 'Finish math assignment', dueDate: shiftDate(0), dueTime: '09:00', priority: 'high', completed: true },
    { id: crypto.randomUUID(), text: 'Prepare chemistry lab', dueDate: shiftDate(1), dueTime: '10:00', priority: 'high', completed: false },
    { id: crypto.randomUUID(), text: 'Read 30 pages', dueDate: '', dueTime: '', priority: 'low', completed: false },
  ]
}

function readTasks() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === null) return createStarterTasks()

  try {
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed) && parsed.every((task) =>
      task && typeof task.id === 'string' && typeof task.text === 'string' &&
      typeof task.completed === 'boolean' && ['low', 'normal', 'high'].includes(task.priority),
    )) {
      return parsed
    }
    throw new Error('Saved tasks have an unexpected format.')
  } catch (error) {
    console.error('Unable to load saved tasks.', error)
    return createStarterTasks()
  }
}

function formatTaskDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function App() {
  const today = dateKey(new Date())
  const [tasks, setTasks] = useState(readTasks)
  const [filter, setFilter] = useState('All')
  const [selectedDate, setSelectedDate] = useState(today)
  const [clock, setClock] = useState(() => new Date())
  const [dark, setDark] = useState(() => localStorage.getItem('deck-theme') !== 'light')
  const [storageError, setStorageError] = useState('')


  function updateTasks(nextTasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks))
      setStorageError('')
    } catch (error) {
      console.error('Unable to save tasks.', error)
      setStorageError('Your browser could not save changes. They may not persist after refresh.')
    }
    setTasks(nextTasks)
  }


  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 1000)
    return () => window.clearInterval(interval)
  }, [])


  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('deck-theme', dark ? 'dark' : 'light')
    } catch (error) {
      console.error('Unable to save the selected theme.', error)
    }
  }, [dark])


  const filteredTasks = useMemo(() => tasks.filter((task) => {
    if (filter === 'Today') return !task.completed && task.dueDate === today
    if (filter === 'Upcoming') return !task.completed && task.dueDate > today
    if (filter === 'Done') return task.completed
    return true
  }).sort((a, b) => {
    if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed)
    if (a.dueDate !== b.dueDate) return (a.dueDate || '9999').localeCompare(b.dueDate || '9999')
    return (a.dueTime || '').localeCompare(b.dueTime || '')
  }), [filter, tasks, today])


  const agendaTasks = useMemo(() => tasks
    .filter((task) => task.dueDate === selectedDate && !task.completed)
    .sort((a, b) => (a.dueTime || '').localeCompare(b.dueTime || '')), [tasks, selectedDate])


  function addTask(taskDetails) {
    updateTasks([...tasks, { ...taskDetails, id: crypto.randomUUID(), completed: false }])
  }

  function toggleTask(taskId) {
    updateTasks(tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task))
  }

  function deleteTask(taskId) {
    updateTasks(tasks.filter((task) => task.id !== taskId))
  }


  const greeting = clock.getHours() < 12 ? 'GOOD MORNING' : clock.getHours() < 18 ? 'GOOD AFTERNOON' : 'GOOD EVENING'

  return (
    <div className={`app-shell ${dark ? 'theme-dark' : 'theme-light'}`} id="top">
      <Header dark={dark} onToggleTheme={() => setDark((value) => !value)} />
      <main>

        <section className="welcome" aria-label="Current date and time">
          <p className="eyebrow">{greeting}</p>
          <p className="clock">{clock.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</p>
          <p className="welcome-date">{clock.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </section>

        <section className="dashboard-grid" id="tasks">
          <section className="panel tasks-panel">

            <div className="section-heading">
              <h1><span>01</span> · Tasks</h1>
              <span className="task-count">{tasks.filter((task) => !task.completed).length} OPEN</span>
            </div>

            <div className="filter-row" aria-label="Filter tasks">
              {FILTERS.map((name) => (
                <button className={`filter-button ${filter === name ? 'active' : ''}`} key={name} onClick={() => setFilter(name)} aria-pressed={filter === name}>{name}</button>
              ))}
            </div>

            <TaskForm onAddTask={addTask} defaultDate={selectedDate} />
            {storageError && <p className="storage-warning" role="status">{storageError}</p>}
            <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} formatTaskDate={formatTaskDate} />
          
          </section>

          <div className="side-column">
            <section className="panel agenda-panel">

              <div className="section-heading">
                <h2><span>02</span> · {selectedDate === today ? 'Today' : formatTaskDate(selectedDate)}</h2>
                {selectedDate !== today && <button className="text-button" onClick={() => setSelectedDate(today)}>Back to today</button>}
              </div>

              {agendaTasks.length ? (
                <ol className="agenda-list">
                  {agendaTasks.map((task) => (
                    <li key={task.id}>
                      <time>{task.dueTime || 'ALL DAY'}</time>
                      <span>{task.text}</span>
                    </li>
                  ))}
                </ol>
              ) : <p className="empty-agenda">Nothing scheduled. Enjoy the breathing room.</p>}
            </section>
            <Calendar tasks={tasks} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>
          
        </section>

        <FocusTimer />
      </main>
      <footer>DECK · MAKE SPACE FOR WHAT MATTERS</footer>
    </div>
  )
}

export default App
