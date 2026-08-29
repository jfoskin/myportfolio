const express = require('express');
const entryRouter = express.Router();
const Entry = require('../models/EntryModel');

entryRouter.get('/', async (req, res) => {
    try {
        const entries = await Entry.find({})
        res.status(200).json(entries)
    } catch (error) {
        console.log(`Error while trying to get all entries`, error)
        res.status(500).json({
            error: `Failed to get all entries`,
            details: error.message
        })
    }
})

entryRouter.post('/', async (req, res) => {
    const entry = req.body

    try {

        const newEntry = await Entry.create(entry)
        res.status(201).json(newEntry)

    } catch (error) {
        console.log("Failed to save entry", error)
        res.status(500).json({ error: "Couldn't save entry" })
    }
})

module.exports = entryRouter