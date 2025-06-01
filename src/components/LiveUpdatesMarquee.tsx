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
    <span key={update.id} className="inline-flex items-center mx-6 whitespace-nowrap text-xs">
      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono border border-gray-200">
        {update.time}
      </span>
      <span className="ml-2 text-green-600 font-mono font-semibold">
        {formatCurrency(update.amount)}
      </span>
      <span className="mx-2 text-gray-500 font-sans">received from</span>
      <span className="text-gray-900 font-medium font-sans">{update.customerName}</span>
      <span className="mx-2 text-gray-500 font-sans">(</span>
      <span className="text-blue-600 font-medium font-sans">{update.rmName}</span>
      <span className="text-gray-500 font-sans">)</span>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-white py-2">
      <div className="animate-marquee-reverse whitespace-nowrap flex">
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  );
};
