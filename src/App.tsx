import './App.css';
import { coinsList } from './data/coinData';

function App() {
  return (
    <div style={{ textAlign: 'center', margin: '1rem auto' }}>
      <h1>CoinSniper Home Page</h1>
      <p>Here are the top 10 coins by market cap:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {coinsList.map((coin) => (
          <div
            key={coin.symbol}
            style={{
              margin: '1rem',
              width: '120px',
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
            }}
          >
            <img src={coin.imageUrl} alt={coin.name} style={{ width: '60px', height: '60px' }} />
            <p>{coin.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
