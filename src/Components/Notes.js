import React from "react";
import noteContext from "../Context/notes/noteContext";
import { useContext, useEffect } from "react";
import Noteitem from "./Noteitem";
import {useNavigate} from 'react-router-dom'
function Notes() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if(localStorage.getItem("auth-token")){
      getNotes();
    }
    else{
      navigate('/Login');
    }
    // eslint-disable-next-line
  }, [notes]);

  
  return (
    <>
      <h1 className="font-bold text-3xl m-5 text-center uppercase">
        Your Notes
      </h1>
      <div className="max-w-screen-lg m-auto flex flex-wrap justify-center">
        {notes.length===0 && 
        <div className="text-2xl font-bold">No notes to display</div>
        }
        {notes.map((note, index) => {
          return <Noteitem key={index} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
