const mongoose = require('mongoose')
const Skill = require('../models/SkillModel')
require('dotenv').config()

const skills = [
    { name: 'JavaScript', image: 'https://img.icons8.com/?size=100&id=3752&format=png&color=000000' },
    { name: 'Python', image: 'https://img.icons8.com/?size=100&id=12584&format=png&color=000000' },
    { name: 'Node.js', image: 'https://img.icons8.com/?size=100&id=t9oCxEN7McHZ&format=png&color=000000' },
    { name: 'Express.js', image: 'https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000' },
    { name: 'TypeScript', image: 'https://img.icons8.com/?size=100&id=XC6sKtoLcrS1&format=png&color=000000' },
    { name: 'HTNL5', image: 'https://img.icons8.com/?size=100&id=xMFqdjFaUMbd&format=png&color=000000' },
    { name: 'React', image: 'https://img.icons8.com/?size=100&id=122637&format=png&color=000000' },
    { name: 'React Native', image: 'https://img.icons8.com/?size=100&id=Hk6McnZLAKHc&format=png&color=000000' },
    { name: 'Next.js', image: 'https://img.icons8.com/?size=100&id=r2OarXWQc7B6&format=png&color=000000' },
    { name: 'CSS', image: 'https://img.icons8.com/?size=100&id=R8fxXpKxlp9v&format=png&color=000000' },
    { name: 'Git', image: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
    { name: 'PostgreSQL', image: 'https://img.icons8.com/?size=100&id=25010&format=png&color=000000' },
    { name: 'MongoDB', image: 'https://img.icons8.com/?size=100&id=OdTjgPoHJeaK&format=png&color=000000' },
    { name: 'SQL', image: 'https://img.icons8.com/?size=100&id=3767&format=png&color=000000' },
    { name: 'NoSQL', image: 'https://img.icons8.com/?size=100&id=ldDPuBgZxAHN&format=png&color=000000' },
    { name: 'Figma', image: 'https://img.icons8.com/?size=100&id=GflC6KLkdd0Y&format=png&color=000000' },
    { name: 'edux', image: 'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=000000' },
    // { name: '', image: '' },

]

const projects = [
    {
        title: '',
        github: '',
        description: '',
        url: ''
    }
]

async function seed() {
    await mongoose.connect(process.env.DATABASEURL)
    await Skill.deleteMany({})
    await Skill.insertMany(skills)
    console.log('Skills seeded')
    process.exit(0)
}

seed()