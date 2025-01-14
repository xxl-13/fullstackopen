import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const own = blog.user.username ? blog.user.username === user.username : true

  const addLikes = () => {
    const { user, ...rest } = blog
    const updatedBlog = { ...rest, likes: blog.likes + 1 }
    console.log('updatedBlog:', updatedBlog)
    dispatch(addLike(updatedBlog))
  }

  const deleteBlog = () => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        Url:{' '}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        Likes: {blog.likes}
        <Button onClick={addLikes}>like</Button>
      </p>
      <p>added by {blog.user.name}</p>
      {own && (
        <div>
          <Button onClick={deleteBlog}>remove</Button>
        </div>
      )}
    </div>
  )
}

export default Blog
