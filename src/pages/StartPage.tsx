// src/pages/StartPage.tsx
import React from 'react';
import './StartPage.css';

interface StartPageProps {
  onStartGame: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  return (
    <div className="start-container">
      <h1>CoinSniper.io</h1>
      <p>
        You have 3 seconds to guess the correct coin by its image. Once you guess wrong or run out of time, it&apos;s
        game over!
      </p>
      <button className="start-button" onClick={onStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
