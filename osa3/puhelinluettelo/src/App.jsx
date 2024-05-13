import { useEffect, useState } from "react";
import numberService from "./services/numbers";

const FilterForm = ({ filterBy, handleFilter }) => {
  return (
    <div>
      filter by name: <input value={filterBy} onChange={handleFilter} />
    </div>
  );
};

const AddNewForm = ({
  addName,
  newname,
  handleName,
  newnumber,
  handleNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input name="name" value={newname} onChange={handleName} />
      </div>
      <div>
        <div>
          number:{" "}
          <input name="number" value={newnumber} onChange={handleNumber} />
        </div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ persons, handler }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <span
              style={{ color: "red", marginLeft: "5px", cursor: "pointer" }}
              onClick={() => handler(person.id)}
            >
              X
            </span>
          </p>
        );
      })}
    </div>
  );
};

const Notification = ({ notification }) => {
  const { msg, style } = notification;
  if (msg === "") {
    return null;
  }

  return <div className={style}>{msg}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFiltering] = useState("");
  const [notification, setNotification] = useState({ msg: "", style: "" });

  useEffect(() => {
    numberService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const oldPerson = persons.find((person) => person.name === newName);
    if (oldPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, update number?`,
        )
      ) {
        numberService
          .update(oldPerson.id, { ...oldPerson, number: newNumber })
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : data,
              ),
            );

            setNewName("");
            setNewNumber("");
            setNotification({ msg: `Updated ${data.name}`, style: "success" });
            setTimeout(() => {
              setNotification({ msg: "", style: "" });
            }, 5000);
          })
          .catch((err) => {
            if (err.response.status === 404) {
              setNotification({
                msg: `Information of ${oldPerson.name} has been already removed from server`,
                style: "error",
              });
              setTimeout(() => {
                setNotification({ msg: "", style: "" });
              }, 5000);
            }
          });
        return;
      } else {
        return;
      }
    }

    const newPerson = { name: newName, number: newNumber };
    numberService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        setNotification({ msg: `Added ${data.name}`, style: "success" });
        setTimeout(() => {
          setNotification({ msg: "", style: "" });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleRemove = (id) => {
    const person = persons.find((person) => person.id == id);
    if (window.confirm(`Remove ${person.name}?`)) {
      numberService
        .remove(id)
        .then((data) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({ msg: `Removed ${person.name}`, style: "success" });
          setTimeout(() => {
            setNotification({ msg: "", style: "" });
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showNames =
    filterBy.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filterBy.toLowerCase()),
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <FilterForm filterBy={filterBy} handleFilter={handleFilter} />

      <h3>Add new</h3>
      <AddNewForm
        addName={addName}
        newname={newName}
        handleName={handleName}
        newnumber={newNumber}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Numbers persons={showNames} handler={handleRemove} />
    </div>
  );
};

export default App;
