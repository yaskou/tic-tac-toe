import { css } from "@emotion/react";

const grid = (side: number, columns: number) => css`
  width: ${side}px;
  height: ${side}px;
  grid-template-columns: repeat(${columns}, calc(${side}px / ${columns}));
  grid-template-rows: repeat(${columns}, calc(${side}px / ${columns}));
`;

export default grid;