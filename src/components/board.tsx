import React from "react";
import Square from "./square";
import useSquares from "./hooks/useSquares";

const Board = () => {
  const [squares, { handleClick }] = useSquares();
  const renderSquare = (i: number) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }
  return (
    <div>
      <div className="board-row">
        {[0, 1, 2].map(i => renderSquare(i))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map(i => renderSquare(i))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map(i => renderSquare(i))}
      </div>
    </div>
  );
}

export default Board;