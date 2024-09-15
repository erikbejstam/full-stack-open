import { useEffect, useState } from 'react'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

      personService
        .create(personObject)
        .then(response => {
          console.log('personObj (', personObject, ') posted to server')
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('post request failed: ', error)
        }
        )
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