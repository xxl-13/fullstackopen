import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState({ context: null, status: true })

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('The initial persons data fetched:', initialPersons);
        setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      console.log('The existing person found:', existingPerson);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            console.log('Person updated successfully:', returnedPerson);
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage({ context: `The number of ${returnedPerson.name} has been updated successfully`, status: true })
            setTimeout(() => {
              setMessage({ context: null, status: true })
            }, 3000)
          })
          .catch(error => {
            setMessage({ context: error.response.data.error, status: false })
            setTimeout(() => {
              setMessage({ context: null, status: true })
            }, 3000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          console.log('Person added successfully:', returnedPerson);
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage({ context: `Added ${returnedPerson.name} successfully`, status: true })
          setTimeout(() => {
            setMessage({ context: null, status: true })
          }, 3000)
        })
        .catch(error => {
          setMessage({ context: error.response.data.error, status: false })
          setTimeout(() => {
            setMessage({ context: null, status: true })
          }, 3000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personsService
        .remove(id)
        .then(() => {
          console.log('The person has been deleted successfully')
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setMessage({ context: `${name} has already been removed from the server`, status: false })
          setTimeout(() => {
            setMessage({ context: null, status: true })
          }, 3000);
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification context={message.context} status={message.status}/>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App