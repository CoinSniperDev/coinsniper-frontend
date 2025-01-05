import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CircleTimer from '../CircleTimer';

describe('CircleTimer Component', () => {
  it('renders correctly with custom size', () => {
    const { container } = render(<CircleTimer totalTime={10} currentTime={5} size={100} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '100');
  });

  it('triggers correct stroke calculation based on time', () => {
    const { container } = render(<CircleTimer totalTime={10} currentTime={5} />);
    const circle = container.querySelector('.circle-progress');
    expect(circle).toHaveAttribute('stroke-dashoffset');
  });
});
