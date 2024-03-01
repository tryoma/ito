import React, { useState } from 'react';
import './App.css';
import { themes } from './theme';
import PwaButton from './components/PwaButton';

type Participant = {
  id: number;
  number: number;
};

function App() {
  const [theme, setTheme] = useState<string>('');
  const [subTheme, setSubTheme] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentParticipantIndex, setCurrentParticipantIndex] =
    useState<number>(0);
  const [isNumberVisible, setIsNumberVisible] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameDoing, setIsGameDoing] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [numParticipants, setNumParticipants] = useState<number>(2);

  const generateParticipants = (numParticipants: number) => {
    const newParticipants: Participant[] = [];
    while (newParticipants.length < numParticipants) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      if (!newParticipants.find(p => p.number === randomNumber)) {
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
    setTheme(themes[randomIndex].theme);
    setSubTheme(themes[randomIndex].sub);
  };

  const changeNumParticipants = (num: number) => {
    if (num >= 2 && num <= 10 && Number.isInteger(num)) {
      setNumParticipants(num);
    } else {
      alert('参加人数は2〜10の整数を入力してください');
    }
  };

  // ゲーム開始ボタンが押されたときの処理
  const startGame = () => {
    generateParticipants(numParticipants);
    generateTheme();
    setCurrentParticipantIndex(0);
    setIsNumberVisible(false);
    setIsGameStarted(true);
    setIsGameDoing(false);
    setIsGameFinished(false);
  };

  const gotop = () => {
    window.location.reload();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeNumParticipants(Number(e.target.value));
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

  const showDoing = () => {
    setIsGameDoing(true);
  };

  const showAnswer = () => {
    setIsGameFinished(true);
  };

  return (
    <div className="App">
      <PwaButton />
      {!isGameStarted && (
        <>
          <p>参加人数</p>
          <div className="cp_ipselect">
            <select
              className="cp_sl06"
              onChange={handleSelectChange}
              value={numParticipants}
            >
              <option value={2}>2人</option>
              <option value={3}>3人</option>
              <option value={4}>4人</option>
              <option value={5}>5人</option>
              <option value={6}>6人</option>
              <option value={7}>7人</option>
              <option value={8}>8人</option>
              <option value={9}>9人</option>
              <option value={10}>10人</option>
            </select>
          </div>
          <button className="btn" onClick={startGame}>
            ゲーム開始
          </button>
        </>
      )}
      {isGameStarted && !isGameFinished && (
        <div className="card">
          <h1>お題</h1>
          <h2>{theme}</h2>
          <h3>{subTheme}</h3>
          {isNumberVisible && !isGameDoing && (
            <div className="number">
              <p>参加者{participants[currentParticipantIndex].id}</p>
              <div className="big-number">
                {participants[currentParticipantIndex].number}
              </div>
            </div>
          )}
          {!isNumberVisible && (
            <button className="btn show" onClick={showNumber}>
              数字を表示
            </button>
          )}
          {isNumberVisible &&
            (currentParticipantIndex < participants.length - 1 ? (
              <button className="btn next" onClick={nextParticipant}>
                次の参加者へ
              </button>
            ) : (
              !isGameDoing && (
                <div>
                  <button className="btn next" onClick={showDoing}>
                    ゲームを開始する
                  </button>
                </div>
              )
            ))}
          {isGameDoing && (
            <div>
              <p className="now">ゲーム中</p>
              <button className="btn next" onClick={showAnswer}>
                答えを表示する
              </button>
              <p>注意：押したら全員の数字が表示されます。</p>
            </div>
          )}
        </div>
      )}
      {isGameFinished && (
        <div className="card">
          <h1>正解の並び順</h1>
          {participants
            .sort((a, b) => a.number - b.number)
            .map((participant, index) => (
              <div className="number" key={index}>
                <p>
                  参加者{participant.id}: {participant.number}
                </p>
              </div>
            ))}
          <button className="btn" onClick={startGame}>
            もう一度遊ぶ
          </button>
          <button className="btn" onClick={gotop}>
            TOPに戻る
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
