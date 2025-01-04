import React from 'react';
import './GameOverPage.css';

interface GameOverPageProps {
  finalScore: number;
  onPlayAgain: () => void;
}

const GameOverPage: React.FC<GameOverPageProps> = ({ finalScore, onPlayAgain }) => {
  return (
    <div className="gameover-container">
      <h1>Game Over!</h1>
      <p>Final score: {finalScore}</p>
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameOverPage;
