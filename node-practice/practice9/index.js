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

/* require('dotenv').config();
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
 
 app.post('/api/notes', (request, response) => {
  const body = request.body

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

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
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
console.log(`Server running on port ${PORT}`) */

/*---------------------------------------------------
|                      STEP     6                   |                        
 ---------------------------------------------------*/

require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const mongoose = require("mongoose");
const Note = require("./models/note");

app.use(express.json());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGO_DB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.render("index", { notes });
  } catch (error) {
    console.error("Error al recuperar las notas desde MongoDB:", error);
    res.status(500).send("Error interno del servidor");
  }
});

//filter
app.get('/filter', async (req, res) => {
  try {
    const filter = req.query.filter;
    let notes;

    if (filter) {
      notes = await Note.find({ content: { $regex: filter, $options: 'i' } }); // Case-insensitive search
    } else {
      notes = await Note.find({});
    }
    // Log for debugging
    console.log('Filter:', filter);

    res.render('index', { notes, filter });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//SAVE NOTES THAT DO NOT YET EXIS IN THE DB
app.post("/api/notes", async (request, response, next) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  try {
    // Check if a note with the same content already exists
    const existingNote = await Note.findOne({ content: body.content });

    if (existingNote) {
      return response
        .status(409)
        .json({ error: "Note with the same content already exists" });
    }

    const note = new Note({
      content: body.content,
      date: body.date,
      important: body.important || false,
    });
    /* const savedNote = await note.save();
    response.json(savedNote); */
    note
      .save()
      .then((savedNote) => {
        response.json(savedNote);
        
      })
      .catch((error) => next(error));
  } catch (error) {
    console.error("Error saving note:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

/* const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint); */

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);


app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    /* .catch(error => {      
      console.log(error)      
      //response.status(500).end() 
      response.status(400).send({ error: 'malformatted id' })
    }) */
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", async (req, res) => {
  const idToDelete = req.params.id;
  try {
    const deletedNote = await Note.findByIdAndDelete(idToDelete);

    if (deletedNote) {
      res.json({ message: "Note deleted successfully", deletedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
}) */

app.put("/api/notes/:id", async (req, res) => {
  //app.put('/api/notes/:id', (req, res, next) => {
  const idToUpdate = req.params.id;
  const { content, important } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      //Note.findByIdAndUpdate(
      idToUpdate,
      { content, important },
      { new: true, runValidators: true, context: "query" }
    );
    /* .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error)) */
    if (updatedNote) {
      res.json({ message: "Note updated successfully", updatedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
}) */

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
