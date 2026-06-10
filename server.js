// Dependencies
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000
let previousPage = "None"


const projects = ['isitsafeforme', 'hope',]

//MIDDLEWARE
//this runs in between requests and responses

// app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next)=>{
    console.log(`hey there the middle ware is running`)
    console.log(`hey yyyaaaaaaa Previous page ${previousPage} 
        currentPage ${req.path}`)

    previousPage = req.path
    next()
});

// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
app.get('/', (req,res)=> {
    res.send('Hello World!')
});

app.get('/about', (req,res)=> {
    res.send('Hello World!')
});

app.get('/projects', (req,res)=> {
    // res.send('Hello there!')
    console.log(req.query)
});

// app.get('/about', (req,res) => {
//     try {
//         res.sendFile(__dirname, 'public','about.html')
//     } catch (error) {
//         res.send(error)
//     }
// });

app.get("/projects/:id", (req,res)=> {
    let id = req.params.id
    res.send(projects[id])
});

// Ports

app.listen(PORT, ()=>{
    console.log(`Express is listensing on Port ${PORT}`)
});
