import { useState } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

function App() {
const [tasks, setTasks] = useState([])

function handleAddTask(text) {
const newTask = {
id: crypto.randomUUID(),
text,
completed: false,
}
setTasks((currentTasks) => [...currentTasks, newTask])
}

function handleToggleTask(taskId) {
setTasks((currentTasks) =>
currentTasks.map((task) =>
task.id === taskId
? { ...task, completed: !task.completed }
: task,
),
)
}

function handleDeleteTask(taskId) {
setTasks((currentTasks) =>
currentTasks.filter((task) => task.id !== taskId),
)
}

return (
<main>
<Header />
<TaskForm onAddTask={handleAddTask} />
<TaskList
tasks={tasks}
onToggle={handleToggleTask}
onDelete={handleDeleteTask}
/>
</main>
)
}

export default App