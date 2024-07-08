import React from "react";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import "./App.css";
function App() {
  return (
    <>
      <NoteState>
        <Navbar />

      
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
