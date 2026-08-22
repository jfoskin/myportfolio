const express = require('express');
const entryRouter = express.Router();
const Entry = require('../models/EntryModel');

entryRouter.get('/', async (req, res) => {
    try {
        const enries = await Entry.find({})
        res.status(200)
    } catch (error) {
        console.log(`Error while trying to get all projects`, error)
        res.status(400).json({
            error: `Failed to get all projects`,
            details: error.message
        })
    }
})

module.exports = entryRouter