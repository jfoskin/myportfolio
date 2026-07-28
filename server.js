// Dependencies
require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT
let previousPage = "None"


const projects = ['isitsafeforme', 'hope',]


const adminRoutes = require('./src/routes/admin');
const projectRoutes = require('./src/routes/projectRoutes');
const skillRoutes = require('./src/routes/skillRoutes');
//MIDDLEWARE
//this runs in between requests and responses
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`hey there the middle ware is running`)
    console.log(`hey yyyaaaaaaa Previous page ${previousPage} 
        currentPage ${req.path}`)

    previousPage = req.path
    next()
});

app.use('/login', (req, res, next) => {
    if (req.headers.x_api_key === 'supersecretkey') {
        next()
    } else {
        res.status(401).json({ error: 'Unauthorized: API Key required' })
    }
})

app.use('/mgmt', adminRoutes)
app.use('/projects', projectRoutes)
app.use('/skills', skillRoutes)


// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/login', (req, res) => {
    console.log(`you did a great job testing with postman`)
})

app.get('/about', (req, res) => {
    res.send('Hello World!')
});


// Example URL: /search?q=javascript&sort=popular

app.get('/search', (req, res) => {
    let category = req.query.cat || 'nothing'
    let size = req.query.size || 'nothing'

    res.send(` this is the cat ${category} and the size ${size} `)
})


// Ports

app.listen(PORT, () => {
    console.log(`Express is listensing on Port ${PORT}`)
});
