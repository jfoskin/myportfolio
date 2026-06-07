// Dependencies
const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

//MIDDLEWARE
//this runs in between requests and responses

app.use(express.static(path.join(__dirname,'public')))

// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
// app.get('/', (req,res,next)=> {
//     res.send('Hello World!')
// })

// app.get('/about', (req,res) => {
//     try {
//         res.sendFile(__dirname, 'public','about.html')
//     } catch (error) {
//         res.error(error)
//     }
// })

// Ports

app.listen(PORT,()=>{
    console.log(`Express is listensing on Port ${PORT}`)
})
