import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const create = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((resp) => resp.data);
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((resp) => resp.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((resp) => resp.data);
};

export default { create, getAll, remove };
