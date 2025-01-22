import React, { useEffect, useState } from 'react';
import { Coin } from '../data/coinData';
import CircleTimer from '../components/CircleTimer';
import { TIMER_DURATION } from '../config';
import { shuffleArray, pickRandomElements } from '../util/array-utils';
import { GAEventCategory, logGAEvent } from '../util/metrics-utils';
import useTimer from '../util/useTimer';
import './QuizPage.css';

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
  const [timerExpired, setTimerExpired] = useState(false);

  // Use the custom timer hook
  const { timeLeft, reset } = useTimer({
    duration: TIMER_DURATION,
    onExpire: () => {
      logGAEvent(GAEventCategory.GAME, 'game_over_timer_expired', undefined, score);
      setTimerExpired(true);
    },
  });

  // This is done to avoid React warning on updating component while rendering
  useEffect(() => {
    if (timerExpired) {
      onGameOver(currentCoin);
    }
  }, [timerExpired, currentCoin, onGameOver]);

  useEffect(() => {
    // Shuffle coins once at the start of the game
    const shuffledCoins = shuffleArray([...coins]);
    setRemainingQuestions(shuffledCoins);
    loadNextQuestion(shuffledCoins);
  }, [coins]);

  function loadNextQuestion(questions = remainingQuestions) {
    if (questions.length === 0) {
      onGameOver(null);
      // TODO: Handle winning the game scenario
      return;
    }

    reset(); // Reset the timer when loading a new question

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
      // Metric on game over event and also capture score
      logGAEvent(GAEventCategory.GAME, 'game_over_wrong_answer', undefined, score);
      onGameOver(currentCoin);
    }
  }

  return (
    <div className="quiz-container">
      <h2>Score: {score}</h2>
      {currentCoin && (
        <>
          <img src={currentCoin.imageUrl} alt={'Guess the coin'} className="coin-image" />
          <div className="timer-wrapper">
            <CircleTimer totalTime={TIMER_DURATION} currentTime={TIMER_DURATION - timeLeft} />
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

export default React.memo(QuizPage);
