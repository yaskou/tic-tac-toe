/** @jsxImportSource @emotion/react */
import React from "react";
import Square from "./square";
import { Range } from "../tools";
import grid from "./style/grid";
import useSquares from "./hooks/useSquares";

const Board = () => {
  const [squares, { handleClick }] = useSquares();
  return (
    <div
      className="d-grid border border-success mx-auto"
      css={grid(300, 3)}
    >
      {Range(9).map(i => <Square value={squares[i]} key={i} onClick={() => handleClick(i)} />)}
    </div>
  );
}

export default Board;