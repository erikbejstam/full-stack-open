const Notification = ({notification}) => {
  if (!notification) return null

  let {msg, type} = notification

  const notificationStyle = {
    font: '25px Times New Roman',
    color: type === 'success' ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    padding: '10px',
    border: `3px solid ${type === 'success' ? 'green' : 'red'}`,
    marginBottom: '10px',
  }

  return (
      <div style={notificationStyle}>
        {msg}
      </div>
    )
}

export default Notification