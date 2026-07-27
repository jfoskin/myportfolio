const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    github: {
        type: String,
        required: true,
        trim: true,
        match: [/^https:\/\/github\.com\/.+/, "Must be a valid GitHub URL"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    url: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, "Must be a valid URL"]
    },

})

const Project = mongoose.model('Project', projectSchema)