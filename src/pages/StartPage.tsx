import { Link } from 'react-router-dom';

const StartPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>CoinSniper</h1>
      <p>
        Welcome to the CoinSniper.io! You have 3 seconds to guess the correct crypto coin by its image. Once you guess
        wrong or run out of time, it's game over!
      </p>
      <Link to="/quiz">
        <button style={{ fontSize: '1.2rem', padding: '0.5rem 2rem' }}>Start Game</button>
      </Link>
    </div>
  );
};

export default StartPage;
