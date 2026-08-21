const mongoose = require('mongoose')
const Entry = require('../models/EntryModel')
require('dotenv').config()

const entries = [
    {
        title: 'Portfolio building',
        tags: ['node', 'react', 'mongodb'],
        summary: 'started looking into how I was going to structure my learning in my porfotlio section'
    }
]


async function seed() {
    await mongoose.connect(process.env.DATABASEURL)
    await Entry.deleteMany({})
    await Entry.insertMany(entries)
    console.log('Entries seeded')
    process.exit(0)
}

seed()