import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const ButtonGood = ({ handleGoodClick }) => (
  <button onClick={handleGoodClick}>good</button>
);
const ButtonNeutral = ({ handleNeutralClick }) => (
  <button onClick={handleNeutralClick}>neutral</button>
);
const ButtonBad = ({ handleBadClick }) => (
  <button onClick={handleBadClick}>bad</button>
);

const StatisticLine = ({ text, value }) => (
  <>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} </td>
      </tr>
    </tbody>
  </>
);

const Statistics = (props) => {
  if (
    props.statistics.good === 0 &&
    props.statistics.neutral === 0 &&
    props.statistics.bad === 0
  ) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <table>
        <StatisticLine text={props.text[0]} value={props.statistics.good} />
        <StatisticLine text={props.text[1]} value={props.statistics.neutral} />
        <StatisticLine text={props.text[2]} value={props.statistics.bad} />
        <StatisticLine text={props.text[3]} value={props.statistics.average} />
        <StatisticLine text={props.text[4]} value={props.statistics.positive} />
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const text = ["good", "neutral", "bad", "average", "positive"];
  const statistics = {
    good,
    neutral,
    bad,
    get average() {
      return good + neutral + bad === 0
        ? 0
        : (good * 1 + bad * -1) / (good + neutral + bad);
    },
    get positive() {
      return `${
        good + neutral + bad === 0 ? 0 : (good / (good + neutral + bad)) * 100
      }%`;
    },
  };

  return (
    <div>
      <Header text="give feedback" />
      <ButtonGood handleGoodClick={() => setGood(good + 1)} />
      <ButtonNeutral handleNeutralClick={() => setNeutral(neutral + 1)} />
      <ButtonBad text="bad" handleBadClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Statistics text={text} statistics={statistics} />
    </div>
  );
};

export default App;
