import { describe, it, expect } from 'vitest';
import {
  tokenizeText,
  removeStopWords,
  removePunctuation,
  processText,
} from '@/utils/textProcessor';

describe('textProcessor', () => {
  describe('tokenizeText', () => {
    it('should tokenize text into words', () => {
      const text = 'Hello world this is a test';
      const result = tokenizeText(text);
      expect(result).toEqual(['hello', 'world', 'this', 'is', 'a', 'test']);
    });

    it('should handle multiple spaces', () => {
      const text = 'Hello    world';
      const result = tokenizeText(text);
      expect(result).toEqual(['hello', 'world']);
    });

    it('should convert to lowercase', () => {
      const text = 'HELLO World';
      const result = tokenizeText(text);
      expect(result).toEqual(['hello', 'world']);
    });
  });

  describe('removePunctuation', () => {
    it('should remove punctuation from words', () => {
      expect(removePunctuation('hello,')).toBe('hello');
      expect(removePunctuation('world!')).toBe('world');
      expect(removePunctuation('test.')).toBe('test');
    });

    it('should preserve hyphens', () => {
      expect(removePunctuation('well-known')).toBe('well-known');
    });
  });

  describe('removeStopWords', () => {
    it('should remove common stop words', () => {
      const words = ['the', 'quick', 'brown', 'fox', 'is', 'fast'];
      const result = removeStopWords(words);
      expect(result).toEqual(['quick', 'brown', 'fox', 'fast']);
    });

    it('should preserve non-stop words', () => {
      const words = ['javascript', 'typescript', 'python'];
      const result = removeStopWords(words);
      expect(result).toEqual(['javascript', 'typescript', 'python']);
    });
  });

  describe('processText', () => {
    it('should process text with default settings', () => {
      const text = 'Hello, world! Hello everyone.';
      const result = processText(text);
      expect(result).toEqual(['hello', 'world', 'hello', 'everyone']);
    });

    it('should filter stop words when enabled', () => {
      const text = 'the quick brown fox is fast';
      const result = processText(text, true);
      expect(result).toEqual(['quick', 'brown', 'fox', 'fast']);
    });
  });
});
