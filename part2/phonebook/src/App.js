import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personsServices from "./services/persons";
import Notifications from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [isFilterName, isFilterNewNumber] = useState("");
  const [notification, setNotification] = useState(null);
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleInputChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleInputChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleInputChangeFilter = (event) => {
    isFilterNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.some((person) => person.name === newName) &&
      persons.some((person) => person.number === newNumber)
    ) {
      alert(`${newName} is already added to phonebook`);
      // 清空输入框
      setNewName("");
      setNewNumber("");
    } else if (persons.some((person) => person.name === newName)) {
      const person = persons.find((person) => person.name === newName);
      const newObject = { ...person, number: newNumber };
      if (
        window.confirm(
          `${person.name} is already added to the phonebook, replace the older number with a new one?`
        )
      ) {
        personsServices
          .update(person.id, newObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            // 清空输入框
            setNewName("");
            setNewNumber("");
            setNotification(`Changed the number of ${newName}`);
            setIsErr(false);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(() => {
            setNotification(
              `Information of ${person.name} has already been removed from server`
            );
            setIsErr(true);
          });
      }
    } else {
      const newObject = { name: newName, number: newNumber };
      personsServices.create(newObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // 清空输入框
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${newName}`);
        setIsErr(false);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const removePersons = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setNotification(
            `Information of ${person.name} has already been removed from server`
          );
          setIsErr(true);
        });
    }
  };

  const listToShow = isFilterName
    ? persons.filter((person) => person.name.includes(isFilterName))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={notification} isErr={isErr} />
      <Filter filter={isFilterName} onChange={handleInputChangeFilter} />
      <h2>Add a new</h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleInputChangeName={handleInputChangeName}
        newNumber={newNumber}
        handleInputChangeNumber={handleInputChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={listToShow} removePersons={removePersons} />
    </div>
  );
};

export default App;
