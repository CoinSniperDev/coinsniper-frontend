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

  function handleStartGame() {
    setScore(0); // reset score
    setGamePhase('quiz');
  }

  function handleGameOver() {
    setGamePhase('gameover');
  }

  function handleScoreChange(newScore: number) {
    setScore(newScore);
  }

  function handlePlayAgain() {
    // go back to quiz
    setScore(0);
    setGamePhase('quiz');
  }

  return (
    <div className="app-container">
      {gamePhase === 'start' && <StartPage onStartGame={handleStartGame} />}
      {gamePhase === 'quiz' && (
        <QuizPage coins={coinsList} score={score} onScoreChange={handleScoreChange} onGameOver={handleGameOver} />
      )}
      {gamePhase === 'gameover' && <GameOverPage finalScore={score} onPlayAgain={handlePlayAgain} />}
    </div>
  );
}

export default App;
