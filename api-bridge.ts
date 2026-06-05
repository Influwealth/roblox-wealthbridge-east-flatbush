/**
 * Roblox WealthBridge API Bridge
 *
 * Connects the East Flatbush Roblox game economy (Tier 1 EBTK tokens)
 * to the WealthBridge Token Gateway (Tier 2 GVC / Tier 3 WBST).
 *
 * This bridge runs as a Node.js service alongside the Roblox Open Cloud API.
 * Roblox datastores hold EBTK balances; this bridge converts them to GVC
 * via the WealthBridge token-gateway (port 8002).
 */

import { randomUUID } from "node:crypto";

const TOKEN_GATEWAY_URL = "http://localhost:8002";
const NODE_ID = "roblox-wealthbridge-bridge";

export interface RobloxPlayer {
  userId: number;
  username: string;
  icpPrincipal?: string; // ICP wallet principal (set when player links wallet)
}

export interface EBTKBalance {
  userId: number;
  balance: number; // in EBTK units
}

export interface BridgeResult {
  txId: string;
  status: "pending" | "confirmed" | "failed";
  ebtkBurned: number;
  gvcMinted: number;
  icpAddress: string;
}

function sapHeaders(traceId: string): Record<string, string> {
  return {
    "x-sap-node-id": NODE_ID,
    "x-sap-trace-id": traceId,
    "x-sap-version": "1.0",
    "x-sap-capsule": "roblox-bridge",
    "Content-Type": "application/json",
  };
}

async function callTokenGateway(path: string, body: unknown, traceId: string): Promise<unknown> {
  const { default: fetch } = await import("node-fetch" as any);
  const resp = await (fetch as Function)(`${TOKEN_GATEWAY_URL}${path}`, {
    method: "POST",
    headers: sapHeaders(traceId),
    body: JSON.stringify(body),
  });
  return resp.json();
}

/**
 * Get a player's EBTK balance from the token gateway.
 */
export async function getPlayerBalance(player: RobloxPlayer): Promise<EBTKBalance> {
  const traceId = randomUUID();
  const address = `roblox:${player.userId}`;
  const { default: fetch } = await import("node-fetch" as any);
  const resp = await (fetch as Function)(`${TOKEN_GATEWAY_URL}/balance/${address}?tier=1`, {
    headers: sapHeaders(traceId),
  });
  const data = (await resp.json()) as Array<{ balance: number }>;
  return { userId: player.userId, balance: data[0]?.balance ?? 0 };
}

/**
 * Bridge Tier 1 EBTK → Tier 2 GVC for a player.
 * Requires player to have linked their ICP wallet principal.
 */
export async function bridgeToGVC(player: RobloxPlayer, ebtkAmount: number): Promise<BridgeResult> {
  if (!player.icpPrincipal) {
    return {
      txId: `failed_${Date.now()}`,
      status: "failed",
      ebtkBurned: 0,
      gvcMinted: 0,
      icpAddress: "",
    };
  }

  const traceId = randomUUID();
  const result = (await callTokenGateway(
    "/bridge/tier1-to-tier2",
    {
      player_id: `roblox:${player.userId}`,
      amount: ebtkAmount,
      icp_address: player.icpPrincipal,
    },
    traceId
  )) as { tx_id?: string; status?: string; amount?: number };

  return {
    txId: result.tx_id ?? `tx_${traceId}`,
    status: (result.status as "pending" | "confirmed" | "failed") ?? "pending",
    ebtkBurned: ebtkAmount,
    gvcMinted: result.amount ?? ebtkAmount * 0.01,
    icpAddress: player.icpPrincipal,
  };
}

/**
 * Award EBTK to a player (called from Roblox game server via Open Cloud).
 */
export async function awardEBTK(player: RobloxPlayer, amount: number, reason: string): Promise<unknown> {
  const traceId = randomUUID();
  return callTokenGateway(
    "/transfer",
    {
      from: "system:east-flatbush-treasury",
      to: `roblox:${player.userId}`,
      amount,
      tier: 1,
      memo: reason,
    },
    traceId
  );
}

// Example usage
if (require.main === module) {
  const testPlayer: RobloxPlayer = {
    userId: 123456789,
    username: "TestPlayer",
    icpPrincipal: "aaaaa-aa",
  };

  console.log("Roblox WealthBridge API Bridge — test mode");
  console.log(`Token Gateway: ${TOKEN_GATEWAY_URL}`);
  console.log(`Test player: ${testPlayer.username} (${testPlayer.userId})`);
}
