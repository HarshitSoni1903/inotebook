import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;

    const { note, updateNote } = props;
    //console.log(props);

    // const handleOnClick = (e)=>{
    //     e.preventDefault();

    // }

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{
                            try {
                                deleteNote(note._id);
                                props.showAlert("Note Deleted Successfully","success");
                            } catch (error) {
                                props.showAlert(error.message ,"danger");
                            }
                        }}></i>
                        <i className="fa-sharp fa-regular fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#editNoteModal" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>

    )
}

export default Noteitem