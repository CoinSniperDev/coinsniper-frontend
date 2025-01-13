import React from 'react';
import './GameOverPage.css';
import { Coin } from '../data/coinData';

interface GameOverPageProps {
  finalScore: number;
  failedCoin: Coin | null;
  onPlayAgain: () => void;
}

const GameOverPage: React.FC<GameOverPageProps> = ({ finalScore, failedCoin, onPlayAgain }) => {
  // _blank target: ensures that the link opens in a new browser tab when clicked.
  // noopener: Prevents the newly opened tab from gaining access to the window.opener object.

  // TODO: Add styling to image and adjust alt text and remove norefferer in linting rules.
  return (
    <div className="gameover-container">
      <h1>It&apos;s SO Over!</h1>
      <p>Final score: {finalScore}</p>
      {/* Construct coingecko URL by converting coin name to lowercase and replacing spaces with hyphens  */}
      {failedCoin && (
        <>
          <img src={failedCoin.imageUrl} alt={`Failed Coin`} className="failed-coin-image" />
          <p>
            <a
              href={`https://www.coingecko.com/en/coins/${failedCoin.name.toLowerCase().replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              The coin was: {failedCoin.name} ({failedCoin.symbol})! Learn more on coingecko.com
            </a>
          </p>
        </>
      )}
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameOverPage;
