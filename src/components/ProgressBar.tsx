
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  status: 'green' | 'yellow' | 'red';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, status }) => {
  const getColorClasses = () => {
    switch (status) {
      case 'green':
        return 'bg-green-500/30 border-green-500/50';
      case 'yellow':
        return 'bg-yellow-500/30 border-yellow-500/50';
      case 'red':
        return 'bg-red-500/30 border-red-500/50';
      default:
        return 'bg-slate-500/30 border-slate-500/50';
    }
  };

  const getProgressClasses = () => {
    switch (status) {
      case 'green':
        return 'bg-gradient-to-r from-green-500 to-green-400';
      case 'yellow':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-400';
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-red-400';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-400';
    }
  };

  return (
    <div className="w-full">
      <div className={`w-full h-3 rounded-full border ${getColorClasses()} overflow-hidden`}>
        <div
          className={`h-full ${getProgressClasses()} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="text-center text-xs text-slate-400 mt-1">
        Achievement Progress
      </div>
    </div>
  );
};
