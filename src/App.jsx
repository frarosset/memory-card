import { useState } from "react";
import GameView from "./components/views/GameView.jsx";
import "./App.css";

function App() {
  // bestScore is the best scored achieved. It is independent from the
  // specific game, so it is instantiated outside the GameView component.
  const [bestScore, setBestScore] = useState(0);

  return <GameView {...{ bestScore, setBestScore }} />;
}

export default App;
