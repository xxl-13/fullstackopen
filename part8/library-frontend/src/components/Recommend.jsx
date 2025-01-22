import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
const Recommend = (props) => {
    const result = useQuery(ALL_BOOKS)
    const user = useQuery(ME)
    if (!props.show) {
        return null
    }

    const books = result.data.allBooks
    console.log('user', user)
    const genre = user.data.me.favoriteGenre    
    return (
        <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre <strong>{genre}</strong></p>
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
            {books
                .filter((a) => a.genres.includes(genre))
                .map((a) => (
                <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}
export default Recommend