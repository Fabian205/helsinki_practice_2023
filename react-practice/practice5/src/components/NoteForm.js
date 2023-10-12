import React, { useState } from "react";

const NoteForm = ({ addNote, inputRef }) => {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(newNote);
    setNewNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        ref={inputRef}
      />
      <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;

