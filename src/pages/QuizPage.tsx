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

const totalTime = 3; // game time in seconds

const QuizPage: React.FC<QuizPageProps> = ({ coins, score, onScoreChange, onGameOver }) => {
  const [remainingQuestions, setRemainingQuestions] = useState<Coin[]>([]);
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [options, setOptions] = useState<Coin[]>([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Shuffle coins once at the start of the game
    const shuffledCoins = shuffleArray([...coins]);
    setRemainingQuestions(shuffledCoins);
    loadNextQuestion(shuffledCoins);
  }, [coins]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= totalTime) {
          onGameOver();
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onGameOver]);

  function loadNextQuestion(questions = remainingQuestions) {
    setTimer(0);

    if (questions.length === 0) {
      onGameOver();
      return;
    }

    const [selectedCoin, ...rest] = questions;
    setCurrentCoin(selectedCoin);
    setRemainingQuestions(rest);

    const incorrectCoins = coins.filter((coin) => coin.symbol !== selectedCoin.symbol);
    const randomOptions = shuffleArray(incorrectCoins).slice(0, 3);
    const allOptions = shuffleArray([selectedCoin, ...randomOptions]);
    setOptions(allOptions);
  }

  function handleGuess(guessedCoin: Coin) {
    if (!currentCoin) return;

    if (guessedCoin.symbol === currentCoin.symbol) {
      onScoreChange(score + 1);
      loadNextQuestion();
    } else {
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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default QuizPage;
