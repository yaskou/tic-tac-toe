import React from "react";
import AppBar from "./components/appbar";
import Board from "./components/board";
import Control from "./components/contorol";
import useSquares from "./hooks/useSquares";

const App = () => {
  const [squares, { clear, handleClick, result }] = useSquares();
  return (
    <>
      <AppBar brand="moku" />
      <main className="py-3">
        <Board squares={squares} handleClick={handleClick} />
        <Control clear={clear} result={result} />
      </main>
    </>
  );
}

export default App;
