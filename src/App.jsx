import { useState } from "react";
import GameView from "./components/views/GameView.jsx";
import GameOverView from "./components/views/GameOverView.jsx";
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
      const setGameOverViewCallback = (score, isNewBestScore) =>
        setCurrentView({
          name: "game-over",
          data: { score, isNewBestScore },
        });

      // Sample object with game settings
      const gameSettings = {
        initialDeckSize: 12,
        incrementDeckSize: 2,
        tableSize: 6,
        selectedCardsFractInTable: 0.8,
      };

      return (
        <GameView
          {...{
            bestScore,
            setBestScore,
            setGameOverViewCallback,
            gameSettings,
          }}
        />
      );
    }
    case "game-over": {
      const backBtnCallback = () =>
        setCurrentView({
          name: "game",
          data: {},
        });
      return (
        <GameOverView
          score={currentView.data.score}
          isNewBestScore={currentView.data.isNewBestScore}
          backBtnCallback={backBtnCallback}
        />
      );
    }
  }
}

export default App;
