const express = require('express')
const Project = require('../projectRoutes')
const adminRoutes = express.Router()

adminRoutes.get('/', (req, res) => {
    res.send('Admin Dashboard')
})

// Update
adminRoutes.put('/projects/:id', async (req, res) => {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
    res.status(200).json(updatedProject)
})

// Edit
adminRoutes.get('/projects/:id/edit', async (req, res) => {
    const id = req.params.id


})
module.exports = adminRoutes