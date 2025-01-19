// src/pages/StartPage.tsx
import React from 'react';
import ReactGA from 'react-ga4';
import './StartPage.css';
import { GA_CATEGORY_GAME } from '../config';

interface StartPageProps {
  onStartGame: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const handleStartGame = () => {
    ReactGA.event({
      category: GA_CATEGORY_GAME,
      action: 'start_game',
      label: 'start_button_click',
    });

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
