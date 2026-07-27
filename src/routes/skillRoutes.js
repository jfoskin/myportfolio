const express = require('express')
const Skill = require('../models/SkillModel')

const skillRoutes = express.Router()

const Skill = require('../models/SkillModel')

skillRoutes.get('/', async (req, res) => {
    try {
        const allSkills = await Skill.find({})
        res.status(200).json(allSkills)
        console.log(`skills`)
    } catch (error) {
        console.log(`Error while trying to get all skills`, error)
        res.status(400).json({
            error: `Failed to get all skills`,
            details: error.message
        })
    }
})

module.exports = skillRoutes