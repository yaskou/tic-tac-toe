/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import Square from "./square";
import { Range } from "../tools";
import grid from "./style/grid";
import { sideContext } from "../App";

interface Props {
  squares: (string | null)[],
  handleClick: (i: number) => void
}

const Board = ({ squares, handleClick }: Props) => {
  const side = useContext(sideContext);
  return (
    <div
      className="d-grid border border-success mx-auto"
      css={grid(300, side)}
    >
      {Range(side ** 2).map(i => <Square value={squares[i]} key={i} onClick={() => handleClick(i)} />)}
    </div>
  );
}

export default Board;