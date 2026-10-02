import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onToggle, onDelete }) {
if (tasks.length === 0) {
return <p>No tasks yet. Add one above.</p>
}

return (
<ul>
{tasks.map((task) => (
<TaskItem
key={task.id}
task={task}
onToggle={onToggle}
onDelete={onDelete}
/>
))}
</ul>
)
}

export default TaskList