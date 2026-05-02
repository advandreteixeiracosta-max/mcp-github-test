import React from 'react';
import { WordFrequencyData } from '@/types';

interface FrequencyTableProps {
  data: WordFrequencyData[];
  isVisible?: boolean;
}

export const FrequencyTable: React.FC<FrequencyTableProps> = ({
  data,
  isVisible = true,
}) => {
  if (!isVisible || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Resultados</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Posição</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Palavra</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Frequência</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Percentual</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Visualização</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={`${item.word}-${index}`}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3 text-sm text-gray-600 font-medium">{index + 1}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{item.word}</td>
                  <td className="px-6 py-3 text-sm text-right text-gray-900 font-semibold">
                    {item.count}
                  </td>
                  <td className="px-6 py-3 text-sm text-right text-gray-600">
                    {(item.percentage || 0).toFixed(2)}%
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${item.percentage || 0}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Palavras</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Palavras Únicas</p>
              <p className="text-2xl font-bold text-gray-900">{data.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Mais Frequente</p>
              <p className="text-2xl font-bold text-gray-900">{data[0]?.count || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
