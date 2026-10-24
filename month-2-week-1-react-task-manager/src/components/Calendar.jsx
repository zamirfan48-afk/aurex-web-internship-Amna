import { useMemo, useState } from 'react'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function Calendar({ tasks, selectedDate, onSelectDate }) {
  const [month, setMonth] = useState(() => {
    const date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 1)
  })

  const days = useMemo(() => {
    const firstWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
    const monthDays = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const prevMonthDays = new Date(month.getFullYear(), month.getMonth(), 0).getDate()
    const totalCells = Math.ceil((firstWeekday + monthDays) / 7) * 7

    return Array.from({ length: totalCells }, (_, index) => {
      const day = index - firstWeekday + 1
      const date = new Date(month.getFullYear(), month.getMonth(), day)
      return {
        date,
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        number: day < 1 ? prevMonthDays + day : day > monthDays ? day - monthDays : day,
        outside: day < 1 || day > monthDays,
      }
    })
  }, [month])
  const taskDates = new Set(tasks.filter((task) => task.dueDate).map((task) => task.dueDate))

  function changeMonth(offset) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  }

  return (
    <section className="panel calendar-panel" id="calendar">

      <div className="section-heading">

        <h2><span>03</span> · Calendar</h2>

        <div className="month-controls">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
          <span>{month.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase()}</span>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
        </div>
        
      </div>
      
      <div className="calendar-grid" role="grid" aria-label={month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}>
        {WEEKDAYS.map((day, index) => <span className="weekday" key={`${day}-${index}`}>{day}</span>)}
        {days.map((day) => (
          <button
            className={`calendar-day ${day.outside ? 'outside' : ''} ${day.key === selectedDate ? 'selected' : ''} ${taskDates.has(day.key) ? 'has-task' : ''}`}
            key={day.key}
            type="button"
            onClick={() => onSelectDate(day.key)}
            aria-label={day.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            aria-pressed={day.key === selectedDate}
          >
            {day.number}
          </button>
        ))}
      </div>

    </section>
  )
}

export default Calendar
