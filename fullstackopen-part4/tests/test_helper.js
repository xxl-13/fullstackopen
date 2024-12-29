const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'Author One',
        url: 'http://example.com/first',
        likes: 5
    },
    {
        title: 'Second Blog',
        author: 'Author Two',
        url: 'http://example.com/second',
        likes: 10
    }
]

const initialUser = {
        username: 'user1',
        name: 'User One',
        password: 'password1'
    }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
  initialBlogs, initialUser, blogsInDb, usersInDb
}