import { useState } from 'react'

function TaskForm({ onAddTask }) {
const [text, setText] = useState('')
const [error, setError] = useState('')

function handleSubmit(event) {
event.preventDefault()
const taskText = text.trim()

if (!taskText) {
setError('Please enter a task.')
return
}

onAddTask(taskText)
setText('')
setError('')
}

return (
<form onSubmit={handleSubmit}>
<label htmlFor="task-input">New task</label>
<input
id="task-input"
type="text"
value={text}
onChange={(event) => {
setText(event.target.value)
if (error) setError('')
}}
/>
<button type="submit">Add task</button>
{error && <p role="alert">{error}</p>}
</form>
)
}

export default TaskForm