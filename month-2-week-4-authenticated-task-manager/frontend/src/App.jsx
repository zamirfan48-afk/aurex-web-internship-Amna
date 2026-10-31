
import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, LogOut, Pencil, ListTodo } from 'lucide-react';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [mode, setMode] = useState('login');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [taskForm, setTaskForm] = useState({
        title: '', description: '', priority: 'medium'
    });
    const [editingId, setEditingId] = useState(null);

    const request = async (endpoint, options = {}) => {
        const response = await fetch(`${API}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    };

    const loadTasks = async () => {
        const data = await request('/api/tasks');
        setTasks(data);
    };

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await request('/api/auth/me');
                setUser(data.user);
                await loadTasks();
            } catch {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = mode === 'register'
                ? '/api/auth/register'
                : '/api/auth/login';

            const data = await request(endpoint, {
                method: 'POST',
                body: JSON.stringify(form)
            });

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data.user);

            const response = await fetch(`${API}/api/tasks`, {
                headers: { Authorization: `Bearer ${data.token}` }
            });

            const taskData = await response.json();
            if (!response.ok) throw new Error(taskData.message);

            setTasks(taskData);
            setForm({ name: '', email: '', password: '' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setTasks([]);
        setError('');
    };

    const saveTask = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = editingId
                ? `/api/tasks/${editingId}`
                : '/api/tasks';

            const data = await request(endpoint, {
                method: editingId ? 'PUT' : 'POST',
                body: JSON.stringify(taskForm)
            });

            if (editingId) {
                setTasks(tasks.map(task => task._id === editingId ? data : task));
            } else {
                setTasks([data, ...tasks]);
            }

            setTaskForm({ title: '', description: '', priority: 'medium' });
            setEditingId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const editTask = (task) => {
        setEditingId(task._id);
        setTaskForm({
            title: task.title,
            description: task.description || '',
            priority: task.priority
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleTask = async (task) => {
        try {
            const updated = await request(`/api/tasks/${task._id}`, {
                method: 'PUT',
                body: JSON.stringify({ completed: !task.completed })
            });

            setTasks(tasks.map(item => item._id === task._id ? updated : item));
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm('Delete this task?')) return;

        try {
            await request(`/api/tasks/${id}`, { method: 'DELETE' });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const visibleTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    if (loading) {
        return <div className="loading-screen">Loading your workspace...</div>;
    }

    if (!user) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <div className="brand-icon"><ListTodo size={30} /></div>
                    <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
                    <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
                    <p className="subtitle">
                        {mode === 'login'
                            ? 'Sign in to manage your tasks.'
                            : 'Register to start organizing your work.'}
                    </p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleAuth}>
                        {mode === 'register' && (
                            <label>
                                Full name
                                <input
                                    required
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Your name"
                                />
                            </label>
                        )}

                        <label>
                            Email address
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="you@example.com"
                            />
                        </label>

                        <label>
                            Password
                            <input
                                type="password"
                                required
                                minLength="8"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                placeholder="At least 8 characters"
                            />
                        </label>

                        <button className="primary-button" disabled={loading}>
                            {mode === 'login' ? 'Sign in' : 'Create account'}
                        </button>
                    </form>

                    <p className="switch-mode">
                        {mode === 'login' ? "Don't have an account?" : 'Already registered?'}
                        <button onClick={() => {
                            setMode(mode === 'login' ? 'register' : 'login');
                            setError('');
                        }}>
                            {mode === 'login' ? 'Create account' : 'Sign in'}
                        </button>
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="dashboard">
            <header className="topbar">
                <div className="brand">
                    <div className="brand-icon"><ListTodo size={25} /></div>
                    <span>TaskFlow</span>
                </div>
                <div className="user-menu">
                    <span>{user.name}</span>
                    <button className="logout-button" onClick={logout}>
                        <LogOut size={17} /> Logout
                    </button>
                </div>
            </header>

            <section className="dashboard-content">
                <div className="welcome">
                    <p className="eyebrow">YOUR WORKSPACE</p>
                    <h1>My Tasks</h1>
                    <p>Stay organized and make progress every day.</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <section className="task-form-card">
                    <h2>{editingId ? 'Edit task' : 'Create a new task'}</h2>
                    <form onSubmit={saveTask}>
                        <input
                            required
                            placeholder="What needs to be done?"
                            value={taskForm.title}
                            onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Add a description (optional)"
                            value={taskForm.description}
                            onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                        />
                        <div className="form-actions">
                            <select
                                value={taskForm.priority}
                                onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
                            >
                                <option value="low">Low priority</option>
                                <option value="medium">Medium priority</option>
                                <option value="high">High priority</option>
                            </select>
                            <button className="primary-button">
                                <Plus size={17} /> {editingId ? 'Update task' : 'Add task'}
                            </button>
                            {editingId && (
                                <button type="button" className="cancel-button" onClick={() => {
                                    setEditingId(null);
                                    setTaskForm({ title: '', description: '', priority: 'medium' });
                                }}>Cancel</button>
                            )}
                        </div>
                    </form>
                </section>

                <div className="task-summary">
                    <div><strong>{tasks.length}</strong><span>Total tasks</span></div>
                    <div><strong>{tasks.filter(t => !t.completed).length}</strong><span>Pending</span></div>
                    <div><strong>{tasks.filter(t => t.completed).length}</strong><span>Completed</span></div>
                </div>

                <div className="task-list-header">
                    <h2>Your task list</h2>
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="all">All tasks</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <section className="task-list">
                    {visibleTasks.length === 0 ? (
                        <div className="empty-state">
                            <ListTodo size={36} />
                            <h3>No tasks found</h3>
                            <p>Add a task or change your filter.</p>
                        </div>
                    ) : visibleTasks.map(task => (
                        <article className={`task-item ${task.completed ? 'is-completed' : ''}`} key={task._id}>
                            <button className="complete-button" onClick={() => toggleTask(task)}>
                                {task.completed
                                    ? <CheckCircle2 size={23} />
                                    : <Circle size={23} />}
                            </button>
                            <div className="task-details">
                                <h3>{task.title}</h3>
                                {task.description && <p>{task.description}</p>}
                                <span className={`priority ${task.priority}`}>{task.priority}</span>
                            </div>
                            <div className="task-actions">
                                <button aria-label="Edit task" onClick={() => editTask(task)}>
                                    <Pencil size={17} />
                                </button>
                                <button aria-label="Delete task" onClick={() => deleteTask(task._id)}>
                                    <Trash2 size={17} />
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
}

export default App;
