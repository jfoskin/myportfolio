const express = require('express')

const projectRoutes = express.Router()

projectRoutes.get('/', (req, res) => {

    try {
        // const projects = await

        res.send(`all projects returned!`)
    } catch (error) {
        console.log(`Error while trying to get all projects`, error)
        res.status(400).json({
            error: `Failed to get all projects`,
            details: error.message
        })
    }
})

// projectRoutes.delete('/admin/projects/:id', (req,res)=>{

// })

module.exports = projectRoutes