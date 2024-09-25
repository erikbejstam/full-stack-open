const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const requestReceived = new Date()
    const infoString = `<div>
                            <p>Phonebook has info for ${persons.length} people.</p> 
                            <p>${requestReceived}</p>
                        </div>`
    response.send(infoString)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    person
     ? response.json(person)
     : response.status(404).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body){
        return response.status(400).json({
            error: 'content missing'
        })
    } else if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    } else if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const numberAlreadyInPhonebook = () => persons.find(p => p.name === body.name)

    if (numberAlreadyInPhonebook){
        return response.status(400).json({
            error: 'name is already in phonebook'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 100000 + 1),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})