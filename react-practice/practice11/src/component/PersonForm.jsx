import PropTypes from 'prop-types'

import React from 'react'

const PersonForm = ({
  onSubmit,
  newPerson,
  setNewPerson,
  newNumber,
  setNewNumber,
  inputRef
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{' '}
        <input
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  newPerson: PropTypes.string.isRequired,
  setNewPerson: PropTypes.string.isRequired,
  newNumber: PropTypes.number.isRequired,
  setNewNumber: PropTypes.number.isRequired,
  inputRef: PropTypes.string.isRequired
}
export default PersonForm
