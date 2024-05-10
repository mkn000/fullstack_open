const express = require("express");
const app = express();

const PORT = 3001;

let persons = [
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

app.use(express.json());

app.get("/api/persons", (req, resp) => {
  resp.json(persons);
});

app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id.toString() === id);
  if (person) {
    resp.json(person);
  } else {
    resp.status(404).end();
  }
});

app.get("/info", (req, resp) => {
  resp.send(
    `<p>Phonebook has info for ${persons.length} people</p><br/>${Date()}`,
  );
});

app.post("/api/persons", (req, resp) => {
  let person = req.body;
  const id = Math.floor(Math.random() * 1000);
  console.log(person);
  person = { ...person, id: id };
  persons.push(person);
  resp.json(person);
});

app.delete("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id.toString() !== id);

  resp.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Listening now on port ${PORT}`);
});
