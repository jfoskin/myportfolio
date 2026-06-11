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

app.use('/login',(req,res,next)=>{
    if(req.headers.x_api_key === 'supersecretkey'){
        next()
    }else{
        res.status(401).json({ error: 'Unauthorized: API Key required' })
    }
})

// Routes - INDUCES [Indexes,New, Delete, Update, Create,Edit,Show]
app.get('/', (req,res)=> {
    res.send('Hello World!')
});

app.get('/login',(req,res)=>{
    console.log(`you did a great job testing with postman`)
})

app.get('/about', (req,res)=> {
    res.send('Hello World!')
});

app.get('/skills',(req,res)=>{
    res.send(`Software engineering skills: JavaScript, TypeScript, React, Html`)
})

// Example URL: /search?q=javascript&sort=popular
app.get('/projects', (req,res)=> {
    // res.send('Hello there!')
    console.log(req.query)
});

app.get('/search', (req,res)=>{
    let category = req.query.cat || 'nothing'
    let size = req.query.size || 'nothing'

    res.send(` this is the cat ${category} and the size ${size} `)
})



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

app.post('/api/users', (req,res)=>{
    const newUsers = req.body
    console.log(`this is the new user ${newUsers}`)

    res.status(201).send(`created new users ${newUsers.name}`)
})

// Ports

app.listen(PORT, ()=>{
    console.log(`Express is listensing on Port ${PORT}`)
});
