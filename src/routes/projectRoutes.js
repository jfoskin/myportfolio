const express = require('express')
const projectRoutes = express.Router()
const Project = require('../models/ProjectModel')

projectRoutes.get('/', async (req, res) => {

    try {
        const projects = await Project.find({})

        res.status(200).send(`all projects returned!`)
    } catch (error) {
        console.log(`Error while trying to get all projects`, error)
        res.status(400).json({
            error: `Failed to get all projects`,
            details: error.message
        })
    }
})

module.exports = projectRoutes