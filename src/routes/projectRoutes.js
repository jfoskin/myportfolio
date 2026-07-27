const express = require('express')
const Project = require('../models/ProjectModel')
const projectRoutes = express.Router()

projectRoutes.get('/', (req, res) => {

    try {
        // const projects = await Project.find({})

        res.status(200).send(`all projects returned!`)
    } catch (error) {
        console.log(`Error while trying to get all projects`, error)
        res.status(400).json({
            error: `Failed to get all projects`,
            details: error.message
        })
    }
})

// projectRoutes.delete('/mgmt/projects/:id', (req,res)=>{

// })

module.exports = projectRoutes