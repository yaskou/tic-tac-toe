import { useEffect, useState } from "react";
import bot from "../bot";

const useSquares = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const calculateWinner = (squares: (string | null)[]) => {
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  const clear = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  const handleClick = (i: number) => {
    const newSquares = [...squares];
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }
  const result = (): string => {
    const winner = calculateWinner(squares);
    if (winner === "X") {
      return "おっと、あなたは勝ってしまいました";
    }
    else if (winner === "O") {
      return "あなたに勝ってしまいました";
    }
    else {
      return "まだ決着はついていません";
    }
  }
  useEffect(() => {
    if (!xIsNext) {
      handleClick(bot(squares, lines, calculateWinner) as number);
    }
    // eslint-disable-next-line
  }, [xIsNext]);
  return [squares, { clear, handleClick, result }] as const;
}

export default useSquares;