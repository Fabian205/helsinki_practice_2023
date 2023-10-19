import { useState, useRef, useEffect } from "react";
import Note from "./components/Note";
import Filter from "./components/Filter";
import NoteList from "./components/NoteList";
//import axios from "axios";
import ToggleImportant from "./components/ToggleImportant ";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";


const App = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //debugger;
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  /* useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []); */

  const hook = () => {
    //axios.get("http://localhost:3001/notes")
    noteService
      .getAll()
      /* .then(response => {        
        setNotes(response.data) */
      .then((initialNotes) => {
        setNotes(initialNotes);
      });
  };
  useEffect(hook, []);
  //console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      //id: notes.length + 1,
    };
    //console.log("addNote" + newNote);
    //console.log("addNote", notes);

    /*const iquals = (newNote, notes) => {
      return notes.some((note) => note.content === newNote);
    }; */

    //if (iquals(newNote, notes)) {
    if (notes.some((note) => note.content === newNote)) {
      //console.log(`${newNote} is already added to phonebook`);
      alert(`${newNote} is already added to phonebook`);
      setNewNote("");
    } else {
      //axios.post("http://localhost:3001/notes", noteObject)
      noteService
        .create(noteObject)
        /* .then((response) => {
        setNotes(notes.concat(response.data)); */
        .then((returnedNote) => {
          setNotes(notes.concat(returnedNote));
          setNewNote("");
        });

      /* setNotes(notes.concat(noteObject));
      setNewNote(""); */
      //console.log("button clicked", event.target);
      //console.log(`${newNote} is already added to notes`);
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

  const toggleImportanceOf = (id) => {
    //const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    //axios.put(url, changedNote)
    noteService
      .update(id, changedNote)
      /* .then((response) => {
      setNotes(notes.map((n) => (n.id !== id ? n : response.data))); */
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        //alert(`the note '${note.content}' was already deleted from server`);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )        
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const toggleRemoveOf = (id, content) => {
    if (window.confirm(`Delete ${content} ?`)) {
      console.log("si se elimina");
      noteService.remove(id).then(data => {
        setNotes(notes.filter((note) => note.id !== id ));
      });
    } else {
      //console.log("no se elimina");
      //alert("This note dont't have been removed from server");
      //window.open("exit.html", "Thanks for Visiting!");
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            toggleRemove={() => toggleRemoveOf(note.id, note.content)}
          />
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
      <Footer />
    </div>
  );
};

export default App;
