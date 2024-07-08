import { useState } from "react";
const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const handleVotes = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const maxVotes = Math.max(...points);
  const maxVotesIndex = points.indexOf(maxVotes);

  return (
    <div>
      <Header text="Anecdote of the day" />
      <br />
      {anecdotes[selected]} <br />
      <span>has {points[selected]} votes</span>
      <br />
      <Button onClick={handleVotes} text="vote" />
      <Button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        text="next anecdote"
      />
      <br />
      <Header text="Anecdote with most votes" />
      <br />
      {anecdotes[maxVotesIndex]} <br />
      <span>has {maxVotes} votes</span>
    </div>
  );
};

export default App;
