import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      {text}: {value}
    </div>
  );
};

const Statistics = (props) => {
  const [good, neutral, bad] = [...props.data];
  if (good | neutral | bad) {
    return (
      <div>
        <StatisticsLine text="good" value={good}></StatisticsLine>
        <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
        <StatisticsLine text="bad" value={bad}></StatisticsLine>
        <StatisticsLine
          text="all"
          value={good + neutral + bad}
        ></StatisticsLine>
        <StatisticsLine
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        ></StatisticsLine>
        <StatisticsLine
          text="positive"
          value={`${(good * 100) / (good + neutral + bad)}%`}
        ></StatisticsLine>
      </div>
    );
  } else {
    return <div>no feedback given</div>;
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button handleClick={handleGood} text="good"></Button>
        <Button handleClick={handleNeutral} text="neutral"></Button>
        <Button handleClick={handleBad} text="bad"></Button>
      </div>
      <h2>statistics</h2>
      <Statistics data={[good, neutral, bad]} />
    </div>
  );
};

export default App;
