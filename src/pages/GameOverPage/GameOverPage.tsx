import React from 'react';
import './GameOverPage.css';
import { Coin } from '../../data/coinData';
import { SESSION_REPLAY_COUNT } from '../../config';
import { GAEventCategory, logGAEvent } from '../../util';

interface GameOverPageProps {
  finalScore: number;
  failedCoin: Coin | null;
  onPlayAgain: () => void;
}

const GameOverPage: React.FC<GameOverPageProps> = ({ finalScore, failedCoin, onPlayAgain }) => {
  // Keeps track of how many times user in this session is playing again via metrics.
  // Feteches from sessionStorage
  const handlePlayAgain = () => {
    const storedCount = sessionStorage.getItem(SESSION_REPLAY_COUNT);
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0; // parse Int using base 10

    const updatedPlayCount = currentCount + 1;
    sessionStorage.setItem(SESSION_REPLAY_COUNT, updatedPlayCount.toString());

    // Total count of "Play Again" button clicks in this session
    logGAEvent(GAEventCategory.GAME, 'play_again', 'play_again_button_click', updatedPlayCount);

    onPlayAgain();
  };

  // TODO: Consider adding coin being clicked on
  const handleCoinGeckoClick = () => {
    logGAEvent(GAEventCategory.LINK, 'click_coingecko', 'coingecko_link_click');
  };

  // _blank target: ensures that the link opens in a new browser tab when clicked.
  // noopener: Prevents the newly opened tab from gaining access to the window.opener object.

  // TODO: Add styling to image and adjust alt text and remove norefferer in linting rules.
  return (
    <div className="gameover-container">
      <h1>It&apos;s Over!</h1>
      <h3>Final score: {finalScore}</h3>
      {/* Construct coingecko URL by converting coin name to lowercase and replacing spaces with hyphens  */}
      {failedCoin && (
        <>
          <img src={failedCoin.imageUrl} alt={`Failed Coin`} className="failed-coin-image" />
          <p>
            <a
              href={`https://www.coingecko.com/en/coins/${failedCoin.name.toLowerCase().replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCoinGeckoClick}
            >
              The coin was: {failedCoin.name} ({failedCoin.symbol})! Learn more on coingecko.com
            </a>
          </p>
        </>
      )}
      <button className="play-again-button" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameOverPage;
