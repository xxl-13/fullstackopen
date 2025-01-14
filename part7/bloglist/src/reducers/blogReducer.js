import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find(a => a.id === id)
      blogToChange.likes++
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { like, createBlog, deleteBlog, setBlogs } = blogsSlice.actions

export const addLike = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch(like(updatedBlog.id))
      dispatch(setNotification({ content: `You liked ${blog.title} by ${blog.author}`, success: true }, 5))
    } catch (exception) {
      dispatch(setNotification({ content: exception.response.data.error, success: false }, 5))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = object => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(object)
      console.log('newBlog:')
      dispatch(createBlog(newBlog))
      dispatch(setNotification({ content: `${newBlog.title} by ${newBlog.author} has been added`, success: true }, 5))
    } catch (exception) {
      console.log('exception:', exception)
      dispatch(setNotification({ content: exception.response.data.error, success: false }, 5))
    }
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification({ content: `${blog.title} by ${blog.author} has been removed`, success: true }, 5))
    } catch (exception) {
      dispatch(setNotification({ content: exception.response.data.error, success: false }, 5))
    }
  }
}

export default blogsSlice.reducer
