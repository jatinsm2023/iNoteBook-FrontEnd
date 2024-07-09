import React from "react";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import ComplexNavbar from "./Components/Navbar";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Login from './Components/Login';
import Edit from './Components/Edit'
import "./App.css";
function App() {
  return (
    <>
      <NoteState>
        <ComplexNavbar />

      
        <Routes>

            <Route path="/Login" element={<Login />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
