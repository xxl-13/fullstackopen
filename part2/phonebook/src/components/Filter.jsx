const Filter = ({ searchTerm, setSearchTerm }) => {
  return (
    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  )
}

export default Filter