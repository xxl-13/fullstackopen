import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const { data: genreData } = useQuery(ALL_GENRES)

  useEffect(() => {
    refetch({ genre })
  }, [genre, refetch])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }
  const books = data.allBooks
  const genres = genreData.allGenres

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
