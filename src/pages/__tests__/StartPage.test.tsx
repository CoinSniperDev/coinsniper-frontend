import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StartPage from '../StartPage';

describe('StartPage Component', () => {
  it('triggers onStartGame when the button is clicked', () => {
    const onStartGameMock = vi.fn();
    render(<StartPage onStartGame={onStartGameMock} />);
    fireEvent.click(screen.getByText(/Start Game/i));
    expect(onStartGameMock).toHaveBeenCalledTimes(1);
  });
});
