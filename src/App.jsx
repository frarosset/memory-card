import { useState } from "react";
import GameView from "./components/views/GameView.jsx";
import GameOverView from "./components/views/GameOverView.jsx";
import HomeView from "./components/views/HomeView.jsx";
import useLocalStorage from "./customHooks/useLocalStorage.js";
import "./App.css";
import levelsSettings from "./data/levelsSettings.json";

function App() {
  // bestScore is the best scored achieved. It is independent from the
  // specific game, so it is instantiated outside the GameView component.
  // The persistence of this state is handled through Local Storage.
  const [bestScore, setBestScore] = useLocalStorage("bestScore", 0);

  // currentView defines the view that is currently shown
  const [currentView, setCurrentView] = useState({ name: "home", data: {} });

  switch (currentView.name) {
    case "game": {
      // data: level

      const setGameOverViewCallback = (score, isNewBestScore) =>
        setCurrentView({
          name: "game-over",
          data: { score, isNewBestScore },
        });

      const gameSettings = levelsSettings[currentView.data.level];

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
      // data: score, isNewBestScore

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
    case "home": {
      //data: [none]

      const setPlayGameCallback = (level) => () =>
        setCurrentView({
          name: "game",
          data: { level },
        });
      const gameLevels = Object.entries(levelsSettings).map(([key, value]) => ({
        key: key,
        label: value.label,
      }));

      return (
        <HomeView
          gameLevels={gameLevels}
          setPlayGameCallback={setPlayGameCallback}
        />
      );
    }
  }
}

export default App;
