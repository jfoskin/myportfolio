const mongoose = require('mongoose')
const Skill = require('../models/SkillModel')
require('dotenv').config()

const skills = [
    { name: 'JavaScript', image: 'https://img.icons8.com/?size=100&id=42769&format=png&color=ffffff' },
    { name: 'Python', image: 'https://img.icons8.com/?size=100&id=Z0PcQHo0lKzA&format=png&color=ffffff' },
    { name: 'Node.js', image: 'https://img.icons8.com/?size=100&id=t9oCxEN7McHZ&format=png&color=ffffff' },
    { name: 'Express.js', image: 'https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=ffffff' },
    { name: 'TypeScript', image: 'https://img.icons8.com/?size=100&id=XC6sKtoLcrS1&format=png&color=ffffff' },
    { name: 'HTML5', image: 'https://img.icons8.com/?size=100&id=xMFqdjFaUMbd&format=png&color=ffffff' },
    { name: 'React', image: 'https://img.icons8.com/?size=100&id=122637&format=png&color=ffffff' },
    { name: 'React Native', image: 'https://img.icons8.com/?size=100&id=122637&format=png&color=ffffff' },
    { name: 'Next.js', image: 'https://img.icons8.com/?size=100&id=r2OarXWQc7B6&format=png&color=ffffff' },
    { name: 'CSS', image: 'https://img.icons8.com/?size=100&id=R8fxXpKxlp9v&format=png&color=ffffff' },
    { name: 'Git', image: 'https://img.icons8.com/?size=100&id=38388&format=png&color=ffffff' },
    { name: 'PostgreSQL', image: 'https://img.icons8.com/?size=100&id=25010&format=png&color=ffffff' },
    { name: 'MongoDB', image: 'https://img.icons8.com/?size=100&id=OdTjgPoHJeaK&format=png&color=ffffff' },
    { name: 'SQL', image: 'https://img.icons8.com/?size=100&id=3767&format=png&color=ffffff' },
    { name: 'NoSQL', image: 'https://img.icons8.com/?size=100&id=ldDPuBgZxAHN&format=png&color=ffffff' },
    { name: 'Figma', image: 'https://img.icons8.com/?size=100&id=GflC6KLkdd0Y&format=png&color=ffffff' },
    { name: 'Redux', image: 'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=ffffff' },
    // { name: '', image: '' },

]


async function seed() {
    await mongoose.connect(process.env.DATABASEURL)
    await Skill.deleteMany({})
    await Skill.insertMany(skills)
    console.log('Skills seeded')
    process.exit(0)
}

seed()