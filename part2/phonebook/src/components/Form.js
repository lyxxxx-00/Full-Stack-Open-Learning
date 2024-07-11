const Form = ({
  onSubmit,
  newName,
  handleInputChangeName,
  newNumber,
  handleInputChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleInputChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleInputChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
