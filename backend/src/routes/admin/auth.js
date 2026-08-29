const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    const { password } = req.body
    try {
        const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token })

    } catch (error) {
        console.log(`There is an error`, error)
    }

})



module.exports = authRouter