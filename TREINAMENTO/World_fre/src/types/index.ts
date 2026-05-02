export interface WordFrequencyData {
  word: string;
  count: number;
  percentage?: number;
}

export interface AnalysisResult {
  words: WordFrequencyData[];
  totalWords: number;
  uniqueWords: number;
  timestamp: Date;
}
