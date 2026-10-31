const Task = require('../models/Task');

// Get all tasks belonging to the logged-in user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({
            createdAt: -1
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};

// Create a task
const createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Task title is required' });
        }

        const task = await Task.create({
            user: req.user._id,
            title: title.trim(),
            description: description || '',
            priority: priority || 'medium'
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task' });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { title, description, completed, priority } = req.body;
        const updates = {};

        if (title !== undefined) updates.title = title.trim();
        if (description !== undefined) updates.description = description;
        if (completed !== undefined) updates.completed = completed;
        if (priority !== undefined) updates.priority = priority;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };