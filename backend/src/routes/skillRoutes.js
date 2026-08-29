const express = require('express')
const Skill = require('../models/SkillModel')

const skillRouter = express.Router()


skillRouter.get('/', async (req, res) => {
    try {
        const allSkills = await Skill.find({})
        res.status(200).send(allSkills)
    } catch (error) {
        console.log(`Error while trying to get all skills`, error)
        res.status(500).json({ error: `Failed to get all skills` })
    }
})



module.exports = skillRouter