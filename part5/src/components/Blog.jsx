import { useState } from 'react'

const Blog = ({ blog , addLikes, own, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log('own:', own)
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hidden' : 'view'}</button>
      <div style={showWhenVisible} className='hidenContent'>
        <p>Url:{blog.url}</p>
        Likes:{blog.likes}<button onClick={() => addLikes(blog)}>like</button>
        {own && <div><button onClick={() => removeBlog(blog)}>remove</button></div>}
      </div>
    </div>
  )
}

export default Blog