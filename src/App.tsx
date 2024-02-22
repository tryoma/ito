import React, { useState } from "react";
import "./App.css";

type Participant = {
  id: number;
  number: number;
};

function App() {
  const [theme, setTheme] = useState<string>("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentParticipantIndex, setCurrentParticipantIndex] =
    useState<number>(0);
  const [isNumberVisible, setIsNumberVisible] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [canProceed, setCanProceed] = useState<boolean>(false);

  const themes = ["テーマ1", "テーマ2", "テーマ3"]; // お題のリスト

  const generateParticipants = (numParticipants: number) => {
    const newParticipants: Participant[] = [];
    while (newParticipants.length < numParticipants) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      if (!newParticipants.find((p) => p.number === randomNumber)) {
        newParticipants.push({
          id: newParticipants.length + 1,
          number: randomNumber,
        });
      }
    }
    setParticipants(newParticipants);
  };

  const generateTheme = () => {
    const randomIndex = Math.floor(Math.random() * themes.length);
    setTheme(themes[randomIndex]);
  };

  // ゲーム開始ボタンが押されたときの処理
  const startGame = () => {
    const numParticipants = prompt("参加人数を入力してください（2〜10の間で）");
    if (numParticipants) {
      const num = Number(numParticipants);
      if (num >= 2 && num <= 10 && Number.isInteger(num)) {
        generateParticipants(num);
        generateTheme();
        setCurrentParticipantIndex(0);
        setIsNumberVisible(false);
        setIsGameStarted(true);
        setIsGameFinished(false);
        setCanProceed(true);
      } else {
        alert("参加人数は2〜10の整数を入力してください");
      }
    }
  };

  // 次の参加者へボタンが押されたときの処理
  const nextParticipant = () => {
    if (currentParticipantIndex < participants.length - 1) {
      setCurrentParticipantIndex(currentParticipantIndex + 1);
      setIsNumberVisible(false);
    } else {
      setIsGameFinished(true);
    }
  };

  // 数字表示ボタンが押されたときの処理
  const showNumber = () => {
    setIsNumberVisible(true);
  };

  return (
    <div className="App">
      {!isGameStarted && <button onClick={startGame}>ゲーム開始</button>}
      {isGameStarted && !isGameFinished && (
        <div>
          <h1>お題：{theme}</h1>
          {isNumberVisible && (
            <p>
              参加者{participants[currentParticipantIndex].id}:{" "}
              {participants[currentParticipantIndex].number}
            </p>
          )}
          {!isNumberVisible && <button onClick={showNumber}>数字を表示</button>}
          {isNumberVisible && (
            <button onClick={nextParticipant}>次の参加者へ</button>
          )}
        </div>
      )}
      {isGameFinished && (
        <div>
          <h1>正解の並び順：</h1>
          {participants
            .sort((a, b) => a.number - b.number)
            .map((participant, index) => (
              <p key={index}>
                参加者{participant.id}: {participant.number}
              </p>
            ))}
          <button onClick={startGame}>もう一度遊ぶ</button>
        </div>
      )}
    </div>
  );
}

export default App;
