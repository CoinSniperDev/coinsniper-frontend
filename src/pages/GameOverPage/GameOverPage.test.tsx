import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameOverPage from './GameOverPage';
import { GAEventCategory, logGAEvent } from '../../util';

vi.mock('../../util', () => ({
  logGAEvent: vi.fn(),
  GAEventCategory: {
    GAME: 'game',
    LINK: 'external_link',
  },
}));

describe('GameOverPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('triggers onPlayAgain when the button is clicked', () => {
    const onPlayAgainMock = vi.fn();
    render(<GameOverPage finalScore={10} failedCoin={null} onPlayAgain={onPlayAgainMock} />);
    fireEvent.click(screen.getByText(/Play Again/i));

    expect(onPlayAgainMock).toHaveBeenCalledTimes(1);
    expect(logGAEvent).toHaveBeenCalledTimes(1);
    expect(logGAEvent).toHaveBeenCalledWith(GAEventCategory.GAME, 'play_again', 'play_again_button_click', 1);
  });
});
