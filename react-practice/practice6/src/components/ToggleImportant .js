import React from "react";

const ToggleImportant = ({ showAll, setShowAll }) => {
  return (
    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
    </div>
  );
};

export default ToggleImportant;