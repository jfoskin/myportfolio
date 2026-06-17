const express = require('express')

const projectRoutes = express.Router()

projectRoutes.get('/', (req, res) => {

    // const porjects = await
    res.send(`all projects returned!`)
})

module.exports = projectRoutes