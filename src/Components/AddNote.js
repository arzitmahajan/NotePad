import React,{useContext,useState} from 'react'
import NoteContext from '../Context/notes/noteContext';
const AddNote = (props) => {
    const [note, setnote] = useState({title:"",description:"",tag:"default"});
    const context = useContext(NoteContext);
    const {addNote } = context;
    const handleSubmit = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""});
        props.showAlert("New Note Added","success");
    }
    const onChange = (e)=>{
        //spread operator i used to overwrite or we can say aage add krta jaye chize and 
        //e.target.name means jo name attribute use kiya input tag agar  vo change hota to usme change krte jao
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3 form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" placeholder="Note description" name="description" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tg" placeholder="Specify tag" name="description" onChange={onChange}/>
                    </div>
                    <button disabled ={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote