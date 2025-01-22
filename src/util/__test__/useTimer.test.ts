import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useTimer from '../useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Mock timers
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should count down correctly', () => {
    const mockOnExpire = vi.fn();
    const { result } = renderHook(() => useTimer({ duration: 5, onExpire: mockOnExpire }));

    expect(result.current.timeLeft).toBe(5);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(4);

    // Fast-forward to expiration
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.timeLeft).toBe(0);
    expect(mockOnExpire).toHaveBeenCalledTimes(1);
  });

  it('should handle pause and resume', () => {
    const mockOnExpire = vi.fn();
    const { result } = renderHook(() => useTimer({ duration: 5, onExpire: mockOnExpire }));

    // Pause the timer
    act(() => {
      result.current.pause();
    });

    act(() => {
      vi.advanceTimersByTime(2000); // Time shouldn't advance
    });
    expect(result.current.timeLeft).toBe(5);

    // Resume the timer
    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.timeLeft).toBe(3);
  });
});
