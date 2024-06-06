import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);
  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formattedTime = () => {
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    const formattedTime = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

    return `${formattedTime}: ${formattedSeconds}.${formattedMilliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="time-display">{formattedTime()}</div>
      <button
        id="start"
        className="start"
        onClick={() => handleStart()}
        disabled={isRunning}
      >
        Start
      </button>
      <button
        id="stop"
        className="stop"
        onClick={handleStop}
        disabled={!isRunning}
      >
        stop
      </button>
      <button id="reset" className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
