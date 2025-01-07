import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.includes(filter))
    })
    const dispatch = useDispatch()

    const voteHandler = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
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