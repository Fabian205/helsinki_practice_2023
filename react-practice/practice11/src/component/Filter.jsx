import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with:{' '}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

Filter.propTypes = {
  value: PropTypes.string.isRequired, // Cambia el tipo según el tipo de dato que esperas
  onChange: PropTypes.func.isRequired
}

export default Filter
