const express = require('express')
const contactRouter = express.Router()
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Optional fields that apply to each reason; anything else sent is ignored.
// Keep in sync with frontend/src/components/ContactContent.jsx
const optionalFieldsByReason = {
    job: ['company', 'link'],
    freelance: ['company', 'timeline', 'link'],
    collab: ['company', 'link'],
    hello: [],
}

const isText = (value) => typeof value === 'string' && value.trim() !== ''

function validateContact({ name, email, reason, message }) {
    const fields = []
    if (!isText(name) || name.length > 100) fields.push('name')
    if (!isText(email) || !EMAIL_PATTERN.test(email)) fields.push('email')
    if (!Object.hasOwn(optionalFieldsByReason, reason)) fields.push('reason')
    if (!isText(message) || message.length > 5000) fields.push('message')
    return fields
}

contactRouter.post('/', async (req, res, next) => {
    try {
        const { name, email, reason, message } = req.body

        // Bad input from the form: tell the visitor which fields to fix
        const invalidFields = validateContact({ name, email, reason, message })
        if (invalidFields.length) {
            return res.status(400).json({
                error: 'Please check the highlighted fields and try again',
                fields: invalidFields,
            })
        }

        const details = [`Name: ${name}`, `Email: ${email}`, `Reason: ${reason}`]
        for (const field of optionalFieldsByReason[reason]) {
            if (req.body[field]) details.push(`${field}: ${req.body[field]}`)
        }

        const { error } = await resend.emails.send({
            from: 'Portfolio Contact Form',
            to: process.env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: `[Portfolio] New message from ${name}`,
            text: `${details.join('\n')}\n\n${message}`,
        })
        if (error) throw new Error(`Resend failed: ${error.message}`)

        res.status(200).json({ message: 'Message sent' })
    } catch (error) {
        // Anything else goes to the centralized error handler in server.js
        next(error)
    }
})

module.exports = contactRouter
