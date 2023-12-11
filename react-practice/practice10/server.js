import express from 'express'
import mongodb from 'mongodb'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

const { MongoClient } = mongodb
const ObjectID = mongodb.ObjectId

config()

const app = express()
const PORT = process.env.PORT || 3000

const client = new MongoClient(process.env.MONGODB_URI)

async function connectToMongo () {
  try {
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
}

const database = client.db('test')
const personCollection = database.collection('people')

connectToMongo()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.end('<h2>FullStack Helsinki Part3!</h2>')
})

// Endpoint to show dates of mongodb
app.get('/api/persons', async (req, res) => {
  try {
    const persons = await personCollection.find().toArray()
    const personTransfor = persons.map(({ _id, name, number }) => ({
      id: _id,
      name,
      number
    }))
    res.json(personTransfor)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).send('Error interno del servidor')
  }
})

// Endpoint to save dates in mongodb
app.post('/api/persons', async (req, res) => {
  try {
    const database = client.db('test')
    const collection = database.collection('people')
    const datos = req.body
    const resultado = await collection.insertOne(datos)

    res.json({
      mensaje: 'Datos guardados correctamente',
      id: resultado.insertedId
    })
  } catch (error) {
    console.error('Error al guardar datos en MongoDB:', error)
    res.status(500).json({ mensaje: 'Error al guardar datos en MongoDB' })
  }
})

// endpoint to delete person
app.delete('/api/persons/:id', async (req, res) => {
  const idToDelete = req.params.id
  try {
    const database = client.db('test')
    const collection = database.collection('people')
    const filtro = { _id: new ObjectID(idToDelete) }
    const resultado = await collection.deleteOne(filtro)
    if (resultado.deletedCount === 1) {
      res.json({ mensaje: 'Documento eliminado correctamente' })
    } else {
      res.status(404).json({ mensaje: 'Documento no encontrado' })
    }
  } catch (error) {
    console.error('Error al eliminar documento:', error)
    res.status(500).json({ mensaje: 'Error al eliminar documento' })
  }
})

app.put('/api/persons/:id', async (req, res) => {
  const id = req.params.id
  const { name, number } = req.body
  // console.log("idToUpdate", id, name, number);
  try {
    const database = client.db('test')
    const collection = database.collection('people')

    // Validate and update the data in the database
    const updatedPerson = await collection.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { name, number } },
      { returnDocument: 'after' }
    )
    // res.json(updatedPerson.value);
    if (updatedPerson) {
      res.json({ message: 'Person updated successfully', updatedPerson })
    } else {
      res.status(404).json({ message: 'Person not found' })
    }
  } catch (error) {
    console.error('Error updating person:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
