// src/pages/QuizPage.tsx
import React, { useEffect, useState } from 'react';
import { Coin } from '../data/coinData';
import CircleTimer from '../components/CircleTimer';
import './QuizPage.css';

interface QuizPageProps {
  coins: Coin[];
  score: number;
  onScoreChange: (newScore: number) => void;
  onGameOver: () => void;
}

const totalTime = 3; // seconds

const QuizPage: React.FC<QuizPageProps> = ({ coins, score, onScoreChange, onGameOver }) => {
  const [remainingCoins, setRemainingCoins] = useState<Coin[]>(coins);
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [options, setOptions] = useState<Coin[]>([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Load first question
    if (remainingCoins.length === 0) {
      // no coins left => game over
      onGameOver();
      return;
    }
    loadNextQuestion();
  }, []);

  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      setTimer((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= totalTime) {
          // time's up => game over
          onGameOver();
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onGameOver]);

  function loadNextQuestion() {
    setTimer(0);

    // pick random coin
    const randIndex = Math.floor(Math.random() * remainingCoins.length);
    const selectedCoin = remainingCoins[randIndex];
    setCurrentCoin(selectedCoin);

    // get 3 incorrect
    const incorrectCoins = remainingCoins.filter((coin) => coin.symbol !== selectedCoin.symbol);
    // shuffle and pick 3
    const shuffledIncorrect = shuffleArray(incorrectCoins).slice(0, 3);

    // combine correct + incorrect
    const allOptions = shuffleArray([selectedCoin, ...shuffledIncorrect]);
    setOptions(allOptions);
  }

  function handleGuess(guessedCoin: Coin) {
    if (!currentCoin) return;

    if (guessedCoin.symbol === currentCoin.symbol) {
      // correct guess
      onScoreChange(score + 1);

      // remove guessed coin from array
      setRemainingCoins((prev) => prev.filter((c) => c.symbol !== currentCoin.symbol));

      setTimeout(() => {
        if (remainingCoins.length - 1 === 0) {
          // that was last coin => game over
          onGameOver();
        } else {
          loadNextQuestion();
        }
      }, 200);
    } else {
      // wrong => game over
      onGameOver();
    }
  }

  return (
    <div className="quiz-container">
      <h2>Score: {score}</h2>
      {currentCoin && (
        <>
          <img src={currentCoin.imageUrl} alt={currentCoin.name} className="coin-image" />
          <div className="timer-wrapper">
            <CircleTimer totalTime={totalTime} currentTime={timer} />
          </div>
          <div className="button-list">
            {options.map((option) => (
              <button key={option.symbol} onClick={() => handleGuess(option)} className="guess-button">
                {option.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default QuizPage;
