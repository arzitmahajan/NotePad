import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)


  const getNote = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    //client side add
    const json = await response.json();
    setnotes(json);

  }


  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    //client side add
    setnotes(notes.concat(note));

  }
  const deleteNote = async(id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(id)
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id = " + id);
    const newnote = notes.filter((goo) => { return goo._id !== id })
    setnotes(newnote);

  }

  const updateNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);

    let newNote = JSON.parse(JSON.stringify(notes));  
    //edit in client side
    for (let idx = 0; idx < newNote.length; idx++) {
      const element = newNote[idx];
      if (element._id === id) {
        newNote[idx].title = title;
        newNote[idx].description = description;
        newNote[idx].tag = tag;
        break;
      }
    }
    setnotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;