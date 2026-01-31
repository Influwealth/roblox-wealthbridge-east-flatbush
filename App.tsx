import React, { useState, useEffect } from 'react';
import { Activity, Users, DollarSign, Shield } from 'lucide-react';
import QuestTracker from './components/QuestTracker';
import GuardianPanel from './components/GuardianPanel';
import AuditLog from './components/AuditLog';

interface Stats {
  activeQuests: number;
  totalPlayers: number;
  creditsIssued: number;
  pendingRedemptions: number;
}

function App() {
  const [stats, setStats] = useState<Stats>({
    activeQuests: 0,
    totalPlayers: 0,
    creditsIssued: 0,
    pendingRedemptions: 0
  });
  const [activeTab, setActiveTab] = useState<'quests' | 'guardians' | 'audit'>('quests');

  useEffect(() => {
    // TODO: Fetch real stats from Gateway API
    const mockStats = {
      activeQuests: 12,
      totalPlayers: 47,
      creditsIssued: 2340,
      pendingRedemptions: 3
    };
    setStats(mockStats);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">🏙️ WealthBridge MCP Dashboard</h1>
          <p className="text-gray-400 text-sm">East Flatbush Capsule World</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Activity className="w-6 h-6" />}
            label="Active Quests"
            value={stats.activeQuests}
            color="blue"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="Total Players"
            value={stats.totalPlayers}
            color="green"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Credits Issued"
            value={stats.creditsIssued}
            color="yellow"
          />
          <StatCard
            icon={<Shield className="w-6 h-6" />}
            label="Pending Approvals"
            value={stats.pendingRedemptions}
            color="red"
          />
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-700">
            <TabButton
              active={activeTab === 'quests'}
              onClick={() => setActiveTab('quests')}
              label="Quest Tracker"
            />
            <TabButton
              active={activeTab === 'guardians'}
              onClick={() => setActiveTab('guardians')}
              label="Guardian Panel"
            />
            <TabButton
              active={activeTab === 'audit'}
              onClick={() => setActiveTab('audit')}
              label="Audit Log"
            />
          </div>

          <div className="p-6">
            {activeTab === 'quests' && <QuestTracker />}
            {activeTab === 'guardians' && <GuardianPanel />}
            {activeTab === 'audit' && <AuditLog />}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    red: 'bg-red-500/10 text-red-400'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className={`inline-flex p-2 rounded-lg mb-2 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium transition-colors ${
        active
          ? 'bg-gray-700 text-white border-b-2 border-blue-500'
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
      }`}
    >
      {label}
    </button>
  );
}

export default App;
