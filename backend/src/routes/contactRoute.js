const express = require('express')
const contactRouter = express.Router()
const Contact = require('../models/ContactModel')

// Optional fields that apply to each reason; anything else sent is ignored.
// Keep in sync with frontend/src/components/ContactContent.jsx
const optionalFieldsByReason = {
    job: ['company', 'link'],
    freelance: ['company', 'timeline', 'link'],
    collab: ['company', 'link'],
    hello: [],
}

contactRouter.post('/', async (req, res, next) => {
    try {
        const { name, email, reason, message } = req.body
        const contact = { name, email, reason, message }

        const optionalFields = Object.hasOwn(optionalFieldsByReason, reason) ? optionalFieldsByReason[reason] : []
        for (const field of optionalFields) {
            if (req.body[field]) contact[field] = req.body[field]
        }

        await Contact.create(contact)
        res.status(201).json({ message: 'Message sent' })
    } catch (error) {
        // Bad input from the form: tell the visitor which fields to fix
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Please check the highlighted fields and try again',
                fields: Object.keys(error.errors),
            })
        }
        // Anything else goes to the centralized error handler in server.js
        next(error)
    }
})

module.exports = contactRouter
