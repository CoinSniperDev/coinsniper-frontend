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
      
      {/* About Pop-up */}
      {false && (
        <div className={styles.aboutPopup}>
          <div className={styles.aboutContent}>
            <button onClick={toggleAbout} className={styles.closeButton}>X</button>
            <h2>About CoinSniper.io</h2>
            <p>CoinSniper.io is a fast-paced cryptocurrency trivia game. Test your knowledge and compete for the top spot on the leaderboard!</p>
            <p>Support our project:</p>
            <ul>
              <li>Donate BTC: <a href="bitcoin:your-btc-address">your-btc-address</a></li>
              <li>Donate ETH: <a href="ethereum:your-eth-address">your-eth-address</a></li>
            </ul>
          </div>
        </div>
      )}
      {/* Leaderboard */}
      <div className={styles.leaderboardContainer}>
        <h2>Top 10 Leaderboard</h2>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Score</th>
              <th>Player</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for dynamic leaderboard rows */}
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td>—</td>
                <td>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StartPage;
