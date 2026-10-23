// Dependencies
require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT
let previousPage = "None"

const uri = process.env.DATABASEURL;


const adminRoutes = require('./src/routes/admin');
const projectRouter = require('./src/routes/projectRoutes');
const skillRouter = require('./src/routes/skillRoutes');
const entryRouter = require('./src/routes/entryRoutes')
const contactRouter = require('./src/routes/contactRoute')


// DATABASE CONNECTION

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', (error) => console.log(error.message, `Database has an error`));
db.on('connected', () => console.log(`Database has successfully connected`));
db.on('disconnected', () => console.log(`Database has disconnected`));


//MIDDLEWARE
//this runs in between requests and responses
app.use(cors({
    origin: process.env.CORS_ORIGIN.split(",").map(o => o.trim())
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    previousPage = req.path
    next()
});

app.use('/projects', projectRouter)
app.use('/skills', skillRouter)
app.use('/entries', entryRouter)
app.use('/mgmt', adminRoutes)
app.use('/contact', contactRouter)


// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// 404 handler - no route matched
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
});

// Centralized error handler - catches errors passed via next(err) or thrown in async routes
app.use((err, req, res, next) => {
    console.error(err.stack || err)

    const status = err.status || 500
    const message = status === 500 ? 'Internal server error' : err.message

    res.status(status).json({ error: message })
});


// Ports

app.listen(PORT, () => {
    console.log(`Express is listensing on Port ${PORT}`)
});
