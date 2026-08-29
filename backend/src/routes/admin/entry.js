const express = require('express')
const Entry = require('../../models/EntryModel')
const adminRouter = express.Router()

// Create
adminRouter.post('/entries', async (req, res) => {
    try {
        const { title, summary, tags } = req.body
        const newEntry = await Entry.create({ title, summary, tags })
        res.status(201).json(newEntry)
    } catch (error) {
        res.status(400).json({ error: 'Failed to create entry', details: error.message })
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
        res.status(400).json({ error: 'Failed to update entry', details: error.message })
    }
})

// Delete
adminRouter.delete('/entries/:id', async (req, res) => {
    try {
        await Entry.findByIdAndDelete(req.params.id).exec()
        res.status(200).json({ message: 'Entry deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete entry', details: error.message })
    }
})

module.exports = adminRouter;
