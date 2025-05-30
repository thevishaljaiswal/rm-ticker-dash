
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  status: 'green' | 'yellow' | 'red';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, status }) => {
  const getColorClasses = () => {
    switch (status) {
      case 'green':
        return 'bg-green-100 border-green-300';
      case 'yellow':
        return 'bg-yellow-100 border-yellow-300';
      case 'red':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
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
        return 'bg-gradient-to-r from-gray-500 to-gray-400';
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
      <div className="text-center text-xs text-gray-500 mt-1">
        Achievement Progress
      </div>
    </div>
  );
};
