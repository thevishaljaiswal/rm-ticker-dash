
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return '🟢';
      case 'yellow': return '🟡';
      case 'red': return '🔴';
      default: return '⚪';
    }
  };

  const marqueeContent = rmData.map((rm) => (
    <span key={rm.id} className="inline-flex items-center mx-8 whitespace-nowrap">
      <span className="mr-2">{getStatusIcon(rm.status)}</span>
      <span className="font-semibold text-blue-300">{rm.name}</span>
      <span className="mx-2 text-slate-400">→</span>
      <span className="text-slate-300">Target:</span>
      <span className="ml-1 text-blue-400 font-mono">{formatCurrency(rm.target)}</span>
      <span className="mx-2 text-slate-400">|</span>
      <span className="text-slate-300">Collected:</span>
      <span className="ml-1 text-green-400 font-mono font-semibold">{formatCurrency(rm.collected)}</span>
      <span className="mx-2 text-slate-400">|</span>
      <span className="text-slate-300">Outstanding:</span>
      <span className="ml-1 text-red-400 font-mono font-semibold">{formatCurrency(rm.outstanding)}</span>
      <span className="mx-2 text-slate-400">|</span>
      <span className={`font-bold ${
        rm.achievementPercentage >= 90 ? 'text-green-400' :
        rm.achievementPercentage >= 75 ? 'text-yellow-400' :
        'text-red-400'
      }`}>
        {rm.achievementPercentage.toFixed(1)}%
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-gradient-to-r from-slate-900/50 to-blue-900/50 py-3">
      <div className="animate-marquee whitespace-nowrap flex">
        {marqueeContent}
        {marqueeContent} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
};
