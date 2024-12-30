import { useState } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import GameOverPage from './pages/GameOverPage';
import { coinsList } from './data/coinData';
import './App.css';

type GamePhase = 'start' | 'quiz' | 'gameover';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('start');
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState([...coinsList]); // Fresh coin list for each game

  function startQuiz() {
    setScore(0);
    setCoins([...coinsList]); // Reset coin list for new game
    setGamePhase('quiz');
  }

  function handleGameOver() {
    setGamePhase('gameover');
  }

  function handleScoreChange(newScore: number) {
    setScore(newScore);
  }

  return (
    <div className="app-container">
      {gamePhase === 'start' && <StartPage onStartGame={startQuiz} />}
      {gamePhase === 'quiz' && (
        <QuizPage coins={coins} score={score} onScoreChange={handleScoreChange} onGameOver={handleGameOver} />
      )}
      {gamePhase === 'gameover' && <GameOverPage finalScore={score} onPlayAgain={startQuiz} />}
    </div>
  );
}

export default App;
