import { useState } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import GameOverPage from './pages/GameOverPage';
import { coinsList } from './data/coinData';
import { GamePhase } from './config';
import './App.css';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Start);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState([...coinsList]); // Fresh coin list for each game

  function startQuiz() {
    setScore(0);
    setCoins([...coinsList]); // Reset coin list for new game
    setGamePhase(GamePhase.Quiz);
  }

  function handleGameOver() {
    setGamePhase(GamePhase.GameOver);
  }

  function handleScoreChange(newScore: number) {
    setScore(newScore);
  }

  return (
    <div className="app-container">
      {gamePhase === GamePhase.Start && <StartPage onStartGame={startQuiz} />}
      {gamePhase === GamePhase.Quiz && (
        <QuizPage coins={coins} score={score} onScoreChange={handleScoreChange} onGameOver={handleGameOver} />
      )}
      {gamePhase === GamePhase.GameOver && <GameOverPage finalScore={score} onPlayAgain={startQuiz} />}
    </div>
  );
}

export default App;
