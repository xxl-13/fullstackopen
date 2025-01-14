import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control type="text" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control type="text" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="author" />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control type="text" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="url" />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
