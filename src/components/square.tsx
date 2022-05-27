import React from "react";
import SquareStyle from "./style/squareStyle";

type Props = {
  value: string | null,
  onClick: () => void
}

const Square = ({ value, onClick }: Props) => {
  return (
    <SquareStyle onClick={onClick}>
      {value}
    </SquareStyle>
  );
}

export default Square;