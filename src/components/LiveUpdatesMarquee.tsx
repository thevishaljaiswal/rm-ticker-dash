
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
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-mono border border-green-200">
        [{update.time}]
      </span>
      <span className="ml-2 text-green-700 font-semibold">
        {formatCurrency(update.amount)}
      </span>
      <span className="mx-2 text-gray-600">received from</span>
      <span className="text-blue-700 font-medium">{update.customerName}</span>
      <span className="mx-2 text-gray-600">(</span>
      <span className="text-orange-600 font-medium">{update.rmName}</span>
      <span className="text-gray-600">)</span>
      <span className="ml-2 text-2xl animate-pulse">💰</span>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 py-2">
      <div className="animate-marquee-reverse whitespace-nowrap flex">
        {marqueeContent}
        {marqueeContent} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
};
