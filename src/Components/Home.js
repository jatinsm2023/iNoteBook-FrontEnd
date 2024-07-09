import React from "react";

import Notes from "./Notes";
import AddNote from "./AddNote";
export default function Home() {
  return (
    <>
      <div className="m-5">
        <AddNote />
        <br /><br />
        <Notes />
      </div>
    </>
  );
}
