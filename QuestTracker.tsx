import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface Quest {
  id: string;
  player: string;
  district: string;
  title: string;
  status: 'in_progress' | 'completed' | 'failed';
  credits: number;
  timestamp: string;
}

export default function QuestTracker() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    // TODO: Fetch real quest data from Gateway API
    const mockQuests: Quest[] = [
      {
        id: 'FIN_001',
        player: 'Player_123',
        district: 'Finance Lab',
        title: 'Budget the Block Party',
        status: 'completed',
        credits: 50,
        timestamp: new Date().toISOString()
      },
      {
        id: 'MAK_001',
        player: 'Player_456',
        district: 'Maker Yard',
        title: 'Build a Solar Lamp',
        status: 'in_progress',
        credits: 50,
        timestamp: new Date().toISOString()
      },
      {
        id: 'TEL_001',
        player: 'Player_789',
        district: 'Telecom Tower',
        title: 'Set Up Mesh Network',
        status: 'in_progress',
        credits: 75,
        timestamp: new Date().toISOString()
      }
    ];
    setQuests(mockQuests);
  }, []);

  const getStatusIcon = (status: Quest['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusBadge = (status: Quest['status']) => {
    const styles = {
      completed: 'bg-green-500/10 text-green-400 border-green-500/20',
      in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      failed: 'bg-red-500/10 text-red-400 border-red-500/20'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Active & Recent Quests</h2>
      
      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {getStatusIcon(quest.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{quest.title}</h3>
                    {getStatusBadge(quest.status)}
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>Player: <span className="text-gray-300">{quest.player}</span></div>
                    <div>District: <span className="text-gray-300">{quest.district}</span></div>
                    <div>Quest ID: <span className="text-gray-300 font-mono text-xs">{quest.id}</span></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{quest.credits}</div>
                <div className="text-xs text-gray-400">credits</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {quests.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No active quests yet</p>
          <p className="text-sm">Quests will appear here when players start them in-game</p>
        </div>
      )}
    </div>
  );
}
