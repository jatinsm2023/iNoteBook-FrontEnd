import React from "react";
import NoteContext from "./noteContext";
import toast from "react-hot-toast";
const NoteState = (props) => {
  const host = "https://inotebook-backend-xujt.onrender.com";
  const n1 = [];

  const [notes, setNotes] = React.useState(n1);

  //Get all notes
  const getNotes = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add
  const addNote = async (title, description, tag) => {
    // fetch api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if(response.status === 400){
      toast.error("Please fill all the fields",{duration:2000});
    }
    else if(response.status === 500){
      toast.error("Internal Server Error",{duration:2000});
    }
    else{
      toast.success("Note Added",{duration:2000});
    }
   
   
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    console.log(json);
  };

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
  };
  return (
    <>
      {/* <Toaster /> */}
      <NoteContext.Provider
        value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
