import { useState } from 'react'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)){
      const msg = `${newName} is already in the phonebook`
      alert(msg)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => {
    setShowAll(false)
    setNewSearch(event.target.value)
  }

  const formProps = {
    addPerson,
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
  };

  const personsToShow = showAll 
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(newSearch.toLowerCase()) 
    )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h2>Add a new person</h2>
      <PersonForm formProps={formProps}/>

      <h2>Numbers</h2>
      <PersonList persons={personsToShow}/>
    </div>
  )
}

export default App