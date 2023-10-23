/* const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */


/* const http = require('http')

 let notes = [  
  { id: 1,    
    content: "HTML is easy",   
    important: true  },
  { id: 2,    
    content: "Browser can execute only JavaScript",    
    important: false  },  
  { id: 3,   
    content: "GET and POST are the most important methods of HTTP protocol",    
    important: true  }
]
    
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })  
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */

const express = require('express')

const morgan = require('morgan');

const app = express()

// Define a new token for morgan
morgan.token('postData', (req) => {
  return JSON.stringify(req.body);
});

// Middleware for logging with morgan, including the request body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

//app.use(morgan('tiny'));

const cors = require('cors')

app.use(cors())


app.use(express.json())

let notes = [  
  { id: 1,    
    content: "HTML is easy",   
    important: true  },
  { id: 2,    
    content: "Browser can execute only JavaScript",    
    important: false  },  
  { id: 3,   
    content: "GET and POST are the most important methods of HTTP protocol",    
    important: true  }
]

app.get('/', (request, response) => {
  response.end('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  //response.json(notes)
  request.header('Content-Type', 'application/json');
  response.end(JSON.stringify(notes, null, 2))
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)  
  const note = notes.find(note => note.id === id)
  if (note) {    
    response.json(note)  
  } else {    
    response.status(404).end()  
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
  }

  notes = notes.concat(note)
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).json("ok")
})

/* const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint) */




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//Deploy Fly.io
//https://node-practice8.fly.dev/api/notes