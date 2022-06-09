import React, { Component } from 'react'
import Phonebook from './Phonebook/Phonebook'
import Contacts from "./Contacts/Contacts"
import Filter from './Filter/Filter'
import { nanoid } from 'nanoid'
import './App.css'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState("")
  const firstRen = useRef(false)

  useEffect(() => {
    if (firstRen.current) {
      localStorage.setItem("contacts", JSON.stringify(contacts))
    }
  }, [contacts])

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"))
   if (localStorage.getItem("contacts") && parsedContacts.length !== 0 ) {setContacts([...parsedContacts])};
   firstRen.current = true
  }, [])

  function formSubmit (data) {
    let arrName = contacts.map(el=>el.name.toLowerCase())
    let newContact = {id: nanoid(), ...data}
    arrName.includes(data.name.toLowerCase()) ? alert(`${data.name} is already in your contacts`) :
    setContacts([newContact, ...contacts])
  }

  const filterOnChange  = e => {
      const {value} = e.currentTarget
      setFilter(value);
  };

  const deleteContact = contactId => {
          setContacts(contacts.filter(contact => contact.id !== contactId))
  };


  const toLowFilter = filter.toLowerCase()

  const visibleContacts = contacts.filter(cont => cont.name.toLowerCase().includes(toLowFilter))
    return (
      <div className='container'>
        <h2>Phonebook</h2>
        <Phonebook className="Phonebook" onSubmit={formSubmit}  />
        <h2>Contacts</h2>
        {contacts.length ?
         <div className='contacts-wrapper'>
         <Filter filter={filter} changeFilter={filterOnChange}/>
         <Contacts filter={filter} deleteContact={deleteContact} filterOnChange={filterOnChange} contactsList={visibleContacts}/>
         </div>
       : <h2>There no contacts in Your phonebook yet!</h2>}
     </div>
    )
}

