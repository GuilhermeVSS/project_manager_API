const express = require('express');

const app = express();

app.use(express.json())

const projects = []
var count = 0

//Middleware

app.use((req,res, next)=>{
    count += 1
    console.log(`Already been done ${count} requisitions `)

    return next()
})

function checkProjectExists(req,res,next){
    if(!projects[req.params.id]){
        return res.status(400).send({erro:"User not found"})
    }
   
    return next()
}

//Routes
app.get('/projects', (req,res)=>{
    
    return res.status(200).json(projects);
})

app.post('/projects', (req,res)=>{
   const project = req.body

   projects.push(project)

   return res.status(201).json(projects);
})

app.put('/projects/:id', checkProjectExists, (req,res)=>{
    const id = req.params.id
    const {title} = req.body
    
    projects[id].title = title

    return res.status(200).json(projects);
})

app.delete('/projects/:id', checkProjectExists, (req,res)=>{
    const id = req.params.id

    projects.splice(id, 1)

    return res.send(200).json(projects);
})


app.post('/projects/:id/:task', checkProjectExists, (req,res)=>{
    const id = req.params.id
    const task = req.params.task
    const {title} = req.body

    projects[id].tasks.push(title)

    return res.status(201).json(projects);
})



app.listen(3000,()=>{
    console.log('Connected to the server')
})