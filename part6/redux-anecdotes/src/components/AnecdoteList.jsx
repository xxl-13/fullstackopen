import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/messageReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.includes(filter))
    })
    const dispatch = useDispatch()

    const voteHandler = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setMessage(`You voted for '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
        </div>
        )}
        </div>
    )
}

export default AnecdoteList