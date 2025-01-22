import { useState, useEffect, useRef } from 'react';

interface UseTimerOptions {
  duration: number; // Total duration of the timer
  onExpire: () => void; // Callback when the timer expires
  autoStart?: boolean; // Whether the timer starts automatically
}

const useTimer = ({ duration, onExpire, autoStart = true }: UseTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Always call the latest onExpire
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval); // Cleanup
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => setTimeLeft(duration);

  return { timeLeft, isRunning, start, pause, reset };
};

export default useTimer;
