import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const req = axios.get(`${baseUrl}/all`);
  return req.then((resp) => resp.data);
};

export default { getAll };
