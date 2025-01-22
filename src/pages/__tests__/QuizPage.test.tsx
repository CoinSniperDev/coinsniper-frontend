import { render, fireEvent, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QuizPage from '../QuizPage';
import { logGAEvent, GAEventCategory } from '../../util';

vi.mock('../../util', () => ({
  logGAEvent: vi.fn(),
  GAEventCategory: {
    GAME: 'game',
    LINK: 'external_link',
  },
}));

describe('QuizPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCoins = [
    { name: 'Bitcoin', symbol: 'BTC', imageUrl: 'path/to/bitcoin.png' },
    { name: 'Ethereum', symbol: 'ETH', imageUrl: 'path/to/ethereum.png' },
    { name: 'Litecoin', symbol: 'LTC', imageUrl: 'path/to/litecoin.png' },
    { name: 'Ripple', symbol: 'XRP', imageUrl: 'path/to/ripple.png' },
  ];

  let onScoreChangeMock: ReturnType<typeof vi.fn>;
  let onGameOverMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onScoreChangeMock = vi.fn();
    onGameOverMock = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls onScoreChange on correct guess', () => {
    render(<QuizPage coins={mockCoins} score={0} onScoreChange={onScoreChangeMock} onGameOver={onGameOverMock} />);

    // Get the displayed coin image
    const displayedCoinImg = screen.getByAltText(/Guess the coin/i);
    const displayedCoinSrc = displayedCoinImg.getAttribute('src');

    // Find the correct coin in the mock data
    const correctCoin = mockCoins.find((coin) => coin.imageUrl === displayedCoinSrc);
    expect(correctCoin).toBeDefined();

    // Click the button with the correct coin name
    fireEvent.click(screen.getByText(correctCoin!.name));

    // Verify that onScoreChange was called
    expect(onScoreChangeMock).toHaveBeenCalled();
  });

  it('calls onGameOver on incorrect guess', () => {
    render(<QuizPage coins={mockCoins} score={0} onScoreChange={onScoreChangeMock} onGameOver={onGameOverMock} />);

    // Get the displayed coin image
    const displayedCoinImg = screen.getByAltText(/Guess the coin/i);
    const displayedCoinSrc = displayedCoinImg.getAttribute('src');

    // Find the correct coin in the mock data
    const correctCoin = mockCoins.find((coin) => coin.imageUrl === displayedCoinSrc);
    expect(correctCoin).toBeDefined();

    // Find an incorrect coin (any coin that's not the correct one)
    const incorrectCoin = mockCoins.find((coin) => coin.symbol !== correctCoin!.symbol);
    expect(incorrectCoin).toBeDefined();

    // Click the button with the incorrect coin name
    fireEvent.click(screen.getByText(incorrectCoin!.name));

    // Verify that onGameOver was called
    expect(onGameOverMock).toHaveBeenCalledTimes(1);

    expect(logGAEvent).toHaveBeenCalledTimes(1);
    expect(logGAEvent).toHaveBeenCalledWith(GAEventCategory.GAME, 'game_over_wrong_answer', undefined, 0);
  });

  it('calls onGameOver after timer expires', () => {
    vi.useFakeTimers();
    render(<QuizPage coins={mockCoins} score={0} onScoreChange={onScoreChangeMock} onGameOver={onGameOverMock} />);

    act(() => {
      vi.advanceTimersByTime(3000); // Simulate timer expiration
    });

    expect(onGameOverMock).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
    expect(logGAEvent).toHaveBeenCalledTimes(1);
    expect(logGAEvent).toHaveBeenCalledWith(GAEventCategory.GAME, 'game_over_timer_expired', undefined, 0);
  });

  it('handles empty coin list by calling onGameOver', () => {
    render(<QuizPage coins={[]} score={0} onScoreChange={onScoreChangeMock} onGameOver={onGameOverMock} />);
    expect(onGameOverMock).toHaveBeenCalledTimes(1);
  });
});
