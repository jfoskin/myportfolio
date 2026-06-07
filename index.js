// Dependencies
const express = require('express')
const app = express()

//MIDDLEWARE

//this runs in between requests and responses

// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
app.get('/', (req,res,next)=> {
    res.send('Hello World!')
})

app.get('/about', (req,res) => {
    try {
        res.send('about me here')
    } catch (error) {
        res.error(error)
    }
})

// Ports
const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Express is listensing on Port ${PORT}`)
})
