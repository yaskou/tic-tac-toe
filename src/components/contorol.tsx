import React, { useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { sideContext } from "../App";

interface Props {
  message: string,
  reset: () => void,
  handleChange: (e: any) => void
}

const Control = ({ message, reset, handleChange }: Props) => {
  const side = useContext(sideContext);
  return (
    <div className="pt-3">
      <div className="text-center fs-4 py-3">{message}</div>
      <InputGroup className="d-flex justify-content-center mx-auto w-50">
        <InputGroup.Text>3~8の間で</InputGroup.Text>
        <Form.Control type="number" value={side} onChange={handleChange} />
        <InputGroup.Text>目並べ</InputGroup.Text>
        <Button variant="outline-danger" onClick={reset}>リセット</Button>
      </InputGroup>
    </div>
  );
}

export default Control;