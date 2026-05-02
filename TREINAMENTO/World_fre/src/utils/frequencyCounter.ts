import { WordFrequencyData, AnalysisResult } from '@/types';

export const countFrequency = (words: string[]): Record<string, number> => {
  const frequency: Record<string, number> = {};

  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }

  return frequency;
};

export const sortByFrequency = (frequency: Record<string, number>): WordFrequencyData[] => {
  return Object.entries(frequency)
    .map(([word, count]) => ({
      word,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const calculatePercentages = (words: WordFrequencyData[]): WordFrequencyData[] => {
  const totalCount = words.reduce((sum, item) => sum + item.count, 0);

  return words.map(item => ({
    ...item,
    percentage: totalCount > 0 ? (item.count / totalCount) * 100 : 0,
  }));
};

export const analyzeWords = (words: string[]): AnalysisResult => {
  const frequency = countFrequency(words);
  let sortedWords = sortByFrequency(frequency);
  sortedWords = calculatePercentages(sortedWords);

  return {
    words: sortedWords,
    totalWords: words.length,
    uniqueWords: Object.keys(frequency).length,
    timestamp: new Date(),
  };
};
