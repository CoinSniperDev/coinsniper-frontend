import { describe, it, expect } from 'vitest';
import { shuffleArray, pickRandomElements } from '../array-utils';

describe('Array Utility Functions', () => {
  it('shuffleArray returns a shuffled array of the same length', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...originalArray]);
    expect(shuffledArray).toHaveLength(originalArray.length);
    expect(shuffledArray).not.toEqual(originalArray); // Unlikely to be in the same order
  });

  it('pickRandomElements picks the correct number of elements and ensures uniqueness', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const pickedElements = pickRandomElements(originalArray, 3);
    expect(pickedElements).toHaveLength(3);

    // Ensure all picked elements are from the original array
    pickedElements.forEach((element) => {
      expect(originalArray).toContain(element);
    });

    // Ensure all picked elements are unique
    const uniqueElements = new Set(pickedElements);
    expect(uniqueElements.size).toBe(pickedElements.length);
    pickedElements.forEach((element) => {
      expect(originalArray).toContain(element);
    });
  });

  it('pickRandomElements handles count greater than array length', () => {
    const originalArray = [1, 2];
    const pickedElements = pickRandomElements(originalArray, 5);
    expect(pickedElements).toHaveLength(originalArray.length);
  });

  it('pickRandomElements ensures all elements are unique', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const pickedElements = pickRandomElements(originalArray, 4);
    const uniqueElements = new Set(pickedElements);
    expect(uniqueElements.size).toBe(pickedElements.length);
  });
});
