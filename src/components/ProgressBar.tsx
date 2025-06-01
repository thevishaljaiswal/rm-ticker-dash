
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  status: 'green' | 'yellow' | 'red';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, status }) => {
  const getColorClasses = () => {
    switch (status) {
      case 'green':
        return 'bg-green-50 border-green-200';
      case 'yellow':
        return 'bg-orange-50 border-orange-200';
      case 'red':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getProgressClasses = () => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-orange-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full">
      <div className={`w-full h-2 rounded border ${getColorClasses()} overflow-hidden`}>
        <div
          className={`h-full ${getProgressClasses()} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="text-center text-xs text-gray-400 mt-1 font-sans">
        Achievement Progress
      </div>
    </div>
  );
};
