import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdote = content =>
    axios.post('http://localhost:3001/anecdotes', { content, votes: 0 }).then(res => res.data)

export const updateAnecdote = (updatedAnecdote) =>
    axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)