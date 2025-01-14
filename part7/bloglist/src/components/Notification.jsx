import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { content, success } = useSelector(state => state.notification)
  console.log('content:', content)

  if (content === null) {
    return null
  }

  return <Alert variant={success ? 'success' : 'danger'}>{content}</Alert>
}

export default Notification
