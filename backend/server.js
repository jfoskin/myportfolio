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


// DATABASE CONNECTION

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', (error) => console.log(error.message, `Database has an error`));
db.on('connected', () => console.log(`Database has successfully connected`));
db.on('disconnected', () => console.log(`Database has disconnected`));


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

app.use('/projects', projectRouter)
app.use('/skills', skillRouter)
app.use('/entries', entryRouter)
app.use('/mgmt', adminRoutes)


// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
app.get('/', (req, res) => {
    res.send('Hello World!')
});


// Ports

app.listen(PORT, () => {
    console.log(`Express is listensing on Port ${PORT}`)
});
