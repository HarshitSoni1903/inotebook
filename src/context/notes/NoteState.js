import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const notesInit = [];

  const [notes, setNotes] = useState(notesInit)


  //Fetch all notes
  const getNotes = async () => {
    //api call to add the note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
  }


  const addNote = async (title, description, tag) => {
    //api call to add the note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ description, tag, title }),
    });
    const note = await response.json()
    //console.log("note added")
    //console.log(note)

    setNotes(notes.concat(note))
  }

  //delete note
  const deleteNote = async (id) => {
    //api call to add the note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const note = await response.json()
    console.log("Note deleted " + note);
    let newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote)
  }

  //Edit note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ description, tag, title }),
    });
    const jsonres = await response.json();
    console.log(jsonres)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        //console.log(newNotes[index])
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        //console.log(newNotes[index])
        break;
      }
    }
    //console.log(newNotes)
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState;