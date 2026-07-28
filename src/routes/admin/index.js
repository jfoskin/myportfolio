const express = require('express')
const Project = require('../projectRoutes')
const authRouter = require('./auth')
const adminRouter = require('./project')
const authMiddleware = require('../../utils/authMiddleware')
const router = express.Router()


router.use('/', authRouter)

router.use(authMiddleware)

router.use('/', adminRouter)



router.get('/', (req, res) => {
    res.send('Admin Dashboard')
})


module.exports = router