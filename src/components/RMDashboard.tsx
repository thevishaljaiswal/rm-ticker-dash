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

interface ManagerData {
  id: string;
  name: string;
  target: number;
  achieved: number;
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

  const [onboardingManagers, setOnboardingManagers] = useState<ManagerData[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      target: 150,
      achieved: 142,
      category: 'Customer Onboarding',
      achievementPercentage: 94.7,
      status: 'green'
    },
    {
      id: '2',
      name: 'Michael R.',
      target: 120,
      achieved: 98,
      category: 'Document Verification',
      achievementPercentage: 81.7,
      status: 'yellow'
    },
    {
      id: '3',
      name: 'Lisa Wong',
      target: 180,
      achieved: 165,
      category: 'Account Setup',
      achievementPercentage: 91.7,
      status: 'green'
    }
  ]);

  const [paymentManagers, setPaymentManagers] = useState<ManagerData[]>([
    {
      id: '1',
      name: 'David Kumar',
      target: 500,
      achieved: 485,
      category: 'Payment Processing',
      achievementPercentage: 97.0,
      status: 'green'
    },
    {
      id: '2',
      name: 'Emma Davis',
      target: 350,
      achieved: 320,
      category: 'Payment Support',
      achievementPercentage: 91.4,
      status: 'green'
    },
    {
      id: '3',
      name: 'Alex Thompson',
      target: 400,
      achieved: 280,
      category: 'Transaction Queries',
      achievementPercentage: 70.0,
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

  const formatCount = (count: number) => {
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header - Stock Market Style */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 font-sans">
              RM PERFORMANCE DASHBOARD
            </h1>
            <div className="text-xs text-gray-500 font-medium">
              LIVE
            </div>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {new Date().toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
        </div>
      </div>

      {/* Top Ticker - RM Status */}
      <div className="bg-gray-50 border-b border-gray-200">
        <MovingMarquee rmData={rmData} formatCurrency={formatCurrency} />
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Top Performers Sections - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Onboarding Manager Top Performers */}
          <div className="bg-white border border-gray-200 rounded-sm p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 font-sans">
              ONBOARDING MANAGER TOP PERFORMERS
            </h2>
            <div className="space-y-2">
              {[...onboardingManagers]
                .sort((a, b) => b.achievementPercentage - a.achievementPercentage)
                .map((manager, index) => (
                  <div
                    key={manager.id}
                    className={`flex items-center justify-between p-3 rounded-sm border text-xs ${
                      index === 0 ? 'bg-green-50 border-green-200' :
                      index === 1 ? 'bg-blue-50 border-blue-200' :
                      'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900 font-sans">{manager.name}</div>
                        <div className="text-gray-600 font-sans">{manager.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-700 font-mono">
                        {manager.achievementPercentage.toFixed(1)}%
                      </div>
                      <div className="text-gray-600 font-mono">
                        {manager.achieved}/{manager.target}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Payment Support Manager Top Performers */}
          <div className="bg-white border border-gray-200 rounded-sm p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 font-sans">
              PAYMENT SUPPORT MANAGER TOP PERFORMERS
            </h2>
            <div className="space-y-2">
              {[...paymentManagers]
                .sort((a, b) => b.achievementPercentage - a.achievementPercentage)
                .map((manager, index) => (
                  <div
                    key={manager.id}
                    className={`flex items-center justify-between p-3 rounded-sm border text-xs ${
                      index === 0 ? 'bg-green-50 border-green-200' :
                      index === 1 ? 'bg-blue-50 border-blue-200' :
                      'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900 font-sans">{manager.name}</div>
                        <div className="text-gray-600 font-sans">{manager.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-700 font-mono">
                        {manager.achievementPercentage.toFixed(1)}%
                      </div>
                      <div className="text-gray-600 font-mono">
                        {manager.achieved}/{manager.target}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* RM Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {rmData.map((rm) => (
            <div
              key={rm.id}
              className="bg-white border border-gray-200 rounded-sm p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-semibold text-gray-900 font-sans">{rm.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                  rm.status === 'green' ? 'bg-green-50 text-green-700 border border-green-200' :
                  rm.status === 'yellow' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                  'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {rm.achievementPercentage.toFixed(1)}%
                </span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Target:</span>
                  <span className="font-mono text-gray-900 font-medium">{formatCurrency(rm.target)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Collected:</span>
                  <CountUp 
                    end={rm.collected} 
                    duration={2}
                    className="font-mono text-green-700 font-medium"
                    formatter={formatCurrency}
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Outstanding:</span>
                  <CountUp 
                    end={rm.outstanding} 
                    duration={2}
                    className="font-mono text-red-600 font-medium"
                    formatter={formatCurrency}
                  />
                </div>
                
                <div className="mt-3">
                  <ProgressBar 
                    percentage={rm.achievementPercentage} 
                    status={rm.status}
                  />
                </div>
                
                <div className="text-xs text-gray-500 text-center pt-2 font-sans">
                  {rm.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ticker - Live Updates */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <LiveUpdatesMarquee liveUpdates={liveUpdates} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default RMDashboard;
