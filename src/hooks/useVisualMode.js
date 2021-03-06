import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const updatedMode = [...history];
      updatedMode.pop();
      setHistory([...updatedMode, newMode]);
      setMode(newMode);
    } else {
      setMode(newMode);
      const newHistory = [...history];
      newHistory.push(newMode);
      setHistory(newHistory);
    }
  };

  const back = () => {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    if (history.length > 1) {
      setMode(newHistory[newHistory.length - 1]);
    } else {
      return history;
    }
  };

  return { mode, transition, back };
}
