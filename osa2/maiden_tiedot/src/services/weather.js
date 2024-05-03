import axios from "axios";
const APIKEY = import.meta.env.VITE_WEATHERAPI;

const getWeather = (city, country) => {
  const req = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEY}&units=metric`,
  );
  return req.then((resp) => resp.data);
};

export default { getWeather };
