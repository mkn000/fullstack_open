import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFiltering] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFiltering(event.target.value);
  };

  const showNames =
    filterBy.length > 0
      ? persons.filter((person) => person.name.toLowerCase().includes(filterBy))
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter by name: <input value={filterBy} onChange={handleFilter} />
      </div>

      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          <div>
            number: <input value={newNumber} onChange={handleNumber} />
          </div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showNames.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
