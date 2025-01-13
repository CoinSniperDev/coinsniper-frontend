import React, { useEffect, useState } from 'react';
import { Coin } from '../data/coinData';
import CircleTimer from '../components/CircleTimer';
import './QuizPage.css';
import { TIMER_DURATION } from '../config';
import { shuffleArray, pickRandomElements } from '../util/array-utils';

interface QuizPageProps {
  coins: Coin[];
  score: number;
  onScoreChange: (newScore: number) => void;
  onGameOver: (failedCoin: Coin | null) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ coins, score, onScoreChange, onGameOver }) => {
  const [remainingQuestions, setRemainingQuestions] = useState<Coin[]>([]);
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);
  const [options, setOptions] = useState<Coin[]>([]);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Shuffle coins once at the start of the game
    const shuffledCoins = shuffleArray([...coins]);
    setRemainingQuestions(shuffledCoins);
    loadNextQuestion(shuffledCoins);
  }, [coins]);

  useEffect(() => {
    if (isGameOver) {
      onGameOver(currentCoin);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= TIMER_DURATION) {
          setIsGameOver(true);
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver, currentCoin, onGameOver]);

  function loadNextQuestion(questions = remainingQuestions) {
    setTimer(0);

    if (questions.length === 0) {
      setIsGameOver(true);
      return;
    }

    const [selectedCoin, ...rest] = questions;
    setCurrentCoin(selectedCoin);
    setRemainingQuestions(rest);

    // Pick 3 incorrect options randomly
    const incorrectCoins = coins.filter((coin) => coin.symbol !== selectedCoin.symbol);
    const randomOptions = pickRandomElements(incorrectCoins, 3);

    // Combine and shuffle the options once
    const allOptions = shuffleArray([selectedCoin, ...randomOptions]);
    setOptions(allOptions);
  }

  function handleGuess(guessedCoin: Coin) {
    if (!currentCoin) return;

    if (guessedCoin.symbol === currentCoin.symbol) {
      onScoreChange(score + 1);
      loadNextQuestion();
    } else {
      setIsGameOver(true);
    }
  }

  return (
    <div className="quiz-container">
      <h2>Score: {score}</h2>
      {currentCoin && (
        <>
          <img src={currentCoin.imageUrl} alt={'Guess the coin'} className="coin-image" />
          <div className="timer-wrapper">
            <CircleTimer totalTime={TIMER_DURATION} currentTime={timer} />
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

export default QuizPage;
