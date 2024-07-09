const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};
export default Total;
