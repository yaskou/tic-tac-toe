import React from "react";

type Props = {
  value: string | null,
  onClick: () => void
}

const Square = ({ value, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="d-flex justify-content-center align-items-center border border-primary fs-3"
    >
      {value}
    </div>
  );
}

export default Square;