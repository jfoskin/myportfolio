const express = require('express')
const Entry = require('../../models/EntryModel')
const adminRouter = express.Router()

// Only Mongoose validation messages are safe to expose to the client
function safeErrorDetails(error) {
    return error.name === 'ValidationError' ? error.message : undefined
}

// Create
adminRouter.post('/entries', async (req, res) => {
    try {
        const { title, summary, tags } = req.body
        const newEntry = await Entry.create({ title, summary, tags })
        res.status(201).json(newEntry)
    } catch (error) {
        console.log(`Error while trying to create entry`, error)
        res.status(400).json({ error: 'Failed to create entry', details: safeErrorDetails(error) })
    }
})

// Update
adminRouter.put('/entries/:id', async (req, res) => {
    try {
        const { title, summary, tags } = req.body
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            { title, summary, tags },
            { new: true, runValidators: true }
        ).exec()
        res.status(200).json(updatedEntry)
    } catch (error) {
        console.log(`Error while trying to update entry`, error)
        res.status(400).json({ error: 'Failed to update entry', details: safeErrorDetails(error) })
    }
})

// Delete
adminRouter.delete('/entries/:id', async (req, res) => {
    try {
        await Entry.findByIdAndDelete(req.params.id).exec()
        res.status(200).json({ message: 'Entry deleted successfully' })
    } catch (error) {
        console.log(`Error while trying to delete entry`, error)
        res.status(400).json({ error: 'Failed to delete entry' })
    }
})

module.exports = adminRouter;
