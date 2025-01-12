import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameOverPage from '../GameOverPage';

describe('GameOverPage Component', () => {
  it('triggers onPlayAgain when the button is clicked', () => {
    const onPlayAgainMock = vi.fn();
    render(<GameOverPage finalScore={10} onPlayAgain={onPlayAgainMock} />);
    fireEvent.click(screen.getByText(/Play Again/i));
    expect(onPlayAgainMock).toHaveBeenCalledTimes(1);
  });
});
