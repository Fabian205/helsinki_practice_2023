/*---------------------------------------------------
 |                      STEP 1                      |                        
 ---------------------------------------------------*/
/* const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */

/*---------------------------------------------------
 |                      STEP   2                    |                       
 ---------------------------------------------------*/
/* const express = require('express');
const app = express();


app.use(express.json());

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
  response.header('Content-Type', 'application/json');
  response.end (JSON.stringify(notes,null,2))
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */


/*---------------------------------------------------
 |                      STEP 3                      |                        
 ---------------------------------------------------*/

/* const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2];
//For run: node index.js <password>

const url = `mongodb+srv://fabaguilar205:${password}@cluster0.b8srfnl.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)  */


/*---------------------------------------------------
 |                      STEP 4                      |                        
 ---------------------------------------------------*/
/* require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGO_DB_URI;
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */

/*---------------------------------------------------
 |                      STEP 5                      |                        
 ---------------------------------------------------*/

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Note = require('./models/note')

app.use(express.json());

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

/* app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const note = new Note({
    content: body.content,
    date: body.date,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
}) */

app.post('/api/notes', async (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  try {
    // Check if a note with the same content already exists
    const existingNote = await Note.findOne({ content: body.content });

    if (existingNote) {
      return response.status(409).json({ error: 'Note with the same content already exists' });
    }

    const note = new Note({
      content: body.content,
      date: body.date,
      important: body.important || false,
    });

    const savedNote = await note.save();
    response.json(savedNote);
  } catch (error) {
    console.error('Error saving note:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
  .then(note => {
    if (note) {        
      response.json(note)      
    } else {        
      response.status(404).end()      
    }
  })
  .catch(error => {      
    console.log(error)      
    //response.status(500).end() 
    response.status(400).send({ error: 'malformatted id' })
  })
  
})

app.delete('/api/notes/:id', async (req, res) => {
  const idToDelete = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(idToDelete);

    if (deletedNote) {
      res.json({ message: 'Note deleted successfully', deletedNote });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/api/notes/:id', async (req, res) => {
  const idToUpdate = req.params.id;
  const { content, important } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      idToUpdate,
      { content, important },
      { new: true, runValidators: true }
    );

    if (updatedNote) {
      res.json({ message: 'Note updated successfully', updatedNote });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


