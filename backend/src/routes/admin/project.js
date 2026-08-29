const express = require('express')
const Project = require('../../models/ProjectModel')
const adminRouter = express.Router()

// Only Mongoose validation messages are safe to expose to the client
function safeErrorDetails(error) {
    return error.name === 'ValidationError' ? error.message : undefined
}

// Create
adminRouter.post('/projects', async (req, res) => {
    try {
        const { title, github, description, url, image } = req.body
        const newProject = await Project.create({ title, github, description, url, image })
        res.status(201).json(newProject)
    } catch (error) {
        console.log(`Error while trying to create project`, error)
        res.status(400).json({ error: 'Failed to create project', details: safeErrorDetails(error) })
    }
})

// Update
adminRouter.put('/projects/:id', async (req, res) => {
    try {
        const { title, github, description, url, image } = req.body
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, github, description, url, image },
            { new: true, runValidators: true }
        ).exec()
        res.status(200).json(updatedProject)
    } catch (error) {
        console.log(`Error while trying to update project`, error)
        res.status(400).json({ error: 'Failed to update project', details: safeErrorDetails(error) })
    }
})

// Edit
adminRouter.get('/projects/:id/edit', async (req, res) => {
    try {
        const editProject = await Project.findById(req.params.id)
        res.status(200).json(editProject)
    } catch (error) {
        res.status(404).json({ message: 'Project not found' })
    }
})

// Delete
adminRouter.delete('/projects/:id', async (req, res) => {
    const deletedProject = await Project.findByIdAndDelete(req.params.id).exec()
    res.status(200).json({ message: 'Project deleted successfully' })
})

module.exports = adminRouter;