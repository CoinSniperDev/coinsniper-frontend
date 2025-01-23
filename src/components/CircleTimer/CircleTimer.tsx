import React from 'react';
import './CircleTimer.css';

interface CircleTimerProps {
  totalTime: number; // total seconds
  currentTime: number; // how many seconds have elapsed
  size?: number; // diameter of the circle
}

const CircleTimer: React.FC<CircleTimerProps> = ({ totalTime, currentTime, size = 80 }) => {
  const radius = (size - 6) / 2; // subtract stroke
  const circumference = 2 * Math.PI * radius;

  const remaining = Math.max(totalTime - currentTime, 0);
  const fraction = remaining / totalTime;
  const offset = circumference * (1 - fraction);

  return (
    <svg width={size} height={size} className="circle-timer">
      <circle
        className="circle-bg"
        stroke="#ccc"
        fill="transparent"
        strokeWidth="5"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="circle-progress"
        stroke="#f00"
        fill="transparent"
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text x="50%" y="55%" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#000">
        {remaining}
      </text>
    </svg>
  );
};

export default CircleTimer;
