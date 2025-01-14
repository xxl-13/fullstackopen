import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockAddLikes

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5
    }

    mockAddLikes = vi.fn()
    const mockRemoveBlog = vi.fn()

    container = render(
      <Blog
        blog={blog}
        addLikes={mockAddLikes}
        own={true}
        removeBlog={mockRemoveBlog}
      />
    ).container
  })

  test('default diplay', () => {
    const div = container.querySelector('.hidenContent')
    expect(div).toHaveStyle('display: none')
  })

  test('show url and likes when the button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.hidenContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('click the like button twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockAddLikes.mock.calls).toHaveLength(2)
  })
})
