import { useEffect, useState } from "react";
import bot from "../bot";

const useSquares = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [message, setMessage] = useState("まだ決着はついていません");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 現在の勝者がいるかどうか
  const calculateWinner = (squares: (string | null)[]) => {
    for (let line of lines) {
      const [a, b, c] = line;
      // もしパターンの一つに合うなら、そのパターンの文字を返す
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // でなければ、nullを返す(レンダリングされないようにするため)
    return null;
  }

  // 碁盤をリセットする
  const reset = () => {
    setSquares(Array(9).fill(null)); // マス目をnullで埋める(レンダリングされない)
    setXIsNext(true); // プレイヤーを先手にする
  }

  // マス目がクリックされたときの処理 
  const handleClick = (i: number) => { // iはクリックされたマス目のインデックス
    const newSquares = [...squares]; // 碁盤のコピーを作成する
    // もし勝者がすでにいる、またはマス目がすでに埋められているなら、関数を抜ける
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O"; // コピーした配列のi番目を現在のプレイヤーにする
    setSquares(newSquares); // コピーした配列を碁番にセットする
    setXIsNext(!xIsNext); // プレイヤーを反転する
  }

  // 碁盤の状態が変わったとき
  useEffect(() => {
    // 勝者がいた場合に、勝者によって表示する内容を変える
    switch (calculateWinner(squares)) {
      // 勝者が人間の場合
      case "X":
        setMessage("おやっ、あなたは勝ってしまいなした");
        break;
      // 勝者がAIの場合
      case "O":
        setMessage("あなたに勝ってしまいました");
        break;
    }
    // eslint-disable-next-line
  }, [squares]);

  // プレイヤーが変わったとき
  useEffect(() => {
    // もしプレイヤーがAIになったとき
    if (!xIsNext) {
      // AIからの戻り値のマスを埋める
      const responce = bot(squares,lines,calculateWinner) as number; // 型にundefinedが含まれるため、型アサーション
      handleClick(responce);
    }
    // eslint-disable-next-line
  }, [xIsNext]);
  
  return [squares, message, { handleClick, reset }] as const;
}

export default useSquares;