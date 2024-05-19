require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");

const app = express();

const PORT = process.env.PORT;

morgan.token("body", function (req, res) {
  if (req.method === "POST") return JSON.stringify(req.body);
});
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (req, resp, next) => {
  Contact.find({})
    .then((persons) => {
      resp.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, resp, next) => {
  Contact.findById(req.params.id)
    .then((person) => {
      resp.json(person);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, resp, next) => {
  Contact.find({})
    .then((persons) => {
      resp.send(
        `<p>Phonebook has info for ${persons.length} people</p><br/>${Date()}`,
      );
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, resp, next) => {
  let person = req.body;

  if (!person.name) return resp.status(400).json({ error: "Name missing" });

  if (!person.number) return resp.status(400).json({ error: "Number missing" });

  const contact = new Contact(person);

  contact
    .save()
    .then((res) => {
      console.log(`added ${res.name} number ${res.number} to phonebook`);
      resp.json(res);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, resp, next) => {
  const id = req.params.id;
  const person = req.body;
  Contact.findByIdAndUpdate(id, person, { new: true })
    .then((updated) => {
      resp.json(updated);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, resp, next) => {
  const id = req.params.id;

  Contact.findByIdAndDelete(id)
    .then((_) => {
      resp.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening now on port ${PORT}`);
});
