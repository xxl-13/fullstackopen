import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, addLike, removeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import User from './components/User'
import Menu from './components/Menu'
import BlogList from './components/BlogList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const users = useSelector(state => state.users)
  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(
        setNotification(
          {
            content: `${user.username} has logged in successfully`,
            success: true
          },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            content: `${exception.response.data.error}`,
            success: false
          },
          5
        )
      )
    }
  }

  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className="container">
      <Menu userName={user.name} />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
