import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import GameOverPage from './pages/GameOverPage';
('./pages/GameOverPage');

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/gameover" element={<GameOverPage />} />
    </Routes>
  );
}

export default App;
