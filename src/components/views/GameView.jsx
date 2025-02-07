import { useState } from "react";
import GameBoard from "../game/GameBoard.jsx";

function GameView() {
  // Game score
  const [score, setScore] = useState(0);

  console.log(score);

  return (
    <main className={"game-view"}>
      <GameBoard setScore={setScore} />
    </main>
  );
}

export default GameView;
