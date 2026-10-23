const express = require('express')
const contactRouter = express.Router()
const Contact = require('../models/ContactModel')

contactRouter.post('/', async (req, res) => {
    try {
        try {
            const { name, email, opportunity, message } = req.body
            const newEmail = await Contact.create({ name, email, opportunity, message })
            res.status(201).json(newEmail)
        } catch (error) {
            console.log(`Error while trying to send message`, error)
            res.status(400).json({ error: 'Failed to send message', details: safeErrorDetails(error) })
        }
    } catch (error) {

    }
})

module.exports = contactRouter