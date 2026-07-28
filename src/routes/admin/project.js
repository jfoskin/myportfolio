const express = require('express')
const Project = require('../projectRoutes')
const adminRouter = express.Router()

//Create

// Update
adminRoutes.put('/projects/:id', async (req, res) => {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
    res.status(200).json(updatedProject)
})

// Edit
adminRoutes.get('/projects/:id/edit', async (req, res) => {

    const editProject = await Project.findById(req.params.id)
    console.log(`edit this project ${editProject}`)

})

// Delete
adminRoutes.delete('/projects/:id', async (req, res) => {
    const deletedProject = await Project.findByIdAndDelete(req.params.id).exec()
    res.status(200).json({ message: 'Project deleted successfully' })
})

module.exports = adminRouter;