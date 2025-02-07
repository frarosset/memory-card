import GameView from "./components/views/GameView.jsx";
import useLocalStorage from "./customHooks/useLocalStorage.js";
import "./App.css";

function App() {
  // bestScore is the best scored achieved. It is independent from the
  // specific game, so it is instantiated outside the GameView component.
  // The persistence of this state is handled through Local Storage.
  const [bestScore, setBestScore] = useLocalStorage("bestScore", 0);

  return <GameView {...{ bestScore, setBestScore }} />;
}

export default App;
