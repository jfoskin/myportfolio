const express = require('express')

const adminRoutes = express.Router()

adminRoutes.get('/admin', (req, res) => {
    res.send('Admin Dashboard')
})

module.exports = adminRoutes