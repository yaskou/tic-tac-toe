import { useEffect, useState } from "react";
import lose from "../bot/lose";

const useSquares = () => {
  const [squares, setSquares] = useState<string[] | null[]>(Array(9).fill(null));
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
  const calculateWinner = (squares: string[] | null[]) => {
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  const message = () => {
    const winner = calculateWinner(squares);
    return (
      winner === "X" ? "おっとあなたは勝ってしまいました" :
        winner === "O" ? "あなたに勝ってしまいました" :
          "まだ決着はついていません" as string
    );
  }
  const Clear = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }
  // eslint-disable-next-line
  useEffect(() => { !xIsNext && handleClick(lose(squares, lines, calculateWinner) as number); }, [xIsNext]);
  return [squares, { Clear, handleClick, message }] as const;
}

export default useSquares;