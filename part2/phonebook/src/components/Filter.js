const Filter = ({ filter, onChange }) => {
  return (
    <form>
      <div>
        filter shown with:
        <input value={filter} onChange={onChange} />
      </div>
    </form>
  );
};
export default Filter;
