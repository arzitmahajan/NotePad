import React,{useContext} from 'react'
import NoteContext from '../Context/notes/noteContext';
const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { notes,updateModal} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title mr-auto">{notes.title}</h5>
                        <i className="fa-solid fa-trash-arrow-up mx-1" onClick={()=>{deleteNote(notes._id); props.showAlert("Deleted Successfully","success")}}></i>
                        <i className="fa-solid fa-pencil mx-1" onClick={()=>{updateModal(notes)}}></i>
                    </div>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem