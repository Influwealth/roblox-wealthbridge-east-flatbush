const API_BASE = '/api';

export async function fetchQuests() {
  const res = await fetch(`${API_BASE}/trace/list`);
  if (!res.ok) throw new Error('Failed to fetch quests');
  return res.json();
}

export async function fetchRedemptions() {
  const res = await fetch(`${API_BASE}/ledger/pending`);
  if (!res.ok) throw new Error('Failed to fetch redemptions');
  return res.json();
}

export async function approveRedemption(redemptionId: string) {
  const res = await fetch(`${API_BASE}/ledger/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ redemptionId })
  });
  if (!res.ok) throw new Error('Failed to approve redemption');
  return res.json();
}

export async function denyRedemption(redemptionId: string) {
  const res = await fetch(`${API_BASE}/ledger/deny`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ redemptionId })
  });
  if (!res.ok) throw new Error('Failed to deny redemption');
  return res.json();
}
