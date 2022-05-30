export const getRandomArbitrary = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const Range = (e: number) => Array.from(Array(e), (v, i) => i);

export const Max = (r: number[]) => r.reduce((a, b) => a > b ? a : b);
export const Min = (r: number[]) => r.reduce((a, b) => a < b ? a : b);