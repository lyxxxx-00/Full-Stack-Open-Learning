const Persons = ({ persons, removePersons }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            <li>
              {person.name} {person.number}
            </li>
            <button onClick={() => removePersons(person.id)}>delete</button>
          </div>
        );
      })}

      <br />
    </ul>
  );
};

export default Persons;
