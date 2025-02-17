import { useState } from "react";
import GameView from "./components/views/GameView.jsx";
import GameOverView from "./components/views/GameOverView.jsx";
import HomeView from "./components/views/HomeView.jsx";
import useLocalStorage from "./customHooks/useLocalStorage.js";
import "./App.css";
import levelsSettings from "./data/levelsSettings.json";

function App() {
  // levelsBestScore is an object containing the best scored achieved in
  // each level from levelsSettings.json, indexed by the level name.
  // These are independent from the specific game, so such object is instantiated
  // outside the GameView component.
  // The persistence of this state is handled through Local Storage.
  const [levelsBestScore, setLevelsBestScore] = useLocalStorage(
    "levelsBestScore",
    initBestScore()
  );

  // currentView defines the view that is currently shown
  const [currentView, setCurrentView] = useState({ name: "home", data: {} });

  const setHomeViewCallback = () =>
    setCurrentView({
      name: "home",
      data: {},
    });

  const setPlayGameCallback = (level) => () =>
    setCurrentView({
      name: "game",
      data: { level },
    });

  switch (currentView.name) {
    case "game": {
      // data: level

      const setGameOverViewCallback = (score, isNewBestScore, level) =>
        setCurrentView({
          name: "game-over",
          data: { score, isNewBestScore, level },
        });

      const gameSettings = levelsSettings[currentView.data.level];

      const bestScore = levelsBestScore[currentView.data.level];

      const setBestScore = (newBestScore) => {
        const copiedLevelsBestScore = structuredClone(levelsBestScore);
        copiedLevelsBestScore[currentView.data.level] = newBestScore;
        setLevelsBestScore(copiedLevelsBestScore);
      };

      return (
        <GameView
          {...{
            bestScore,
            setBestScore,
            setGameOverViewCallback,
            gameSettings,
            setHomeViewCallback,
          }}
        />
      );
    }
    case "game-over": {
      // data: score, isNewBestScore

      return (
        <GameOverView
          score={currentView.data.score}
          isNewBestScore={currentView.data.isNewBestScore}
          playGameCallback={setPlayGameCallback(currentView.data.level)}
          setHomeViewCallback={setHomeViewCallback}
        />
      );
    }
    case "home": {
      //data: [none]

      const gameLevels = Object.entries(levelsSettings).map(([key, value]) => ({
        key: key,
        label: value.label,
        bestScore: levelsBestScore[key],
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

function initBestScore() {
  return Object.keys(levelsSettings).reduce((obj, key) => {
    obj[key] = 0;
    return obj;
  }, {});
}

export default App;
