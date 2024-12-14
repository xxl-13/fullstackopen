import { useState } from 'react';

const StatisticItem = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  
  const positivePercentage = (good / total) * 100;
  const average = (good - bad) / total;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticItem text="good" value={good} />
          <StatisticItem text="neutral" value={neutral} />
          <StatisticItem text="bad" value={bad} />
          <StatisticItem text="all" value={total} />
          <StatisticItem text="average" value={average} />
          <StatisticItem text="positive" value={`${positivePercentage}%`} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;