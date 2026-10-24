function TaskItem({ task, onToggle, onDelete, formatTaskDate }) {
  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      
      <button
        className={`complete-button ${task.completed ? 'checked' : ''}`}
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Reopen ${task.text}` : `Complete ${task.text}`}
        aria-pressed={task.completed}
      >
        {task.completed ? '✓' : ''}
      </button>

      <div className="task-copy">
        <span className="task-title">{task.text}</span>
        <span className="task-meta">
          {task.dueDate ? `${formatTaskDate(task.dueDate)}${task.dueTime ? ` · ${task.dueTime}` : ''}` : 'No due date'}
          <span className={`priority priority--${task.priority}`}>{task.priority}</span>
        </span>
      </div>

      <button className="delete-button" type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.text}`}>×</button>
    </li>
  )
}

export default TaskItem
