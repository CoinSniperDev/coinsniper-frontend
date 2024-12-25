import { useLocation, useNavigate } from 'react-router-dom';

const GameOverPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // The finalScore was passed via navigate('/gameover', { state: { finalScore } });
  const finalScore = (location.state as { finalScore: number })?.finalScore || 0;

  function handlePlayAgain() {
    navigate('/quiz');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Game Over!</h1>
      <p>Your final score: {finalScore}</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default GameOverPage;
