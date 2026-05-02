import React from 'react';

interface AnalysisButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
}

export const AnalysisButton: React.FC<AnalysisButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  label = 'Analisar',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      aria-label={label}
    >
      {isLoading ? (
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
          Analisando...
        </>
      ) : (
        label
      )}
    </button>
  );
};
