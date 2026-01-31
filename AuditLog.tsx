import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  event: string;
  player?: string;
  details: Record<string, any>;
}

export default function AuditLog() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [filter, setFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');

  useEffect(() => {
    // TODO: Fetch real audit events from Gateway API
    const mockEvents: AuditEvent[] = [
      {
        id: 'AUD_001',
        timestamp: new Date().toISOString(),
        level: 'info',
        event: 'quest_completed',
        player: 'Player_123',
        details: { questId: 'FIN_001', credits: 50 }
      },
      {
        id: 'AUD_002',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'info',
        event: 'player_joined',
        player: 'Player_456',
        details: { userId: 456 }
      },
      {
        id: 'AUD_003',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        level: 'warn',
        event: 'redemption_requested',
        player: 'Player_123',
        details: { benefitId: 'FOOD_COOP_001', credits: 250 }
      },
      {
        id: 'AUD_004',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        level: 'info',
        event: 'quest_started',
        player: 'Player_789',
        details: { questId: 'MAK_001' }
      }
    ];
    setEvents(mockEvents);
  }, []);

  const getEventIcon = (level: AuditEvent['level']) => {
    switch (level) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      case 'warn':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getEventColor = (level: AuditEvent['level']) => {
    switch (level) {
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10';
      case 'warn':
        return 'border-yellow-500/20 bg-yellow-500/10';
      case 'error':
        return 'border-red-500/20 bg-red-500/10';
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.level === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-bold">Audit Log</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <FilterButton 
            label="All" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            count={events.length}
          />
          <FilterButton 
            label="Info" 
            active={filter === 'info'} 
            onClick={() => setFilter('info')}
            count={events.filter(e => e.level === 'info').length}
            color="blue"
          />
          <FilterButton 
            label="Warn" 
            active={filter === 'warn'} 
            onClick={() => setFilter('warn')}
            count={events.filter(e => e.level === 'warn').length}
            color="yellow"
          />
          <FilterButton 
            label="Error" 
            active={filter === 'error'} 
            onClick={() => setFilter('error')}
            count={events.filter(e => e.level === 'error').length}
            color="red"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`rounded-lg p-3 border ${getEventColor(event.level)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getEventIcon(event.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium font-mono text-sm">{event.event}</span>
                  {event.player && (
                    <span className="text-xs text-gray-400">by {event.player}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
                {Object.keys(event.details).length > 0 && (
                  <div className="bg-gray-900/50 rounded p-2 text-xs font-mono">
                    {JSON.stringify(event.details, null, 2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No {filter !== 'all' ? filter : ''} events found</p>
          <p className="text-sm">Audit events will appear here as activity occurs</p>
        </div>
      )}
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
  color?: 'blue' | 'yellow' | 'red';
}

function FilterButton({ label, active, onClick, count, color }: FilterButtonProps) {
  const colorClasses = color ? {
    blue: 'bg-blue-600 hover:bg-blue-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    red: 'bg-red-600 hover:bg-red-700'
  }[color] : 'bg-gray-600 hover:bg-gray-700';

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? colorClasses
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      }`}
    >
      {label} <span className="opacity-75">({count})</span>
    </button>
  );
}
