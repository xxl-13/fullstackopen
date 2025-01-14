import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const Bloglist = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const addNewBlog = newBlog => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(newBlog))
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
      <div>
        <Table striped>
          <tbody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default Bloglist
