import React from "react";

type Props = {
  value: string | null,
  onClick: () => void
}

const Square = ({ value, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;