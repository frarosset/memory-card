import Card from "./Card.jsx";

function GameBoard() {
  // The deck is temporarily just a local variable which contains some possible cards to use.
  // and initialized with sample data to test the Card component.
  // Later on it will be handled differently and the card faces will be grabbed through API calls.
  const deck = [
    { id: 0, url: "/card-rear.jpg" },
    { id: 1, url: "/card-rear.jpg" },
    { id: 2, url: "/card-rear.jpg" },
  ];

  const tableCards = deck;

  return (
    <div className="gameboard">
      {tableCards.map((card) => (
        <Card key={card.id} src={card.url} />
      ))}
    </div>
  );
}

export default GameBoard;
