import React from "react";
import Square from "./square";
import useSquares from "./hooks/useSquares";
import Container from "./style/container";
import { Range } from "./tools";
import Message from "./style/message";

const Board = () => {
  const [squares, { handleClick, message }] = useSquares();
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
    <>
      <Container>
        {Range(9).map(i => renderSquare(i))}
      </Container>
      <Message>
        {message()}
      </Message>
    </>
  );
}

export default Board;