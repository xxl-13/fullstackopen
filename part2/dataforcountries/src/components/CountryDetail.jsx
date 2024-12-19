import Weather from './Weather';

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} </p>
      <h3>Languages:</h3>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default CountryDetail;
