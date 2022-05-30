import { getRandomArbitrary, Min, Range } from "../tools";

const lose = (
  squares: string[] | null[],
  lines: number[][],
  calculateWinner: (squares: string[] | null[]) => string | null
) => {
  if (![...squares].includes(null)) {
    return;
  }
  const xo = ["X", "O"].flatMap(whois =>
    squares.map((v, i) => v === whois && i).filter(i => i !== false)
  ) as number[];
  const canSet = lines.flatMap(line => {
    const lineCopy = [...line];
    xo.forEach(i => lineCopy.includes(i) && lineCopy.splice(lineCopy.indexOf(i), 1));
    return lineCopy;
  });
  const getCanSetCount = Range(9).map(n => canSet.filter(o => o === n).length);
  const maySet = getCanSetCount.map((v, i) => v === Min(getCanSetCount.filter(i => i > 0)) && i).filter(i => i !== false) as number[];
  const mustSet = maySet.filter(i => {
    const maybe = squares.slice();
    maybe[i] = "O";
    return !calculateWinner(maybe);
  });
  return mustSet.length ? mustSet[getRandomArbitrary(0, mustSet.length - 1)] : maySet[getRandomArbitrary(0, maySet.length - 1)];
}

export default lose;