const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
const authRouter = express.Router()

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts, please try again later' }
})

authRouter.post('/login', loginLimiter, async (req, res) => {
    const { password } = req.body
    try {
        const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token })

    } catch (error) {
        console.log(`There is an error`, error)
        res.status(500).json({ error: 'Login failed' })
    }

})



module.exports = authRouter