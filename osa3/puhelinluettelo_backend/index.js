const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

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

morgan.token("body", function (req, res) {
  if (req.method === "POST") return JSON.stringify(req.body);
});
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

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

  if (!person.name) return resp.status(400).json({ error: "Name missing" });

  if (!person.number) return resp.status(400).json({ error: "Number missing" });

  const exists = persons.find((elem) => elem.name === person.name);
  if (exists) return resp.status(400).json({ error: "Name must be unique" });

  const id = Math.floor(Math.random() * 1000);
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
