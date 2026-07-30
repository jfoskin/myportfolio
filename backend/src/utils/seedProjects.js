const mongoose = require('mongoose')
const Project = require('../models/ProjectModel')
require('dotenv').config()

const projects = [
    {
        title: 'Is It Safe For Me',
        github: 'https://github.com/jfoskin/isitsafeforme',
        description: 'A full stack app that checks product ingredients against user allergies and sensitivities to flag potential risks.',
        url: 'https://isitsafeforme.netlify.app'
    },
    {
        title: 'Hope',
        github: 'https://github.com/jfoskin/hope',
        description: 'A community support platform connecting people with local resources and volunteers.',
        url: 'https://hope-app.netlify.app'
    },
    {
        title: 'My Dev World Portfolio',
        github: 'https://github.com/jfoskin/myportfolio',
        description: 'A full stack MERN portfolio showcasing projects and skills, with an admin dashboard for content management.',
        url: 'https://mydevworld.netlify.app'
    },
]

async function seed() {
    await mongoose.connect(process.env.DATABASEURL)
    await Project.deleteMany({})
    await Project.insertMany(projects)
    console.log('Projects seeded')
    process.exit(0)
}

seed()
