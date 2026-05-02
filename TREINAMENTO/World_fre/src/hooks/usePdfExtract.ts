import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface UsePdfExtractReturn {
  extractText: (file: File) => Promise<string>;
  isExtracting: boolean;
  error: string | null;
}

export const usePdfExtract = (): UsePdfExtractReturn => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractText = useCallback(async (file: File): Promise<string> => {
    setIsExtracting(true);
    setError(null);

    try {
      if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
        throw new Error('Por favor, selecione um arquivo PDF válido');
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str || '')
          .join(' ');
        fullText += pageText + '\n';
      }

      setIsExtracting(false);
      return fullText.trim();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar PDF';
      setError(errorMessage);
      setIsExtracting(false);
      throw err;
    }
  }, []);

  return { extractText, isExtracting, error };
};
