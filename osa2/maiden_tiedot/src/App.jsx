import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Weather = ({ city, country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(city, country).then((data) => {
      setWeather(data);
    });
  }, []);

  if (weather === null) return null;

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

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
      <Weather city={country.capital[0]} country={country.cca2} />
    </div>
  );
};

const Countries = ({ countries, filterBy, setFilteredCountries }) => {
  if (filterBy.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.cca2}>
              {country.name.common}
              <button onClick={() => setFilteredCountries([country])}>
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
  const [filterByText, setFilteringText] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(filterByText.toLowerCase());
      }),
    );
  }, [filterByText]);

  const handleFilter = (event) => {
    setFilteringText(event.target.value);
  };
  return (
    <div>
      <FilterForm filterBy={filterByText} handler={handleFilter} />

      <Countries
        countries={filteredCountries}
        filterBy={filterByText}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
}

export default App;
