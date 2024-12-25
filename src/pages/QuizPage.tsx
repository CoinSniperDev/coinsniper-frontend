// src/pages/QuizPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coinsList, Coin } from '../data/coinData';
import CircleTimer from '../components/CircleTimer';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const [remainingCoins, setRemainingCoins] = useState<Coin[]>([...coinsList]);
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [options, setOptions] = useState<Coin[]>([]);
  const [timer, setTimer] = useState(0);
  const totalTime = 3; // 3 seconds

  // Load first question
  useEffect(() => {
    if (remainingCoins.length === 0) {
      goToGameOver();
      return;
    }
    loadNextQuestion();
  }, []);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= totalTime) {
          // Time's up
          goToGameOver();
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function loadNextQuestion() {
    setTimer(0); // reset timer

    const randIndex = Math.floor(Math.random() * remainingCoins.length);
    const selectedCoin = remainingCoins[randIndex];
    setCurrentCoin(selectedCoin);

    // Generate 3 incorrect
    const incorrectCoins = coinsList.filter((coin) => coin.symbol !== selectedCoin.symbol);
    const shuffledIncorrect = shuffleArray(incorrectCoins).slice(0, 3);

    // Combine correct + incorrect
    const allOptions = shuffleArray([selectedCoin, ...shuffledIncorrect]);
    setOptions(allOptions);
  }

  function handleGuess(coin: Coin) {
    if (!currentCoin) return;
    if (coin.symbol === currentCoin.symbol) {
      // correct
      setScore((prev) => prev + 1);
      setRemainingCoins((prev) => prev.filter((c) => c.symbol !== currentCoin.symbol));

      // load next or end if no coins left
      setTimeout(() => {
        if (remainingCoins.length - 1 === 0) {
          goToGameOver();
        } else {
          loadNextQuestion();
        }
      }, 200);
    } else {
      // wrong guess
      goToGameOver();
    }
  }

  function goToGameOver() {
    navigate('/gameover', { state: { finalScore: score } });
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Score: {score}</h2>
      {currentCoin && (
        <>
          <img src={currentCoin.imageUrl} alt={currentCoin.name} style={{ width: 100, height: 100 }} />
          <div style={{ margin: '1rem auto' }}>
            <CircleTimer totalTime={totalTime} currentTime={timer} />
          </div>

          <div>
            {options.map((option) => (
              <button
                key={option.symbol}
                onClick={() => handleGuess(option)}
                style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
              >
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
