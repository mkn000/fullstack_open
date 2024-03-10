import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomAnecdote = () => {
    const l = anecdotes.length;
    let i = 0;
    do {
      i = Math.floor(Math.random() * l);
    } while (i === selected);
    setSelected(i);
  };

  const vote = () => {
    const arr = [...points];
    arr[selected] += 1;
    setPoints(arr);
    const iMax = arr.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
    setWinner(iMax);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(anecdotes.map((_) => 0));
  const [winner, setWinner] = useState(0);

  return (
    <div>
      <h2>Anedcdote of the day</h2>
      <div style={{ height: "5rem" }}>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} points</p>
      </div>
      <button onClick={vote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[winner]}</p>
      <p>has {points[winner]} votes</p>
    </div>
  );
};

export default App;
