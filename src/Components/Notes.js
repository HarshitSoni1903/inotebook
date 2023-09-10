import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:"general"})
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token"))
        getNotes()
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNotes = (currentNote) => {
        //console.log("modal toggle")
        try {
            setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
            //props.showAlert("Note Updated click Successfully","success");
        } catch (error) {
            props.showAlert(error.message,"danger");
        }
        
    }
    const ref = useRef(null)


    const handleOnClick = (e) =>{
        e.preventDefault();
        try {
            editNote(note.id, note.etitle, note.edescription, note.etag);
            ref.current.click();
            props.showAlert("Note Updated Successfully","success");
            
        } catch (error) {
            //console.log(error.message)
            props.showAlert(error.message,"danger");
        } 
    }
    const onChanges = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            {/* <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#editNoteModal">
                Launch demo modal
            </button> */}
            <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editNoteModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action=''>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  aria-describedby="emailHelp" onChange={onChanges} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChanges} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChanges} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleOnClick}disabled={note.etitle.length<5 || note.edescription.length<5}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your notes</h1>
                {
                (notes.length===0)&&
                <div className="container">
                No Notes. Get started by adding a new note
                </div>}
                
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNotes} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes