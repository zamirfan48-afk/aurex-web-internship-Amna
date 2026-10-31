require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Week 4 Authenticated Task Manager API is running'
    });
});

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};

startServer();