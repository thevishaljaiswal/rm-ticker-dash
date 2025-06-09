
import React from 'react';
import { CountUp } from './CountUp';

interface CollectionSummaryProps {
  dailyCollection: number;
  monthlyCollection: number;
  yearlyCollection: number;
  formatCurrency: (amount: number) => string;
}

export const CollectionSummary: React.FC<CollectionSummaryProps> = ({
  dailyCollection,
  monthlyCollection,
  yearlyCollection,
  formatCurrency
}) => {
  const summaryData = [
    {
      period: 'TODAY',
      amount: dailyCollection,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      period: 'THIS MONTH',
      amount: monthlyCollection,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      period: 'THIS YEAR',
      amount: yearlyCollection,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {summaryData.map((item) => (
        <div
          key={item.period}
          className={`${item.bgColor} ${item.borderColor} border rounded-sm p-4`}
        >
          <div className="text-xs font-semibold text-gray-600 mb-2 font-sans">
            {item.period}
          </div>
          <div className={`text-lg font-bold ${item.textColor} font-mono`}>
            <CountUp 
              end={item.amount}
              duration={2}
              formatter={formatCurrency}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
