import { css } from "@emotion/react";

const grid = (side: number, columns: number) => css({
  width: `${side}px`,
  height: `${side}px`,
  gridTemplateColumns: `repeat(${columns}, calc(${side}px / ${columns}))`,
  gridTemplateRows: `repeat(${columns}, calc(${side}px / ${columns}))`
});

export default grid;