import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function useTimer(): [number, boolean, (v: number) => void] {
  const [time, setTime] = useState(0);

  const [isCounting, setIsCounting] = useState(false);
  const [theInterval, setTheInterval] = useState<any>(null);

  const startTimer = useCallback((time: number) => {
    if (isCounting) {
      clearInterval(theInterval);
      setTheInterval(null);
    }
    setTime(time);
    setIsCounting(true);
    setTheInterval(setInterval(() => {
      setTime(c => c - 1);
    }, 1000));
  }, [isCounting]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(theInterval);
      setTheInterval(null);
      setIsCounting(false);
    }
  }, [time]);

  return [time, isCounting, startTimer];
}


function App() {

  const [inputTime, setInputTime] = useState(0);
  const [time, isCounting, startTimer] = useTimer();

  return (
    <div className="App">
      <header className="App-header">
        {"IS COUNTING: " + isCounting}
        <br />
        {time}
        <div>
          <input type="number" value={inputTime} onChange={e => setInputTime(Number(e.target.value) || 0)} />
          <button onClick={() => {
            startTimer(inputTime)
          }}>startTime</button>
        </div>
      </header>
    </div>
  );
}

export default App;
