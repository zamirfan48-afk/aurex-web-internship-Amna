const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please provide name, email and password'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = createToken(user._id);

        return res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error.message);
        return res.status(500).json({
            message: 'Server error during registration'
        });
    }
};

// Login existing user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = createToken(user._id);

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({
            message: 'Server error during login'
        });
    }
};

// Get logged-in user's profile
const me = async (req, res) => {
    return res.status(200).json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
    });
};

module.exports = { register, login, me };