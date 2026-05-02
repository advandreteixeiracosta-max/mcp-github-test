import React, { useState } from 'react';
import { TextInput } from '@/components/TextInput';
import { AnalysisButton } from '@/components/AnalysisButton';
import { FrequencyTable } from '@/components/FrequencyTable';
import { FrequencyChart } from '@/components/FrequencyChart';
import { PdfUpload } from '@/components/PdfUpload';
import { useWordFrequency } from '@/hooks/useWordFrequency';

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [activeView, setActiveView] = useState<'tabela' | 'grafico'>('tabela');
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const { result, error, isLoading, analyze, reset } = useWordFrequency();

  const handleAnalyze = () => {
    analyze(inputText);
  };

  const handleReset = () => {
    setInputText('');
    setActiveView('tabela');
    setPdfFileName(null);
    reset();
  };

  const handlePdfExtracted = (text: string, fileName: string) => {
    setPdfFileName(fileName);
    analyze(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analisador de Frequência de Palavras</h1>
          <p className="text-lg text-gray-600">
            Analise a frequência de palavras no seu texto
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <TextInput
              value={inputText}
              onChange={setInputText}
              disabled={isLoading}
            />
            <PdfUpload
              onTextExtracted={handlePdfExtracted}
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <AnalysisButton
              onClick={handleAnalyze}
              isLoading={isLoading}
              disabled={inputText.trim().length === 0}
              label="Analisar"
            />
            {result && (
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Limpar
              </button>
            )}
          </div>

          {/* PDF Badge */}
          {pdfFileName && (
            <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 16.5a1 1 0 01-1-1V5a1 1 0 011-1h3V2a1 1 0 10-2 0v1H6a3 3 0 00-3 3v10a3 3 0 003 3h8a3 3 0 003-3v-2h1a1 1 0 110 2h-1v2a3 3 0 01-3 3H8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-green-900 font-medium">{pdfFileName}</span>
              <svg className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* View Toggle */}
          {result && (
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveView('tabela')}
                className={`px-4 py-2 font-medium transition-colors duration-200 ${
                  activeView === 'tabela'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tabela
              </button>
              <button
                onClick={() => setActiveView('grafico')}
                className={`px-4 py-2 font-medium transition-colors duration-200 ${
                  activeView === 'grafico'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Gráfico
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <>
              {activeView === 'tabela' ? (
                <FrequencyTable data={result.words} isVisible={true} />
              ) : (
                <FrequencyChart data={result.words} />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 text-sm">
          <p>Máximo de 100.000 caracteres por análise</p>
        </div>
      </div>
    </div>
  );
};

export default App;
