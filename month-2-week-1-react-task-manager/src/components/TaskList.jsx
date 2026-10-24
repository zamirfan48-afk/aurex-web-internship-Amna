import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onToggle, onDelete, formatTaskDate }) {
  if (tasks.length === 0) {
    return <p className="empty-tasks">No tasks in this view. Add one above.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} formatTaskDate={formatTaskDate} />
      ))}
    </ul>
  )
}

export default TaskList
