import { useEffect, useState } from "react";
import bot from "../bot";
import { Range } from "../tools";

const useSquares = (side: number) => {
  side = Number(side);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null)); // 碁番の状態を管理するフック
  const [xIsNext, setXIsNext] = useState(true); // プレイヤーの順番を管理するフック
  const [message, setMessage] = useState("まだ決着はついていません"); // 勝敗からメッセージを表示するためのフック

  // 勝つパターンを計算する
  const calculateLines = (side: number) => {
    // 横のパターンを計算する
    const across = Range(side).map(value => {
      console.log(side)
      return Range(side ** 2).slice(value * side, (value + 1) * side);
    });
    // 縦のパターンを計算する
    const down = Range(side).map(value => {
      return Range(side ** 2).filter(i => {
        return i % side === value;
      });
    });
    // 斜めのパターンを計算する
    const diagonal = Range(2).map(value => {
      return Range(side).map(i => {
        return (side - 2 * value + 1) * (i + value);
      });
    });
    // 横、縦、斜めをすべて結合する
    return [...across, ...down, ...diagonal];
  }
  // パターンの状態を管理するフック
  const [lines, setLines] = useState(calculateLines(side));

  // 現在の勝者がいるかどうか
  const calculateWinner = (squares: (string | null)[], lines: number[][]) => {
    for (const line of lines) {
      console.log(line)
      const winnerIs = line.every(i => {
        return squares[0] && squares[0] === squares[i];
      });
      if (winnerIs) {
        return squares[line[0]];
      }
    }
    // でなければ、nullを返す(レンダリングされないようにするため)
    return null;
  }

  // 碁盤をリセットする
  const reset = () => {
    setSquares(Array(9).fill(null)); // マス目をnullで埋める(レンダリングされない)
    setXIsNext(true); // 人間を先手にする
  }

  // マス目がクリックされたときの処理 
  const handleClick = (i: number) => { // iはクリックされたマス目のインデックス
    const newSquares = [...squares]; // 碁盤のコピーを作成する
    // もし勝者がすでにいる、またはマス目がすでに埋められているなら、関数を抜ける
    if (calculateWinner(newSquares, lines) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O"; // コピーした配列のi番目を現在のプレイヤーにする
    setSquares(newSquares); // コピーした配列を碁番にセットする
    setXIsNext(!xIsNext); // 現在のプレイヤーを反転する
  }

  // 碁盤の状態が変わったとき
  useEffect(() => {
    // 勝者がいた場合に、勝者によって表示する内容を変える
    switch (calculateWinner(squares, lines)) {
      // 勝者が人間の場合
      case "X":
        setMessage("おやっ、あなたは勝ってしまいました");
        break;
      // 勝者がAIの場合
      case "O":
        setMessage("あなたに勝ってしまいました");
        break;
      default:
        setMessage("まだ決着はついていません");
        break;
    }
    // eslint-disable-next-line
  }, [squares]);

  // プレイヤーが変わったとき
  useEffect(() => {
    // もしプレイヤーがAIになったとき
    if (!xIsNext) {
      // AIからの戻り値のマスを埋める
      const responce = bot(squares, lines, side, calculateWinner) as number; // 型にundefinedが含まれるため、型アサーション
      handleClick(responce);
    }
    // eslint-disable-next-line
  }, [xIsNext]);

  useEffect(() => {
    setLines(calculateLines(side));
  }, [side]);

  return [squares, message, { handleClick, reset }] as const;
}

export default useSquares;