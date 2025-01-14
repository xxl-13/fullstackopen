import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Nav, Navbar } from 'react-bootstrap'

const Menu = ({ userName }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    dispatch(removeUser())
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Bloglist</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            users
          </Nav.Link>
        </Nav>
        <Navbar.Text>{userName} logged in</Navbar.Text>
        <button onClick={handleLogout} className="btn btn-outline-danger ml-2">
          logout
        </button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
