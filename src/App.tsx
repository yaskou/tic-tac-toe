import React from 'react';
import AppBar from './components/appbar';
import Board from './components/board';

const App = () => {
  return (
    <>
      <AppBar brand="moku" />
      <main className="py-3">
        <Board />
      </main>
    </>
  );
}

export default App;
