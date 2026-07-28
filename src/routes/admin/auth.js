const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.get('/login', async (req, res) => {
    const { password } = req.body

    const isValid = await bcrypt.compare(password, this.password)
})

module.exports = authRouter