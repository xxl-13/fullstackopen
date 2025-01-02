import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ context: null, success: true })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ context: `${user.username} has logged in successfully`, success: true })
      setTimeout(() => {
        setMessage({ context: null, success: true })
      }, 3000)

    } catch (exception) {
      setMessage({ context: `${exception.response.data.error}`, success: false })
      setTimeout(() => {
        setMessage({ context: null, success: true })
      }, 3000)
    }
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({ context: `${newBlog.title} by ${newBlog.author} has been added`, success: true })
        setTimeout(() => {
          setMessage({ context: null, success: true })
        }, 3000)
      })
      .catch(error => {
        setMessage({ context: error, success: false })
        setTimeout(() => {
          setMessage({ context: null, success: true })
        }, 3000)
      })
  }

  const addLikes = (blog) => {
    const { user, ...rest } = blog
    const updatedBlog = { ...rest, likes: blog.likes + 1 }
    console.log('updatedBlog:', updatedBlog)
    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        const newBlog = { ...returnedBlog, user: blog.user }
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : newBlog))
      })
      .catch(error => {
        setMessage({ context: error, success: false })
        setTimeout(() => {
          setMessage({ context: null, success: true })
        }, 3000)
      })
  }

  const removeBlog = (blog) => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage({ context: `${blog.title} by ${blog.author} has been removed`, success: true })
          setTimeout(() => {
            setMessage({ context: null, success: true })
          }, 3000)
        })
        .catch(error => {
          setMessage({ context: error, success: false })
          setTimeout(() => {
            setMessage({ context: null, success: true })
          }, 3000)
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification context={message.context} success={message.success} />
        <h2>log in to application</h2>
        <Togglable buttonLabel='login'>
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
    <div>
      <Notification context={message.context} success={message.success} />
      <h2>blogs</h2>
      <p>{user.name} logged-in</p>
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogListUser')
        setUser(null)
      }}>logout</button>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog}
            addLikes={addLikes}
            own={blog.user.username ? blog.user.username === user.username : true}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

export default App