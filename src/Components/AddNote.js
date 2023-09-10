import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    
    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleOnClick = (e) =>{
        e.preventDefault();
        try {
            addNote(note.title, note.description, note.tag);
            setNote({title:"", description:"", tag:""});
            props.showAlert("Note Added","success")
        } catch (error) {
            props.showAlert(error.message,"danger")
        }
    }
    const onChanges = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div className="container my-3">
            <h1>Add a note</h1>
            <form action=''>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChanges} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChanges} minLength={5} value={note.description} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChanges} value={note.tag} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleOnClick} disabled={note.title.length<5 || note.description.length<5}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote