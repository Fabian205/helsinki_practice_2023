import Note from "./components/note";

/* const Note = ({ note }) => {
  return <li>{note.content}</li>;
}; */

const App = ({ notes }) => {
  //const { notes } = props;

  /* const result = notes.map((note) => note.content);
  console.log(result); */

  

  return (
    <div>
      {/* <h1>Notes</h1>
      <ul>
        
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul> */}
      <h1>Notes</h1>
      {/* <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul> */}
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}{" "}
      </ul>
    </div>
  );
};

export default App;
