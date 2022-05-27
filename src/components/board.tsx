import React from "react";
import Square from "./square";
import useSquares from "./hooks/useSquares";
import Container from "./style/container";

const Board = () => {
  const [squares, { handleClick }] = useSquares();
  const renderSquare = (i: number) => {
    return (
      <Square
        key={i.toString()}
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }
  return (
    <Container>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
    </Container>
  );
}

export default Board;