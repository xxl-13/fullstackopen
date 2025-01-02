import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('create a new blog', async () => {
  const newBlog = {
    title: 'title',
    author: 'author',
    url: 'url'
  }

  const createBlog = vi.fn()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const user = userEvent.setup()
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  await user.type(title, 'title')
  await user.type(author, 'author')
  await user.type(url, 'url')

  const button = screen.getByText('create')

  await user.click(button)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
})