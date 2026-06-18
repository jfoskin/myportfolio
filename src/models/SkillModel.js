const mongoose, { Schema } = require('mongoose')

const skillSchema = new Schema({
    name: String,
    image: String,
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill