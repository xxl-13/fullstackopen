import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => { e.preventDefault()
        dispatch(createAnecdote(e.target.anecdote.value)) }}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm