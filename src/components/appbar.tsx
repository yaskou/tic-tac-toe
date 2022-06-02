import React from "react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { Container, Nav, Navbar } from "react-bootstrap";

type Props = {
  brand: string
}

const AppBar = ({ brand }: Props) => {
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">{brand}</Navbar.Brand>
        <Navbar.Text>このBotに負けてください</Navbar.Text>
        <Nav.Link href="https://github.com/yaskou/tic-tac-toe">
          <MarkGithubIcon size="medium" />
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default AppBar