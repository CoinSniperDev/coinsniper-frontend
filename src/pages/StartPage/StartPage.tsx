// src/pages/StartPage.tsx
import React from 'react';
import './StartPage.css';
import { GAEventCategory, logGAEvent } from '../../util';

interface StartPageProps {
  onStartGame: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const handleStartGame = () => {
    logGAEvent(GAEventCategory.GAME, 'start_game', 'start_button_click');

    // Trigger game start
    onStartGame();
  };

  return (
    <div className="start-container">
      <h1>CoinSniper.io</h1>
      <p>
        You have 3 seconds to guess the correct coin by its image. Once you guess wrong or run out of time, it&apos;s
        game over!
      </p>
      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
