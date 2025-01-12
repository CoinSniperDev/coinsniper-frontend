import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders StartPage by default', () => {
    render(<App />);
    expect(screen.getByText(/CoinSniper.io/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
  });

  it('transitions to QuizPage on starting the game', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Start Game/i));
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
  });
});
