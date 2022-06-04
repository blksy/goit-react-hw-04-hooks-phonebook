import React, { Component } from 'react'
import Phonebook from './Phonebook/Phonebook'
import Contacts from "./Contacts/Contacts"
import Filter from './Filter/Filter'
import { nanoid } from 'nanoid'
import './App.css'

export default class App extends Component {
  state = {
    contacts: [],
    filter: ''
   }

   filterOnChange  = e => {
    const {value} = e.currentTarget
    this.setState({ filter: value });
  };
  
  formSubmit = data => {
    let arrName = this.state.contacts.map(el=>el.name.toLowerCase())
  
    let newContact = {id: nanoid(), ...data}
    arrName.includes(data.name.toLowerCase()) ? alert(`${data.name} is already in your contacts`) : 
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }))
    
  }
  
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount () {
   const parsedContacts = JSON.parse(localStorage.getItem("contacts"))
   if (localStorage.getItem("contacts")) {this.setState ({ contacts: [...parsedContacts] })};
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

  render() {   
    const toLowFilter = this.state.filter.toLowerCase()
    const visibleContacts = this.state.contacts.filter(cont => cont.name.toLowerCase().includes(toLowFilter))
    return (
     <div className='container'>
      <h2>Phonebook</h2>
      <Phonebook className="Phonebook" onSubmit={this.formSubmit}  />     
      <h2>Contacts</h2>   
      {this.state.contacts.length ?
       <div className='contacts-wrapper'>
       <Filter filter={this.state.filter} changeFilter={this.filterOnChange}/> 
       <Contacts filter={this.state.filter} deleteContact={this.deleteContact} filterOnChange={this.filterOnChange} contactsList={visibleContacts}/> 
       </div>
       : <h2>There no contacts in Your phonebook yet!</h2>}     
     </div>
    )
  }
}