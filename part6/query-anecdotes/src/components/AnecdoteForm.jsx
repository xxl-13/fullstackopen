import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })
  const dispatch = useNotificationDispatch()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newNoteMutation.mutate(content, {
      onSuccess: () => {
        dispatch({ type: 'SET', payload: `you created '${content}'` })
        setTimeout(() => {
          dispatch({ type: 'REMOVE' })
        }, 5000)
      },
      onError: (error) => {
        console.log("error",error)
        dispatch({ type: 'SET', payload: error.response.data.error })
        setTimeout(() => {
          dispatch({ type: 'REMOVE' })
        }, 5000)
      }
    })
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
