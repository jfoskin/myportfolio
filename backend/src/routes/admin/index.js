const express = require('express')
const Project = require('../projectRoutes')
const authRouter = require('./auth')
const projectAdminRouter = require('./project')
const entryAdminRouter = require('./entry')
const authMiddleware = require('../../utils/authMiddleware')
const router = express.Router()


// login route is NOT behind requireAuth — you need to hit this before you have a token
router.use('/', authRouter)

// everything below this line requires a valid token
router.use(authMiddleware)
router.use('/', projectAdminRouter)
router.use('/', entryAdminRouter)



router.get('/', (req, res) => {
    res.send('Admin Dashboard')
})


module.exports = router