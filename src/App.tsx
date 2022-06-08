import React, { createContext } from "react";
import AppBar from "./components/appbar";
import Board from "./components/board";
import Control from "./components/contorol";
import useSide from "./hooks/useSide";
import useSquares from "./hooks/useSquares";

export const sideContext = createContext(3);

const App = () => {
  const [side, { handleChange }] = useSide();
  const [squares, message, { handleClick, reset }] = useSquares(side);
  return (
    <sideContext.Provider value={side}>
      <AppBar brand="moku" />
      <main className="py-3">
        <Board squares={squares} handleClick={handleClick} />
        <Control message={message} reset={reset} handleChange={handleChange} />
      </main>
    </sideContext.Provider>
  );
}

export default App;
