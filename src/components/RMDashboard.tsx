
import React, { useState, useEffect } from 'react';
import { MovingMarquee } from './MovingMarquee';
import { LiveUpdatesMarquee } from './LiveUpdatesMarquee';
import { ProgressBar } from './ProgressBar';
import { CountUp } from './CountUp';

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

interface LiveUpdate {
  id: string;
  timestamp: string;
  amount: number;
  customerName: string;
  rmName: string;
  time: string;
}

const RMDashboard = () => {
  const [rmData, setRmData] = useState<RMData[]>([
    {
      id: '1',
      name: 'John D.',
      target: 10_00_00_000, // 10 Cr
      collected: 7_20_00_000, // 7.2 Cr
      outstanding: 2_80_00_000, // 2.8 Cr
      category: 'Home Loan',
      achievementPercentage: 72,
      status: 'yellow'
    },
    {
      id: '2',
      name: 'Aisha K.',
      target: 8_00_00_000, // 8 Cr
      collected: 6_00_00_000, // 6 Cr
      outstanding: 2_00_00_000, // 2 Cr
      category: 'Personal Loan',
      achievementPercentage: 75,
      status: 'yellow'
    },
    {
      id: '3',
      name: 'Rajesh M.',
      target: 12_00_00_000, // 12 Cr
      collected: 11_50_00_000, // 11.5 Cr
      outstanding: 50_00_000, // 0.5 Cr
      category: 'Insurance',
      achievementPercentage: 96,
      status: 'green'
    },
    {
      id: '4',
      name: 'Priya S.',
      target: 6_00_00_000, // 6 Cr
      collected: 3_80_00_000, // 3.8 Cr
      outstanding: 2_20_00_000, // 2.2 Cr
      category: 'Business Loan',
      achievementPercentage: 63,
      status: 'red'
    }
  ]);

  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      amount: 50_00_000,
      customerName: 'Amit Shah',
      rmName: 'John D.',
      time: '14:32'
    },
    {
      id: '2',
      timestamp: new Date().toISOString(),
      amount: 20_00_000,
      customerName: 'Ramesh Gupta',
      rmName: 'Aisha K.',
      time: '14:35'
    },
    {
      id: '3',
      timestamp: new Date().toISOString(),
      amount: 15_00_000,
      customerName: 'Sarah Khan',
      rmName: 'John D.',
      time: '14:37'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random collection update
      const customers = ['Arjun Patel', 'Meera Singh', 'Kiran Kumar', 'Deepika Rao', 'Vikram Joshi'];
      const amounts = [10_00_000, 15_00_000, 25_00_000, 30_00_000, 45_00_000, 75_00_000];
      
      const randomRM = rmData[Math.floor(Math.random() * rmData.length)];
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      const newUpdate: LiveUpdate = {
        id: Date.now().toString(),
        timestamp: now.toISOString(),
        amount: randomAmount,
        customerName: randomCustomer,
        rmName: randomRM.name,
        time: timeString
      };

      setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 19)]); // Keep last 20 updates

      // Update RM data
      setRmData(prev => prev.map(rm => {
        if (rm.name === randomRM.name) {
          const newCollected = rm.collected + randomAmount;
          const newOutstanding = Math.max(0, rm.target - newCollected);
          const newAchievement = Math.min(100, (newCollected / rm.target) * 100);
          
          let newStatus: 'green' | 'yellow' | 'red' = 'red';
          if (newAchievement >= 90) newStatus = 'green';
          else if (newAchievement >= 75) newStatus = 'yellow';

          return {
            ...rm,
            collected: newCollected,
            outstanding: newOutstanding,
            achievementPercentage: newAchievement,
            status: newStatus
          };
        }
        return rm;
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [rmData]);

  const formatCurrency = (amount: number) => {
    const crores = amount / 10_000_000;
    return `₹${crores.toFixed(1)}Cr`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 text-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 p-4 shadow-sm">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          📊 RM Performance Dashboard - LIVE
        </h1>
        <div className="text-center text-sm text-blue-600 mt-1">
          Real-time Collections & Outstanding Tracker
        </div>
      </div>

      {/* Top Marquee - RM Status */}
      <div className="bg-blue-100/50 border-b border-blue-200">
        <MovingMarquee rmData={rmData} formatCurrency={formatCurrency} />
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* RM Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rmData.map((rm) => (
            <div
              key={rm.id}
              className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 shadow-lg ${
                rm.status === 'green' 
                  ? 'border-green-400 shadow-green-200' 
                  : rm.status === 'yellow'
                  ? 'border-yellow-400 shadow-yellow-200'
                  : 'border-red-400 shadow-red-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{rm.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rm.status === 'green' ? 'bg-green-100 text-green-700' :
                  rm.status === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {rm.achievementPercentage.toFixed(1)}%
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-mono text-blue-700 font-semibold">{formatCurrency(rm.target)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Collected:</span>
                  <CountUp 
                    end={rm.collected} 
                    duration={2}
                    className="font-mono text-green-700 font-semibold"
                    formatter={formatCurrency}
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding:</span>
                  <CountUp 
                    end={rm.outstanding} 
                    duration={2}
                    className="font-mono text-red-700 font-semibold"
                    formatter={formatCurrency}
                  />
                </div>
                
                <ProgressBar 
                  percentage={rm.achievementPercentage} 
                  status={rm.status}
                />
                
                <div className="text-xs text-gray-500 text-center pt-2 bg-gray-50 rounded-md py-1">
                  {rm.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🏆 Top Performers Today
          </h2>
          <div className="space-y-3">
            {[...rmData]
              .sort((a, b) => b.achievementPercentage - a.achievementPercentage)
              .slice(0, 3)
              .map((rm, index) => (
                <div
                  key={rm.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300' :
                    index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300' :
                    'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-800">{rm.name}</div>
                      <div className="text-sm text-gray-600">{rm.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-700">
                      {rm.achievementPercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(rm.collected)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Marquee - Live Updates */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <LiveUpdatesMarquee liveUpdates={liveUpdates} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default RMDashboard;
