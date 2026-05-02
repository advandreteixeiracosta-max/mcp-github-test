import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/types';
import { processText } from '@/utils/textProcessor';
import { analyzeWords } from '@/utils/frequencyCounter';
import { validateText } from '@/utils/validation';

interface UseWordFrequencyReturn {
  result: AnalysisResult | null;
  error: string | null;
  isLoading: boolean;
  analyze: (text: string) => void;
  reset: () => void;
}

export const useWordFrequency = (): UseWordFrequencyReturn => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyze = useCallback((text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const validation = validateText(text);

      if (!validation.valid) {
        setError(validation.error || 'Invalid input');
        setResult(null);
        setIsLoading(false);
        return;
      }

      const words = processText(text);
      const analysisResult = analyzeWords(words);

      setResult(analysisResult);
      setError(null);
    } catch (err) {
      setError('An error occurred while analyzing the text');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    result,
    error,
    isLoading,
    analyze,
    reset,
  };
};
