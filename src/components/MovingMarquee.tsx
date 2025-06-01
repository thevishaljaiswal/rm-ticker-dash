import React from 'react';

interface RMData {
  id: string;
  name: string;
  target: number;
  collected: number;
  outstanding: number;
  category: string;
  achievementPercentage: number;
  status: 'green' | 'yellow' | 'red';
}

interface MovingMarqueeProps {
  rmData: RMData[];
  formatCurrency: (amount: number) => string;
}

export const MovingMarquee: React.FC<MovingMarqueeProps> = ({ rmData, formatCurrency }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-orange-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const marqueeContent = rmData.map((rm) => (
    <span key={rm.id} className="inline-flex items-center mx-6 whitespace-nowrap text-xs">
      <span className="font-semibold text-gray-900 font-sans">{rm.name}</span>
      <span className="mx-2 text-gray-400">|</span>
      <span className="text-gray-600 font-sans">Target:</span>
      <span className="ml-1 text-gray-900 font-mono font-medium">{formatCurrency(rm.target)}</span>
      <span className="mx-2 text-gray-400">|</span>
      <span className="text-gray-600 font-sans">Collected:</span>
      <span className="ml-1 text-green-600 font-mono font-medium">{formatCurrency(rm.collected)}</span>
      <span className="mx-2 text-gray-400">|</span>
      <span className="text-gray-600 font-sans">Outstanding:</span>
      <span className="ml-1 text-red-600 font-mono font-medium">{formatCurrency(rm.outstanding)}</span>
      <span className="mx-2 text-gray-400">|</span>
      <span className={`font-bold font-mono ${getStatusColor(rm.status)}`}>
        {rm.achievementPercentage.toFixed(1)}%
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-gray-50 py-2">
      <div className="animate-marquee whitespace-nowrap flex">
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  );
};
