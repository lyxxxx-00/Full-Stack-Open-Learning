const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
      <br />
    </p>
  );
};

export default Part;
