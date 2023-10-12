import { useState, useRef, useEffect } from "react";
import Note from "./components/Note";
import Filter from "./components/Filter";
import NoteList from "./components/NoteList";

import ToggleImportant from "./components/ToggleImportant ";


const App = (props) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //debugger;
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    //console.log("addNote" + newNote);
    //console.log("addNote", notes);

    /* const iquals = (newNote, notes) => {
      return notes.some((note) => note.content === newNote);
    }; */

    //if (iquals(newNote, notes)) {
      if (notes.some((note) => note.content === newNote)) {
      //console.log(`${newNote} is already added to phonebook`);
      alert(`${newNote} is already added to phonebook`);
      setNewNote("");
    } else {
      setNotes(notes.concat(noteObject));
      setNewNote("");
      //console.log("button clicked", event.target);
      console.log(`${newNote} is already added to notes`);
    }
  };
  
  /* const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }; */

  /* const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }; */

  const filteredNote = notes.filter((item) =>
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <h2>Filter by content</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      
      {/* <div>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div> */}
      <NoteList notes={filteredNote} />
      {/* <ul style={{ listStyleType: "none" }}>
        {filteredNote.map((item) => (
          <li style={{ marginBottom: "5px" }} key={item.id}>
            {item.content}
          </li>
        ))}
      </ul> */}


      <h2>Show all or important</h2>
      <ToggleImportant showAll={showAll} setShowAll={setShowAll} />

      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div> */}
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <h2>Add a new note</h2>
      {/* <Add notes={notes} /> */}
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">save</button>
      </form>
      {/* <div>debug: {newName}</div> */}
    </div>
  );
};

export default App;
