// 乱数を範囲指定して生成
export const getRandomArbitrary = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// 与えられた数までの整数の数列を作成
export const Range = (e: number) => Array.from(Array(e), (v, i) => i);

// 最小値・最大値を返す
export const Max = (r: number[]) => r.reduce((a, b) => a > b ? a : b);
export const Min = (r: number[]) => r.reduce((a, b) => a < b ? a : b);