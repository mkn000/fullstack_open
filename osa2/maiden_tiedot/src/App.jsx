import { useState, useEffect } from "react";
import countryService from "./services/countries";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p> capital: {country.capital[0]}</p>
      <p> area: {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, lang]) => (
          <li key={key}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} height="300" />
    </div>
  );
};

const Countries = ({ countries, filterBy, setFiltering }) => {
  if (filterBy.length === 0) {
    return null;
  }

  const filtered = countries.filter((country) => {
    return country.name.common.toLowerCase().startsWith(filterBy.toLowerCase());
  });

  console.log(filtered);

  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filtered.length === 1) {
    return <Country country={filtered[0]} />;
  } else {
    return (
      <ul>
        {filtered.map((country) => {
          return (
            <li key={country.cca2}>
              {country.name.common}
              <button onClick={() => setFiltering(country.name.common)}>
                show
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
};

const FilterForm = ({ filterBy, handler }) => {
  return (
    <div>
      find countries: <input value={filterBy} onChange={handler} />
    </div>
  );
};
function App() {
  const [filterBy, setFiltering] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);
  const handleFilter = (event) => {
    setFiltering(event.target.value);
  };
  return (
    <div>
      <FilterForm filterBy={filterBy} handler={handleFilter} />

      <Countries
        countries={countries}
        filterBy={filterBy}
        setFiltering={setFiltering}
      />
    </div>
  );
}

export default App;
