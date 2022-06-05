import { getRandomArbitrary, Min, Range } from "./tools";

const bot = (
  squares: (string | null)[], // 現在の碁盤の状態
  lines: number[][], // 勝ちになるパターン
  calculateWinner: (squares: (string | null)[]) => string | null // 勝ちかどうかを判定する
) => {

  // もしマス目がすべて埋まっているなら、なにもしない
  if (!squares.includes(null)) {
    return;
  }

  // XとOのすでに埋まっているマス目をくくりだす
  const [x, o] = ["X", "O"].map(whois => {
    return squares.map((value, index) => {
      // もしそのマスがwhoisと同じなら、マス目のインデックスを返す
      if (value === whois) {
        return index;
      }
      // でなければ、何も返さない(undefinedが返される)
      return undefined;
    }).filter(i => {
      // ふくまれているundefinedを消す
      return i !== undefined;
    });
  }) as number[][]; // 戻り値がundefinedも型として存在するため、型アサーションする

  // すでに埋められているマス目を除き、パターンと合わなかった数字を出す
  const getAlreadySet = lines.flatMap(line => { // パターンを1つずつ切り出して、戻り値をフラットのする
    const lineCopy = [...line]; // 配列のコピーを作成する
    [...x, ...o].forEach(i => {
      // もしパターンが切り出した数字と同じなら、コピーのその部分を削除する
      if (lineCopy.includes(i)) {
        lineCopy.splice(lineCopy.indexOf(i), 1);
      }
    });
    return lineCopy;
  });

  // 合わなかった数字を集計する
  const getAlreadySetCount = Range(9).map(n => {
    // 合わなかった数字と現在のインデックスが合うものを抽出
    return getAlreadySet.filter(o => {
      return o === n;
    }).length; // 戻り値の長さを返す = 合計
  });

  // もし置いたとき、自分が勝つ確率が一番少ないものを切り出す
  const maySet = getAlreadySetCount.map((value, index) => {
    // 0を除いた最小値を取得する = 確率が0%を抜く
    const getMin = () => {
      return getAlreadySetCount.filter(i => {
        return i > 0;
      });
    };
    // もし集計がそのデータの最小値なら、インデックスを返す
    if (value === Min(getMin())) {
      return index;
    }
    // でなければ、何も返さない(undefinedが返される)
    return undefined;
  }).filter(i => {
    // ふくまれているundefinedを消す
    return i !== undefined;
  }) as number[]; // 戻り値がundefinedも型として存在するため、型アサーションする

  // 置くべきマスを出す
  const shouldSet = maySet.filter(i => {
    const squaresCopy = [...squares]; // 碁盤のコピーを作成する
    squaresCopy[i] = "O";
    return !calculateWinner(squares);
  });

  // もし置くべきマスがあるなら、ランダムで置くべきマスをランダムで選ぶ
  if (shouldSet.length) {
    return shouldSet[getRandomArbitrary(0, shouldSet.length - 1)];
  }
  // もし置くべきマスがないなら、勝つ確率が一番低いマスをランダムで選ぶ
  else {
    return maySet[getRandomArbitrary(0, shouldSet.length - 1)];
  }
}

export default bot;