import React, { useRef } from 'react';
import { usePdfExtract } from '@/hooks/usePdfExtract';

interface PdfUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
  disabled?: boolean;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({ onTextExtracted, disabled = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { extractText, isExtracting, error } = usePdfExtract();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractText(file);
      onTextExtracted(text, file.name);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Erro ao extrair PDF:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        disabled={disabled || isExtracting}
        className="hidden"
        aria-label="Selecionar arquivo PDF"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || isExtracting}
        className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        aria-label="Importar PDF"
      >
        {isExtracting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Lendo PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Importar PDF
          </>
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};
