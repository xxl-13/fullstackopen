const CountryList = ({ countries, onShowCountry }) => {

    if (!countries) {
        console.log('no countries')
        return null
    } else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <ul>
        {countries.map(country => (
            <li key={country.cca3}>
            {country.name.common} <button onClick={() => onShowCountry(country)}>show</button>
            </li>
        ))}
        </ul>
    )
}

export default CountryList
