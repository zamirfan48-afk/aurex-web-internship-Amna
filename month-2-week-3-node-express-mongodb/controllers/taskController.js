const Task = require('../models/Task');

// CREATE a task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        res.status(400).json({
            message: 'Unable to create task',
            error: error.message
        });
    }
};

// GET all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve tasks',
            error: error.message
        });
    }
};

// GET one task
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(400).json({
            message: 'Invalid task ID',
            error: error.message
        });
    }
};

// UPDATE a task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        res.status(400).json({
            message: 'Unable to update task',
            error: error.message
        });
    }
};

// DELETE a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            task
        });
    } catch (error) {
        res.status(400).json({
            message: 'Unable to delete task',
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};