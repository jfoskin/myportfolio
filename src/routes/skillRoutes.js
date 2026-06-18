const express = require('express')

const skillRoutes = express.Router()

const Skill = require('../models/SkillModel')

skillRoutes.get('/skills', (req, res) => {
    try {


        console.log(`skills`)
    } catch (error) {
        console.log(`Error while trying to get all skills`, error)
        res.status(400).json({
            error: `Failed to get all skills`,
            details: error.message
        })
    }
})