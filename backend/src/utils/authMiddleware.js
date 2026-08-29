const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        token = token.split(' ').pop().trim()

        let decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;