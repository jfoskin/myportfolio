const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    name: String,
    image: String,
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill