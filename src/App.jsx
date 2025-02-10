import { useState } from "react";
import GameView from "./components/views/GameView.jsx";
import useLocalStorage from "./customHooks/useLocalStorage.js";
import "./App.css";

function App() {
  // bestScore is the best scored achieved. It is independent from the
  // specific game, so it is instantiated outside the GameView component.
  // The persistence of this state is handled through Local Storage.
  const [bestScore, setBestScore] = useLocalStorage("bestScore", 0);

  // currentView defines the view that is currently shown
  const [currentView, setCurrentView] = useState({ name: "game", data: {} });

  switch (currentView.name) {
    case "game": {
      return <GameView {...{ bestScore, setBestScore }} />;
    }
  }
}

export default App;
