import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

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

const update = (id, person) => {
  const req = axios.put(`${baseUrl}/${id}`, person);
  return req.then((resp) => resp.data);
};

export default { create, getAll, remove, update };
