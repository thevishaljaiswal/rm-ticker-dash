
import React from 'react';

interface LiveUpdate {
  id: string;
  timestamp: string;
  amount: number;
  customerName: string;
  rmName: string;
  time: string;
}

interface LiveUpdatesMarqueeProps {
  liveUpdates: LiveUpdate[];
  formatCurrency: (amount: number) => string;
}

export const LiveUpdatesMarquee: React.FC<LiveUpdatesMarqueeProps> = ({ liveUpdates, formatCurrency }) => {
  const marqueeContent = liveUpdates.map((update) => (
    <span key={update.id} className="inline-flex items-center mx-6 whitespace-nowrap">
      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-mono">
        [{update.time}]
      </span>
      <span className="ml-2 text-green-400 font-semibold">
        {formatCurrency(update.amount)}
      </span>
      <span className="mx-2 text-slate-400">received from</span>
      <span className="text-blue-300 font-medium">{update.customerName}</span>
      <span className="mx-2 text-slate-400">(</span>
      <span className="text-yellow-400 font-medium">{update.rmName}</span>
      <span className="text-slate-400">)</span>
      <span className="ml-2 text-2xl animate-pulse">💰</span>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-gradient-to-r from-green-900/30 to-blue-900/30 py-2">
      <div className="animate-marquee-reverse whitespace-nowrap flex">
        {marqueeContent}
        {marqueeContent} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
};
