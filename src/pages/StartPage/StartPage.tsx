import React from 'react';
import styles from './StartPage.module.css';
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
    <div className={styles.startContainer}>
      <h1>CoinSniper.io</h1>
      <p>
        You have 3 seconds to guess the correct coin by its image. Once you guess wrong or run out of time, it&apos;s
        game over!
      </p>
      <button className={styles.startBtn} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
