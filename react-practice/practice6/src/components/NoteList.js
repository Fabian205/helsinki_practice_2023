import React from "react";
//import Note from "./Note";

const NoteList = ({ notes }) => {
  return (
    <ul>
      {notes.map((note) => (
        <li style={{ marginBottom: "5px" }} key={note.id}>
          {/* <Note note={note} /> */}
          {note.content}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
