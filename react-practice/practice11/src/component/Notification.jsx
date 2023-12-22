import PropTypes from 'prop-types'

const Notification = ({ message, messageError }) => {
  if (message === null) {
    return null
  }

  return (
    <>{message &&
      <div className="success">
        <p className="textsuccess">{message}</p>
      </div>}
      {messageError &&
      <div className="error">
        <p className="texterror">{messageError}</p>
      </div>}
    </>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageError: PropTypes.string.isRequired
}

export default Notification
