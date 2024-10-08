import { useEffect, useState } from 'react'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)

  const app = {
    margin: '10px'
  }

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
    
    const personAlreadyInPhonebook = persons.find(person => person.name === newName)
    if (personAlreadyInPhonebook){
      const msg = `${newName} is already in the phonebook. Replace the current number with new one?`
      if (window.confirm(msg)){
        const updatedPersonObject = {...personAlreadyInPhonebook, number: newNumber}

        personService
          .update(personAlreadyInPhonebook.id, updatedPersonObject)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== personAlreadyInPhonebook.id ? person : response.data
            ))
          })
          .then(() => { 
            setNotification({msg: `Successfully updated ${newName}'s number`, type: 'success'})
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log('error updating: ', error)
            setNotification({msg: `${newName}'s information has already been removed 
              from the server`, type: 'fail'})
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setNotification({msg: `Successfully added ${newName}`, type: 'success'})
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log('post request failed: ', error)
          setNotification({msg: `${newName} could not be entered into the phonebook`, type: 'fail'})
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        }
        )
        .then(() => {
          setNotification({msg: `Successfully deleted ${person.name}`, type: 'success'})
          setTimeout(() => {
            setNotification(null)
          }, 5000);
        })
        .catch(error => {
          console.log('Error: ', error)
          setNotification({msg: `Failed to delete ${person.name}`, type: 'fail'})
        })
    }
  }

  console.log(persons)

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
    <div style={app}>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h2>Add a new person</h2>
      <PersonForm formProps={formProps}/>

      <h2>Numbers</h2>
      <PersonList persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App