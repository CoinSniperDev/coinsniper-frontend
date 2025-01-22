import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StartPage from '../StartPage';
import { GAEventCategory, logGAEvent } from '../../util';

vi.mock('../../util', () => ({
  logGAEvent: vi.fn(),
  GAEventCategory: {
    GAME: 'game',
    LINK: 'external_link',
  },
}));

describe('StartPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('triggers onStartGame when the button is clicked', () => {
    const onStartGameMock = vi.fn();
    render(<StartPage onStartGame={onStartGameMock} />);
    fireEvent.click(screen.getByText(/Start Game/i));

    expect(onStartGameMock).toHaveBeenCalledTimes(1);

    expect(logGAEvent).toHaveBeenCalledTimes(1);
    expect(logGAEvent).toHaveBeenCalledWith(GAEventCategory.GAME, 'start_game', 'start_button_click');
  });
});
