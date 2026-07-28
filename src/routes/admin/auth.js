const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    const { password } = req.body
    try {
        const isValid = await bcrypt.compare(password, this.password)
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });


    } catch (error) {

    }

})

module.exports = authRouter