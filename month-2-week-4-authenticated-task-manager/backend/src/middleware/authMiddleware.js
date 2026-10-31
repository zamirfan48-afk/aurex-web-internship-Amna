const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;

        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized. Please log in.'
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user without password
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                message: 'User no longer exists'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

module.exports = protect;