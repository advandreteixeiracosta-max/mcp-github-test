import { describe, it, expect } from 'vitest';
import {
  countFrequency,
  sortByFrequency,
  calculatePercentages,
  analyzeWords,
} from '@/utils/frequencyCounter';

describe('frequencyCounter', () => {
  describe('countFrequency', () => {
    it('should count word frequency correctly', () => {
      const words = ['hello', 'world', 'hello', 'test'];
      const result = countFrequency(words);
      expect(result).toEqual({
        hello: 2,
        world: 1,
        test: 1,
      });
    });

    it('should handle empty array', () => {
      const result = countFrequency([]);
      expect(result).toEqual({});
    });
  });

  describe('sortByFrequency', () => {
    it('should sort by frequency in descending order', () => {
      const frequency = { hello: 3, world: 1, test: 2 };
      const result = sortByFrequency(frequency);
      expect(result[0].word).toBe('hello');
      expect(result[1].word).toBe('test');
      expect(result[2].word).toBe('world');
    });

    it('should preserve count values', () => {
      const frequency = { a: 5, b: 3 };
      const result = sortByFrequency(frequency);
      expect(result[0].count).toBe(5);
      expect(result[1].count).toBe(3);
    });
  });

  describe('calculatePercentages', () => {
    it('should calculate percentages correctly', () => {
      const words = [
        { word: 'hello', count: 5, percentage: 0 },
        { word: 'world', count: 5, percentage: 0 },
      ];
      const result = calculatePercentages(words);
      expect(result[0].percentage).toBe(50);
      expect(result[1].percentage).toBe(50);
    });

    it('should handle single word', () => {
      const words = [{ word: 'hello', count: 1, percentage: 0 }];
      const result = calculatePercentages(words);
      expect(result[0].percentage).toBe(100);
    });
  });

  describe('analyzeWords', () => {
    it('should perform complete analysis', () => {
      const words = ['hello', 'world', 'hello'];
      const result = analyzeWords(words);
      expect(result.totalWords).toBe(3);
      expect(result.uniqueWords).toBe(2);
      expect(result.words[0].word).toBe('hello');
      expect(result.words[0].count).toBe(2);
    });

    it('should include timestamp', () => {
      const words = ['test'];
      const result = analyzeWords(words);
      expect(result.timestamp).toBeInstanceOf(Date);
    });
  });
});
