interface CircleTimerProps {
  totalTime: number; // total seconds
  currentTime: number; // how many seconds have elapsed
  size?: number; // diameter of the circle
}

const CircleTimer: React.FC<CircleTimerProps> = ({ totalTime, currentTime, size = 60 }) => {
  const radius = (size - 6) / 2; // subtract stroke
  const circumference = 2 * Math.PI * radius;

  // remaining = totalTime - currentTime
  // fraction from 0..1
  const fraction = Math.max(0, (totalTime - currentTime) / totalTime);
  const offset = circumference * (1 - fraction);

  return (
    <svg width={size} height={size}>
      <circle stroke="#ccc" fill="transparent" strokeWidth="5" r={radius} cx={size / 2} cy={size / 2} />
      <circle
        stroke="#f00"
        fill="transparent"
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ transition: 'stroke-dashoffset 0.2s linear' }}
      />
      <text x="50%" y="55%" textAnchor="middle" fill="#000" fontSize="14" fontWeight="bold">
        {Math.max(totalTime - currentTime, 0)}
      </text>
    </svg>
  );
};

export default CircleTimer;
