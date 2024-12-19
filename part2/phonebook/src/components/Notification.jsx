const Notification = ({ context, status }) => {
    const notificationStyle = {
        color: status ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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