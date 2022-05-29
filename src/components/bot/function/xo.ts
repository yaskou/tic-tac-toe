const xo = (squares: string[] | null[], ...targets: string[]) => {
  return targets.map(target =>
    squares.map((value, index) => value === target && index).filter(i => i !== false)
  );
}

export default xo;