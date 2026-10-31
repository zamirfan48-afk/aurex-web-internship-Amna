const router = require('express').Router();

const protect = require('../middleware/authMiddleware');

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// All task routes require authentication
router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;