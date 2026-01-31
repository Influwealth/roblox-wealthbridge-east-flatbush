import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Clock } from 'lucide-react';

interface Redemption {
  id: string;
  player: string;
  benefit: string;
  credits: number;
  status: 'pending' | 'approved' | 'denied';
  requestedAt: string;
  guardian?: string;
}

export default function GuardianPanel() {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);

  useEffect(() => {
    // TODO: Fetch real redemption requests from Gateway API
    const mockRedemptions: Redemption[] = [
      {
        id: 'RED_001',
        player: 'Player_123',
        benefit: 'Food Co-op Bundle',
        credits: 250,
        status: 'pending',
        requestedAt: new Date().toISOString()
      },
      {
        id: 'RED_002',
        player: 'Player_456',
        benefit: 'Maker Kit',
        credits: 400,
        status: 'pending',
        requestedAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    setRedemptions(mockRedemptions);
  }, []);

  const handleApprove = async (redemptionId: string) => {
    // TODO: Call Gateway API to approve redemption
    console.log('Approving redemption:', redemptionId);
    setRedemptions(redemptions.map(r => 
      r.id === redemptionId ? { ...r, status: 'approved' as const } : r
    ));
  };

  const handleDeny = async (redemptionId: string) => {
    // TODO: Call Gateway API to deny redemption
    console.log('Denying redemption:', redemptionId);
    setRedemptions(redemptions.map(r => 
      r.id === redemptionId ? { ...r, status: 'denied' as const } : r
    ));
  };

  const pendingRedemptions = redemptions.filter(r => r.status === 'pending');
  const processedRedemptions = redemptions.filter(r => r.status !== 'pending');

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold">Guardian Approval Panel</h2>
      </div>

      {/* Pending Redemptions */}
      {pendingRedemptions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            Pending Approvals ({pendingRedemptions.length})
          </h3>
          
          <div className="space-y-3">
            {pendingRedemptions.map((redemption) => (
              <div
                key={redemption.id}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{redemption.benefit}</h4>
                    <div className="text-sm text-gray-400 space-y-1 mt-2">
                      <div>Player: <span className="text-gray-300">{redemption.player}</span></div>
                      <div>Cost: <span className="text-yellow-400 font-semibold">{redemption.credits} credits</span></div>
                      <div>Requested: <span className="text-gray-300">{new Date(redemption.requestedAt).toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(redemption.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(redemption.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Redemptions */}
      {processedRedemptions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Recent Decisions</h3>
          
          <div className="space-y-2">
            {processedRedemptions.map((redemption) => (
              <div
                key={redemption.id}
                className={`rounded-lg p-3 border ${
                  redemption.status === 'approved'
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {redemption.status === 'approved' ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                      <div className="font-medium">{redemption.benefit}</div>
                      <div className="text-sm text-gray-400">{redemption.player}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{redemption.credits} credits</div>
                    <div className={`text-xs ${
                      redemption.status === 'approved' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {redemption.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {redemptions.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No redemption requests yet</p>
          <p className="text-sm">Guardian approvals will appear here when players request redemptions</p>
        </div>
      )}
    </div>
  );
}
