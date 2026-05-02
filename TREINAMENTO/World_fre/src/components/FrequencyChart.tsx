import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { WordFrequencyData } from '@/types';

interface FrequencyChartProps {
  data: WordFrequencyData[];
}

export const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  const topWords = data.slice(0, 15);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { word, count, percentage } = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-gray-900">{word}</p>
          <p className="text-sm text-gray-700">Frequência: {count}</p>
          <p className="text-sm text-gray-700">Percentual: {percentage?.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topWords}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: 'Frequência', position: 'insideBottomRight', offset: -5 }} />
          <YAxis
            dataKey="word"
            type="category"
            width={190}
            tick={{ fontSize: 12 }}
            label={{ value: 'Palavra', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#2563eb" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
