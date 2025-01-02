const Notification = ({ context, success }) => {
  const notificationStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    color: success ? 'green' : 'red'
  }

  if (context === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {context}
    </div>
  )
}

export default Notification