const express = require("express");
const app = express();

const PORT = 3001;

persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, resp) => {
  resp.json(persons);
});

app.get("/info", (req, resp) => {
  resp.send(
    `<p>Phonebook has info for ${persons.length} people</p><br/>${Date()}`,
  );
});

app.listen(PORT, () => {
  console.log(`Listening now on port ${PORT}`);
});
