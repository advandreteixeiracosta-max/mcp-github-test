import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  maxLength = 100000,
  disabled = false,
  placeholder = 'Digite ou cole seu texto aqui...',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const characterCount = value.length;
  const percentageUsed = (characterCount / maxLength) * 100;

  return (
    <div className="w-full">
      <label htmlFor="text-input" className="block text-sm font-medium text-gray-900 mb-2">
        Entrada de Texto
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        aria-label="Campo de texto para análise de frequência de palavras"
      />
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {characterCount} / {maxLength} caracteres
        </span>
        <div className="w-48 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              percentageUsed > 80 ? 'bg-red-500' : percentageUsed > 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${percentageUsed}%` }}
          />
        </div>
      </div>
    </div>
  );
};
