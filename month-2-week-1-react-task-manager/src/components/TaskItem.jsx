function TaskItem({ task, onToggle, onDelete }) {
return (
<li className={task.completed ? 'task-item task-item--completed' : 'task-item'}>
<span>{task.text}</span>
<button
type="button"
onClick={() => onToggle(task.id)}
aria-pressed={task.completed}
>
{task.completed ? 'Mark active' : 'Mark complete'}
</button>
<button type="button" onClick={() => onDelete(task.id)}>
Delete
</button>
</li>
)
}

export default TaskItem