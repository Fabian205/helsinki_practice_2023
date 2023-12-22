import PropTypes from 'prop-types'

const Person = ({ person }) => {
  return (
    <li>{person.name} &nbsp;{person.number}</li>
  )
}

Person.propTypes = {
  person: PropTypes.string.isRequired
}
export default Person
