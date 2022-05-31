import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { LogoGithubIcon, MarkGithubIcon } from '@primer/octicons-react';
import useSquares from './components/hooks/useSquares';
import Square from './components/square';
import OutLine from './components/style/container';
import { Range } from './components/tools';

const App = () => {
  const [squares, { Clear, handleClick, message }] = useSquares();
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" expand="md">
        <Container fluid>
          <Navbar.Brand>このAIに負けてください</Navbar.Brand>
          <Navbar.Toggle aria-controls="expand-md" />
          <Navbar.Collapse className="justify-content-end" id="expand-md">
            <Nav.Link href="https://github.com/yaskou/tic-tac-toe">
              <MarkGithubIcon size="medium" />
              {" "}
              <LogoGithubIcon size="medium" />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <OutLine
          className="d-grid mx-auto my-3 border border-primary"
        >
          {Range(9).map(i =>
            <Square key={i.toString()} value={squares[i]} onClick={() => handleClick(i)} />
          )}
        </OutLine>
        <p className="fs-4 text-center">{message()}</p>
        <div className="d-flex">
          <Button variant="outline-danger" onClick={Clear} className="mx-auto">リセット</Button>
        </div>
      </main>
    </>
  );
}

export default App;
