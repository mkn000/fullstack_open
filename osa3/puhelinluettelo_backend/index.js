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

app.get("/api/persons", (req, resp) => {
  Contact.find({}).then((persons) => {
    resp.json(persons);
  });
});

app.get("/api/persons/:id", (req, resp) => {
  Contact.findById(req.params.id).then((person) => {
    resp.json(person);
  });
});

app.get("/info", (req, resp) => {
  Contact.find({}).then((persons) => {
    resp.send(
      `<p>Phonebook has info for ${persons.length} people</p><br/>${Date()}`,
    );
  });
});

app.post("/api/persons", (req, resp) => {
  let person = req.body;

  if (!person.name) return resp.status(400).json({ error: "Name missing" });

  if (!person.number) return resp.status(400).json({ error: "Number missing" });

  const contact = new Contact(person);

  contact.save().then((res) => {
    console.log(`added ${res.name} number ${res.number} to phonebook`);
    resp.json(res);
  });
});

app.delete("/api/persons/:id", (req, resp) => {
  const id = req.params.id;

  Contact.findByIdAndDelete(id).then((_) => {
    resp.status(204).end();
  });
});

app.listen(PORT, () => {
  console.log(`Listening now on port ${PORT}`);
});
