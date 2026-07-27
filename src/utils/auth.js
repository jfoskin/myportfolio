const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        token = token.split(' ').pop().trim()

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;