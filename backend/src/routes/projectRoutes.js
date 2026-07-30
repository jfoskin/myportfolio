const express = require('express')
const projectRouter = express.Router()
const Project = require('../models/ProjectModel')

projectRouter.get('/', async (req, res) => {

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

projectRouter.get('/:id', async (req, res) => {
    try {
        const foundProject = Project.findById(req.params.id)
        res.status(200).json(foundProject)
    } catch (error) {
        res.status(404).json({ message: 'Project not found' })
    }
})

module.exports = projectRouter