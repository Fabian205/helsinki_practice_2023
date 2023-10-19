import "../index.css"

const Note = ({ note, toggleImportance, toggleRemove }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>      
      <button onClick={toggleRemove}>Eliminar</button>
    </li>
  );
};

export default Note;
