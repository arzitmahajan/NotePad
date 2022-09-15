import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/noteContext';
import AddNote from './AddNote';
import Modal from './Modal';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const navigation = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNote,updateNote} = context;

  useEffect(() => {
    if(localStorage.getItem('Token')){
      console.log("yes");
      getNote();
    }
    else{
      navigation('/login');
    }
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote] = useState({
    id:'',
    etitle:'',
    edescription:'',
    etag:''
  });

  const updateModal = (currNote) => {
    ref.current.click();
    setNote({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description, 
      etag: currNote.tag
    });
  }
const handleClick= (e) =>{
  console.log("handled",note);
  updateNote(note.id,note.etitle,note.edescription,note.etag);
  refClose.current.click();
  props.showAlert("Updated Successfully","success");
}
const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <Modal  ref={refClose} handleClick = {handleClick} notedata = {note} onChange = {onChange}/>
      <div>
        <h1>Your Notes</h1>
        <div className='row my-3'>
          {notes.length===0 && <div className='container mx-2'>No Notes exists</div>}
          {notes.map((notes) => {
            return <NoteItem key={notes._id} notes={notes} updateModal={updateModal} showAlert={props.showAlert}/>;
          })}
        </div>
      </div>
    </>
  )
}

export default Notes