
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-blue-500/30 p-4">
        <h1 className="text-3xl font-bold text-center text-blue-300">
          📊 RM Performance Dashboard - LIVE
        </h1>
        <div className="text-center text-sm text-blue-200 mt-1">
          Real-time Collections & Outstanding Tracker
        </div>
      </div>

      {/* Top Marquee - RM Status */}
      <div className="bg-blue-950/50 border-b border-blue-500/30">
        <MovingMarquee rmData={rmData} formatCurrency={formatCurrency} />
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* RM Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rmData.map((rm) => (
            <div
              key={rm.id}
              className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                rm.status === 'green' 
                  ? 'border-green-500/50 shadow-lg shadow-green-500/20' 
                  : rm.status === 'yellow'
                  ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                  : 'border-red-500/50 shadow-lg shadow-red-500/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-blue-300">{rm.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rm.status === 'green' ? 'bg-green-500/20 text-green-300' :
                  rm.status === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {rm.achievementPercentage.toFixed(1)}%
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Target:</span>
                  <span className="font-mono text-blue-300">{formatCurrency(rm.target)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-300">Collected:</span>
                  <CountUp 
                    end={rm.collected} 
                    duration={2}
                    className="font-mono text-green-400 font-semibold"
                    formatter={formatCurrency}
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-300">Outstanding:</span>
                  <CountUp 
                    end={rm.outstanding} 
                    duration={2}
                    className="font-mono text-red-400 font-semibold"
                    formatter={formatCurrency}
                  />
                </div>
                
                <ProgressBar 
                  percentage={rm.achievementPercentage} 
                  status={rm.status}
                />
                
                <div className="text-xs text-slate-400 text-center pt-2">
                  {rm.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-gradient-to-r from-slate-800/60 to-blue-900/60 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center">
            🏆 Top Performers Today
          </h2>
          <div className="space-y-3">
            {[...rmData]
              .sort((a, b) => b.achievementPercentage - a.achievementPercentage)
              .slice(0, 3)
              .map((rm, index) => (
                <div
                  key={rm.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30' :
                    index === 1 ? 'bg-gradient-to-r from-slate-500/20 to-slate-600/20 border border-slate-500/30' :
                    'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                    <div>
                      <div className="font-semibold text-blue-200">{rm.name}</div>
                      <div className="text-sm text-slate-400">{rm.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">
                      {rm.achievementPercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-300">
                      {formatCurrency(rm.collected)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Marquee - Live Updates */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-green-500/30">
        <LiveUpdatesMarquee liveUpdates={liveUpdates} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default RMDashboard;
